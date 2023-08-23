// export default function CommentInput({ comment, setComment, onSubmit }) {
//   const handleCommentSubmit = () => {
//     if (comment.trim() === "") return;
//     onSubmit();
//     setComment("");
//   };

//   return (
//     <div>
//       <input
//         type="text"
//         value={comment}
//         onChange={(e) => setComment(e.target.value)}
//         placeholder="Enter your comment for the bot to respond to:"
//       />
//       <button onClick={handleCommentSubmit}>Submit Comment</button>
//     </div>
//   );
// }
// components/CommentInput.js
import React from "react";

export default function CommentInput({ comment, setComment, onSubmit }) {
  const handleCommentSubmit = () => {
    if (comment.trim() === "") return;
    onSubmit();
    setComment("");
  };

  return (
    <div className="comment-input">
      <h2>Enter your comment for the bot to respond to:</h2>
      <input
        className="comment-input-field"
        type="text"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        placeholder="Enter comment"
      />
      <button className="comment-submit-button" onClick={handleCommentSubmit}>
        Submit Comment
      </button>
    </div>
  );
}
