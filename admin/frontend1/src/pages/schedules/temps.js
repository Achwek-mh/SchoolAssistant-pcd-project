import '../ui.scss'
import axios from 'axios';

import { Row, Col, Table, Card, CardTitle, CardBody, Badge,Form,FormGroup,InputGroup,InputGroupText ,Label,CardText,CardGroup,CardImg} from "reactstrap";
import { AiOutlineSearch } from 'react-icons/ai';
import tempsService from "../../services/temps.service" ;
import Swal from 'sweetalert2';
import { useState ,useEffect } from "react";
import { Input } from "reactstrap";
import { Button, Modal, ModalHeader, ModalBody } from 'reactstrap';

import { useAuthContext } from '../../shared/useAuthContext'; 
import { useDataContext } from '../../hooks/useDataContext';
import { json } from 'react-router-dom';
 
const Prof = () => {
  const [searchtext,setsearchtext]=useState("");
  const [modal, setModal] = useState(false);
  const [id, setId] = useState(null);
  const [submitted, setSubmitted] = useState(null);

  const { user } = useAuthContext()
 const { Data ,dispatch } = useDataContext()
   const[ Json,setjson]=useState('')

   const handleClasseChange = event => {
    setClasse(event.target.value);
  }

  const handlesemestreChange = event => {
    setsemestre(event.target.value);
  }

  const [classe, setClasse] = useState('');
  const [semestre, setsemestre] = useState('');
  const [emploi, setemploi] = useState(null);

  const handleemploiChange = event => {
    /* const emploiFile = event.target.files[0];
    setCurrentUser({ ...currentUser, emploi: emploiFile }); */
    setemploi(event.target.files[0]);
  };
  const initialTutorialState = {
    id: null,
    classe: "",
    semestre: "",

    emploi: ""
    
   
  };
  const [currentUser, setCurrentUser] = useState(initialTutorialState);

  const [state,setState]=useState(false)
  const[message,setMessage] =useState('');

  const toggle = () => setModal(!modal);
  const[result,setResult]=useState([])
 useEffect(() => {
    const fetchData = async () => {
 
        tempsService.getemploi().then(async res=>{
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
    
    
    // Upload the emploi to the server
    const formData = new FormData();
    formData.append('emploi', emploi);


   await axios.post('/upload-emploi', formData)
      .then(response => {
        console.log(response)

        console.log(response.data.message);
        // Add a new entry to the Prof table
        const prof = { 
          emploi: response.data.filename,
          classe: classe,
          semestre: semestre,
        };
        console.log(prof)
        axios.post('http://localhost:5001/addemploi', prof)
          .then(response => {
            console.log(response.data.message);
            // Update the list of entries from the Prof table
            axios.get('http://localhost:5001/getemploi')
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
  setClasse('');
  setsemestre('');
  setemploi(null);

  };
  
  

  const handleSubmit = async(e) => {
    e.preventDefault();
     const student ={emploi:currentUser.emploi,classe:currentUser.classe,semestre:currentUser.semestre}
        
     tempsService.save(student).then(res=>{ 
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
  tempsService.updateStudent(id,currentUser).then(res=>{ 
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
  tempsService.deleteemploi(tdata.id).then(res=>{
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
        <Label>emploi:</Label>
        <Input
         type="file" 
          name="emploi"
          id="emploi"
          accept="image/*"

          className="input-field"

          onChange={handleemploiChange}
        />
      </Col>
      <Col>
        <Label>Classe:</Label>
        <Input
          type="text"
          name="classe"
          id="classe"
          value={classe}
          onChange={handleClasseChange}  style={{width:'250px'}}
        />
      </Col>
      <Col>
        <Label>semestre:</Label>
        <Input
          type="text"
          name="semestre"
          id="semestre"

          value={semestre}
          onChange={handlesemestreChange} style={{width:'300px'}}
        />
      </Col>
    
       <Col>
       <Button type="submit" style={{borderRadius:30  ,marginTop:'35px',marginBottom:'10px',width:'70px',float:'flex-end'}}>OK</Button>

      </Col>
      
    </Row>
    </CardBody>
    </Card>
    </Form>

    <div>
        <Row>
    {Json && Json.filter((val)=>{
                if(searchtext==="")
                return val ;
                else if (val.emploi.toLowerCase().includes(searchtext.toLowerCase())){
                  return val
                }
              }).map((item, index)=> (
                <Col md="4" >
                
      <Card  key={index}  style={{width: '27rem' ,height:'30rem'}}>

        <CardImg top width="70%" height="70%" src={`http://localhost:5001/emplois/${item.emploi}`} alt="emploi" />
        <CardBody>
          <CardTitle>{item.classe}</CardTitle>
          <CardText>{item.semestre}</CardText>
          <Button className ="edit" id="b5" style={{marginTop:-2 ,float:"right",alignItems: 'flex-end'}}  >
                  <i className="bi bi-pencil-fill" style ={{fontSize: 20+"px",color:"yellow"}}  onClick={(e)=>editt(item,e) }></i>
                  </Button><>
                  <Button id ="b4"   onClick={(e)=>Delete(item,e)}     > 
                      <span className="trash">
                      <span></span>
                        <i></i>
            
                      </span>
                    </Button> </> 
        </CardBody>
       
      </Card>
       </Col>

    ))}</Row>
  </div>
 
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
               
                 
                  <th>semestre</th>
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
              placeholder=" classe"
              type="string"
              name="classe" id="classe"
              className="input-field"
              onChange={(e) => handleInputChange(e)}
              value={currentUser.classe}
            />   </Col>  
      

                </Row>
            
          </div>
            </td>
            <td>
 
            <Input  
              placeholder="semestre"
              type="string"
              name="semestre"
              id="semestre"
              className="input-field"
              onChange={(e) => handleInputChange(e)}
              value={currentUser.semestre}
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


 