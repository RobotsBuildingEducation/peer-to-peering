// Import the necessary module to work with the DOM in React applications.
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

// Find the HTML element with the id 'root' (see index.html in the /client folder) and attach the React application to it.
// This is where the React app will be rendered in the DOM.
ReactDOM.createRoot(document.getElementById("root")).render(<App />);
