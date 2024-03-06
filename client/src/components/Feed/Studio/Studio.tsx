import React, { useState } from "react";

// Utility function to publish content to Firestore
import { publishContent } from "./Studio.utilities";

/**
 * Studio component for creating and submitting new posts.
 * @param {Object} userData - Object containing information about the current user.
 */
export const Studio = ({ userData }) => {
  // State for managing the input value of the post content
  const [postContent, setPostContent] = useState("");

  /**
   * Handles the submission of a new post.
   * Clears the content input and publishes the post using the publishContent utility function.
   */
  const handlePostSubmit = async () => {
    const userId = userData?.uid; // Extract user ID from userData
    let content = postContent; // Content to be submitted
    try {
      // Clear the input field before submission attempt
      setPostContent("");
      // Attempt to publish content to the database
      await publishContent(userId, content);
    } catch (error) {
      // Log and alert the error if submission fails
      console.error("Error submitting post: ", error);
      alert("Failed to submit post.");
    }
  };

  return (
    <div>
      <b>The Studio</b>
      <br />
      {/* Textarea for inputting new post content */}
      <textarea
        value={postContent}
        onChange={(e) => setPostContent(e.target.value)}
        placeholder="What's on your mind?"
      ></textarea>
      <br />
      {/* Button to trigger post submission */}
      <button onClick={handlePostSubmit}>Submit Post</button>
    </div>
  );
};
