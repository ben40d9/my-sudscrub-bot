// // components/ResponseDisplay.js
// export default function ResponseDisplay({ response, continuation }) {
//   return (
//     <div className="response-display">
//       <h2>Response:</h2>
//       <p>{response}</p>
//       {continuation && <p>{continuation}</p>}
//     </div>
//   );
// }
// components/ResponseDisplay.js

export default function ResponseDisplay({ response, continuation }) {
  return (
    <div className="response-display">
      <h2>Response:</h2>
      <p>{response}</p>
      {continuation && <p>{continuation}</p>}
    </div>
  );
}
