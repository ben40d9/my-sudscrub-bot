// // pages/index.js
// import { useState } from "react";
// import CommentInput from "../components/CommentInput.js"; // Import the CommentInput component
// import ResponseDisplay from "../components/ResponseDisplay.js";
// import TopComments from "../components/TopComments.js";
// import FeedbackForm from "../components/FeedbackForm.js";

// export default function Home() {
//   // State to manage user comment, bot's response, continuation, top comments, and loading
//   const [comment, setComment] = useState("");
//   const [response, setResponse] = useState("");
//   const [isLoading, setIsLoading] = useState(false);
//   const [feedback, setFeedback] = useState("");

//   const handleCommentSubmit = async () => {
//     if (comment.trim() === "") return;

//     setIsLoading(true); // Set loading to true

//     const result = await fetch("/api/getResponse", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ comment, feedback }),
//     });
//     const data = await result.json();
//     console.log("Data from server:", data);
//     setResponse(data.response);

//     setIsLoading(false);
//   };

//   const handleFeedbackSubmit = async (feedbackData) => {
//     setFeedback(feedbackData.feedback); // Store feedback

//     const result = await fetch("/api/getResponse", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ comment, feedback: feedbackData.feedback }),
//     });
//     const data = await result.json();
//     setResponse(data.response); // Update the response state
//   };

//   const handleClear = () => {
//     setComment("");
//     setResponse("");
//     setFeedback("");
//   };

//   return (
//     <div className="container">
//       <h1>Sud Scrub Bot</h1>
//       <CommentInput
//         comment={comment}
//         setComment={setComment}
//         onSubmit={handleCommentSubmit}
//       />
//       {comment && <button onClick={handleClear}>Clear</button>}
//       {/* {comment && (
//         <button onClick={handleCommentSubmit}>Regenerate Response</button>
//       )} */}
//       {isLoading && <div className="loading-spinner"></div>}{" "}
//       {/* Loading spinner */}
//       {response && <ResponseDisplay response={response} />}
//       {response && <FeedbackForm onSubmit={handleFeedbackSubmit} />}
//     </div>
//   );
// }

//------
//---
//------
//---
//------

// import { useState } from "react";
// import CommentInput from "../components/CommentInput.js";
// import ResponseDisplay from "../components/ResponseDisplay.js";
// import FeedbackForm from "../components/FeedbackForm.js";

// export default function Home() {
//   const [comment, setComment] = useState("");
//   const [response, setResponse] = useState("");
//   const [isLoading, setIsLoading] = useState(false);
//   const [feedback, setFeedback] = useState("");

//   // handles comment submission
//   const handleCommentSubmit = async () => {
//     if (comment.trim() === "") return;

//     setIsLoading(true);

//     const result = await fetch("/api/getResponse", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ comment, feedback }),
//     });

//     const data = await result.json();
//     setResponse(data.response);

//     setIsLoading(false);
//   };

//   // handles feedback submission
//   const handleFeedbackSubmit = async (feedbackData) => {
//     setFeedback(feedbackData.feedback); // Update the feedback state

//     setIsLoading(true);

//     // Make API call to regenerate the response
//     const result = await fetch("/api/submitFeedback", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ comment, feedback: feedbackData.feedback }),
//     });

//     const data = await result.json();
//     setResponse(data.response);

//     setIsLoading(false);
//   };

//   const handleClear = () => {
//     setComment("");
//     setResponse("");
//     setFeedback("");
//   };

//   return (
//     <div className="container">
//       <h1>Sud Scrub Bot</h1>
//       <CommentInput
//         comment={comment}
//         setComment={setComment}
//         onSubmit={handleCommentSubmit}
//       />
//       {comment && <button onClick={handleClear}>Clear</button>}
//       {comment && response && (
//         <button onClick={handleCommentSubmit}>Regenerate Response</button>
//       )}
//       {isLoading && <div className="loading-spinner"></div>}
//       {response && <ResponseDisplay response={response} />}
//       {response && <FeedbackForm onSubmit={handleFeedbackSubmit} />}
//       {isLoading && <div className="loading-spinner"></div>}
//     </div>
//   );
// }

// pages/index.js
import { useState } from "react";
import CommentInput from "../components/CommentInput.js";
import ResponseDisplay from "../components/ResponseDisplay.js";
import FeedbackForm from "../components/FeedbackForm.js";

export default function Home() {
  const [comment, setComment] = useState("");
  const [response, setResponse] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [feedback, setFeedback] = useState("");
  const [score, setScore] = useState(5);

  // handles comment submission
  const handleCommentSubmit = async () => {
    if (comment.trim() === "") return;

    setIsLoading(true);

    // Fetch initial response
    const result = await fetch("/api/getResponse", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ comment }),
    });

    const data = await result.json();
    setResponse(data.response);

    setIsLoading(false);
  };

  // handles feedback submission
  const handleFeedbackSubmit = async (feedbackData) => {
    setFeedback(feedbackData.feedback);
    setScore(feedbackData.score);

    setIsLoading(true);

    // Fetch refined response based on feedback
    const result = await fetch("/api/getRefinedResponse", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        comment,
        originalResponse: response,
        feedback: feedbackData.feedback,
        score: feedbackData.score,
      }),
    });

    const data = await result.json();
    setResponse(data.response);

    setIsLoading(false);
  };

  const handleClear = () => {
    setComment("");
    setResponse("");
    setFeedback("");
    setScore(5);
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
      {comment && response && (
        <button onClick={handleCommentSubmit}>Regenerate Response</button>
      )}
      {isLoading && <div className="loading-spinner"></div>}
      {response && <ResponseDisplay response={response} />}
      {response && <FeedbackForm onSubmit={handleFeedbackSubmit} />}
    </div>
  );
}
