import Axios from "axios";
import authService from "../../auth_service/auth_services";
import config from '../../config.json';
function signup(user) {
  const APIEndpoint=config.DOMAIN_NAME;
  return Axios({
    method: "POST",
    url: APIEndpoint+"/signin",

    data: user,
    headers: { "x-auth-token": authService.getUserToken },
  });
}

export default signup;
