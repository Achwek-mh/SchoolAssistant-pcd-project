import axios from 'axios';
const AUTH_API_BASE_URL = "http://localhost:5000";
class sujetService{
savepfe (Description,Nom,Encadrant,Domaine,Mots_clés){
    const userData = new FormData();
    userData.append("Description", Description);
    userData.append("Nom", Nom);
    userData.append("Encadrant", Encadrant);
    userData.append("Domaine", Domaine);

    userData.append("Mots_clés", Mots_clés);

    






    return axios.post(AUTH_API_BASE_URL +'/addsujetpfe', userData)
}

    getsujetpfe(){
        return axios.get(AUTH_API_BASE_URL+`/getsujetpfe`)
    }
    deletesujetpfe (id){
                return axios.delete(AUTH_API_BASE_URL+`/delete/sujet_pfe/${id}`)
            }
    updatesujetpfe (id,member ){
              return axios.put(`http://localhost:5000/update/sujet_pfe/${id}`,member)} 


savepcd (Description,Nom,Encadrant,Domaine,Mots_clés){
                const userData = new FormData();
                userData.append("Description", Description);
                userData.append("Nom", Nom);
                userData.append("Encadrant", Encadrant);
                userData.append("Domaine", Domaine);

                userData.append("Mots_clés", Mots_clés);

            
            
            
            
                return axios.post(AUTH_API_BASE_URL +'/addsujetpcd', userData)
            }
            
                getsujetpcd(){
                    return axios.get(AUTH_API_BASE_URL+`/getsujetpcd`)
                }
                deletesujetpcd (id){
                            return axios.delete(AUTH_API_BASE_URL+`/delete/sujet_pcd/${id}`)
                        }
                updatesujetpcd (id,member ){
                          return axios.put(`http://localhost:5000/update/sujet_pcd/${id}`,member)} 
            
            

                }
export default new sujetService();