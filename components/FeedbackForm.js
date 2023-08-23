// // components/FeedbackForm.js
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
//         Provide feedback to help improve the bot's response and rate the
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
        Provide feedback to help improve the bot's response and rate the
        response:
      </h2>
      <input
        type="text"
        value={feedback}
        onChange={(e) => setFeedback(e.target.value)}
        placeholder="Enter feedback"
      />
      <select value={score} onChange={(e) => setScore(Number(e.target.value))}>
        {[1, 2, 3, 4, 5].map((value) => (
          <option key={value} value={value}>
            {value}
          </option>
        ))}
      </select>
      <button onClick={handleFeedbackSubmit}>Submit Feedback</button>
    </div>
  );
}
