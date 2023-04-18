import axios from 'axios';
const AUTH_API_BASE_URL = "http://localhost:5001";
class tempsService{
    saveemploi (emploi,classe,semestre){
        const userData = new FormData();
        userData.append("emploi", emploi);
        userData.append("classe", classe);
        userData.append("semestre", semestre);
    
    
    
        
    
    
    
    
    
    
        return axios.post(AUTH_API_BASE_URL +'/addemploi', userData)
    }
    
getemploi(){
            return axios.get(AUTH_API_BASE_URL+`/getemploi`)
        }


        deleteemploi (id){
            return axios.delete(AUTH_API_BASE_URL+`/delete/emploi/${id}`)
        }
updateexam (id,member ){
          return axios.put(`http://localhost:5001/update/emploi/${id}`,member)} 












saveexam  (type,emploi,classe,semestre){
    const userData = new FormData();
    userData.append("type", type);

    userData.append("emploi", emploi);
    userData.append("classe", classe);
    userData.append("semestre", semestre);



    






    return axios.post(AUTH_API_BASE_URL +'/addemploiexam', userData)
}

    getemploiexam(){
        return axios.get(AUTH_API_BASE_URL+`/getemploiexam`)
    }
    deleteexam (id){
                return axios.delete(AUTH_API_BASE_URL+`/delete/emploiexam/${id}`)
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
export default new tempsService();