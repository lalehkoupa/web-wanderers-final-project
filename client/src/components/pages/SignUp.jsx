import React, { useState} from "react";
import Button from "../atoms/Button";
import Form from "../molecules/Form";
import { useParams } from "react-router-dom";
import _ from "lodash";
 
 
 
 
const SignUp = () => {
 const [error, setError] = useState(null);
 const [form, setForm] = useState({
   firstName: "",
   lastName: "",
   email: "",
   phoneNumber: ""
 });
 const[success,setSuccess]=useState(false);
 
 let { id, jobTitle, day, month, year, time } = useParams();
 let date = `${day}/${month}/${year}`;
 const jobObj = {"jobId":parseInt(id)}
 
 const data=_.merge({},form,jobObj);       
 
 const handleSubmit = async (event) => {
   event.preventDefault();
   setError(null);
 
   if (validateForm()) {
     try {
        const res= await fetch("http://localhost:8000/api/user/signUpForJob ", {
 
         method: "POST",
         headers: { "Content-Type": "application/json" },
         body: JSON.stringify(data),
       });
      const resData=await res.json();
       if(res.status!==200){
         setSuccess(false);
         setError(resData.msg);
         emptyFields();
       }else{
         setSuccess(true);
         window.scrollTo(0, 0);
       }
        
    
      
     } catch (error) {
       console.log("Error", error);
       setError(error);
     }
   }
 };
 
 const handleChange = (key, value) => {
   setForm({ ...form, [key]: value });
 };
 
 const validateForm = () => {
   if (!form.firstName || !form.lastName || !form.email || !form.phoneNumber) {
     setError("It's mandatory to fill up all fields");
     return false;
   }
   if (!form.email.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i)) {
     setError("Please enter the valid email address");
     return false;
   } else {
     return true;
   }
 };
 
 const emptyFields = () => {
   setForm({
     firstName: "",
     lastName: "",
     email: "",
     phoneNumber: "",
   });
 };
 
 return (
   <div>
     {!success ? (
       <div className="sign-up">
       <div className="sign_up_info_banner">
         <h4>Sign Me Up For</h4>
         <div className="flex sign-up-date-time">
           <p>
             <span>Date:</span>
             {date}
           </p>
           <p>
             <span>Time:</span>
             {time}
           </p>
         </div>
 
         <p>
           <span>Volunteer Role:</span>
           {jobTitle}
         </p>
       </div>
       <div className="sign-up-fields">
         <h4>My Contact Info</h4>
         <p>All Fields are Mandatory*</p>
         <Form onChange={handleChange} formData={form} />
         {/* <div className="flex">
           <p>Already have an account?</p>
          <Button
             handleClick={handleLogin}
             text="Login"
             className="form-login-btn"
           />
         </div>*/}
         {error ? <p className="sign-up-err">{error}</p> : null}
         <Button
           handleClick={handleSubmit}
           text="Sign Up Now!"
           className="form-sign-up-btn"
         />
       </div>
     </div>
     ):(
       <p className="confirmationEmail">Thanks for applying for a role in akwaaba, you will receive a confirmation email shortly</p>
     )
     }
    
   </div>
 );
};
 
export default SignUp;
 
 

