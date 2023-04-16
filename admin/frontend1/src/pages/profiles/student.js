import '../ui.scss'
import axios from 'axios';

import { Row, Col, Table, Card, CardTitle, CardBody, Badge,Form,FormGroup,InputGroup,InputGroupText ,Label} from "reactstrap";
import { AiOutlineSearch } from 'react-icons/ai';
import studentsService from "../../services/student.service" ;
import Swal from 'sweetalert2';
import { useState ,useEffect } from "react";
import { Input } from "reactstrap";
import { Button, Modal, ModalHeader, ModalBody } from 'reactstrap';

import { useAuthContext } from '../../shared/useAuthContext'; 
import { useDataContext } from '../../hooks/useDataContext';
 
const Prof = () => {
  const [searchtext,setsearchtext]=useState("");
  const [modal, setModal] = useState(false);
  const [id, setId] = useState(null);
  const [submitted, setSubmitted] = useState(null);

  const { user } = useAuthContext()
 const { Data ,dispatch } = useDataContext()
   const[ Json,setjson]=useState('')

   const handleNameChange = event => {
    setName(event.target.value);
  }

  const handleInfoChange = event => {
    setInfo(event.target.value);
  }

  const [Nom, setName] = useState('');
  const [Info, setInfo] = useState('');
  const [image, setImage] = useState(null);
  const [Email, setEmail] = useState('');
  const handleEmailChange = event => {
    setEmail(event.target.value);
  }
  const handleImageChange = event => {
    /* const imageFile = event.target.files[0];
    setCurrentUser({ ...currentUser, Image: imageFile }); */
    setImage(event.target.files[0]);
  };
  const initialTutorialState = {
    id: null,
    Nom: "",
    Info: "",
    Email:"",

    Image: ""
    
   
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

        
            dispatch({type: 'SET_Data', payload: res.data})
            setjson(res.data)
        }

      })
      .catch({})
    }

 
      fetchData()
    
  }, [dispatch,state])
  const Submit =async (event) => {
    event.preventDefault();
    
    
    // Upload the image to the server
    const formData = new FormData();
    formData.append('image', image);


   await axios.post('/upload-image-student', formData)
      .then(response => {
        console.log(response)

        console.log(response.data.message);
        // Add a new entry to the Prof table
        const prof = { 
          Image: response.data.filename,
          Nom: Nom,
          Info: Info,
          Email: Email
        };
        console.log(prof)
        axios.post('http://localhost:5000/addstudent', prof)
          .then(response => {
            console.log(response.data.message);
            // Update the list of entries from the Prof table
            axios.get('http://localhost:5000/getstudent')
              .then(response => {
                console.log(response)
                setMessage("The tutorial was updated successfully!");
                setSubmitted(true);
                setState(!state)
              })
              .catch(error => {
                console.log(error);
              });
          })
          .catch(error => {
            console.log(error);
          });
      })
      .catch(error => {
        console.log(error);
      });
  setName('');
  setInfo('');
  setImage(null);
  setEmail('');

  };
  

  

  const handleSubmit = async(e) => {
    e.preventDefault();
     const student ={Image:currentUser.Image,Nom:currentUser.Nom,Info:currentUser.Info,etudiantcol:currentUser.etudiantcol,Email:currentUser.Email}
        
     studentsService.save(student).then(res=>{ 
          if (res){
            console.log(res)
     
        setMessage("The tutorial was updated successfully!");
        setSubmitted(true);
        setState(!state)
      }
    else 
  {
  }
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
  studentsService.updateStudent(id,currentUser).then(res=>{ 
  if (res){
  Swal.fire({ 
   
  text:   "le profile est mis à jour avec succées",
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
           text:   "Tu est sur de supprimer ce profil ?",
           icon: 'warning' ,
           showCancelButton: true,  
   confirmButtonText: `Yes`,  
   confirmButtonColor: "#ff6873", 
       
         }).then((result) => {
           if (result.isConfirmed) {
 
 deletee(id,e) ;   
 Swal.fire({text:   "profil supprimé avec succées",
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

      <Form className="navbar-search navbar-search-dark " onSubmit={Submit}>
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
       
            <Card style ={{width:1500 ,marginLeft:'-40px'}} >
          <CardTitle tag="h6" className="border-bottom p-3 mb-0">
            <i className="bi bi-card-text me-2"> </i>
            Members
          </CardTitle>
          <CardBody style ={{width:1500}}>
          <Row >
      <Col style={{marginLeft:'80px'}}>
        <Label>Image:</Label>
        <Input
         type="file" 
          name="image"
          id="image"
          accept="image/*"

          className="input-field"

          onChange={handleImageChange}
        />
      </Col>
      <Col>
        <Label>Name:</Label>
        <Input
          type="text"
          name="Nom"
          id="Nom"
          value={Nom}
          onChange={handleNameChange}  style={{width:'250px'}}
        />
      </Col>
      <Col>
        <Label>Info:</Label>
        <Input
          type="text"
          name="Info"
          id="Info"

          value={Info}
          onChange={handleInfoChange} style={{width:'300px'}}
        />
      </Col>
     
      <Col >
        <Label>email:</Label>
        <Input
          type="text"
          name="Email"
          id="Email"
          value={Email}
          onChange={handleEmailChange}style={{width:'250px'}}
        />
      </Col>
       <Col>
       <Button type="submit" style={{borderRadius:30  ,marginTop:'35px',marginBottom:'10px',width:'70px',float:'flex-end'}}>OK</Button>

      </Col>
      
    </Row>
    </CardBody>
    </Card>
    </Form>

    <Card style ={{width:1500 ,marginLeft:'-40px'}}>
    <CardBody style ={{width:1550,marginLeft:'-40px'}}>

            <Table className="no-wrap  align-left"  responsive borderless >
              <thead>
                <tr>
                  <th>#</th>
                  <th>Image</th>
                 
                  <th>Name</th>
                  <th>Info</th>
                  <th>Email</th>

                   

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
                    
                  { <td>{tdata.Image &&<> <img src={`http://localhost:5000/images/${tdata.Image}`} alt="image"  className="avatar rounded-circle mr-3" style={{width:"40px",height:"40px"}} /> </>}   </td> }
                <td>{tdata && tdata.Nom}</td>
            <td style={{width:400}}>{tdata && tdata.Info}</td>

            <td >{tdata && tdata.Email}</td>


            
                      <td style={{width:"180px",float:"left"}}> <><Button className ="edit" id="b5" style={{marginTop:-2 ,float:"right",alignItems: 'flex-end'}}  >
                  <i className="bi bi-pencil-fill" style ={{fontSize: 20+"px",color:"yellow"}}  onClick={(e)=>editt(tdata,e) }></i>
                  
                
                </Button> 
              
                <Button id ="b4"   onClick={(e)=>Delete(tdata,e)}     > 
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
                  <th>email</th>
                 

                
                  
                </tr>
              </thead>
            
            
              <tbody>
            
        
          <tr>
            <td>

              <div className='inline'>
                <Row>
                  <Col>

                  <Input 
              placeholder=" nom"
              type="string"
              name="Nom" id="Nom"
              className="input-field"
              onChange={(e) => handleInputChange(e)}
              value={currentUser.Nom}
            />   </Col>  
      

                </Row>
            
          </div>
            </td>
            <td>
 
            <Input  
              placeholder="info"
              type="string"
              name="Info"
              id="Info"
              className="input-field"
              onChange={(e) => handleInputChange(e)}
              value={currentUser.Info}
            />
       

      
          </td>
            <td>
 
 <Input 
   placeholder="etudiantcol"
   type="string"
   name="Email"
   id="id"
   className="input-field"
   onChange={(e) => handleInputChange(e)}
   value={currentUser.Email}
   required
 > 
                </Input>  </td>

           
    


       
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

export default Prof;


 