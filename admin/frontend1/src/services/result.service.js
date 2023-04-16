import axios from 'axios';
const AUTH_API_BASE_URL = "http://localhost:5000";
class resultService{
savepfe (Remarque,Etudiant,Moyenne){
    const userData = new FormData();
    userData.append("Remarque", Remarque);
    userData.append("Etudiant", Etudiant);
    userData.append("Moyenne", Moyenne);





    return axios.post(AUTH_API_BASE_URL +'/addresultpfe', userData)
}

    getresultpfe(){
        return axios.get(AUTH_API_BASE_URL+`/getresultpfe`)
    }
    deleteresultpfe (id){
                return axios.delete(AUTH_API_BASE_URL+`/delete/result_pfe/${id}`)
            }
    updateresultpfe (id,member ){
              return axios.put(`http://localhost:5000/update/result_pfe/${id}`,member)} 


savepcd (Remarque,Etudiant,Moyenne){
                const userData = new FormData();
                userData.append("Remarque", Remarque);
                userData.append("Etudiant", Etudiant);
                userData.append("Moyenne", Moyenne);
            
            
            
            
            
                return axios.post(AUTH_API_BASE_URL +'/addresultpcd', userData)
            }
            
                getresultpcd(){
                    return axios.get(AUTH_API_BASE_URL+`/getresultpcd`)
                }
                deleteresultpcd (id){
                            return axios.delete(AUTH_API_BASE_URL+`/delete/result_pcd/${id}`)
                        }
                updateresultpcd (id,member ){
                          return axios.put(`http://localhost:5000/update/result_pcd/${id}`,member)} 
            
            

saveexam (Etudiant,Moyenne,Remarque,nbre_credit){
                            const userData = new FormData();
                            userData.append("Etudiant", Etudiant);
                            userData.append("Moyenne", Moyenne);
                            userData.append("Remarque", Remarque);

                            userData.append("nbre_credit", nbre_credit);

                            return axios.post(AUTH_API_BASE_URL +'/addresultexam', userData)
                        }
                        
                            getresultexam(){
                                return axios.get(AUTH_API_BASE_URL+`/getresultexam`)
                            }
                            deleteresultexam (id){
                                        return axios.delete(AUTH_API_BASE_URL+`/delete/result_exam/${id}`)
                                    }
                            updateresultexam (id,member ){
                                      return axios.put(`http://localhost:5000/update/result_exam/${id}`,member)} 
                        
                        
                        
            }
export default new resultService();