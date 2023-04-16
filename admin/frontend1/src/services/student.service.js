import axios from 'axios';
const AUTH_API_BASE_URL = "http://localhost:5000";
class studentsService{
save (Image,Nom,Info,Email,etudiantcol){
    const userData = new FormData();
    userData.append("Image", Image);
    userData.append("Nom", Nom);
    userData.append("Info", Info);
    userData.append("Email", Email);




    return axios.post(AUTH_API_BASE_URL +'/addstudent', userData)
}

    getStudents(){
        return axios.get(AUTH_API_BASE_URL+`/getstudent`)
    }
    deleteStudent (id){
                return axios.delete(AUTH_API_BASE_URL+`/delete/student/${id}`)
            }
    updateStudent (id,member ){
              return axios.put(`http://localhost:5000/update/student/${id}`,member)} 


}
export default new studentsService();