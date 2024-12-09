import React, { useState, useEffect } from "react";

const ViewProgress = () => {
  const [progressData, setProgressData] = useState([]);
  const [role, setRole] = useState("");

  useEffect(() => {
    const storedRole = localStorage.getItem("role");
    setRole(storedRole);

    const storedProgress = localStorage.getItem("progressData");
    if (storedProgress) {
      setProgressData(JSON.parse(storedProgress));
    }
  }, []);

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold text-center mb-6">View Student Progress</h1>

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
    </div>
  );
};

export default ViewProgress;
