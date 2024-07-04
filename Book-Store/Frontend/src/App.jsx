import Home from './Home/Home'
import Courses from './Courses/Courses'
import {Routes, Route, Navigate} from "react-router-dom"
import Signup from './components/Signup'
import {Toaster} from 'react-hot-toast'
import { useAuth } from './context/Authprovider'

const App = () => {

  const [authUser, setAuthUser] = useAuth();

  return (
    <>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/course" element={authUser?<Courses /> : <Navigate to ="/signup"/>} />
      <Route path="/signup" element={<Signup/>} />
    </Routes>
    <Toaster />
    </>
  )
}
export default App