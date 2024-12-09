import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Dashboard = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const { role } = location.state || {};

  if (!role) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <h1 className="text-2xl font-bold">Role is not set. Please log in or register!</h1>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <header className="bg-blue-500 text-white py-4 px-6 rounded">
        <h1 className="text-xl font-bold">
          {role === "teacher" && "Teacher Dashboard"}
          {role === "student" && "Student Dashboard"}
          {role === "parent" && "Parent Dashboard"}
        </h1>
      </header>

      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
      
        {role === "teacher" && (
          <>
            <div className="bg-white shadow-md p-6 rounded">
              <h2 className="text-lg font-semibold">Edit Attendance</h2>
              <button
                onClick={() => navigate("/editattendance")}
                className="mt-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
              >
                Edit Attendance
              </button>
            </div>
            <div className="bg-white shadow-md p-6 rounded">
              <h2 className="text-lg font-semibold">Manage Progress</h2>
              <button
                onClick={() => navigate("/uploadprogress")}
                className="mt-4 bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600"
              >
                Upload Progress
              </button>
            </div>
          </>
        )}

        {role === "student" && (
          <div className="bg-white shadow-md p-6 rounded">
            <h2 className="text-lg font-semibold">View Attendance</h2>
            <button
              onClick={() => navigate("/viewattendence")}
              className="mt-4 bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600"
            >
              View Attendance
            </button>
          </div>
        )}

        {role === "parent" && (
          <div className="bg-white shadow-md p-6 rounded">
            <h2 className="text-lg font-semibold">View Progress</h2>
            <button
              onClick={() => navigate("/viewprogress")}
              className="mt-4 bg-purple-500 text-white py-2 px-4 rounded hover:bg-purple-600"
            >
              View Progress
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
