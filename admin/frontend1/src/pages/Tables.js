import './ui.scss'
import { Row, Col, Table, Card, CardTitle, CardBody, Badge,Form,FormGroup,InputGroup,InputGroupText } from "reactstrap";
import { AiOutlineSearch } from 'react-icons/ai';
import studentsService from "../services/student.service" ;
import profService from "../services/prof.service" ;

import Swal from 'sweetalert2';
import { useState ,useEffect } from "react";
import { Input } from "reactstrap";
import { Button, Modal, ModalHeader, ModalBody } from 'reactstrap';

import { useAuthContext } from '../shared/useAuthContext'; 
import { useDataContext } from '../hooks/useDataContext';
 
const Tables = () => {
  const [searchtext,setsearchtext]=useState("");
  const [modal, setModal] = useState(false);
  const [id, setId] = useState(null);
  const { user } = useAuthContext()
 const { Data ,dispatch } = useDataContext()
   const[ Json,setjson]=useState('')


  const initialTutorialState = {
    id: null,
    firstname: "",
    lastname: "",
    birthdate: "",
    address: "",
    phone_number:"",
    level:"",
    CIN:""
   
  };
  const [currentUser, setCurrentUser] = useState(initialTutorialState);

  const [state,setState]=useState(false)
  const[message,setMessage] =useState('');

  const toggle = () => setModal(!modal);
  const[result,setResult]=useState([])
 useEffect(() => {
    const fetchData = async () => {
 
      studentsService.getStudents().then(async res=>{
        if(res){
          console.log(res.data)

        
            dispatch({type: 'SET_Data', payload: res.data})
            setjson(res.data)
        }

      })
      .catch({})
    }

 
      fetchData()
    
  }, [dispatch,state])
 




const editt=(data,e)=>{
   e.preventDefault();
  toggle() ;
  setId(data.id);
  setCurrentUser(data)

  console.log(data.id) 
}


const update=async(e)=>{
  e.preventDefault();
  toggle() ;
  e.preventDefault();
  studentsService.updateStudent(id,currentUser).then(res=>{ 
  if (res){
  Swal.fire({ 
   
  text:   "the pre-selectioned member was updated successfully",
  confirmButtonText: 'Cancel',
  icon : "success" ,
  confirmButtonColor:"#979292 "

}) 
setMessage("The tutorial was updated successfully!");
setState(!state)
}})
   .catch(e => {
     console.log(e);
   
   })
 


}

const handleInputChange = event => {
  const { name, value } = event.target;
  setCurrentUser({ ...currentUser, [name]: value });
};


const Delete=(id,e)=>{
  console.log(id)
  Swal.fire({
           text:   "Are you sure you want to delete this User ?",
           icon: 'warning' ,
           showCancelButton: true,  
   confirmButtonText: `Yes`,  
   confirmButtonColor: "#ff6873", 
       
         }).then((result) => {
           if (result.isConfirmed) {
 
 deletee(id,e) ;   
 Swal.fire({text:   "User was deleted successfully",
 icon: 'success' ,
 confirmButtonText: `OK`, 
 confirmButtonColor: "#ff6873",
 })         
           } else
           Swal.fire({text:   "Cancelled",
           icon: 'error' ,
           confirmButtonText: `OK`, 
           confirmButtonColor: "#ff6873",
     })
 
       }) 
 
 
 }
const deletee =async(tdata,e)=>{
/* 
 const response = await fetch(`/delete/student/${tdata.id}` , {
  method: 'DELETE',

})
 const json = await response.json()
console.log(response)
if (response.ok) {
  dispatch({type: 'DELETE_Data', payload: tdata})
  setState(!state)
} 
  console.log(json)
  console.log(id)  */
  e.preventDefault();
  studentsService.deleteStudent(tdata.id).then(res=>{
    if(res){
      dispatch({type: 'DELETE_Data', payload: tdata})
      setState(!state)
    }
    
  }).catch(e => {
    console.log(e);
  })

}

  return (
    <div>
    
         

    <Row>
    
      <Col >
      <Form className="navbar-search navbar-search-dark ">
            <FormGroup className="mb-0">
              <div style={{borderRadius:30  ,marginTop:'10px',marginBottom:'10px',width:'300px',float:"right"}}>
              <InputGroup className="input-group-alternative">
                <InputGroupText style={{backgroundColor:"transparent", borderColor:"#7a7878" }}>
                 
                  <AiOutlineSearch style={{color:"#555555"}} />
                </InputGroupText>
                <Input  placeholder="Search" type="text" style={{backgroundColor:"transparent", borderColor:" #7a7878"}}  onChange={(event)=>{setsearchtext(event.target.value)}} />
              </InputGroup>
              </div>
            </FormGroup>
        </Form>
       
        <Card style ={{width:1400}} >
          <CardTitle tag="h6" className="border-bottom p-3 mb-0">
            <i className="bi bi-card-text me-2"> </i>
            Members
          </CardTitle>
          <CardBody style ={{width:1400}}>
            <Table className="no-wrap mt-1 align-middle" responsive borderless >
              <thead>
                <tr>
                  <th>#</th>
                  <th>Name</th>
                 
                  <th>birthdate</th>
                  <th>Address</th>
                  <th>Level</th>
                  <th>Phone</th>
                
                   <th>CIN</th>  

                  { <th>Actions</th>}  
                
                </tr>
              </thead>
            
              
              <tbody>
             {Json && Json.filter((val)=>{
                if(searchtext==="")
                return val ;
                else if (val.email.toLowerCase().includes(searchtext.toLowerCase())||val.firstname.toLowerCase().includes(searchtext.toLowerCase()) || val.lastname.toLowerCase().includes(searchtext.toLowerCase())){
                  return val
                }
              }).map((tdata, index) => ( 
                    <tr key={index}>
                  <td>{index+1}</td> 
                    <td>{tdata && tdata.firstname} {tdata && tdata.lastname}</td>
                    
               
                <td>{tdata && tdata.birthdate}</td>
            <td>{tdata && tdata.address}</td>
            <td>{tdata && tdata.level}</td>

            <td>{tdata && tdata.phone_number}</td>
            <td>{tdata && tdata.CIN}</td>
                        <td> <><Button className ="edit" id="b5" style={{marginTop:-2}}  >
                  <i className="bi bi-pencil-fill" style ={{fontSize: 25+"px",color:"yellow"}} onClick={(e)=>editt(tdata,e)}></i>
                  
                
                </Button> 
              
                <Button id ="b4" onClick={(e)=>Delete(tdata,e)}    > 
                      <span className="trash">
                      <span></span>
                        <i></i>
            
                      </span>
                    </Button> </> 
                      
                      
                      
                          </td>
                      
                          
                      </tr> ))} 
                      </tbody> 
           
  
          
            </Table>
          </CardBody>
        </Card>
      </Col>
    </Row>
    
    <Modal isOpen={modal} toggle={toggle} {...result} className="Modal1"  size="lg" style={{maxWidth: '2000px', width: '100%'}}>
    <ModalHeader toggle={toggle}>Modal title</ModalHeader>
    <ModalBody>
    <form
          id="form"
          action="/"
          method="POST"
        
        >
    <Table borderless>
    <thead>
                <tr>
                  <th className ="th">Name</th>
               
                 
                  <th>Birthdate</th>
                  <th>Address</th>
                  <th>Level</th>
                  <th>Phone</th>
                  
                   <th>CIN</th>  

                
                  
                </tr>
              </thead>
            
            
              <tbody>
            
        
          <tr>
            <td>

              <div className='inline'>
                <Row>
                  <Col>

                  <Input 
              placeholder="First Name"
              type="string"
              name="firstname" id="firstname"
              className="input-field"
              onChange={(e) => handleInputChange(e)}
              value={currentUser.firstname}
            />   </Col>  
      <Col > <Input
              placeholder="Last Name"
              type="string"
              name="lastname" id="lastname"
              className="input-field"
              onChange={(e) => handleInputChange(e)}
              value={currentUser.lastname}
            />

                  </Col> 

                </Row>
            
          </div>
            </td>
            <td>
 
            <Input  
              placeholder="birthdate"
              type="string"
              name="birthdate"
              className="input-field"
              onChange={(e) => handleInputChange(e)}
              value={currentUser.birthdate}
            />
       

      
          </td>
            <td>
 
 <Input 
   placeholder="address"
   type="string"
   name="address"
   className="input-field"
   onChange={(e) => handleInputChange(e)}
   value={currentUser.address}
   required
 > 
                </Input>  </td>

           <td> 
                <Input 
   placeholder="level"
   type="select"
   name="level"
   className="input-field"
   onChange={(e) => handleInputChange(e)}
   value={currentUser.level}
   required
 > 
  <option value="" disabled hidden>Choose here</option>
<option>1</option>
                  <option>2</option>
                  <option>3</option>
                </Input></td>
    <td>
 
            <Input 
              placeholder="phone_number"
              type="phone"
              name="phone_number"
              className="input-field"
              onChange={(e) => handleInputChange(e)}
              value={currentUser.phone_number}
              required
            /> </td>
 
                <td>
                <Input 
   placeholder="CIN"
   type="string"
   name="CIN"
   className="input-field"
   onChange={(e) => handleInputChange(e)}
   value={currentUser.CIN}
   required
 > 


                </Input></td>



       
          </tr>
    
      
                  </tbody>
                  </Table>  
                  <Button type="submit" id="submit-button" onClick={e=>update(e)}>
            submit
          </Button>  
        </form>
    </ModalBody>
    
  </Modal>
    
  </div>
  );
};

export default Tables;
