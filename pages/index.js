// // pages/index.js
// import { useState } from "react";
// import ResponseDisplay from "../components/ResponseDisplay";
// import TopComments from "../components/TopComments";
// import FeedbackForm from "../components/FeedbackForm";

// export default function Home() {
//   // State to manage user comment, bot's response, continuation, and top comments
//   const [comment, setComment] = useState("");
//   const [response, setResponse] = useState("");
//   const [continuation, setContinuation] = useState("");
//   const [topComments, setTopComments] = useState([]);

//   const handleCommentSubmit = async () => {
//     const result = await fetch("/api/getResponse", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ comment }),
//     });
//     const data = await result.json();
//     console.log("Data from server:", data);
//     setResponse(data.response);
//     setContinuation(data.continuation);
//     setTopComments(data.topComments);
//   };

//   const handleFeedbackSubmit = (feedbackData) => {
//     fetch("/api/submitFeedback", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(feedbackData),
//     });
//   };

//   return (
//     <div>
//       <h1>Sud Scrub Bot</h1>
//       <div>
//         <h2>Enter your comment for the bot to respond to:</h2>
//         <input
//           type="text"
//           value={comment}
//           onChange={(e) => setComment(e.target.value)}
//           placeholder="Enter comment"
//         />
//         <button onClick={handleCommentSubmit}>Submit Comment</button>
//         <button onClick={() => setComment("")}>Clear Comment</button>
//       </div>
//       {response && (
//         <ResponseDisplay response={response} continuation={continuation} />
//       )}
//       {topComments && topComments.length > 0 && (
//         <TopComments comments={topComments} />
//       )}
//       <FeedbackForm onSubmit={handleFeedbackSubmit} />
//     </div>
//   );
// }

// pages/index.js
import { useState } from "react";
import CommentInput from "../components/CommentInput.js"; // Import the CommentInput component
import ResponseDisplay from "../components/ResponseDisplay.js";
import TopComments from "../components/TopComments.js";
import FeedbackForm from "../components/FeedbackForm.js";

export default function Home() {
  // State to manage user comment, bot's response, continuation, top comments, and loading
  const [comment, setComment] = useState("");
  const [response, setResponse] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [feedback, setFeedback] = useState("");

  const handleCommentSubmit = async () => {
    if (comment.trim() === "") return;

    setIsLoading(true); // Set loading to true

    const result = await fetch("/api/getResponse", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ comment, feedback }),
    });
    const data = await result.json();
    console.log("Data from server:", data);
    setResponse(data.response);

    setIsLoading(false);
  };

  const handleFeedbackSubmit = async (feedbackData) => {
    setFeedback(feedbackData.feedback); // Store feedback

    const result = await fetch("/api/getResponse", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ comment, feedback: feedbackData.feedback }),
    });
    const data = await result.json();
    setResponse(data.response); // Update the response state
  };

  const handleClear = () => {
    setComment("");
    setResponse("");
    setFeedback("");
  };

  return (
    <div className="container">
      <h1>Sud Scrub Bot</h1>
      <CommentInput
        comment={comment}
        setComment={setComment}
        onSubmit={handleCommentSubmit}
      />
      {comment && <button onClick={handleClear}>Clear</button>}
      {/* {comment && (
        <button onClick={handleCommentSubmit}>Regenerate Response</button>
      )} */}
      {isLoading && <div className="loading-spinner"></div>}{" "}
      {/* Loading spinner */}
      {response && <ResponseDisplay response={response} />}
      {response && <FeedbackForm onSubmit={handleFeedbackSubmit} />}
    </div>
  );
}
