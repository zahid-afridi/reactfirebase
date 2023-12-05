import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import API_URL from '../../Axios/Axios';

export default function SendNotification() {
  const [users, setUsers] = useState([]);
  const [groupData, setGroupData] = useState([]);
  const [selectedData, setSelectedData] = useState({
    selectedUsers: [],
    selectedGroup: '',  // Changed to selectedGroup instead of selectedGroups
    message: '',
  });

  // useEffect(() => {
  //   const fetchUsers = async () => {
  //     try {
  //       const response = await axios.post(API_URL + 'admin/users');
  //       if (response.data.success) {
  //         setUsers(response.data.users);
  //         // console.log(response.data)
  //       } else {
  //         console.error('Failed to fetch users:', response.data.message);
  //       }
  //     } catch (error) {
  //       console.error('Error fetching users:', error);
  //     }
  //   };
  //    const fetchDataInterval = setInterval(() => {
  //     fetchUsers();
  //   }, 3000);

  //   // Clear the interval when the component unmounts
  //   return () => clearInterval(fetchDataInterval);
  // }, []);

  const handleUserCheckboxChange = (userId) => {
    const updatedUsers = selectedData.selectedUsers.includes(userId)
      ? selectedData.selectedUsers.filter((id) => id !== userId)
      : [...selectedData.selectedUsers, userId];

    setSelectedData({
      ...selectedData,
      selectedUsers: updatedUsers,
    });
  };

  const handleGroupChange = async(groupId) => {
    setSelectedData({
      ...selectedData,
      selectedGroup: groupId,
    });
    const GroupId=groupId
     try {
       const SendId=await axios.post(API_URL +"admin/group/users/"+GroupId)
      const Postdata=SendId.data;
      if (Postdata.success) {
        const userId2 = GroupId;
         localStorage.setItem("userId", userId2);
           setUsers(SendId.data.users);
           console.log(Postdata)
      }
     } catch (error) {
      console.log(error)
     }
  };

  const handleSelectAllUsers = () => {
    const allUserIds = users.map((user) => user.id);

    setSelectedData({
      ...selectedData,
      selectedUsers: allUserIds,
    });
  };

  const handleSendNotification = async (e) => {
    e.preventDefault();

    try {
      const requestData = {
        message: selectedData.message,
        users: selectedData.selectedUsers.map((id) => ({ id })),
        group: selectedData.selectedGroup, // Changed to selectedGroup instead of selectedGroups
      };

      // Send the selected user IDs, group ID, and message to the API
      const response = await axios.post(API_URL + 'admin/send-notification', requestData);

      console.log('API Response:', response.data);

      if (response.data.success) {
        toast.success(response.data.message);
      } else {
        console.error('Failed to send notification:', response.data.message);
      }
    } catch (error) {
      console.error('Error sending notification:', error);
    }
  };

  const fetchData = async () => {
    try {
      const groupDataResponse = await axios.post(API_URL + 'admin/get-groups');
      const responseData = groupDataResponse.data;

      if (responseData.success) {
        const groups = responseData.data;
        setGroupData(groups);
      } else {
        setGroupData([]);
      }
    } catch (error) {
      console.error('Error fetching group data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose="2000"
        hideProgressBar={false}
        pauseOnHover={true}
        draggable={true}
      ></ToastContainer>

      <div className="container mt-4">
        <h2 className="mb-4">Send Notification</h2>
        <div>
            <h3>Select Group:</h3>
            <select
              className="form-select"
              aria-label="Select Group"
              value={selectedData.selectedGroup}
              onChange={(e) => handleGroupChange(e.target.value)}
            >
              <option value="" disabled>Select Group</option>
              {groupData.map((group) => (
                <option key={group.id} value={group.id}>
                  {group.group_name}
                </option>
              ))}
            </select>
          <h3 className='mt-5'>All Users:</h3>
       
          <ul className="list-group">
            {users.map((user) => (
              
              <li key={user.id} className="list-group-item">
                <label>
                  <input
                    type="checkbox"
                    onChange={() => handleUserCheckboxChange(user.id)}
                    checked={selectedData.selectedUsers.includes(user.id)}
                  />
                  <strong>Name:</strong> {user.name}, <strong>Email:</strong> {user.email}
                </label>
              </li>
            ))}
          </ul>

          <form className="mt-5" onSubmit={handleSendNotification}>
          

            <label htmlFor="">Write Your Message</label>
            <input
              style={{ height: '50px', border: '2px solid blue', outline: 'none', padding: '10px' }}
              type="text"
              value={selectedData.message}
              onChange={(e) => setSelectedData({ ...selectedData, message: e.target.value })}
            />

            <button type="submit" className="btn btn-primary">
              Send Notification
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
