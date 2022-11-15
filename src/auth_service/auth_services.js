import jwtDecode from "jwt-decode";

const getCurrentUser = () => {
  if (localStorage.getItem("user")) {
    return true;
  } else {
    return false;
  }
};
const getUserType = () => {
  if (localStorage.getItem("user")) {
    const { userType } = jwtDecode(localStorage.user);
    return userType;
  } else {
    return null;
  }
};

const getUserName = () => {
  if (localStorage.getItem("user")) {
    const { userName } = jwtDecode(localStorage.user);
    return userName;
  } else {
    return null;
  }
};


const getIntID = () => {
  if (localStorage.getItem("user")) {
    const { intId } = jwtDecode(localStorage.user);
    return intId;
  } else {
    return null;
  }
};

const getWardID = () => {
  if (localStorage.getItem("user")) {
    const { wardID } = jwtDecode(localStorage.user);
    return wardID;
  } else {
    return null;
  }
};

const getUserID= () => {
  if (localStorage.getItem("user")) {
    const { userID } = jwtDecode(localStorage.user);
    return userID;
  } else {
    return null;
  }
};

const logOut = () => {
  if (localStorage.getItem("user")) {
    localStorage.removeItem("user");
    
    return true;
  } else {
    return false;
  }
};

const getUserToken = () => {
  if (localStorage.getItem("user")) {
    return localStorage.getItem("user");
  } else {
    return null;
  }
};


const getWardInt=()=>{
  if(localStorage.getItem("user")){
    const {wardID}=jwtDecode(localStorage.user);
    return wardID
  }else{
    return null;
  }
}
const authService = {
  getCurrentUser,
  getUserToken,
  getUserToken,
  logOut,
  getUserName,
  getUserType,
  getFirstName,
  getLastName,
  getIntID,
  getWardID,
  getUserID

};

export default authService;
