import Axios from "axios";
import authService from "../../auth_service/auth_services";
function signup(user) {
  return Axios({
    method: "POST",
    url: "http://localhost:5000/signin",

    data: user,
    headers: { "x-auth-token": authService.getUserToken },
  });
}

export default signup;
