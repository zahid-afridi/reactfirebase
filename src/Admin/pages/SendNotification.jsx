import React, { useEffect, useState } from 'react';
import axios from 'axios';
import API_URL from '../../Axios/Axios';

export default function SendNotification() {
  const [users, setUsers] = useState([]);
  const [selectedData, setSelectedData] = useState({
    selectedUsers: [],
    message: '',
  });

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.post(API_URL + 'admin/users');
        if (response.data.success) {
          setUsers(response.data.users);
        } else {
          console.error('Failed to fetch users:', response.data.message);
        }
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

  const handleUserCheckboxChange = (userId) => {
    const updatedUsers = selectedData.selectedUsers.includes(userId)
      ? selectedData.selectedUsers.filter((id) => id !== userId)
      : [...selectedData.selectedUsers, userId];

    setSelectedData({
      ...selectedData,
      selectedUsers: updatedUsers,
    });
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
        users: selectedData.selectedUsers.map(id => ({ id })),
      };

      // Send the selected user IDs and message to the API
      const response = await axios.post(API_URL + 'admin/send-notification', requestData);

      console.log('API Response:', response.data);

      if (response.data.success) {
        // Handle success, show a success message or update the UI
        alert(response.data.message)
      } else {
        // Handle failure, show an error message or update the UI
        console.error('Failed to send notification:', response.data.message);
      }
    } catch (error) {
      console.error('Error sending notification:', error);
      // Handle error, show an error message or update the UI
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Send Notification</h2>
      <div>
        <h3>All Users:</h3>
        <label>
          <input
            type="checkbox"
            onChange={handleSelectAllUsers}
            checked={selectedData.selectedUsers.length === users.length}
          />
          Select All Users
        </label>
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

        <form className='mt-5' onSubmit={handleSendNotification}>
          <label htmlFor="">Write Your Message</label>
          <input
        style={{height:'50px',border:'2px solid blue',outline:"none",padding:'10px'}}
            type="text"
            value={selectedData.message}
            onChange={(e) => setSelectedData({ ...selectedData, message: e.target.value })}
          />

          <button type="submit" className='btn btn-primary'>Send Notification</button>
        </form>
      </div>
      {/* Rest of your component */}
    </div>
  );
}
