import { useState } from "react";
import './App.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./Home.js";
import Header from './Header';
import MenuIcon from '@mui/icons-material/Menu';

function App() {

  const[open,setOpen] = useState(false);

  const openCloseMenu = () => {
    setOpen(!open);
  }

  return (
    <Router>
      {
        (window.innerWidth>600)?(
          <Header/>
        ):(
          <div className="headerBg">
            {open===true? (
              <div>
                <MenuIcon style={{color:"white", margin:"0.5rem"}} onClick={openCloseMenu}/>
                <Header/>
              </div>
            ) : (
              <MenuIcon style={{color:"white", margin:"0.5rem"}} onClick={openCloseMenu}/>
            )}
          </div>
        )
      }
      <Routes>
        <Route path="/" element={<Home/>} />
      </Routes>
    </Router>
  );
}

export default App;
