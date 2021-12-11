const BaseURL = "http://proj4.ruppin-tech.co.il";

export const DeletePost = `${BaseURL}/DeletePost/`; // -DELETE add the ID
export const GetAllPosts = `${BaseURL}/GetAllPosts` //get all
export const GetPostById = `${BaseURL}/GetPostById/`; // -GET add the ID
export const PostsControllerURLS = {
    DeletePost,
    GetAllPosts,
    GetPostById,
};


export const GetAllUsers = `${BaseURL}/GetAllUsers`; // -GET
export const GetUserById = `${BaseURL}/GetUserById/`; // -GET add the ID
export const GetUserByEmailAndPassword = `${BaseURL}/GetUserByEmailAndPassword`; //GET add query string user and password
export const InsertNewUser = `${BaseURL}/InsertNewUser`; // -POST
export const UpdateUser = `${BaseURL}/UpdateUser`; // -PUT
export const DeleteUser = `${BaseURL}/DeleteUser/`; // -DELETE add the ID
export const DeleteAmuta = `${BaseURL}/DeleteAmuta/`; // -DELETE add the ID

export const UserControllerURLS = {
  GetAllUsers,
  GetUserById,
  GetUserByEmailAndPassword,
  InsertNewUser,
  UpdateUser,
  DeleteUser,
  DeleteAmuta,
};

export const UserForgotPassword = `${BaseURL}/UserForgotPassword`; // -POST MUST SEND ON BODY OBJECT WITH { string Email ,string Password ,string Key }
export const PasswordResetRequest = `${BaseURL}/PasswordResetRequest?email=`; //-GET add email 
