import axios from 'axios';
const AUTH_API_BASE_URL = "http://localhost:5001";
class profService{
save (Image,Nom,Info,Contact,Email){
    const userData = new FormData();
    userData.append("Image", Image);
    userData.append("Nom", Nom);
    userData.append("Info", Info);
    userData.append("Contact", Contact);
    userData.append("Email", Email);




    return axios.post(AUTH_API_BASE_URL +'/addprof', userData)
}

    getProf(){
        return axios.get(AUTH_API_BASE_URL+`/getprof`)
    }
    deleteProf (id){
                return axios.delete(AUTH_API_BASE_URL+`/delete/prof/${id}`)
            }
    updateProf (id,member ){
              return axios.put(`http://localhost:5001/update/prof/${id}`,member)} 


}
export default new profService();