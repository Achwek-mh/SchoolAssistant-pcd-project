/* import axios from 'axios';
const AUTH_API_BASE_URL = "http://localhost:3002/api";

class UsersService{

 register(user){
    return axios.post(AUTH_API_BASE_URL +'/register', user);
    }

login(authCredentials) {
  return axios.post(AUTH_API_BASE_URL+'/authenticate',authCredentials) }
 

save(user) {
  return axios.post(AUTH_API_BASE_URL+'/save',user) }

setToken(token ){
        localStorage.setItem('token',token);}
        
    
      
deleteToken() {
  localStorage.removeItem('token');}
    
isLoggedIn() {
            var userPayload = this.getUserPayload();
            if (userPayload)
             return true
              //userPayload.exp > Date.now() / 1000;
            else
              return false;
              //return (this.getUserPayload)
    }
usersProfile(){
    return axios.get(AUTH_API_BASE_URL+'/usersProfile')}  
  
  contactsProfile(){
      return axios.get(AUTH_API_BASE_URL+'/contacts')}  
      send(email,elements){
        return axios.post(AUTH_API_BASE_URL+'/send/'+`${email}`,elements)
      }
getUserPayload() {
            var token = this.getToken();
            if (token) {
              var userPayload = atob(token.split('.')[1]);
              return JSON.parse(userPayload);
            }
            else
              return null;
          }
getToken() {
 return localStorage.getItem('token');}
          
getUserProfile(id ) {
    return axios.get(AUTH_API_BASE_URL + `/userProfile/${id}` ); }

deleteUser (id){
            return axios.delete(AUTH_API_BASE_URL+`/user/${id}`)
        }
update (id,user ){
          return axios.put(AUTH_API_BASE_URL+`/user/${id}`,user)}
        
updateEmail(email,user){
            return axios.put(AUTH_API_BASE_URL+`/usersupdate/${email}`,user)}  

userProfile2(email){
return axios.get(AUTH_API_BASE_URL+`/userbyemail/${email}`)}
}
export default new UsersService();
 */