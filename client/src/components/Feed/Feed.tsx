import React from "react";
import { Studio } from "./Studio/Studio";
import { firestore } from "../../database/firebaseResources";
import { usePosts, useSeen } from "./Feed.utilities"; // Custom hooks for fetching posts and handling seen functionality.

/**
 * The Feed component displays the social media feed, including user posts and a "seen" feature.
 * @param {Object} userData - Data about the currently logged-in user.
 * @returns {JSX.Element} The Feed component UI.
 */
export const Feed = ({ userData }) => {
  // Destructure the custom hooks to get posts, loading state, and functions.
  const { posts, fetchMorePosts, loading } = usePosts(firestore);
  const handleSeen = useSeen(firestore, userData);

  return (
    <div>
      {/* Studio component allows users to create new posts. */}
      <Studio userData={userData} />
      <br />
      <b>The Feed</b>
      {/* Maps over the posts array to render each post. */}
      {posts.map((post) => (
        <div key={post.id}>
          <small>posted by {userData?.uid}</small>{" "}
          {/* Displays the user ID who posted. */}
          <div>{post.content}</div> {/* The content of the post. */}
          <br />
          {/* Button to mark a post as seen. */}
          <button onClick={() => handleSeen(post.id)}>✔️</button>
          <span>{post.seenBy ? post.seenBy.length : 0}</span>{" "}
          {/* Number of times the post has been seen. */}
          <br />
          <br />
        </div>
      ))}
      {/* Conditionally renders a loading message or a "Load More" button for pagination. */}
      {loading ? (
        <div>Loading...</div>
      ) : (
        posts.length > 50 && <button onClick={fetchMorePosts}>Load More</button>
      )}
    </div>
  );
};
