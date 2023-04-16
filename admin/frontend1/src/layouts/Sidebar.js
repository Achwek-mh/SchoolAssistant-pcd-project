import { Button, Nav, NavItem,Collapse,NavLink, Dropdown } from "reactstrap";
import { Link, useLocation } from "react-router-dom";
import { useState ,useEffect } from "react";
import '../pages/ui.scss'
const navigation = [
  {
    title:"Schedules ",
    icon: "bi bi-calendar",
    children:[
      {
        title:"Temps ",
        href:"/temps"
      },
      {
        title:"ds ",
        href:"/ds"
      },
      {
        title:"exam ",
        href:"/exam"
      },
      {
        title:"rattrapage ",
        href:"/rattrapage"
      }
    ]
  },
  
  {
    title: "profiles",
    icon: "bi bi-person-lines-fill",
    children:[
      {
        title:"prof ",
        href:"/prof"
      },
      {
        title:"students ",
        href:"/student"
      },]
  },

  {
    title: "events",
    href: "/event",
    icon: "bi bi-calendar2-event",
  },
  {
    title: "Meet",
    icon: "bi bi-laptop",
    children: [
      {
        title: "Online",
        href: "/online",
      },
      {
        title: "Présentiel",
        href: "/presentiel",
      },
    ],
  },
  {
    title: "Result",
    icon: "bi bi-patch-check",
    children: [
      {
        title: "Exam",
        href: "/resultexam",
      },
      {
        title: "PFE",
        href: "/resultpfe",
      },
      {
        title: "PCD",
        href: "/resultpcd",
      },
    
    ],
  },
  {
    title: "Subjects",
    icon: "bi bi-envelope-open",
    children: [
      {
        title: "PCD",
        href: "/sujetpcd",
      },
      {
        title: "PFE",
        href: "/sujetpfe",
      },
  
    ],
  },


];

const Sidebar = () => {
  const showMobilemenu = () => {
    document.getElementById("sidebarArea").classList.toggle("showSidebar");

 

  };
  let location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
    const toggle = () => setIsOpen(!isOpen);
  return (
     <div className="p-3 ">
      <div className="d-flex align-items-center">
        
      <Button
          close
          size="sm"
          className="ms-auto d-lg-none"
          onClick={() => showMobilemenu()}
        ></Button>
      </div>
      <div className="pt-4 mt-2">

        <Nav vertical className="sidebarNav">
          {navigation.map((item, index) => (
            <NavItem key={index} className="sidenav-bg">
         {item.children ?(  
        
         <NavLink
                href="#" onClick={toggle}
                className={
                  location.pathname === item.href
                    ? "text-primary nav-link py-3"
                    : "nav-link text-secondary py-3"
                }
              style={{marginTop:"20px"}}>
                 <i className={item.icon}></i>
                <span className="ms-1 d-inline-flex align-items-center">{item.title }   <i className="bi-chevron-down toggle-btn ml-5" onClick={() => setIsOpen(!isOpen)}  ></i>                 </span> 

             
              </NavLink> ):(   <NavLink
                href={item.href}
                className={
                  location.pathname === item.href
                    ? "text-primary nav-Navlink py-3"
                    : "nav-link text-secondary py-3"
                }
                style={{marginTop:"20px"}}>
                <i className={item.icon}></i>
                <span className="ms-3 d-inline-block">{item.title}</span>

             
              </NavLink>)}

          {item.children && (
        

          <Collapse isOpen={isOpen} style={{marginLeft:"50px"}} >
            {item.children.map((subitem,subindex)=>( <NavItem key={subindex}>
                  <NavLink href={subitem.href}>{subitem.title} </NavLink>
                </NavItem>
          ))}
        
        </Collapse>)}
              
            </NavItem>
          ))}
        </Nav>
      </div>
    </div> 

  );

};

export default Sidebar;
