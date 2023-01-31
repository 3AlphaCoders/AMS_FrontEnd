import './departmentteacher.scss'
import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react';
import { getDepartmentTeachers } from '../../../service/departmentService';
import { DataGrid } from "@mui/x-data-grid";
import Sidebar from '../../../components/sidebar/Sidebar';
import Navbar from '../../../components/navbar/Navbar';

const DepartmentTeacher = () => {

  const params = useParams();
  const [teachersdet, setTeachersDet] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(()=>{
    setLoading(true);
    getDepartmentTeachers(params.courseId, params.deptId)
    .then(function (response) {
        setTeachersDet(response.teachers)
        setLoading(false);
        // console.log(teachersdet)
    })
    .catch(function (error) {
        setLoading(false);
        // console.log(error);
       
    });
    
  },[params.courseId, params.deptId])

  const userColumns = [
    {
      field: "name",
      headerName: "Teacher Name",
      width: 350,
    },

    {
      field: "email",
      headerName: "Teacher Email",
      width: 350,
    },
  ];
  return (
    <div className="departmentTeacher">
      <Sidebar />
      <div className="dtContainer">
        <Navbar />

        <div className="dtHead">
           All Department Teachers
        </div>
        <DataGrid
          className="datagrid"
          getRowId={(row) => row._id}
          rows={teachersdet || []}
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


export default DepartmentTeacher