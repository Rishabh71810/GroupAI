import React, {useState} from 'react'
import { useLocation } from 'react-router-dom'
const Project = ({navigate}) => {
    const location = useLocation();
    const [isSidePanelOpen, setisSidePanelOpen] = useState(false)
  return (
   <main className='h-screen flex w-screen'>
        <section className='left flex flex-col h-full min-w-72 bg-slate-300'>

            <header className='p-2 px-4 flex justify-end w-full bg-slate-100'>
                <button className='p-2'
                 onClick={()=>setisSidePanelOpen(!isSidePanelOpen)}>
                    <i className='ri-group-fill'></i>
                    </button>
              
            </header>

            <div className="conversation-area flex-grow flex flex-col">
                <div className='message-box p-1 flex-grow flex-col flex'>
                    <div className='message max-w-56 flex flex-col p-2 bg-slate-50 w-fit rounded-md'>  
                        <small 
                        className='opacity-65 text-xs'>test12@gmail.com</small>
                        <p className='text-sm'> lorem ipsum shisinjund shdi</p>
                    </div>
                    <div className='ml-auto mt-1 max-w-56 message flex flex-col p-2 bg-slate-50 w-fit rounded-md'>  
                        <small 
                        className='opacity-65 text-xs'>test12@gmail.com</small>
                        <p className='text-sm'> lorem ipsum shisinjund shdi</p>
                    </div>
                </div>

                <div className='inputField w-full flex'>
                    <input 
                    className ='p-2 px-9 border-none outline-none'type='text' placeholder='Enter The Message'/> 
                    <button className='flex-group bg-blue-500 px-2'><i className='ri-send-plane-fill '></i></button>
                </div>

            </div>
            <div className={`sidePanel w-72 h-full flex flex-col gap-2 bg-slate-50 absolute transition-all  ${ isSidePanelOpen ? '-translate-x-0': '-translate-x-full'} top-0`}>
              <header
              className='flex justify-end px-4 p-2 bg-slate-200'>
               <button
               onClick={()=>setisSidePanelOpen(!isSidePanelOpen)}>
                  <i className='ri-close-fill'></i>
               </button>
              </header>
              <div className='users flex flex-col gap-2'>
                <div className='user'>
                  <div className='aspect-square rounded-full w-fit h-fit flex items-center justify-center text-white  p-5 bg-slate-600'>
                    <i className='ri-user-fill absolute'></i>
                  </div>
                </div>
              </div>
            </div>
            

        </section>
   </main>
  )
}

export default Project
