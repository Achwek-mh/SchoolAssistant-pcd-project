import '../App.scss';
import React from "react";
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import { useLogout } from "../hooks/useLogout";
import { AiFillSetting,AiOutlineUser,AiOutlineUserAdd,AiOutlineLogout,AiOutlineSearch ,AiFillCamera,AiFillDollarCircle,AiFillBulb} from 'react-icons/ai';
import {
  MDBContainer,
  MDBInput,
  MDBCheckbox,
  MDBBtn,
  MDBIcon
}
from 'mdb-react-ui-kit';
import { useAuthContext } from "../shared/useAuthContext";
import {
  Navbar,
  Collapse,
  Nav,
  NavItem,
  NavbarBrand,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Dropdown,
  Button,
} from "reactstrap";
const Home = (props) =>{
 
    const navigate=useNavigate()
    const [isOpen, setIsOpen] = React.useState(false);
    const [dropdownOpen, setDropdownOpen] = React.useState(false);
    const {user }=useAuthContext();
    const { logout } = useLogout()
    const toggle = () => setDropdownOpen((prevState) => !prevState);
    const Handletoggle = () => {
      setIsOpen(!isOpen);
    };
    const showMobilemenu = () => {
      document.getElementById("sidebarArea").classList.toggle("showSidebar");
    };
  
    
  
    const handleClick = () => {
      logout() ;
      setTimeout(()=>{
        navigate('/login')
      },500)
      
    }
   
    
    
      return (
        <MDBContainer className="p-3 my-5 d-flex flex-column w-50">
    
          <MDBInput wrapperClass='mb-4' label='Email address' id='form1' type='email'/>
          <MDBInput wrapperClass='mb-4' label='Password' id='form2' type='password'/>
    
          <div className="d-flex justify-content-between mx-3 mb-4">
            <MDBCheckbox name='flexCheck' value='' id='flexCheckDefault' label='Remember me' />
            <a href="!#">Forgot password?</a>
          </div>
    
          <MDBBtn className="mb-4">Sign in</MDBBtn>
    
          <div className="text-center">
            <p>Not a member? <a href="#!">Register</a></p>
            <p>or sign up with:</p>
    
            <div className='d-flex justify-content-between mx-auto' style={{width: '40%'}}>
              <MDBBtn tag='a' color='none' className='m-1' style={{ color: '#1266f1' }}>
                <MDBIcon fab icon='facebook-f' size="sm"/>
              </MDBBtn>
    
              <MDBBtn tag='a' color='none' className='m-1' style={{ color: '#1266f1' }}>
                <MDBIcon fab icon='twitter' size="sm"/>
              </MDBBtn>
    
              <MDBBtn tag='a' color='none' className='m-1' style={{ color: '#1266f1' }}>
                <MDBIcon fab icon='google' size="sm"/>
              </MDBBtn>
    
              <MDBBtn tag='a' color='none' className='m-1' style={{ color: '#1266f1' }}>
                <MDBIcon fab icon='github' size="sm"/>
              </MDBBtn>
    
            </div>
          </div>
    
        </MDBContainer>
      );
    }
    
  
export default Home;