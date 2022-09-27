import Axios from "axios";

function signup(user){
    return Axios({
        method: "POST",
        url: "http://localhost:5000/testAPI",
        
        data:user
    })
}

export default signup
