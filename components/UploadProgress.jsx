import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const UploadProgress = () => {
  const [progressData, setProgressData] = useState([]);
  const [studentName, setStudentName] = useState("");
  const [progress, setProgress] = useState("");
  const [role, setRole] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const storedRole = localStorage.getItem("role");
    setRole(storedRole);

    if (storedRole !== "teacher") {
      navigate("/"); 
    }

    const storedProgress = localStorage.getItem("progressData");
    if (storedProgress) {
      setProgressData(JSON.parse(storedProgress));
    }
  }, [navigate]);

  const handleAddProgress = () => {
    if (studentName.trim() === "" || progress.trim() === "") return;

    const newProgress = {
      id: Date.now(), 
      name: studentName.trim(),
      progress: progress.trim(),
    };

    setProgressData([...progressData, newProgress]);
    setStudentName("");
    setProgress("");
  };

  const handleSave = () => {
    localStorage.setItem("progressData", JSON.stringify(progressData));
    alert("Progress uploaded successfully!");
  };

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold text-center mb-6">Upload Student Progress</h1>

    
      <div className="mb-6">
        <h2 className="text-2xl font-semibold mb-4">Add Progress</h2>
        <div className="flex flex-col gap-4">
          <input
            type="text"
            value={studentName}
            onChange={(e) => setStudentName(e.target.value)}
            placeholder="Enter student name"
            className="border border-gray-300 rounded-md p-2"
          />
          <textarea
            value={progress}
            onChange={(e) => setProgress(e.target.value)}
            placeholder="Enter progress details"
            className="border border-gray-300 rounded-md p-2"
            rows="4"
          ></textarea>
          <button
            onClick={handleAddProgress}
            className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
          >
            Add Progress
          </button>
        </div>
      </div>

  
      <div className="overflow-x-auto bg-white shadow-lg rounded-lg">
        <table className="min-w-full table-auto text-center">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-6 py-3 text-left">Name</th>
              <th className="px-6 py-3">Progress</th>
            </tr>
          </thead>
          <tbody>
            {progressData.map((entry) => (
              <tr key={entry.id}>
                <td className="border-t px-6 py-4">{entry.name}</td>
                <td className="border-t px-6 py-4">{entry.progress}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      
      <div className="text-center mt-6">
        <button
          onClick={handleSave}
          className="bg-green-500 text-white py-2 px-6 rounded-md hover:bg-green-600"
        >
          Save Progress
        </button>
      </div>
    </div>
  );
};

export default UploadProgress;
