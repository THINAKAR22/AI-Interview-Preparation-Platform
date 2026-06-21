import { useState } from "react";
import "./CodingArena.css";

function CodingArena() {
  const questions = [
    {
      title: "Reverse a String",
      description: "Write a program to reverse a given string.",
      input: "hello",
      output: "olleh",
    },
    {
      title: "Palindrome Check",
      description: "Check whether a string is a palindrome.",
      input: "madam",
      output: "Palindrome",
    },
    {
      title: "Factorial Number",
      description: "Find the factorial of a given number.",
      input: "5",
      output: "120",
    },
    {
      title: "Fibonacci Series",
      description: "Print Fibonacci series up to N terms.",
      input: "5",
      output: "0 1 1 2 3",
    },
    {
      title: "Largest Number",
      description: "Find the largest element in an array.",
      input: "2 8 4 10 6",
      output: "10",
    },
  ];

  const [selectedQuestion, setSelectedQuestion] = useState(questions[0]);
  const [code, setCode] = useState("");
  const [output, setOutput] = useState("");

  const handleQuestionChange = (question) => {
    setSelectedQuestion(question);
    setCode("");
    setOutput("");
  };

  const runCode = () => {
    if (!code.trim()) {
      setOutput("⚠️ Please write some code first.");
      return;
    }

    setOutput("✅ Code executed successfully!");
  };

  return (
    <div className="coding-arena">
      {/* Question Sidebar */}
      <div className="question-sidebar">
        <h2>Questions</h2>

        {questions.map((q, index) => (
          <button
            key={index}
            className="question-btn"
            onClick={() => handleQuestionChange(q)}
          >
            {q.title}
          </button>
        ))}
      </div>

      {/* Main Content */}
      <div className="main-content">
        <h1>💻 Coding Arena</h1>

        <div className="question-box">
          <h2>{selectedQuestion.title}</h2>

          <p>{selectedQuestion.description}</p>

          <p>
            <strong>Input:</strong> {selectedQuestion.input}
          </p>

          <p>
            <strong>Output:</strong> {selectedQuestion.output}
          </p>
        </div>

        <div className="editor-box">
          <h2>Code Editor</h2>

          <textarea
            className="code-editor"
            rows="15"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="Write your code here..."
          />

          <br />
          <br />

          <button className="run-btn" onClick={runCode}>
            ▶ Run Code
          </button>
        </div>

        <div className="output-box">
          <h2>Output</h2>
          <pre className="output-text">{output}</pre>
        </div>
      </div>
    </div>
  );
}

export default CodingArena;