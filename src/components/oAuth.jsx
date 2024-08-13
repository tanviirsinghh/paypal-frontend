import { useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from "react-hot-toast";

function OAuth() {
  const [ user, setUser ] = useState([]);
  // const [profile, setProfile] = useState(null);
  const navigate = useNavigate()
 

  const handleLoginSuccess = useGoogleLogin({

    onSuccess: (codeResponse) => setUser(codeResponse),
    
   
    onError: (error) => console.log('Login Failed:', error)
    
});

//   const handleLoginFailure = (error) => {
//     console.error('Login Failure:', error);
//   };

useEffect(() => {
  const fetchUserData = async ()=>{
      if (user && user.access_token) {
  try{
          const res = await axios
              .get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`, {
                  headers: {
                      Authorization: `Bearer ${user.access_token}`,
                      Accept: 'application/json'
                  }
              })
             
                  // setProfile(res.data);
                  const { id, email, given_name, family_name, name } = res.data;
                  
                  const postData = await axios.post('http://127.0.0.1:5050/auth/oAuth',{
                    id, 
                    email,
                     given_name, 
                     family_name,
                      name, 
                      // picture 
                  })
                
               
                  localStorage.setItem("token", postData.data.data.token)
                  toast.success("Login with Google Successfull")
                   return navigate("/");

             
            }catch (err) {
              console.error('Error fetching or storing user data:', err);
            }
      }
    }
    fetchUserData();
  },
  [ user ]);




  return (
    <>
     
      <button className = "login-button" onClick={() => handleLoginSuccess()}>Sign in with Google 🚀 </button>
      
    </>
  );
}

export default OAuth;