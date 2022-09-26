import Axios from "axios";

function signup(user){
    return Axios({
        method: "POST",
        url: "http://localhost:3500/testAPI",
        
        data:user
    })
}

export default signup
