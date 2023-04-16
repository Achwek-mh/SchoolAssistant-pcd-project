import '../ui.scss'
import { Row, Col, Table, Card, CardTitle, CardBody, Badge,Form,FormGroup,InputGroup,InputGroupText ,Label} from "reactstrap";
import { AiOutlineSearch } from 'react-icons/ai';
import Swal from 'sweetalert2';
import { useState ,useEffect } from "react";
import { Input } from "reactstrap";
import { Button, Modal, ModalHeader, ModalBody } from 'reactstrap';

import { useAuthContext } from '../../shared/useAuthContext'; 
import { useDataContext } from '../../hooks/useDataContext';
import profService from '../../services/prof.service';
import resultService from '../../services/result.service';
import meetService from '../../services/meet.service';

 
const Resultpfe = () => {
  const [searchtext,setsearchtext]=useState("");
  const [modal, setModal] = useState(false);
  const [id, setId] = useState(null);
  const [submitted, setSubmitted] = useState(null);

  const { user } = useAuthContext()
 const { Data ,dispatch } = useDataContext()
   const[ Json,setjson]=useState('')


  const initialTutorialState = {
    id: null,
    subject: "",
    time: "",
    
   
  };
  const [currentUser, setCurrentUser] = useState(initialTutorialState);

  const [state,setState]=useState(false)
  const[message,setMessage] =useState('');

  const toggle = () => setModal(!modal);
  const[result,setResult]=useState([])
 useEffect(() => {
    const fetchData = async () => {
 
      meetService.getpresentiel().then(async res=>{
        if(res){

        
            dispatch({type: 'SET_Data', payload: res.data})
            setjson(res.data)
        }

      })
      .catch({})
    }

 
      fetchData()
    
  }, [dispatch,state])
  const handleSubmit = async(e) => {
    e.preventDefault();
     const meet ={subject:currentUser.subject,time:currentUser.time}
        meetService.savepresentiel(meet).then(res=>{ 
          if (res){
            console.log(res)
     
        setMessage("The tutorial was updated successfully!");
        setSubmitted(true);
        setState(!state)
      }
    else 
  {
/*     setError("an error occured")
 */  }
 })
 
  }



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
  meetService.updatepresentiel(id,currentUser).then(res=>{ 
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

  e.preventDefault();
  meetService.deletepresentiel(tdata.id).then(res=>{
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
      <Form className="navbar-search navbar-search-dark " onSubmit={(e)=>{handleSubmit(e)}}>
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
       
        <Card classname="card"  >
          <CardTitle tag="h6" className="border-bottom p-3 mb-0">
            <i className="bi bi-card-text me-2"> </i>
            Members
          </CardTitle>
          <CardBody classname="cardbody" >
          <Row onSubmit={handleSubmit}>
   
      
      <Col>
        <Label>Subject:</Label>
        <Input
          type="text"
          name="subject"
          id="subject"

          value={currentUser.subject}
          onChange={(e) => handleInputChange(e)} style={{width:'250px'}}
        />
      </Col>
      <Col>
        <Label>Time:</Label>
        <Input
          type="text"
          name="time"
          id="time"

          value={currentUser.time}
          onChange={(e) => handleInputChange(e)} style={{width:'300px'}}
        />
      </Col>
      
     
      
      
    </Row>
    </CardBody>
    </Card>
    </Form>

    <Card classname="card" >
    <CardBody classname="cardbody" >

            <Table className="no-wrap  align-middle" responsive borderless >
              <thead>
                <tr>
                  <th>#</th>
                  <th>Subject</th>
                  <th>Time</th>

                   

                  { <th>Actions</th>}  
                
                </tr>
              </thead>
            
              
              <tbody>
             {Json && Json.filter((val)=>{
                if(searchtext==="")
                return val ;
                else if (val.name.toLowerCase().includes(searchtext.toLowerCase())){
                  return val
                }
              }).map((tdata, index) => ( 
                    <tr key={index}>
                  <td>{index+1}</td> 
                    
                  <td>{tdata && tdata.subject}</td>
            <td style={{width:400}}>{tdata && tdata.time}</td>




            
            <td style={{width:"180px",float:"left"}}> <><Button className ="edit" id="b5" style={{marginTop:-2 ,float:"right",alignItems: 'flex-end'}}  >
                  <i className="bi bi-pencil-fill" style ={{fontSize: 20+"px",color:"yellow"}} /*  onClick={(e)=>editt(tdata,e) } */></i>
                  
                
                </Button> 
              
                <Button id ="b4"   onClick={(e)=>Delete(tdata,e)}      > 
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
               
                 
                  <th>info</th>
                  <th>contact</th>
                 

                
                  
                </tr>
              </thead>
            
            
              <tbody>
            
        
          <tr>
            <td>

              <div className='inline'>
                <Row>
                  <Col>

                  <Input 
              placeholder=" subject"
              type="string"
              name="subject" id="subject"
              className="input-field"
              onChange={(e) => handleInputChange(e)}
              value={currentUser.subject}
            />   </Col>  
      

                </Row>
            
          </div>
            </td>
            <td>
 
            <Input  
              placeholder="time"
              type="string"
              name="time"
              className="input-field"
              onChange={(e) => handleInputChange(e)}
              value={currentUser.time}
            />
       

      
          </td>
           
    


       
          </tr>
    
      
                  </tbody>
                  </Table>  
                  <Button type="submit" id="submit-button"  onClick={e=>update(e)} >
            submit
          </Button>  
        </form>
    </ModalBody>
    
  </Modal>
    
  </div>
  );
};

export default Resultpfe;
