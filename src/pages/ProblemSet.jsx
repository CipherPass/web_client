import React from 'react';
import { Link } from 'react-router-dom';

const ProblemSet = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white shadow-md rounded-md p-8 w-full md:w-2/3 lg:w-1/2">
        <h1 className="text-3xl font-bold mb-6">DSA Questions</h1>

        <table className="w-full divide-y divide-gray-200">
          <thead>
            <tr className="bg-gray-200">
              <th className="py-2 px-4">Status</th>
              <th className="py-2 px-4">Title</th>
              <th className="py-2 px-4">Difficulty</th>
            </tr>
          </thead>
          <tbody>
            <tr className="bg-gray-50">
              <td className="py-2 px-4">Solved</td>
              <td className="py-2 px-4">
                <Link to="/problems/question-1" className="text-blue-500 hover:underline">Question 1</Link>
              </td>
              <td className="py-2 px-4">
                <span className="bg-green-500 text-white px-2 py-1 rounded-full">Easy</span>
              </td>
            </tr>
            <tr className="bg-white">
              <td className="py-2 px-4">Unsolved</td>
              <td className="py-2 px-4">
                <Link to="/problems/question-2" className="text-blue-500 hover:underline">Question 2</Link>
              </td>
              <td className="py-2 px-4">
                <span className="bg-yellow-500 text-white px-2 py-1 rounded-full">Medium</span>
              </td>
            </tr>
            <tr className="bg-gray-50">
              <td className="py-2 px-4">Solved</td>
              <td className="py-2 px-4">
                <Link to="/problems/question-3" className="text-blue-500 hover:underline">Question 3</Link>
              </td>
              <td className="py-2 px-4">
                <span className="bg-red-500 text-white px-2 py-1 rounded-full">Hard</span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ProblemSet;
