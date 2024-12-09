import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div>
     
      <section className="bg-gradient-to-r from-blue-500 to-purple-600 text-white h-screen flex flex-col justify-center items-center text-center">
        <h1 className="text-5xl font-extrabold mb-6">
          Welcome to MyCollege!
        </h1>
        <p className="text-lg mb-6">
          Your academic journey starts here. Join us today!
        </p>
        <div className="space-x-4">
          <Link
            to="/login"
            className="bg-white text-blue-600 py-2 px-6 rounded-md text-lg font-semibold hover:bg-gray-100 transition duration-300"
          >
            Login
          </Link>
          <Link
            to="/register"
            className="bg-transparent border-2 border-white text-white py-2 px-6 rounded-md text-lg font-semibold hover:bg-white hover:text-blue-600 transition duration-300"
          >
            Register
          </Link>
        </div>
      </section>

      
      <section className="bg-gray-100 py-16">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-bold text-blue-500 mb-8">
            Features
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition duration-300">
              <h3 className="text-2xl font-semibold text-blue-600 mb-4">Manage Your Academics</h3>
              <p className="text-gray-600">Keep track of your courses, attendance, and quizzes.</p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition duration-300">
              <h3 className="text-2xl font-semibold text-blue-600 mb-4">Interactive Dashboard</h3>
              <p className="text-gray-600">Access personalized content based on your role - Teacher, Student, or Parent.</p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition duration-300">
              <h3 className="text-2xl font-semibold text-blue-600 mb-4">Track Progress</h3>
              <p className="text-gray-600">Monitor your academic progress and stay on top of your goals.</p>
            </div>
          </div>
        </div>
      </section>

      
      <section className="bg-white py-16">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-bold text-blue-500 mb-8">About MyCollege</h2>
          <p className="text-lg text-gray-600 mb-6">
            MyCollege is an all-in-one academic management platform designed to streamline the academic journey for students, teachers, and parents. Whether you're looking to track attendance, view grades, or upload assignments, we've got you covered.
          </p>
        </div>
      </section>

      <section className="bg-blue-500 text-white py-16">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to get started?</h2>
          <p className="text-lg mb-8">Join MyCollege now and take control of your academic journey!</p>
          <div className="space-x-4">
            <Link
              to="/login"
              className="bg-white text-blue-600 py-2 px-6 rounded-md text-lg font-semibold hover:bg-gray-100 transition duration-300"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="bg-transparent border-2 border-white text-white py-2 px-6 rounded-md text-lg font-semibold hover:bg-white hover:text-blue-600 transition duration-300"
            >
              Register
            </Link>
          </div>
        </div>
      </section>

     
      <footer className="bg-gray-900 text-white py-4 text-center">
        <p>© 2024 MyCollege - All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Home;
