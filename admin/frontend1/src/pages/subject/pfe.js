import '../ui.scss'
import { Row, Col, Table, Card, CardTitle, CardBody, Badge,Form,FormGroup,InputGroup,InputGroupText ,Label} from "reactstrap";
import { AiOutlineSearch } from 'react-icons/ai';
import studentsService from "../../services/student.service" ;
import Swal from 'sweetalert2';
import { useState ,useEffect } from "react";
import { Input } from "reactstrap";
import { Button, Modal, ModalHeader, ModalBody } from 'reactstrap';

import { useAuthContext } from '../../shared/useAuthContext'; 
import { useDataContext } from '../../hooks/useDataContext';
import sujetService from '../../services/subjects.service';
import resultService from '../../services/result.service';
 
const Subjectpfe = () => {
  const [searchtext,setsearchtext]=useState("");
  const [modal, setModal] = useState(false);
  const [id, setId] = useState(null);
  const [submitted, setSubmitted] = useState(null);

  const { user } = useAuthContext()
 const { Data ,dispatch } = useDataContext()
   const[ Json,setjson]=useState('')


  const initialTutorialState = {
    id: null,
    Description: "",
    Nom: "",
    Encadrant:"",
    Domaine:"",
    Mots_clés:""
    
   
  };
  const [currentUser, setCurrentUser] = useState(initialTutorialState);

  const [state,setState]=useState(false)
  const[message,setMessage] =useState('');

  const toggle = () => setModal(!modal);
  const[result,setResult]=useState([])
 useEffect(() => {
    const fetchData = async () => {
 
      sujetService.getsujetpcd().then(async res=>{
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
     const pfe ={Description:currentUser.Description,Nom:currentUser.Nom,Encadrant:currentUser.Encadrant,Mots_clés:currentUser.Mots_clés,Domaine:currentUser.Domaine}
        sujetService.savepfe(pfe).then(res=>{ 
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
  sujetService.updatesujetpfe(id,currentUser).then(res=>{ 
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
  resultService.dSubject(tdata.id).then(res=>{
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
       
        <Card className="card1"  >
          <CardTitle tag="h6" className="border-bottom p-3 mb-0">
            <i className="bi bi-card-text me-2"> </i>
            Members
          </CardTitle>
          <CardBody className="cardbody11" >
          <Row onSubmit={handleSubmit}>
   
      
      <Col>
        <Label>Description:</Label>
        <Input
          type="text"
          name="Description"
          id="Description"

          value={currentUser.Description}
          onChange={(e) => handleInputChange(e)} style={{width:'250px'}}
        />
      </Col>
      <Col>
        <Label>Nom:</Label>
        <Input
          type="text"
          name="Nom"
          id="Nom"

          value={currentUser.Nom}
          onChange={(e) => handleInputChange(e)} style={{width:'300px'}}
        />
      </Col>
      
     
      <Col >
        <Label>Encadrant:</Label>
        <Input
          type="text"
          name="Encadrant"
          id="Encadrant"

          value={currentUser.Encadrant}
          onChange={(e) => handleInputChange(e)} style={{width:'250px'}}
        />
      </Col>
      <Col >
        <Label>Domaine:</Label>
        <Input
          type="text"
          name="Domaine"
          id="Domaine"

          value={currentUser.Domaine}
          onChange={(e) => handleInputChange(e)} style={{width:'250px'}}
        />
      </Col>
      <Col >
        <Label>Mots_clés:</Label>
        <Input
          type="text"
          name="Mots_clés"
          id="Mots_clés"

          value={currentUser.Mots_clés}
          onChange={(e) => handleInputChange(e)} style={{width:'250px'}}
        />
      </Col>
       <Col>
       <Button type="submit" style={{borderRadius:30  ,marginTop:'35px',marginBottom:'10px',width:'70px',float:'flex-end'}}>OK</Button>

      </Col>
      
    </Row>
    </CardBody>
    </Card>
    </Form>

    <Card className="card1" >
    <CardBody className="cardbody1" >

            <Table className="no-wrap  align-middle" responsive borderless >
              <thead>
                <tr>
                  <th>#</th>
                  <th>Name</th>
                  <th>Nom</th>
                  <th>Encadrant</th>


                  <th>Mots clés</th>


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
                    
                  <td>{tdata && tdata.Description}</td>
            <td style={{width:400}}>{tdata && tdata.Nom}</td>
            <td >{tdata && tdata.Encadrant}</td>

            <td >{tdata && tdata.Mots_clés}</td>




            
            <td style={{width:"180px",float:"left"}}> <><Button className ="edit" id="b5" style={{marginTop:-2 ,float:"right",alignItems: 'flex-end'}}  >
                  <i className="bi bi-pencil-fill" style ={{fontSize: 20+"px",color:"yellow"}}  onClick={(e)=>editt(tdata,e) } ></i>
                  
                
                </Button> 
              
                <Button id ="b4"  onClick={(e)=>Delete(tdata,e)}     > 
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
    <thead>
                <tr>
                  <th className ="th"> Name</th>
                  <th>Nom</th>
                  <th>Encadrant</th>

                  <th>Domaine</th>

                  <th>Mots clés</th>
                 

                
                  
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
              placeholder="Description"
              type="string"
              name="Description"
              className="input-field"
              onChange={(e) => handleInputChange(e)}
              value={currentUser.Description}
            />
       

      
          </td>
            <td>
 
 <Input 
   placeholder="Encadrant"
   type="string"
   name="Encadrant"
   className="input-field"
   onChange={(e) => handleInputChange(e)}
   value={currentUser.Encadrant}
   required
 > 
                </Input>  </td>
                <td>
 
 <Input 
   placeholder="Domaine"
   type="string"
   name="Domaine"
   className="input-field"
   onChange={(e) => handleInputChange(e)}
   value={currentUser.Domaine}
   required
 > 
                </Input>  </td>
                
                <td>
 
 <Input 
   placeholder="Mots_clés"
   type="string"
   name="Mots_clés"
   className="input-field"
   onChange={(e) => handleInputChange(e)}
   value={currentUser.Mots_clés}
   required
 > 
                </Input>  </td>
                     
    


       
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

export default Subjectpfe;
