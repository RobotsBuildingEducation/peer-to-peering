import { useCallback, useEffect, useState } from "react";
import {
  collection,
  doc,
  limit,
  onSnapshot,
  orderBy,
  query,
  runTransaction,
  startAfter,
} from "firebase/firestore";

/**
 * Custom hook to fetch and paginate posts from Firestore.
 * It initializes post data, manages loading state, and handles pagination logic.
 *
 * @param {FirebaseFirestore} firestore - The Firestore instance for data operations.
 * @returns {Object} An object containing the posts, a loading state, and a function to fetch more posts.
 */
export const usePosts = (firestore) => {
  // States to store posts, track the last visible post for pagination, and manage loading state.
  const [posts, setPosts] = useState([]);
  const [lastVisible, setLastVisible] = useState(null);
  const [loading, setLoading] = useState(false);

  // Fetches the first batch of posts, ordered by creation time in descending order.
  const fetchPosts = useCallback(() => {
    setLoading(true); // Indicates the loading process has started.
    // Defines the query to fetch the first 50 posts.
    const first = query(
      collection(firestore, "posts"),
      orderBy("createdAt", "desc"),
      limit(50)
    );
    // Listens for the query result in real-time, updating the posts state.
    return onSnapshot(first, (snapshot) => {
      let fetchedPosts = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(), // Spread operator to include all post data.
      }));
      setPosts(fetchedPosts); // Update the posts state with new data.
      setLastVisible(snapshot.docs[snapshot.docs.length - 1]); // Track the last post for pagination.
      setLoading(false); // Loading complete.
    });
  }, [firestore]);

  // Fetches additional posts for pagination, starting after the last visible post.
  const fetchMorePosts = useCallback(() => {
    if (!lastVisible) return; // Guard clause to exit if there's no reference post for pagination.
    setLoading(true); // Indicates the loading process for additional posts has started.
    // Defines the query for the next batch of posts, using the lastVisible document as a reference point.
    const next = query(
      collection(firestore, "posts"),
      orderBy("createdAt", "desc"),
      startAfter(lastVisible),
      limit(50)
    );
    // Listens for the query result in real-time, appending new posts to the existing posts state.
    return onSnapshot(next, (snapshot) => {
      let newPosts = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setPosts((prev) => [...prev, ...newPosts]); // Appends new posts to the existing list.
      setLastVisible(snapshot.docs[snapshot.docs.length - 1]); // Updates the lastVisible reference for further pagination.
      setLoading(false); // Loading complete.
    });
  }, [firestore, lastVisible]);

  // Effect hook to fetch the initial batch of posts when the component mounts.
  useEffect(() => {
    return fetchPosts(); // Cleanup function to stop listening to changes on component unmount.
  }, [fetchPosts]);

  return { posts, fetchMorePosts, loading };
};

/**
 * Custom hook for marking a post as seen by updating Firestore documents.
 * It updates both the global "posts" collection and the user's specific "posts" subcollection.
 *
 * @param {FirebaseFirestore} firestore - The Firestore instance for data operations.
 * @param {Object} userData - Contains the current user's data, including their unique ID.
 * @returns {Function} A function that marks a post as seen by the current user.
 */
export const useSeen = (firestore, userData) => {
  // Callback function for marking a post as seen.
  const handleSeen = useCallback(
    async (postId) => {
      let userId = userData?.uid; // Extracts the user's ID from userData.

      // References to the global post document and the user-specific post document.
      const globalPostRef = doc(firestore, "posts", postId);
      const userPostRef = doc(firestore, `users/${userId}/posts`, postId);

      // Runs a Firestore transaction to ensure atomic updates across multiple documents.
      await runTransaction(firestore, async (transaction) => {
        const globalPostDoc = await transaction.get(globalPostRef);
        const userPostDoc = await transaction.get(userPostRef);

        // Throws an error if the post does not exist in either collection.
        if (!globalPostDoc.exists() || !userPostDoc.exists()) {
          throw "Post does not exist in one of the collections!";
        }

        // Retrieves the current "seenBy" arrays from both documents.
        let globalSeenBy = globalPostDoc.data().seenBy || [];
        let userSeenBy = userPostDoc.data().seenBy || [];

        // Adds the user's ID to the "seenBy" array if it's not already present, then updates both documents.
        if (!globalSeenBy.includes(userId)) {
          globalSeenBy.push(userId);
          transaction.update(globalPostRef, { seenBy: globalSeenBy });
        }
        if (!userSeenBy.includes(userId)) {
          userSeenBy.push(userId);
          transaction.update(userPostRef, { seenBy: userSeenBy });
        }
      });
    },
    [firestore, userData] // Dependencies for the useCallback hook.
  );

  return handleSeen;
};
