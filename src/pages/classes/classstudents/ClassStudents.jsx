import './classstudents.scss'
import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react';
import { DataGrid } from "@mui/x-data-grid";
import Sidebar from '../../../components/sidebar/Sidebar';
import Navbar from '../../../components/navbar/Navbar';
import { getClassStudents } from '../../../service/classService';

const ClassStudents = () => {

  const params = useParams();
  const [studentDet, setStudentDet] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(()=>{
    setLoading(true);
    getClassStudents(params.courseId, params.deptId, params.classId)
    .then(function (response) {
        setStudentDet(response.students)
        setLoading(false);
    })
    .catch(function (error) {
        setLoading(false);
        // console.log(error);
    });
    
  },[params.courseId, params.deptId, params.classId])

  const userColumns = [
    {
      field: "name",
      headerName: "Students Name",
      width: 350,
    },

    {
      field: "email",
      headerName: "Students Email",
      width: 350,
    },
  ];
  return (
    <div className="classStudents">
      <Sidebar />
      <div className="csContainer">
        <Navbar />

        <div className="csHead">
           All Class Students
        </div>
        <DataGrid
          className="datagrid"
          getRowId={(row) => row._id}
          rows={studentDet || []}
          columns={userColumns}
          pageSize={9}
          rowsPerPageOptions={[9]}
          checkboxSelection
        />
        
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
  );
};


export default ClassStudents