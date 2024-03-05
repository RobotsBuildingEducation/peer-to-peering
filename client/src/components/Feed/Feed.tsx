import React, { useState, useEffect } from "react";
import { Studio } from "./Studio/Studio";
import { firestore } from "../../database/firebaseResources";
import {
  doc,
  collection,
  query,
  orderBy,
  limit,
  startAfter,
  onSnapshot,
  runTransaction,
} from "firebase/firestore";

export const Feed = ({ userData }) => {
  const [posts, setPosts] = useState([]);
  const [lastVisible, setLastVisible] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchPosts = () => {
    setLoading(true);
    const first = query(
      collection(firestore, "posts"),
      orderBy("createdAt", "desc"),
      limit(50)
    );

    onSnapshot(first, (snapshot) => {
      let fetchedPosts = [];
      snapshot.docs.forEach((doc) => {
        fetchedPosts.push({ id: doc.id, ...doc.data() });
      });

      setPosts(fetchedPosts);
      setLastVisible(snapshot.docs[snapshot.docs.length - 1]);
      setLoading(false);
    });
  };

  const fetchMorePosts = () => {
    if (!lastVisible) return;
    setLoading(true);
    const next = query(
      collection(firestore, "posts"),
      orderBy("createdAt", "desc"),
      startAfter(lastVisible),
      limit(50)
    );

    onSnapshot(next, (snapshot) => {
      let newPosts = [];
      snapshot.docs.forEach((doc) => {
        newPosts.push({ id: doc.id, ...doc.data() });
      });

      setPosts((prevPosts) => [...prevPosts, ...newPosts]);
      setLastVisible(snapshot.docs[snapshot.docs.length - 1]);
      setLoading(false);
    });
  };

  const handleSeen = async (postId) => {
    let userId = userData?.uid;

    const globalPostRef = doc(firestore, "posts", postId);
    const userPostRef = doc(firestore, `users/${userId}/posts`, postId);

    await runTransaction(firestore, async (transaction) => {
      const globalPostDoc = await transaction.get(globalPostRef);
      const userPostDoc = await transaction.get(userPostRef);
      if (!globalPostDoc.exists() || !userPostDoc.exists()) {
        throw "Post does not exist in one of the collections!";
      }

      let globalSeenBy = globalPostDoc.data().seenBy || [];
      let userSeenBy = userPostDoc.data().seenBy || [];
      if (!globalSeenBy.includes(userId)) {
        globalSeenBy.push(userId);
        transaction.update(globalPostRef, { seenBy: globalSeenBy });
      }
      if (!userSeenBy.includes(userId)) {
        userSeenBy.push(userId);
        transaction.update(userPostRef, { seenBy: userSeenBy });
      }
    });
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <div>
      <Studio userData={userData} />
      <br />
      <div>The Feed</div>
      {posts.map((post) => (
        <div>
          <small>posted by {userData?.uid}</small>
          <div key={post.id}>{post.content}</div>
          <br />
          <button onClick={() => handleSeen(post.id)}>✔️</button>
          <span>{post.seenBy ? post.seenBy.length : 0}</span>
          <br />
          <br />
        </div>
      ))}
      {loading ? (
        <div>Loading...</div>
      ) : posts?.length > 50 ? (
        <button onClick={fetchMorePosts}>Load More</button>
      ) : null}
    </div>
  );
};
