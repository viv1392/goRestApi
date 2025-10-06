const{baseUrl,Headers}=require('../config/Config');

class ClientApi{

    constructor(request){
        this.request=request;
    }
    async getUserDetails(){
        return this.request.get(`${baseUrl}public/v2/users?page=1&per_page=2`,{
            headers:Headers
        });
     }
     async createUser(payload){
        return this.request.post(`${baseUrl}public/v2/users`,{
            headers:Headers,
            data:payload
        });
     }
     async getUserById(userId){ 
        return this.request.get(`${baseUrl}public/v2/users/${userId}`,{
            headers:Headers
        });  
     }
     async updateUser(userId,payLoad){
        return this.request.put(`${baseUrl}public/v2/users/${userId}`,{
            headers:Headers,
            data:payLoad
        });
       }
       async deleteUser(userId){
        return this.request.delete(`${baseUrl}public/v2/users/${userId}`,{
            headers:Headers
        });
    }   
}        
module.exports={ClientApi};              
        
    
