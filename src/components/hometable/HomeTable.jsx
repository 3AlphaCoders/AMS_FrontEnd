import './hometable.scss'
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { Link } from 'react-router-dom';

const HomeTable = () => {

  const { user } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  
  useEffect(() => {

    if(user.role === 'student'){

    }else{
      var config = {
        method: "get",
        url: "/application/pending",
      };
  
      setLoading(true)
      axios(config)
        .then(function (response) {
          setLoading(false)
          setData(response.data.applications);
        })
        .catch(function (error) {
          setLoading(false)
        });
    }
    
  }, []);



  const handleFile = (fileLink) => {
    window.open(fileLink);
  };

  const userColumns = [
    {
      field: "applicationTitle",
      headerName: "Application Title",
      width: 250,
    },

    {
      field: "applicationFile",
      headerName: "Application File",
      renderCell: (params) => {
        return (
          <Link
            onClick={() => {
              handleFile(params.row.applicationFile);
            }}
          >
            {params.row.applicationFile}
          </Link>
        );
      },

      width: 300,
    },
    {
      field: "submittedBy",
      headerName: "Submitted By",
      valueGetter: (params) => `${params.row.submittedBy.name}`,
      width: 200,
    },
    {
      field: "status",
      headerName: "Status",
      width: 150,
    },
  ];
  
  return (
    <div className='homeTable'>
         <DataGrid
          className="datagrid"
          rows={data}
          getRowId={(row) => row._id}
          columns={userColumns}
          pageSize={9}
          rowsPerPageOptions={[9]}
          checkboxSelection
        />
    </div>
  )
}

export default HomeTable