import React, { useState } from 'react';
import './App.css';
import axios from 'axios';

function App() {
  const [input, setInput] = useState('');
  const [response, setResponse] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/career_advice', { question: input });
      setResponse(res.data.advice);
    } catch (error) {
      console.error("There was an error making the request:", error);
      setResponse("Error: " + (error.response ? error.response.data.error : "Network error"));
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Career Guidance with OpenAI</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask your career question"
          />
          <button type="submit">Ask AI</button>
        </form>
        {response && <p>{response}</p>}
      </header>
    </div>
  );
}

export default App;


// import React, { useState } from 'react';
// import './App.css';
// import axios from 'axios';

// function App() {
//   const [input, setInput] = useState('');
//   const [response, setResponse] = useState('');
//   const [file, setFile] = useState(null);
//   const [uploadedText, setUploadedText] = useState('');

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const res = await axios.post('http://10.1.16.2:5000/api/career_advice', { question: input });
//       setResponse(res.data.advice);
//     } catch (error) {
//       console.error("There was an error making the request:", error);
//     }
//   };

//   const handleFileChange = (e) => {
//     setFile(e.target.files[0]);
//   };

//   const handleUploadResume = async (e) => {
//     e.preventDefault();
//     if (!file) return;

//     const formData = new FormData();
//     formData.append('file', file);

//     try {
//       const res = await axios.post('http://10.1.16.2:5000/api/upload_resume', formData, {
//         headers: {
//           'Content-Type': 'multipart/form-data'
//         }
//       });
//       setUploadedText(res.data.text); // Set the extracted text from the resume
//       alert(res.data.message);
//     } catch (error) {
//       console.error("There was an error uploading the file:", error);
//     }
//   };

//   const handleResumeQuestion = async (e) => {
//     e.preventDefault();
//     if (!uploadedText) {
//       alert("Please upload a resume first.");
//       return;
//     }
//     try {
//       const res = await axios.post('http://10.1.16.2:5000/api/career_advice', { question: input });
//       setResponse(res.data.advice);
//     } catch (error) {
//       console.error("There was an error making the request:", error);
//     }
//   };

//   return (
//     <div className="App">
//       <header className="App-header">
//         <h1>Career Guidance Assistant</h1>

//         <form onSubmit={handleUploadResume}>
//           <input type="file" onChange={handleFileChange} />
//           <button type="submit">Upload Resume</button>
//         </form>

//         <form onSubmit={handleResumeQuestion}>
//           <input
//             type="text"
//             value={input}
//             onChange={(e) => setInput(e.target.value)}
//             placeholder="Ask about your resume"
//           />
//           <button type="submit">Ask AI</button>
//         </form>

//         {response && <p>{response}</p>}
//       </header>
//     </div>
//   );
// }

// export default App;
