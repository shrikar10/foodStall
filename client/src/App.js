import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
// import Delete from "./food/Delete";
import Users from "./food/Users";
import Add from "./food/Add";
// import Update from "./food/Update";
// import Orders from "./food/Orders";
// import Rest from "./food/Rest";
// import Users from "./pages/Users";

import "./style.css"

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Users/>}/>

          {/* <Route path="/" element={<food/>}/> */}
          <Route path="/add" element={<Add/>}/>
          {/* <Route path="/update/:id" element={<Update/>}/>
          <Route path="/delete/:id" element={<delete/>}/> */}

          {/* <Route path="/rest/:id" element={<rest/>}/> */}



        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
