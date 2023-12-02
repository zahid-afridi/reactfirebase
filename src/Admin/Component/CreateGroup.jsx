import React, { useState } from 'react'
import axios from 'axios'
import API_URL from '../../Axios/Axios'
  import { ToastContainer, toast } from 'react-toastify';
export default function CreateGroup({creategroup}) {
    const [value,setValue]=useState({
         group_name:'',
        group_description:''})
    const handlechange=(e)=>{
        
          setValue({
            ...value,
            [e.target.name]:e.target.value
          })
    }
const handleSumbite = async (e) => {
  try {
    e.preventDefault();
    const response = await axios.post(API_URL +'admin/usergroup',value)
    const responseData=response.data
    console.log(response.data);
    if (responseData.success) {
      
      toast.success(responseData.message)
    }else{
toast.error(responseData.message || "Invalid email or password",)
    }
  } catch (error) {
    console.log(error);
   toast.error(
      error.response?.data?.message || "An error occurred. Please try again later.")
  }
};

  return (
   <>
            <ToastContainer position='top-right' autoClose="2000" hideProgressBar={false}
            closeOnClick={true} pauseOnHover={true} draggable={true} ></ToastContainer>
    {/* create groups */}
                     {creategroup && (
                        <form onSubmit={handleSumbite}>
              <label className="form-label" htmlFor="form2Example1">
               Enter Group Name
              </label>
              <div className="form-outline mb-4">
             <input
  type="text"
  id="form2Example1"
  className="form-control"
  placeholder="Enter Group Name"
  onChange={handlechange}
  value={value.group_name}
  name="group_name"
/>

              </div>
                 <label className="form-label" htmlFor="form2Example1">
               Enter Description
              </label>
              <div className="form-outline mb-4">
            <input
  type="text"
  id="form2Example1"
  className="form-control"
  placeholder="Enter Group Description"
  value={value.group_description}
  onChange={handlechange}
  name="group_description"
/>

              </div>
                 <button type="submit" className="btn btn-primary btn-block mb-4">
             Creat Group
              </button>
              </form>
                     )}
                {/* ///end */}
   
   </>
  )
}
