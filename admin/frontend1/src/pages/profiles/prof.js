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
import profService from '../../services/prof.service';
 
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
  const [Contact, setContact] = useState('');

  const [profs, setProfs] = useState([]);

  const handleEmailChange = event => {
    setEmail(event.target.value);
  }
  const handleContactChange = event => {
    setContact(event.target.value);
  }
   const initialTutorialState = {
    id: null,
    Nom: "",
    Info: "",
    Contact: "",
    Email:"",
    Image: ""
  };
  const [currentUser, setCurrentUser] = useState(initialTutorialState);
  


  const handleInputChange = event => {
    const { name, value } = event.target;
    setCurrentUser({ ...currentUser, [name]: value });
  };
  
  const handleImageChange = event => {
    /* const imageFile = event.target.files[0];
    setCurrentUser({ ...currentUser, Image: imageFile }); */
    setImage(event.target.files[0]);
  };

  const Submit = async (event) => {
    event.preventDefault();
    
    // Upload the image to the server
    const formData = new FormData();
    formData.append('image', image);


   await axios.post('/upload-image-prof', formData)
      .then(response => {
        console.log(response)

        console.log(response.data.message);
        // Add a new entry to the Prof table
        const prof = { 
          Image: response.data.filename,
          Nom: Nom,
          Info: Info,
          Contact: Contact,
          Email: Email
        };
        console.log(prof)
        axios.post('http://localhost:5001/addprof', prof)
          .then(response => {
            console.log(response.data.message);
            // Update the list of entries from the Prof table
            axios.get('http://localhost:5001/getprof')
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
  

  const [state,setState]=useState(false)
  const[message,setMessage] =useState('');

  const toggle = () => setModal(!modal);
  const[result,setResult]=useState([])
 useEffect(() => {
    const fetchData = async () => {
 
      profService.getProf().then(async res=>{
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
     const prof ={Image:currentUser.Image,Nom:currentUser.Nom,Info:currentUser.Info,Contact:currentUser.Contact,Email:currentUser.Email}
        console.log(prof)
        profService.save(prof).then(res=>{ 
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
  setCurrentUser(data);

  console.log(data.id);
  
  console.log(modal)
}


const update=async(e)=>{
  e.preventDefault();
  toggle() ;
  e.preventDefault();
  profService.updateProf(id,currentUser).then(res=>{ 
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
 Swal.fire({text:   "profil supprimé avec succée",
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
  profService.deleteProf(tdata.id).then(res=>{
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
       
        <Card classname="card" >
          <CardTitle tag="h6" className="border-bottom p-3 mb-0">
            <i className="bi bi-card-text me-2"> </i>
            Members
          </CardTitle>
          <CardBody classname="cardbody" >
          <Row >
            <Col>
            <Label>Image:</Label>

            <Input
         type="file" 
          name="image"
          id="image"
          accept="image/*"

          className="input-field"

          onChange={handleImageChange}
        /></Col>
   
      <Col>
        <Label>Name:</Label>
        <Input
          type="text"
          name="Nom"
          id="Nom"

          value={Nom}
          onChange={handleNameChange} style={{width:'250px'}}
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
      <Col>
        <Label>Contact:</Label>
        <Input
          type="text"
          name="Contact"
          id="Contact"

          value={Contact}
          onChange={handleContactChange} style={{width:'250px'}}
        />
      </Col>
      <Col >
        <Label>email:</Label>
        <Input
          type="text"
          name="Email"
          id="Email"

          value={Email}
          onChange={handleEmailChange} style={{width:'250px'}}
        />
      </Col>
       <Col>
       <Button type="submit" style={{borderRadius:30  ,marginTop:'35px',marginBottom:'10px',width:'70px',float:'flex-end'}}>OK</Button>

      </Col>
      
    </Row>
    </CardBody>
    </Card>
    </Form>

    <Card  classname="card" >
    <CardBody    classname="card">

            <Table className="no-wrap  align-left" responsive borderless >
              <thead>
                <tr>
                  <th>#</th>
                  <th>Image</th>
                 
                  <th>Name</th>
                  <th>Info</th>
                  <th>Contact</th>
                  <th>Email</th>

                   

                  { <th>Actions</th>}  
                
                </tr>
              </thead>
            
              
              <tbody>
             {Json && Json.filter((val)=>{
                if(searchtext==="")
                return val ;
                else if (val.Nom.toLowerCase().includes(searchtext.toLowerCase())){
                  return val
                }
              }).map((tdata, index) => ( 
                    <tr key={index}>
                  <td>{index+1}</td> 
                    { <td>{tdata.Image &&<> <img src={`http://localhost:5001/images/${tdata.Image}`} alt="image"  className="avatar rounded-circle mr-3" style={{width:"40px",height:"40px"}} /> </>}   </td> }
                    
               
                <td>{tdata && tdata.Nom}</td>
            <td style={{width:400}}>{tdata && tdata.Info}</td>

            <td>{tdata && tdata.Contact}</td>
            <td >{tdata && tdata.Email}</td>


            
                      <td style={{width:"180px",float:"left"}}> <><Button className ="edit" id="b5" style={{marginTop:-2 ,float:"right",alignItems: 'flex-end'}}  >
                  <i className="bi bi-pencil-fill" style ={{fontSize: 20+"px",color:"yellow"}}  onClick={(e)=>editt(tdata,e) } ></i>
                  
                
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
          onSubmit={e=>update(e)}

        >
    <Table borderless>
   
                 
            
            
              <tbody>
            <Row>

              <Col style={{marginLeft:'30px'}}>
        <Label>Image:</Label>
        <Input
         type="file" 
          name="Image"
          id="Image"
          accept="image/*"
          className="input-field"

          value={currentUser.Image}
          onChange={(e) => handleInputChange(e)} 
        /> 
      </Col>
      <Col>
        <Label>Name:</Label>
        <Input
          type="text"
          name="Nom"
          id="Nom"
          className="input-field"

          value={currentUser.Nom}
          onChange={(e) => handleInputChange(e)} style={{width:'250px'}}
        />
      </Col>
      <Col>
        <Label>Info:</Label>
        <Input
          type="text"
          name="Info"
          id="Info"
          className="input-field"

          value={currentUser.Info}
          onChange={(e) => handleInputChange(e)} style={{width:'300px'}}
        />
      </Col>
      <Col>
        <Label>Contact:</Label>
        <Input
          type="text"
          name="Contact"
          id="Contact"
          className="input-field"

          value={currentUser.Contact}
          onChange={(e) => handleInputChange(e)} style={{width:'250px'}}
        />
      </Col>
      <Col >
        <Label>email:</Label>
        <Input
          type="text"
          name="Email"
          id="Email"
          className="input-field"

          value={currentUser.Email}
          onChange={(e) => handleInputChange(e)} style={{width:'250px'}}
        />
      </Col>
      </Row>

      
                  </tbody>
                  </Table>  
                  <Button type="submit" id="submit-button" onClick={toggle} >
            submit
          </Button>  
        </form>
    </ModalBody>
    
  </Modal>
    
  </div>
  );
};

export default Prof;
