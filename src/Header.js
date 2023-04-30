import {React,Fragment} from 'react';
import {Link} from 'react-router-dom';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import "./Header.css";
import Logo from "./Images/namma.webp";


export default function Header(){

    return(
      <Fragment>
          <div className='navbar'>
          <div className='logo'>
            <img
            src={Logo}
            alt="Logo"
            />
          </div>
          <div className='logo_heading'>
              <p>namma</p>
              <p>Yatri</p>
          </div>
          </div>
      </Fragment>
    );
}