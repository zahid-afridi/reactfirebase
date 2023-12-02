import React, { useEffect, useState } from 'react';
import axios from 'axios';
import API_URL from '../../Axios/Axios';
import CreateGroup from '../Component/CreateGroup';
import { ToastContainer, toast } from 'react-toastify';


import { Link, Outlet } from 'react-router-dom';
import Groups from '../Component/Groups';


export default function Admin() {
  const [getdata, setGetdata] = useState();
  const [creategroup, setCreateGroup] = useState(false);
  const [userdata, setUserdata] = useState(false);
  const [group, setGroup] = useState(false);
  const [groupData, setGroupData] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [selectedGroupId, setSelectedGroupId] = useState('');
  const [userGroupAssociations, setUserGroupAssociations] = useState([]);

  useEffect(() => {
    // Fetch data from local storage when the component mounts
    const storedData = localStorage.getItem('userData');
    if (storedData) {
      const parsedData = JSON.parse(storedData);
      setGetdata(parsedData);
    }
  }, []);

  const handleClick = async () => {
    try {
      const getuser = await axios.post(API_URL + 'admin/users');
      const responseData = getuser.data;
      if (responseData.success) {
        // Store the response in local storage
        localStorage.setItem('userData', JSON.stringify(responseData));
        setGetdata(responseData);
        setUserdata(!userdata);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleshowGroup = () => {
    setCreateGroup(!creategroup);
  };

  const handleGroups = async () => {
   setGroup(!group);
  };
  useEffect(() => {
    const getGroups=async()=>{
            try {
      const groupDataResponse = await axios.post(API_URL + 'admin/get-groups');
      const responseData = groupDataResponse.data;

      if (responseData.success) {
        const groups = responseData.data;
        setGroupData(groups);
        
      } else {
        setGroupData([]);
        setGroup(false);
      }
    } catch (error) {
      console.error('Error fetching group data:', error);
    }
    }
    getGroups()
  
  }, [])
  

  const handleUserCheckboxChange = (userId) => {
  const updatedUsers = selectedUsers.includes(userId)
    ? selectedUsers.filter((id) => id !== userId)
    : [...selectedUsers, userId];

  const updatedAssociations = updatedUsers.map((user_id) => ({
    user_id,
    group_id: selectedGroupId,
  }));

  setUserGroupAssociations(updatedAssociations);
  setSelectedUsers(updatedUsers);
};

const handleSelectAllUsers = () => {
  if (getdata && getdata.success) {
    const allUserIds = getdata.users.map((user) => user.id);
    const updatedAssociations = allUserIds.map((user_id) => ({
      user_id,
      group_id: selectedGroupId,
    }));

    setUserGroupAssociations(updatedAssociations);
    setSelectedUsers(allUserIds);
  } else {
    setSelectedUsers([]);
  }
};


useEffect(() => {
  const updatedAssociations = selectedUsers.map((user_id) => ({
    user_id,
    group_id: selectedGroupId,
  }));

  setUserGroupAssociations(updatedAssociations);
}, [selectedGroupId, selectedUsers]);


  const handleAddUser = async () => {
    try {
      // Send the userGroupAssociations to the API
      const response = await axios.post(API_URL + 'admin/group/add-user', userGroupAssociations);
      console.log('API Response:', response.data);
      const Adduserresponse=response.data
      if (Adduserresponse.success) {
       
           toast.success(Adduserresponse.message)
      }else{
toast.error(Adduserresponse.message || "Invalid email or password",)
    }
      // You can handle the API response as needed
    } catch (error) {
      console.error('Error adding users to groups:', error);
       toast.error(
      error.response?.data?.message || "An error occurred. Please try again later.")
    }
       console.log(userGroupAssociations)
  };

  
  return (
    <>
    <ToastContainer position='top-right' autoClose="2000" hideProgressBar={false}
            closeOnClick={true} pauseOnHover={true} draggable={true} ></ToastContainer>
      <div className='container'>
        <div className='d-flex justify-content-around my-4'>
          <button type='button' className='btn btn-primary btn-lg'>
            User
          </button>
          <button type='button' className='btn btn-primary btn-lg' onClick={handleClick}>
            All User
          </button>
          <button type='button' className='btn btn-primary btn-lg' onClick={handleGroups}>
            Groups
          </button>
          <button type='button' className='btn btn-primary btn-lg' onClick={handleshowGroup}>
            Create Group
          </button>
          <Link to='sendNotficaiton'>
             <button type='button' className='btn btn-primary btn-lg'>
           Send Notificaiton
          </button>
          </Link>
        </div>
     
           
     {/* create gorup componet */}
        <CreateGroup creategroup={creategroup}></CreateGroup>
     {/* create gorup emd */}

     {/* gorups featch */}
        <Groups group={group}></Groups>
     {/* gorups featch end */}

        {userdata && (
          <div>
            {getdata && getdata.success && (
              <div className='user-data container-sm'>
                <h2>User Data:</h2>
                <div>
                  <label>
                    <input
                      type='checkbox'
                      onChange={handleSelectAllUsers}
                      checked={selectedUsers.length === getdata.users.length}
                    />
                    Select All
                  </label>
                </div>
                {getdata.users.map((user) => (
                  <div key={user.id} className='card mb-2'>
                    <div className='card-body'>
                      <label>
                        <input
                          type='checkbox'
                          onChange={() => handleUserCheckboxChange(user.id)}
                          checked={selectedUsers.includes(user.id)}
                        />
                        {user.name}, {user.email}
                      </label>
                    </div>
                  </div>
                ))}
   <select
  className="form-select"
  aria-label="Select Group"
  value={selectedGroupId}
  onChange={(e) => setSelectedGroupId(e.target.value)}
>
  <option value="" disabled>Select Group</option>
  {groupData.map((group) => (
    <option key={group.id} value={group.id}>
      {group.group_name}
    </option>
  ))}
</select>




                <button className='btn btn-primary btn-lg mt-4' onClick={handleAddUser}>
                  Add user
                </button>
              </div>
            )}
          </div>
        )}

      
   
      </div>
      
   <Outlet></Outlet>
    </>
  );
}
