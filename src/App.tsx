import { Route, Routes } from "react-router-dom"
import { useState } from "react"
import MainTable from "./views/table/MainTable";
import Navbar from "./Navbar";
import Create from "./views/table/Create";
import Login from "./views/Login";
import Edit from "./views/table/Edit";



function App() {
  const token = localStorage.getItem("token");
  console.log(token);
  
  const [auth, setAuth] = useState(token ? true : false);

  return (
    <>
      {
          auth ? <>
            <Navbar setAuth={setAuth}/>
            <Routes>
              <Route path="/create" element={<Create />} />
              <Route path="/edit/:id" element={<Edit />} />
              <Route path="*" element={<MainTable  />} />
            </Routes>
          </>:<>
            <Routes>
              <Route path="*" element={<Login setAuth={setAuth}/>} />
            </Routes>
          </>
      }
    </>
  )
}

export default App
