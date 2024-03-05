import React, { useState } from "react";

import { firestore } from "../../../database/firebaseResources";
import { doc, setDoc, collection } from "firebase/firestore";

export const Studio = ({ userData }) => {
  const [postContent, setPostContent] = useState("");

  const handlePostSubmit = async () => {
    const userId = userData?.uid;
    try {
      // Create a new document reference with a generated ID in the global "posts" collection
      const newPostRef = doc(collection(firestore, "posts"));

      // Use the same document ID for the user's post subcollection
      const userPostRef = doc(
        firestore,
        `users/${userId}/posts`,
        newPostRef.id
      );

      // Construct the post data
      const postData = {
        content: postContent,
        userId: userId,
        createdAt: new Date(),
      };

      // Set the post in the global "posts" collection and the user's subcollection with the same ID
      await setDoc(newPostRef, postData);
      await setDoc(userPostRef, postData);

      setPostContent(""); // Clear the textarea after submission
      alert("Post submitted successfully!");
    } catch (error) {
      console.error("Error submitting post: ", error);
      alert("Failed to submit post.");
    }
  };

  return (
    <div>
      <b>The Studio</b>
      <br />
      <textarea
        value={postContent}
        onChange={(e) => setPostContent(e.target.value)}
        placeholder="What's on your mind?"
      ></textarea>
      <br />
      <button onClick={handlePostSubmit}>Submit Post</button>
    </div>
  );
};
