import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const ViewAttendance = () => {
  const [attendance, setAttendance] = useState([]);
  const [role, setRole] = useState(""); 

 
  useEffect(() => {
    const storedAttendance = localStorage.getItem("attendanceData");
    if (storedAttendance) {
      setAttendance(JSON.parse(storedAttendance));
    }

    const storedRole = localStorage.getItem("role");
    setRole(storedRole); 
  }, []);

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold text-center mb-6">View Attendance</h1>

      <div className="overflow-x-auto bg-white shadow-lg rounded-lg">
        <table className="min-w-full table-auto text-center">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-6 py-3 text-left">Name</th>
              <th className="px-6 py-3">Status</th>
            </tr>
          </thead>
          <tbody>
            {attendance.map((student) => (
              <tr key={student.id}>
                <td className="border-t px-6 py-4">{student.name}</td>
                <td className="border-t px-6 py-4">{student.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {role === "teacher" && (
        <div className="text-center mt-6">
          <Link
            to="/editattendance"
            className="bg-blue-500 text-white py-2 px-6 rounded-md hover:bg-blue-600"
          >
            Edit Attendance
          </Link>
        </div>
      )}
    </div>
  );
};

export default ViewAttendance;
