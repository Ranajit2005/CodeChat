import { Routes,Route } from "react-router-dom"
import Login from "./pages/Login"
import SignUp from "./pages/SignUp"
import useCurrentUser from "./CustomHooks/useCurrentUser"


function App() {
  
  useCurrentUser();

  return (
      <Routes>
        <Route path="/login" element={<Login/>} />
        <Route path="/signup" element={<SignUp/>} />
      </Routes>
  )
}

export default App
