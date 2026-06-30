import React, { useState } from "react";
import "./CodingArena.css";

const CodingArena = () => {
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
  const [isRunning, setIsRunning] = useState(false);

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

    setIsRunning(true);
    setOutput("⏳ Executing...");

    setTimeout(() => {
      setOutput("✅ Code executed successfully!");
      setIsRunning(false);
    }, 800);
  };

  return (
    <div className="coding-arena">
      {/* Sidebar */}
      <div className="question-sidebar">
        <div className="sidebar-header">
          <i className="fas fa-code"></i>
          <h2>Problems</h2>
        </div>
        <div className="question-list">
          {questions.map((q, index) => (
            <button
              key={index}
              className={`question-btn ${selectedQuestion.title === q.title ? "active" : ""}`}
              onClick={() => handleQuestionChange(q)}
            >
              <i className="fas fa-circle"></i>
              <span>{q.title}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="main-content">
        {/* Header */}
        <div className="arena-header">
          <h1>
            <i className="fas fa-terminal"></i> Coding Arena
          </h1>
          <div className="badge">
            <i className="fas fa-check-circle"></i> 5 Problems
          </div>
        </div>

        {/* Question Box */}
        <div className="question-box">
          <h2>
            <i className="fas fa-question-circle"></i> {selectedQuestion.title}
          </h2>
          <p className="description">{selectedQuestion.description}</p>
          <div className="meta-grid">
            <div className="meta-item">
              <i className="fas fa-arrow-right"></i>
              <strong>Input:</strong>
              <span className="value">{selectedQuestion.input}</span>
            </div>
            <div className="meta-item">
              <i className="fas fa-arrow-left"></i>
              <strong>Output:</strong>
              <span className="value">{selectedQuestion.output}</span>
            </div>
          </div>
        </div>

        {/* Editor Box */}
        <div className="editor-box">
          <div className="editor-header">
            <i className="fas fa-edit"></i>
            <h2>Code Editor</h2>
            <div className="editor-actions">
              <button className="action-btn" onClick={() => setCode("")}>
                <i className="fas fa-eraser"></i> Clear
              </button>
            </div>
          </div>
          <textarea
            className="code-editor"
            rows="10"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="// Write your solution here..."
            spellCheck="false"
          />
          <div className="editor-footer">
            <button className="run-btn" onClick={runCode} disabled={isRunning}>
              <i className={`fas ${isRunning ? "fa-spinner fa-spin" : "fa-play"}`}></i>
              {isRunning ? " Running..." : " Run Code"}
            </button>
          </div>
        </div>

        {/* Output Box */}
        <div className="output-box">
          <div className="output-header">
            <i className="fas fa-terminal"></i>
            <h2>Output</h2>
            {output && (
              <button className="clear-output" onClick={() => setOutput("")}>
                <i className="fas fa-times"></i>
              </button>
            )}
          </div>
          <pre className={`output-text ${output.includes("⚠️") ? "warning" : output.includes("✅") ? "success" : ""}`}>
            {output || "// Your output will appear here"}
          </pre>
        </div>
      </div>
    </div>
  );
};

export default CodingArena;