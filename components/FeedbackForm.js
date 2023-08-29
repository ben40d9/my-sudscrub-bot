// import { useState } from "react";

// export default function FeedbackForm({ onSubmit }) {
//   const [feedback, setFeedback] = useState("");
//   const [score, setScore] = useState(5);

//   const handleFeedbackSubmit = () => {
//     onSubmit({ feedback, score });
//     setFeedback("");
//     setScore(5);
//   };

//   return (
//     <div className="feedback-form">
//       <h2>
//         Provide feedback to help improve the response and then rate the
//         response:
//       </h2>
//       <input
//         type="text"
//         value={feedback}
//         onChange={(e) => setFeedback(e.target.value)}
//         placeholder="Enter feedback"
//       />
//       <select value={score} onChange={(e) => setScore(Number(e.target.value))}>
//         {[1, 2, 3, 4, 5].map((value) => (
//           <option key={value} value={value}>
//             {value}
//           </option>
//         ))}
//       </select>
//       <button onClick={handleFeedbackSubmit}>Submit Feedback</button>
//     </div>
//   );
// }

// components/FeedbackForm.js
import { useState } from "react";

export default function FeedbackForm({ onSubmit }) {
  const [feedback, setFeedback] = useState("");
  const [score, setScore] = useState(5);

  const handleFeedbackSubmit = () => {
    onSubmit({ feedback, score });
    setFeedback("");
    setScore(5);
  };

  return (
    <div className="feedback-form">
      <h2>
        Provide feedback to help improve the response and then rate the
        response:
      </h2>
      <input
        type="text"
        value={feedback}
        onChange={(e) => setFeedback(e.target.value)}
        placeholder="Enter feedback"
      />
      <div className="rating-wrapper">
        <label htmlFor="score">Rate the response: </label>
        <select
          id="score"
          value={score}
          onChange={(e) => setScore(Number(e.target.value))}
        >
          <option value="1">1 - Terrible response</option>
          <option value="2">2 - Decent response</option>
          <option value="3">3 - Neutral response</option>
          <option value="4">4 - Good response</option>
          <option value="5">5 - Perfect response</option>
        </select>
      </div>
      <button onClick={handleFeedbackSubmit}>Submit Feedback</button>

      <style jsx>{`
        .feedback-form {
          background-color: #f2f2f2;
          padding: 20px;
          border-radius: 8px;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }
        .rating-wrapper {
          display: flex;
          align-items: center;
          margin-top: 10px;
        }
        label {
          margin-right: 10px;
          font-weight: bold;
        }
        select {
          padding: 5px;
          border: 1px solid #ccc;
          border-radius: 4px;
        }
        button {
          margin-top: 20px;
          padding: 10px 20px;
          background-color: #007bff;
          color: white;
          border: none;
          border-radius: 4px;
          cursor: pointer;
        }
        button:hover {
          background-color: #0056b3;
        }
      `}</style>
    </div>
  );
}
