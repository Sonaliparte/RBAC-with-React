# Attendance Management System

This is a role-based Attendance Management System built using **React** and **Tailwind CSS**, where users with the **Teacher** role can edit attendance, while users with the **Student** role can only view attendance.

---

## Features

- **Role-Based Access**:
  - **Teacher**: Can view and edit attendance.
  - **Student**: Can only view attendance.
  - **Parent**:Can only view Progress.
- **Attendance Persistence**:
  - Attendance data is stored in the browser's local storage.
  - Changes to attendance are updated in real-time and persisted across sessions.
- **Responsive Design**:
  - Tailwind CSS ensures mobile-first responsiveness.
- **Authentication Simulation**:
  - User role (`teacher` ,`student`,`Parent`) is stored locally after login or registration.

---

## Installation and Setup

1. Clone the repository:
   ```bash
   https://github.com/Ishaparte/RBAC-with-React.git
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   ```

4. Open the app in your browser:
   ```
   http://localhost:5173
   ```

---

## Project Structure

```
src/
├── components/
│   ├── Navbar.jsx          // Navigation bar
│   ├── ViewAttendance.jsx  // View attendance page
│   ├── EditAttendance.jsx  // Edit attendance page
│   ├── Login.jsx           // Login page
│   ├── Register.jsx        // Registration page
├── App.js                  // Root component
├── index.js                // Entry point
├── styles.css              // Tailwind CSS configuration
```

---

## How to Use

### Login and Registration

- Users can **login** or **register** by selecting their role:
  - **Teacher**: To access and edit attendance.
  - **Student**: To view attendance only.
- On successful login, the role is saved in `localStorage`.

### Role-Based Features

1. **View Attendance**:
   - Accessible to both **Teacher**, **Parent** and **Student** roles.
   - Displays a table of students' attendance statuses.

2. **Edit Attendance** (only for Teachers):
   - Teachers can modify attendance statuses (e.g., mark "Present" or "Absent").
   - Changes are saved locally and reflected in the **View Attendance** page.

---

## Technologies Used

- **React**: For building the user interface.
- **Tailwind CSS**: For styling and responsive design.
- **React Router**: For navigation between pages.
- **LocalStorage**: For persisting attendance and user roles.

---



## Future Enhancements

- Integrate a backend (e.g., Node.js, Firebase) for authentication and data storage.
- Add role-based routing protection using React Router guards.
- Implement real user authentication (JWT, OAuth).
- Add an option to export attendance data to a file (e.g., CSV or PDF).

---

## License

This project is licensed under the [MIT License](LICENSE).

---



## Author

**Isha Parte**  
[GitHub]((https://github.com/Ishaparte)) | [LinkedIn]((https://www.linkedin.com/in/isha-parte-6b4a86249/))

---

This README serves as a comprehensive guide to set up and use the project. Let me know if you'd like to add any additional sections!
