import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const EditAttendance = () => {
  const [attendance, setAttendance] = useState([]);
  const [role, setRole] = useState("");
  const [newStudentName, setNewStudentName] = useState(""); 
  const navigate = useNavigate();


  useEffect(() => {
    const storedRole = localStorage.getItem("role");
    setRole(storedRole);

    if (storedRole !== "teacher") {
      navigate("/");
    }

    const storedAttendance = localStorage.getItem("attendanceData");
    if (storedAttendance) {
      setAttendance(JSON.parse(storedAttendance));
    }
  }, [navigate]);

  const handleStatusChange = (id, newStatus) => {
    const updatedAttendance = attendance.map((student) =>
      student.id === id ? { ...student, status: newStatus } : student
    );
    setAttendance(updatedAttendance);
  };

  const handleAddStudent = () => {
    if (newStudentName.trim() === "") return;

    const newStudent = {
      id: Date.now(), 
      name: newStudentName.trim(),
      status: "Present", 
    };

    setAttendance([...attendance, newStudent]);
    setNewStudentName("");
  };

  const handleDeleteStudent = (id) => {
    const updatedAttendance = attendance.filter((student) => student.id !== id);
    setAttendance(updatedAttendance);
  };

  const handleSave = () => {
    localStorage.setItem("attendanceData", JSON.stringify(attendance));
    navigate("/viewattendence");
  };

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold text-center mb-6">Edit Attendance</h1>

    
      <div className="mb-6">
        <h2 className="text-2xl font-semibold mb-4">Add Student</h2>
        <div className="flex items-center gap-4">
          <input
            type="text"
            value={newStudentName}
            onChange={(e) => setNewStudentName(e.target.value)}
            placeholder="Enter student name"
            className="border border-gray-300 rounded-md p-2 w-full"
          />
          <button
            onClick={handleAddStudent}
            className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
          >
            Add
          </button>
        </div>
      </div>

  
      <div className="overflow-x-auto bg-white shadow-lg rounded-lg">
        <table className="min-w-full table-auto text-center">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-6 py-3 text-left">Name</th>
              <th className="px-6 py-3">Status</th>
              <th className="px-6 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {attendance.map((student) => (
              <tr key={student.id}>
                <td className="border-t px-6 py-4">{student.name}</td>
                <td className="border-t px-6 py-4">
                  <select
                    value={student.status}
                    onChange={(e) =>
                      handleStatusChange(student.id, e.target.value)
                    }
                    className="border border-gray-300 rounded-md p-2"
                  >
                    <option value="Present">Present</option>
                    <option value="Absent">Absent</option>
                  </select>
                </td>
                <td className="border-t px-6 py-4">
                  <button
                    onClick={() => handleDeleteStudent(student.id)}
                    className="bg-red-500 text-white py-1 px-4 rounded-md hover:bg-red-600"
                  >
                    Delete
                  </button>
                </td>
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
          Save Changes
        </button>
      </div>
    </div>
  );
};

export default EditAttendance;
