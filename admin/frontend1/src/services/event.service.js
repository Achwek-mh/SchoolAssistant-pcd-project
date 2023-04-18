import axios from 'axios';
const AUTH_API_BASE_URL = "http://localhost:5001";
class eventService{
save (Nom,description,Date){
    const userData = new FormData();
    userData.append("Nom", Nom);
    userData.append("description", description);
    userData.append("Date", Date);




    return axios.post(AUTH_API_BASE_URL +'/addevent', userData)
    
}

    getevent(){
        return axios.get(AUTH_API_BASE_URL+`/getevent`)
    }
    deleteevent (id){
                return axios.delete(AUTH_API_BASE_URL+`/delete/event/${id}`)
            }
    updateevent (id,member ){
              return axios.put(`http://localhost:5001/update/event/${id}`,member)} 


}
export default new eventService();