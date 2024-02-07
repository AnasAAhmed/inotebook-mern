
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { MdLogout } from "react-icons/md";
import { FaUser } from "react-icons/fa";
import toast from 'react-hot-toast';





const Profile = () => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  const host = "https://inotebook-gh6p.vercel.app";
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem('token')
    navigate('/login');
    toast.success("Account LogedOut Successfuly");
  }

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await fetch(`${host}/api/auth/getUser`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            "auth-token": localStorage.getItem('token')
          },
        });

        if (response.ok) {
          const data = await response.json();
          setUser(data.user);

        } else {
          const data = await response.json();
          setError(data.error || 'Failed to fetch user profile');
        }
      } catch (error) {
        setError('Error fetching user profile');
      }
    };
    fetchUserProfile();
  }, []); // Empty dependency array to run the effect once on mount
  return (
    <div>
      <div data-bs-toggle="modal" data-bs-target="#exampleModall" className="modalprof">{user ? user.name.charAt(0) : <FaUser />}</div>
      <div className="modal fade" id="exampleModall" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <div className="modal-title fs-5 d-flex " id="exampleModallLabel"><div className='imgprof'>{user ? user.name.charAt(0) : <FaUser />}
              </div>
                <h3 className='mx-3 my-2' >My Account
                </h3>
              </div>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body" >
              <div >
                {user ? (
                 <>
                      <p>Name: {user.name}</p>
                      <p>Email: {user.email}</p>
                      <p>User-Id: {user._id}</p>
                      <p>Joined: {user.date}</p>
                      <UserProfile />
                    
                  </>
                ) : (
                  <p>{error || 'Loading...'}</p>
                )}
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn bttns" data-bs-dismiss="modal">Close</button>
              <button onClick={handleLogout} className='btn bttn mx-2' data-bs-dismiss="modal">Logout <MdLogout /></button>

            </div>
          </div>
        </div>
      </div>


    </div>
  )
}


export const UserProfile = () => {
  const [load, setLoad] = useState(false);

  const host = "https://inotebook-gh6p.vercel.app";
  const navigate = useNavigate();
  const handleDeleteUser = async () => {
    const shouldDelete = window.confirm('Are you sure you want to delete your account? Note: Make sure to delete your all notes before accout deletion');

    if (shouldDelete) {
      setLoad(true)


      const response = await fetch(`${host}/api/auth/deleteUser`, {
        method: "DELETE",
        headers: {
          'Content-Type': 'application/json',
          "auth-token": localStorage.getItem('token')
        },
      });
      const json = await response.json();
      if (json.success) {


        setLoad(false)

        localStorage.removeItem('token')
        navigate('/login');
        toast.success("Account Deleted Successfuly");


      }
      else {
        setLoad(false)

        toast.success("Account Not Deleted Successfuly");
      }
    }
  }
  return (
    <div>
      <button className="btn bttndanger" data-bs-dismiss="modal" disabled={load} onClick={handleDeleteUser}>Delete Account</button>
    </div>
  );
};

export default Profile
