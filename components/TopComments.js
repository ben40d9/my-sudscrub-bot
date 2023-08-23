// // components/TopComments.js
// export default function TopComments({ comments }) {
//   return (
//     <div className="top-comments">
//       <h2>Top 5 comments used to generate response:</h2>
//       <table>
//         <thead>
//           <tr>
//             <th>Comment</th>
//             <th>Score</th>
//           </tr>
//         </thead>
//         <tbody>
//           {comments.map((comment, index) => (
//             <tr key={index}>
//               <td>{comment.comment}</td>
//               <td>{comment.score}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// }
// components/TopComments.js
export default function TopComments({ comments }) {
  return (
    <div className="top-comments">
      <h2>Top 5 comments used to generate response:</h2>
      <table>
        <thead>
          <tr>
            <th>Comment</th>
            <th>Score</th>
          </tr>
        </thead>
        <tbody>
          {comments.map((comment, index) => (
            <tr key={index}>
              <td>{comment.comment}</td>
              <td>{comment.score}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
