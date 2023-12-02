import React, { useEffect, useState } from 'react';
import axios from 'axios';
import API_URL from '../../Axios/Axios';
import { ToastContainer, toast } from 'react-toastify';
export default function Groups({ group }) {
  const [groupData, setGroupData] = useState([]);
  const [modal, setModal] = useState(false);
  const [editGroup, setEditGroup] = useState({
    id: null,
    group_name: '',
    group_description: '',
  });

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
    // const intervalId = setInterval(() => {
    //   fetchData(); 
    // }, 5000);

    // return () => clearInterval(intervalId); 
    fetchData()
  }, []); 

  const handleUpdate = async (id) => {
    try {
      const groupsId = await axios.post(API_URL + 'admin/group/edit/' + id);
      const responseData = groupsId.data;

      if (responseData.success) {
        const { id, group_name, group_description } = responseData.data;
        setEditGroup({
          id,
          group_name: group_name,
          group_description: group_description,
        });
        setModal(true);
      } else {
        console.error('Failed to get group data:', responseData.message);
      }
    } catch (error) {
      console.error('Error updating group:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditGroup((prevEditGroup) => ({
      ...prevEditGroup,
      [name]: value,
    }));
  };

const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    // Include the group ID in the URL for the PUT request
    const updateGroup = await axios.put(
      API_URL + 'admin/usergroup/' + editGroup.id,
      editGroup
    );
     
    const response = updateGroup.data;
    if (response.success) {
          toast.success(response.message)
      setModal(false);
      console.log(response);
    }else(
      toast.error(response.message || "Invalid email or password",)
    )
  } catch (error) {
 toast.error(
      error.response?.data?.message || "An error occurred. Please try again later.")
  }

};


  return (
    <>
     <ToastContainer position='top-right' autoClose="2000" hideProgressBar={false}
            closeOnClick={true} pauseOnHover={true} draggable={true} ></ToastContainer>
      {modal && (
        <div className="container position-absolute z-3  " style={{marginLeft:'10rem',marginTop:'8rem'}}>
          <div className="row">
            <div className="col-12">
              <div className="modal_box bg-danger text-white w-50 pt-5 pb-5">
                <h2 className="fs-5 text-center">Update Groups</h2>
                <form
                  onSubmit={handleSubmit}
                  className="pt-2 p-5 w-75"
                  style={{ marginLeft: '40px' }}
                >
                  <label htmlFor="" className="pl-4">
                    Enter Group Name
                  </label>
                  <input
                    type="text"
                    name="group_name"
                    value={editGroup.group_name}
                    onChange={handleInputChange}
                    className="text-center"
                    style={{
                      border: 'none',
                      outline: 'none',
                      height: '50px',
                    }}
                  />
                  <label htmlFor="" className="pl-4">
                    Enter Group Description
                  </label>
                  <input
                    type="text"
                    name="group_description"
                    value={editGroup.group_description}
                    onChange={handleInputChange}
                    className="text-center"
                    style={{
                      border: 'none',
                      outline: 'none',
                      height: '50px',
                    }}
                  />
                  <button className="btn btn-primary" type="submit">
                 Update
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
      {group && (
        <div className="user-data container-sm">
          <h2>Group Data:</h2>
          {groupData.map((group) => (
            <div
              key={group.id}
              className="card mb-2 d-flex flex-row justify-content-evenly"
            >
              <div className="card-body">
                <strong>Name:</strong> {group.group_name},{' '}
                <strong>Description:</strong> {group.group_description}
              </div>
              <button
                className="btn btn-primary"
                onClick={() => {
                  handleUpdate(group.id);
                }}
              >
                Edit
              </button>
            </div>
          ))}
          {groupData.length === 0 && <p>No groups available.</p>}
        </div>
      )}
    </>
  );
}
