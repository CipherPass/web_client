// ProblemSubmission.js
import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileAlt, faEdit, faCode, faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import Progress from '../components/Progress';

const ProblemSubmission = ({ handleRun, handleSubmit, runResult }) => {
  const [isLoading, setIsLoading] = useState(false);
  const hasServerResponse = runResult !== null;

  const handleRunClick = () => {
    setIsLoading(true);
    handleRun();
  };

  const handleSubmitClick = () => {
    setIsLoading(true);
    handleSubmit();
  };

  useEffect(() => {
    if(isLoading && runResult){
      setIsLoading(false);
    }
  }, [isLoading, runResult]);

  return (
    <div className="bg-white p-4 border border-gray-300 rounded-md shadow-md">
      {/* Always show Run and Submit buttons at the top */}
      <div className="flex space-x-4 mb-4">
        <button
          onClick={handleRunClick}
          className={`bg-blue-500 text-white px-4 py-2 rounded-md focus:outline-none ${
            isLoading && 'opacity-50 cursor-not-allowed'
          }`}
          disabled={isLoading}
        >
          Run
        </button>
        <button
          onClick={handleSubmitClick}
          className={`bg-green-500 text-white px-4 py-2 rounded-md focus:outline-none ${
            isLoading && 'opacity-50 cursor-not-allowed'
          }`}
          disabled={isLoading}
        >
          Submit
        </button>
      </div>

      {/* Loader */}
      {isLoading && <Progress />}

      {/* Conditional rendering based on server response */}
      {hasServerResponse && (
        <div>
          {/* Display result if available */}
          <h2 className="text-xl font-semibold mb-4">Submission Result</h2>
          {runResult.status === 'Success' ? (
            <div className="text-green-600">
              <p>Run Successful!</p>
              <p>Time Taken: {runResult.timeTaken}</p>
              <p>Memory Taken: {runResult.memoryTaken}</p>
            </div>
          ) : (
            <div className="text-red-600">
              <p>Submission Failed!</p>
              <p>Title: {runResult.title}</p>

              {/* Display test cases for failed submissions */}
              {runResult.testcases && (
                <div className="mt-4">
                  <h3 className="text-lg font-semibold mb-2">Failed Test Cases:</h3>
                  {runResult.testcases.map((testcase, index) => (
                    <div key={index} className="border border-gray-300 p-3 mb-3 rounded-md">
                      <p className="text-red-600 font-semibold mb-2">Test Case {index + 1}:</p>
                      <div className="mb-2">
                        <p className="font-semibold">Input:</p>
                        <pre className="overflow-x-auto p-2 bg-gray-100 rounded-md">
                          {testcase.input}
                        </pre>
                      </div>
                      <div className="mb-2">
                        <p className="font-semibold">Output:</p>
                        <pre className="overflow-x-auto p-2 bg-gray-100 rounded-md">
                          {testcase.output}
                        </pre>
                      </div>
                      <div className="mb-2">
                        <p className="font-semibold">Expected Output:</p>
                        <pre className="overflow-x-auto p-2 bg-gray-100 rounded-md">
                          {testcase.expectedoutput}
                        </pre>
                      </div>
                      <p className="text-red-600 font-semibold">Status: {testcase.status}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ProblemSubmission;

