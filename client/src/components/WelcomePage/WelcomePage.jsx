/**
 * WelcomePage component displays the welcome message and credits for the application.
 * It showcases the application name and a brief description of its purpose.
 */
export const WelcomePage = () => {
  return (
    <>
      {/* Application name displayed in bold */}
      <b>peer-to-peering</b>
      <br />
      {/* Short description of the application */}
      build a social media app
      <div
        style={{
          fontSize: "75%", // Smaller font size for the credits
          visibility: "visible", // Ensures visibility of the credits
        }}
      >
        ✨ created by{" "}
        {/* Link to the creator's website with target="_blank" to open in a new tab */}
        <a target="_blank" href="https://robotsbuildingeducation.com">
          rox the AI cofounder
        </a>
      </div>
    </>
  );
};
