import './createapplication.scss'
import Sidebar from "../../../components/sidebar/Sidebar";
import Navbar from "../../../components/navbar/Navbar";
import FormControl from '@mui/material/FormControl';
import { useRef, useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CreateApplication = ({title}) => {

    const appTitle = useRef();
    const appFile = useRef();
    const [loading, setLoading] = useState(false);
   
    const createApplication = (e)=>{
        e.preventDefault();
        const fileInput = document.getElementById("applicationFile");

        var data = new FormData();
        data.append('applicationTitle', appTitle.current.value);
        data.append('applicationFile', fileInput.files[0]);

        var config = {
          method: 'post',
          url: '/application/',
          headers: { 
            'Content-Type' : 'multipart/form-data'
          },
          data : data
        };

        setLoading(true);
        axios(config)
        .then(function (response) {
          setLoading(false);
          toast.success('Application Sent Successfully!', {
            position: toast.POSITION.TOP_CENTER
          });
        })
        .catch(function (error) {
          setLoading(false);
          toast.error(error.response.data.message, {
            position: toast.POSITION.TOP_CENTER
          });
        });
    }


  return (
    <div className='createApplication'>
        <Sidebar />
      <div className="newContainer">
        <Navbar />
        <div className="top">
          <h1>{title}</h1>
        </div>
        <div className="bottom">
            <div id='result'>
                <ToastContainer />
            </div>
          <form className="left" onSubmit={createApplication}>
              <div className='inputContainer'>
            

                    <FormControl >
                      <label>Application Title <span>*</span></label>
                      <input 
                        type="text"
                        className='inputBox'
                        required
                        label="Name"
                        name="applicationTitle"
                        placeholder='Please Enter your name'
                        ref={appTitle}
                      />
                    </FormControl>
                    <FormControl >
                      <label>Application File <span>*</span></label>
                      <input 
                        type="file"
                        className='inputBox'
                        required
                        label="Name"
                        id="applicationFile"
                        placeholder='Please Enter your name'
                        ref={appFile}
                      />
                    </FormControl>

                </div>
                <div className='userBtn'>
                  <button>Submit</button>
                </div>
              
                
          </form>
          {loading ? (
        <div className="loading-ring">
          Loading
          <span></span>
        </div>
      ) : (
        ""
      )}
        </div>
      </div>
    </div>
  )
}

export default CreateApplication