import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
// import Delete from "./food/Delete";
import Users from "./food/Users";
import Add from "./food/Add";
import Update from "./food/Update";
import Orders from "./food/Orders";
// import Rest from "./food/Rest";
import Navbar from "./components/NavBar";
import Signup from "./auth/Signup";
import Login from "./auth/Login";

import "./style.css"


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar/> 
        <Routes>
          <Route path="/" element={<Users/>}/>
          <Route path="/orders" element={<Orders/>}/>
          {/* <Route path="/" element={<food/>}/> */}
          <Route path="/signup" element={<Signup />}/>
          <Route path="/login" element={<Login />}/>"
          <Route path="/add" element={<Add/>}/>
          <Route path="/update/:id" element={<Update/>}/>
          {/* <Route path="/delete/:id" element={<delete/>}/> */}

          {/* <Route path="/rest/:id" element={<rest/>}/> */}



        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
