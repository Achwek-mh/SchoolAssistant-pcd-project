import axios from 'axios';
const AUTH_API_BASE_URL = "http://localhost:5001";
class meetService{
saveonline (subject,time){
    const userData = new FormData();
    userData.append("subject", subject);
    userData.append("time", time);





    return axios.post(AUTH_API_BASE_URL +'/addonline', userData)
}

    getonline(){
        return axios.get(AUTH_API_BASE_URL+`/getonline`)
    }
    deleteonline (id){
                return axios.delete(AUTH_API_BASE_URL+`/delete/online_meet/${id}`)
            }
    updateonline (id,member ){
              return axios.put(`http://localhost:5001/update/online/${id}`,member)} 




savepresentiel (subject,time){
                const userData = new FormData();
                userData.append("subject", subject);
                userData.append("time", time);
            
            
            
            
            
                return axios.post(AUTH_API_BASE_URL +'/addpresentiel', userData)
            }
            
                getpresentiel(){
                    return axios.get(AUTH_API_BASE_URL+`/getpresentiel`)
                }
                deletepresentiel (id){
                            return axios.delete(AUTH_API_BASE_URL+`/delete/presentiel_meet/${id}`)
                        }
                updatepresentiel (id,member ){
                          return axios.put(`http://localhost:5000/update/presentiel/${id}`,member)} 

}
export default new meetService();