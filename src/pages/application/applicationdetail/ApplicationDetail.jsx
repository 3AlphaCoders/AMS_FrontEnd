import './applicationdetail.scss'
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Navbar from "../../../components/navbar/Navbar";
import Sidebar from "../../../components/sidebar/Sidebar";
import { getApplicationDetail } from "../../../service/applicationService";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ApplicationDetail = () => {
  const [loading, setLoading] = useState(false);
  const [appDetail, setAppDetail] = useState([]);

  const params = useParams();

  useEffect(() => {
    // async function fetchData() {
    //   const response = await getApplicationDetail(params.id);
    //   console.log(response?.data)
    // }
    // fetchData();
    setLoading(true);
    getApplicationDetail(params.id)
    .then(function (response) {
        setAppDetail(response.application)
        console.log(response.application)
        setLoading(false);
    })
    .catch(function (error) {
        console.log(error);
        setLoading(false);
    });
    
  }, [params.id]);

  return (
    <div className="aplicationDetail">
      <Sidebar />
        <div className='appDetailWrapper'>
            <Navbar />
            <div id='result'>
                <ToastContainer />
            </div>
            <div className='appDetMain'>

                <div className='appDetTitle'>
                    <h3>Your Application Detail : </h3>
                    {/* <span>{appDetail?.applicationTitle}</span> */}
                </div>

                <div className="appDetOther">
                    <div>
                        <h3>Application Title :</h3>
                        <span>{appDetail?.applicationTitle}</span>
                    </div>
                    {appDetail?.acceptedBy?
                    <div>
                        <h3>Accepted By : </h3>
                        <span>{appDetail?.acceptedBy?.name}</span>
                    </div>:''}
                    {appDetail?.rejectedBy?
                    <div>
                        <h3>Rejected By : </h3>
                        <span>{appDetail?.rejectedBy?.name}</span>
                    </div>:''}
                    {appDetail?.forwardedBy?
                    <div>
                        <h3>forwarded By : </h3>
                        <span>{appDetail?.forwardedBy?.name}</span>
                    </div>:''}
                    <div>
                        <h3>Application File : </h3>
                        <a href={appDetail?.applicationFile} >{appDetail?.applicationFile}</a>
                    </div>
                    <div>
                        <h3>Application Status: </h3>
                        <span>{appDetail?.status}</span>
                    </div>
                </div>
                <div className='appDetailLife'>
                    <h3 className="appLifeHead">Application History</h3>
    
                    {appDetail?.applicationLife?.map((appLife)=>{
                        return (
                            
                            <div className='appLifeItem'>
                                <div>
                                  <h3>Application Status : </h3>
                                  <span>{appLife?.status}</span>
                                </div>
                                <div>
                                  <h3>{appLife?.status} By:</h3>
                                  <span>{appLife?.user?.name}</span>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
        
        
      {loading ? (
        <div className="loading-ring">
          Loading
          <span></span>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default ApplicationDetail;
