import "./auth.scss"
import { useState  ,useEffect} from "react"
import { Card ,CardBody, CardTitle  ,CardText,Label   } from "reactstrap";
import { Input,InputGroup,   InputGroupText } from "reactstrap";
import { useLogin } from "../hooks/useLogin";
import { Alert } from "reactstrap";

const Login = () => {
  const {login, error} = useLogin();
  const [submitted,setSubmitted]=useState(false);

  const [email , setemail]=useState('');
  const [password , setpassword]=useState('');
  const render =()=>{
    if(submitted){
      
      if(error !==''){
        return <Alert  color="danger">{error}</Alert>
      } 
     
    
    }
   
  }
  const handleSubmit = async(e)=>{
    e.preventDefault() ;
   
  await login(email,password)
  setSubmitted(true) ;
  render();
  }   



  return (
    <div className="login">  
    <div className="part1">
       <Card className=" border-0 shadow part1">
       <CardBody>
      
         <CardText>  
       
     
   <form onSubmit={handleSubmit}>

    

  <Label className="hey">email</Label>
  <InputGroup>
  <InputGroupText className="l1">
  <i className="bi bi-envelope"></i>
                   </InputGroupText>
   <Input   className="form-control-alternative textt" type="email" required value ={email} onChange={(e)=>setemail(e.target.value)}/>
                 
                 </InputGroup>
                 <Label className="hey">Password</Label>
    <InputGroup>
    <InputGroupText className="l1">
    <i className="bi bi-key"></i>
                        </InputGroupText>
    <Input   className="form-control-alternative textt" type="password" required value ={password} onChange={(e)=>setpassword(e.target.value)}/>
  
                  
                  </InputGroup>
   
   <button>login</button>
</form>  
</CardText >
</CardBody>
{render()}

</Card></div>




</div>
);
}

export default Login;  
