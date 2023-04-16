import axios from 'axios';
const AUTH_API_BASE_URL = "http://localhost:5000";
class sujetService{
saveexam (schedule){
    const userData = new FormData();
    userData.append("schedule", schedule);
  

    






    return axios.post(AUTH_API_BASE_URL +'/addexam', userData)
}

    getexam(){
        return axios.get(AUTH_API_BASE_URL+`/getexam`)
    }
    deleteexam (id){
                return axios.delete(AUTH_API_BASE_URL+`/delete/exam/${id}`)
            }
    updateexam (id,member ){
              return axios.put(`http://localhost:5000/update/exam/${id}`,member)} 


saveds (schedule){
                const userData = new FormData();
                userData.append("schedule", schedule);
              
            
            
            
            
                return axios.post(AUTH_API_BASE_URL +'/addds', userData)
            }
            
                getsujetds(){
                    return axios.get(AUTH_API_BASE_URL+`/getds`)
                }
                deletesujetds (id){
                            return axios.delete(AUTH_API_BASE_URL+`/delete/ds/${id}`)
                        }
                updatesujetds (id,member ){
                          return axios.put(`http://localhost:5000/update/ds/${id}`,member)} 
            
            

                        
                        
            }
export default new sujetService();