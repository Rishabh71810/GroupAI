import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from '../config/axios'
/**
 * Project component represents the main interface for managing a project.
 * It includes functionalities for adding collaborators, toggling side panels,
 * and displaying messages.
 * 
 * @param {Object} props - The component props.
 * @param {Function} props.navigate - Function to navigate between routes.
 * 
 * @returns {JSX.Element} The rendered Project component.
 * 
 * The component maintains several states:
 * - isSidePanelOpen: Boolean state to toggle the visibility of the side panel.
 * - isModalOpen: Boolean state to toggle the visibility of the modal for adding collaborators.
 * - selectedUserId: Set state to keep track of selected user IDs.
 * - users: Array state to store the list of users fetched from the server.
 * 
 * The component uses the `useEffect` hook to fetch the list of users when the component mounts.
 * The `handleUserClick` function toggles the selection of a user by their ID.
 * 
 * The `Array.from` method is used to convert the Set of selected user IDs into an array for easier manipulation and comparison.
 */
const Project = ({ navigate }) => {
  const location = useLocation();
  const [isSidePanelOpen, setisSidePanelOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState([]);
  const [project,setProject]=useState(location.state.project);
  const [users ,setUsers]=useState([])
  /**
   * Handles the user click event to toggle the selection of a user by their ID.
   * 
   * @param {string} id - The ID of the user to be toggled.
   * 
   * The function updates the state of selected user IDs. If the user ID is already
   * in the set of selected user IDs, it removes the ID from the set. If the user ID
   * is not in the set, it adds the ID to the set.
   */
  const handleUserClick = (id) => {
   setSelectedUserId(prevSelectedUserId => {
    const newSelectedUserId = new Set(prevSelectedUserId);
    if(newSelectedUserId.has(id)){
      newSelectedUserId.delete(id);
    }else{
      newSelectedUserId.add(id)
    }
    return newSelectedUserId;
   }) 
    
  };

  function addCollaborators(){
    if (!location.state?.project?._id) {
      alert("Project ID is missing. Please select a project first.");
      navigate('/dashboard');
      return;
    }
    
    const projectId = location.state.project._id;
    axios.put("/projects/add-user",{
      projectId: projectId,
      users: Array.from(selectedUserId)
    }).then(res => {
      setIsModalOpen(false);
    }).catch(err => {
      
      console.error(err);
    })
  }
 

  useEffect(()=>{

     axios.get(`projects/get-project/${location.state.project._id}`)
     .then(res=>{
      setProject(res.data.project)
     }).catch(err=>{
      console.log(err);
     })
     axios.get('/users/all').then(res=>{
      setUsers(res.data.users)
     }).catch(err=>{
      console.log(err)
     })
  } ,[])

  return (
    <main className='h-screen flex w-screen'>
      <section className='left flex flex-col h-full min-w-96 bg-slate-300'>
        <header className='p-2 px-4 flex justify-between items-center w-full bg-slate-100'>
          <button className='flex gap-2' onClick={() => setIsModalOpen(true)}>
            <i className="ri-user-add-fill mr-1 "></i>
            <p>Add Collaborators</p>
          </button>
          <button className='p-2' onClick={() => setisSidePanelOpen(!isSidePanelOpen)}>
            <i className='ri-group-fill'></i>
          </button>
        </header>

        <div className="conversation-area flex-grow flex flex-col">
          <div className='message-box p-1 flex-grow flex-col flex'>
            <div className='message max-w-56 flex flex-col p-2 bg-slate-50 w-fit rounded-md'>
              <small className='opacity-65 text-xs'>test12@gmail.com</small>
              <p className='text-sm'> lorem ipsum shisinjund shdi</p>
            </div>
            <div className='ml-auto mt-1 max-w-56 message flex flex-col p-2 bg-slate-50 w-fit rounded-md'>
              <small className='opacity-65 text-xs'>test12@gmail.com</small>
              <p className='text-sm'> lorem ipsum shisinjund shdi</p>
            </div>
          </div>

          <div className='inputField w-full flex'>
            <input className='p-2 px-9 border-none outline-none flex-grow' type='text' placeholder='Enter The Message' />
            <button className='flex-group bg-slate-950 px-5 text-white'>
              <i className='ri-send-plane-fill '></i>
            </button>
          </div>
        </div>

        <div className={`sidePanel w-96 h-full flex flex-col gap-2 bg-slate-50 absolute transition-all ${isSidePanelOpen ? '-translate-x-0' : '-translate-x-full'} top-0`}>
          <header className='flex justify-between items-center px-4 p-2 bg-slate-200'>
            <h1 className='font-semibold'>Collaborators</h1>
            <button onClick={() => setisSidePanelOpen(!isSidePanelOpen)}>
              <i className='ri-close-fill'></i>
            </button>
          </header>
          <div className='users flex flex-col gap-2'>
             {project.users && project.users.map(user=>{
              return(
                <div className='user flex cursor-pointer hover:bg-slate-200 p-2 '>
              <div className='aspect-square rounded-full w-fit h-fit flex items-center justify-center text-white p-5 bg-slate-600'>
                <i className='ri-user-fill absolute'></i>
              </div>
              <h1 className='font-semibold text-lg p-1 '>{user.email}</h1>
            </div>
              )
             })}
          </div>
        </div>
      </section>

      {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <div className="bg-white p-4 rounded-md w-96 max-w-full relative">
                        <header className='flex justify-between items-center mb-4'>
                            <h2 className='text-xl font-semibold'>Select User</h2>
                            <button onClick={() => setIsModalOpen(false)} className='p-2'>
                                <i className="ri-close-fill"></i>
                            </button>
                        </header>
                        <div className="users-list flex flex-col gap-2 mb-16 max-h-96 overflow-auto">
                            {users.map(user => (
                                <div key={user.id} className={`user cursor-pointer hover:bg-slate-200 ${Array.from(selectedUserId).indexOf(user._id)!=-1?'bg-slate-200':''} p-2 flex gap-2 items-center`} onClick={()=>handleUserClick(user._id)}>
                                    <div className='aspect-square relative rounded-full w-fit h-fit flex items-center justify-center p-5 text-white bg-slate-600'>
                                        <i className="ri-user-fill absolute"></i>
                                    </div>
                                    <h1 className='font-semibold text-lg'>{user.email}</h1>
                                </div>
                            ))}
                        </div>
                        <button
                           onClick={addCollaborators}
                            className='absolute bottom-4 left-1/2 transform -translate-x-1/2 px-4 py-2 bg-blue-600 text-white rounded-md'>
                            Add Collaborators
                        </button>
                    </div>
                </div>
            )}
    </main>
  );
};

export default Project;