import { Card,Row,Col, CardBody, CardTitle, CardSubtitle, Table ,Button,Form,FormGroup,InputGroup,InputGroupText} from "reactstrap";
import { AiFillSetting,AiOutlineUserAdd,AiOutlineLogout,AiOutlineSearch ,AiFillCamera,AiFillDollarCircle,AiFillBulb} from 'react-icons/ai';
import { useState,useEffect} from "react";
import {  Modal, ModalHeader, ModalBody, ModalFooter ,Input} from 'reactstrap';

import Swal from 'sweetalert2';
import { useDataContext } from '../../hooks/useDataContext';
import { useAuthContext } from '../../shared/useAuthContext'; 

const ProjectTables = () => {
const { Data ,dispatch } = useDataContext()
const { user } = useAuthContext()
  const regExp =/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  const [searchtext,setsearchtext]=useState("");

  const[message,setMessage] =useState('');
  const [modal, setModal] = useState(false);
  const [id, setId] = useState(null);
  const toggle = () => setModal(!modal);
const [state,setState]=useState(false)
  const initialTutorialState = {
    firstname: "",
    lastname: "",
    email: "",
    phone :"",
    level :"",
    qu1:"",
    qu2:"",
    qu3:"",  
    entretien:"",
    status:"",
    resdate:"",
    imagePath:"",

  };

  const [inputValues, setInputValue] = useState(initialTutorialState);
  const [selectedItem, setselectedItem] = useState(initialTutorialState);

  const[result,setResult]=useState([])
  const[ Json,setjson]=useState('')


 /*  useEffect(() => {
    const fetchData = async () => {
      console.log(user) ;
      const response = await fetch('http://localhost:3002/api/membersProfile', {
      //  headers: {'Authorization': `Bearer ${user.token}`},
      })
      const json = await response.json()

      if (response.ok) {
        dispatch({type: 'SET_Data', payload: json})
        console.log(json)
        setjson(json)
      }
    }

 
      fetchData();
      console.log(Json)
    
  }, [dispatch,state])
    function handleInputChange(event) {
  const { name, value } = event.target;
  setInputValue({ ...inputValues, [name]: value });
}
    const editt=(data,e)=>{
      e.preventDefault();
      toggle() ;
      setId(data._id);
      setInputValue(data)
      console.log(data._id)
    }
    const update=(e)=>{

     e.preventDefault();
     membersService.update(id,inputValues).then(res=>{ 
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
    const deletee =async(tdata,e)=>{
      e.preventDefault();
      const response = await fetch('http://localhost:3002/api/member/' + tdata._id, {
        method: 'DELETE',
       /*  headers: {
          'Authorization': `Bearer ${user.token}`
        } 
      })
      const json = await response.json()
  console.log(response)
      if (response.ok) {
        dispatch({type: 'DELETE_Data', payload: tdata})
        setState(!state)
      }
        console.log(json)
      }
  
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
        */
  return (
    <div>


      <Row>
        <Col>
        <Form className="navbar-search navbar-search-dark ">
            <FormGroup className="mb-0">
              <div style={{borderRadius:30  ,marginTop:'10px',marginBottom:'10px',width:'300px',float:"right"}}>
              <InputGroup className="input-group-alternative">
                <InputGroupText style={{backgroundColor:"transparent", borderColor:"#7a7878", }}>
                 
                  <AiOutlineSearch style={{color:"#555555"}} />
                </InputGroupText>
                <Input  placeholder="Search" type="text" style={{backgroundColor:"transparent", borderColor:"#7a7878",}}  onChange={(event)=>{setsearchtext(event.target.value)}} />
              </InputGroup>
              </div>
            </FormGroup>
        </Form>
       
      <Card style ={{marginLeft :'-50px',width:1450}}>
        <CardBody style ={{marginLeft :'-10px' ,width:1450}}>
          <CardTitle tag="h5">Dashboard
          </CardTitle>
          <Table className="no-wrap mt-1 align-middle" responsive borderless size="lg" style={{maxWidth: '2000px', width: '100%'}}>
            <thead>
              <tr> 
                <th style ={{width:180}}>candidat</th>

                <th style ={{width:180}}>Email</th>
                <th style ={{width:180}}>Phone Number</th>
                <th style ={{width:180}}>Class Level</th>
                <th style ={{width:180}}>Interview date </th>
                <th style ={{width:180}}>Interviewer </th>
                <th style ={{width:150}}>Status</th>
              {user.role=='Admin' && <th>Actions</th>}  
              </tr>
            </thead>
            <tbody>
              {Json && Json.filter((val)=>{
                if(searchtext=="")
                return val ;
                else if (val.email.toLowerCase().includes(searchtext.toLowerCase())||val.firstname.toLowerCase().includes(searchtext.toLowerCase()) || val.lastname.toLowerCase().includes(searchtext.toLowerCase())){
                  return val
                }
               }).map(tdata => (
            
                <tr key={tdata._id} className="border-top">
               <td>{tdata.imagePath &&<><img src ={tdata.imagePath}  alt="image"  className="avatar rounded-circle mr-3" style={{width:"40px",height:"40px"}}/> </>}  
                 {tdata.firstname} {tdata.lastname}</td>
                  
                  
                  <td>{tdata.email}</td>
                  <td>{tdata.phone}</td>
                  <td>{tdata.level}</td>
                  <td>{tdata.entretien}</td>
                  <td>{tdata.resdate}</td>
                  <td>{tdata.status === "Refused" ? (
  <span className="p-2 bg-danger rounded-circle d-inline-block ms-3"></span>
) : tdata.status === "Pending" ? (
  <span className="p-2 bg-warning rounded-circle d-inline-block ms-3"></span>
) : (
  <span className="p-2 bg-success rounded-circle d-inline-block ms-3"></span>
)}</td>
             <td>
              {user && user.role=='Admin' &&<><Button className ="edit" id="b5" style={{marginTop:-2}} >
         <i className="bi bi-pencil-fill" style ={{fontSize: 25+"px",color:"yellow"}} onClick={(e)=>editt(tdata,e)}></i>
         
       
      </Button> 
    
      <Button id ="b4" onClick={(e)=>Delete(tdata,e)}> 
            <span className="trash">
             <span></span>
              <i></i></span>
          </Button></>
            }
                </td></tr>
              ))}
            </tbody>
          </Table>
        </CardBody>
      </Card>
     </Col>
      </Row> 
      <Modal size="lg" style={{maxWidth: '1400px', width: '100%',marginLeft:380}} isOpen={modal} toggle={toggle} {...result} className="Modal1" >
    <ModalHeader toggle={toggle}>Modal title</ModalHeader>
    <ModalBody>
    <form
          id="form3"
          action="/"
          method="POST"
          onSubmit={e=>update(e)}
        >
    <Table borderless>
    <thead>
         <tr>
          <th>Candidat</th>
          <th>email</th>
          <th>Phone Number</th>
          <th>level</th>
          <th>entretien date </th>
          <th>Interviewer </th>
          <th>Status</th>
            
          </tr>
              </thead>
            
            
              <tbody>
            
        
          <tr>
            <td>

       <Row>
<Col> <Input 
              placeholder="First Name"
              type="string"
              name="firstname" id="firstname"
              className="input-field"
              onChange={(e) => handleInputChange(e)}
              value={inputValues.firstname}
        
              
            />
</Col>
<Col><Input 
              placeholder="Last Name"
              type="string"
              name="lastname" id="lastname"
              className="input-field"
              onChange={(e) => handleInputChange(e)}
              value={inputValues.lastname}
            />
          
</Col>

       </Row>
           
            
          
           
            
            </td>
            <td>
 
            <Input  
              placeholder="email"
              type="email"
              name="email"
              className="input-field"
              onChange={(e) => handleInputChange(e)}
              value={inputValues.email}
            />
       

      
          </td>
    <td>
 
            <Input 
              placeholder="phone"
              type="phone"
              name="phone"
              className="input-field"
              onChange={(e) => handleInputChange(e)}
              value={inputValues.phone}
              required
            />
 
            </td>
            <td>
 
 <Input 
   placeholder="level"
   type="select"
   name="level"
   className="input-field"
   onChange={(e) => handleInputChange(e)}
   value={inputValues.level}
   required
   >
  <option value="" selected disabled >Choose here</option>
       <option>1st year</option>
                  <option>2nd year</option>
                  <option>3rd year</option>
   </Input>

 </td>
 <td>
 
 <Input 
   placeholder="entretien"
   type="date"
   name="entretien"
   className="input-field"
   onChange={(e) => handleInputChange(e)}
   value={inputValues.entretien}
   required
 />

 </td>
 <td>
 
 <Input 
   placeholder="resdate"
   type="resdate"
   name="resdate"
   className="input-field"
   onChange={(e) => handleInputChange(e)}
   value={inputValues.resdate}
   required
 />

 </td>
 <td>
 
 <Input 
   placeholder="status"
   type="select"
   name="status"
   className="input-field"
   onChange={(e) => handleInputChange(e)}
   value={inputValues.status}
   required
 >
  <option value="" disabled hidden>Choose here</option>
<option>Pending</option>
                  <option>Accepted</option>
                  <option>Refused</option>
 </Input>

 </td>
 

 

       
          </tr>
    
      
                  </tbody>
                  </Table>  
                  <Button type="submit" id="submit-button" onClick={toggle}>
            submit
          </Button>  
        </form>
    </ModalBody>
    
  </Modal>
    
    </div>
  );
};



export default ProjectTables;
