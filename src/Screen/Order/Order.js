import { DataGrid } from "@mui/x-data-grid";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import ApiHelper from "../../Common/apiHelper";
import { useEffect, useState } from "react";
import { IconButton } from "@mui/material";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate } from "react-router-dom";
import ErrorMessageAlert from "../../Common/ErrorMessageBox";

export default function OrderDetails () {
  // const navigate = useNavigate();
  const [error, setError] = useState({ message: "", type: "" });
  const [rows, setRows] = useState([]);
  // const [update, setUpdate] = useState({});

  const columns = [
    { field: "_id", headerName: "Order ID",flex:1, headerAlign: 'center'},
    {
      field: "user",
      headerName: "User Email",
      flex:1, 
      headerAlign: 'center'
    },
    {
      field: "paymentMethod",
      headerName: "Payment Method",
      flex:1, headerAlign: 'center',
    },
    {
      field: "paymentStatus",
      headerName: "Payment Status",
      flex:1, headerAlign: 'center',
    },
    {
      field: "createdAt",
      headerName: "Order Created",
      flex:1, headerAlign: 'center',
    },
    {
      field: "deliverdIn",
      headerName: "Delivered In",
      flex:1, headerAlign: 'center',
    },
    {
      field: "totalPrice",
      headerName: "Price",
      flex: 1,
    },
    // {
    //   field: "action",
    //   headerName: "Actions",
    //   flex: 1,
    //   renderCell: (cell) => {
    //     return (
    //       <>
    //         <IconButton color="primary" onClick={(e) => {
    //           editProductDetails(cell.row);
    //         }}>
    //           <ModeEditIcon />
    //         </IconButton>
    //         <IconButton color="error" onClick={(e) => {
    //           deleteProduct(cell.row._id);
    //         }}>
    //           <DeleteIcon />
    //         </IconButton>
    //       </>
    //     );
    //   },
    //   width: 150,
    //   editable: true,
    // },
  ];


  const getProducts = async () => {
    try {
      const result = await ApiHelper.fetchOrders();
      const rows = result.data.data;
      for (let i = 0; i < rows.length; i++) {
        rows[i].user = rows[i].user.email
      }
      setRows(rows);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);


  // const editProductDetails = async (data) => {
  //   const id = data._id;
  //   navigate(`/product/edit/${id}`);
  // };

  // const deleteProduct = async (id) => {
  //   try {
  //     const result = await ApiHelper.deleteProduct(id);
  //     if (result.status === 200) {
  //       setError({
  //         ...error,
  //         message: result.data.message,
  //         type: "success",
  //       });
  //       setUpdate();
  //     }
  //   } catch (error) {
  //     setError({
  //       ...error,
  //       message: error.response.data.message,
  //       type: "danger",
  //     });
  //   }
  // };
  return (
    <div>
      <div className="row">
      <ErrorMessageAlert error={error} setError={setError}/>

        <div className="col-12 mb-1 d-flex justify-content-between">
          <h2>List of Order Placed</h2>
          {/* <Button
            onClick={(e) => navigate("/product/add")
            }
          >
            Add Product
          </Button> */}
        </div>
      </div>

      <Box sx={{ height: 500, width: "100%", marginTop: "12px" }}>
        <DataGrid
          rows={rows}
          columns={columns}
          getRowId={(e) => e._id}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 7,
              },
            },
          }}
          pageSizeOptions={[7]}
          // checkboxSelection
          disableRowSelectionOnClick
        />
      </Box>
    </div>
  );
}
