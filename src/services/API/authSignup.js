import Axios from "axios";

function signup(){
    return Axios({
    method: "POST",
    url: "http://localhost:3500/testAPI",
    data:{
      firstName:"abc",
    }});
}
