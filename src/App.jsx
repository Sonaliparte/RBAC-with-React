import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import './App.css'
import './index.css'
import Navbar from '../components/Navbar'
import Home from '../components/Home'
import Login from '../components/Login'
import Register from '../components/Register'
import Dashboard from '../components/Dashboard'
import EditAttendance from '../components/EditAttendance'
import ViewAttendence from '../components/ViewAttendance'
import ViewProgress from '../components/ViewProgress'
import UploadProgress from '../components/UploadProgress'

function App() {
 const router=createBrowserRouter(
  [{
    path:"/", 
    element:<><Navbar/><Home/></>
  },
  {
    path:"/login",
    element:<><Navbar/><Login/></>
  },
  {
    path:"/register",
    element:<><Navbar/><Register/></>
  },
  {
    path:"/dashboard",
    element:<><Navbar/><Dashboard role="teacher"/></>
  },
  {
    path:"/dashboard",
    element:<><Navbar/><Dashboard role="student"/></>
  },
  {
    path:"/dashboard",
    element:<><Navbar/><Dashboard role="parent"/></>
  },
  {
    path:"/dashboard",
    element:<><Navbar/><Dashboard role="parent"/></>
  },
  {
    path:"/editattendance",
    element:<><Navbar/><EditAttendance/></>
  },
  {
    path:"/viewattendence",
    element:<><Navbar/><ViewAttendence/></>
  },
  {
    path:"/viewprogress",
    element:<><Navbar/><ViewProgress/></>
  },
  {
    path:"/uploadprogress",
    element:<><Navbar/><UploadProgress/></>
  }

],
  
 )  

  return (
    <>
  
      <RouterProvider router={router}/>
    
    </>
  )
}


export default App
