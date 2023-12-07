import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import toast, { Toaster } from 'react-hot-toast'
import * as React from "react";
import {
  useGetusersMutation,
  useHandleaccessMutation,
} from "../../../api/adminApiSlice";
import AdminNavbar from "../../../components/Navbar/AdminNavbar";

function createData(name, email, phone, date, isAccess) {
  isAccess = isAccess.toString();
  return { name, email, phone, date, isAccess };
}

function Userlist() {
  const [userdata, setuserData] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [getstudent] = useGetusersMutation();
  const [accesshandle] = useHandleaccessMutation();

  const handleaccess = async (name) => {
    try {
      const changedResponse=await accesshandle({ name });
      toast.success(changedResponse.data.message)
  
      const response = await getstudent(2000);
      setuserData(response.data.studens);
    } catch (error) {
      console.log(error.message);
    }
  };

  const columns = React.useMemo(
    (e) => [
      {
        id: "name",
        label: "Name",
        minWidth: 170,
        format: (value) => value.toLocaleString("en-US"),
      },
      {
        id: "email",
        label: "Email",
        minWidth: 170,
        format: (value) => value.toLocaleString("en-US"),
      },
      {
        id: "phone",
        label: "Phone",
        minWidth: 170,
        align: "right",
        format: (value) => value.toLocaleString("en-US"),
      },
      {
        id: "date",
        label: "Created",
        minWidth: 170,
        align: "right",
        format: (value) => value,
      },
      {
        id: "isAccess",
        label: "Status",
        minWidth: 170,
        align: "right",
      },
    ],
    [handleaccess]
  );

  const rows = userdata.map((user) => {
    return createData(
      user?.username,
      user?.email,
      user?.phone,
      user?.createdAt,
      user?.isAccess
    );
  });

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  React.useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await getstudent(2000);
        setuserData(response.data.studens);
      } catch (error) {
        console.error("Error fetching students:", error);
      }
    };
    fetchUser();
  }, []);

  return (
    <>
      <AdminNavbar />
      <Toaster/>
      <p className="mt-9 ms-10 text-xl font-bold">STUDENTS</p>
      <Paper
        sx={{
          width: "auto",
          overflow: "hidden",
          marginTop: "1rem",
          margin: "1rem",
          marginBottom: "0",
        }}
      >
        <TableContainer sx={{ maxHeight: 535 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{ minWidth: column.minWidth }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>

            <TableBody>
              {rows
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, i) => {
                  return (
                    <TableRow
                      hover
                      role="checkbox"
                      className="bg-blue-100"
                      tabIndex={-1}
                      key={i}
                    >
                      {columns.map((column, i) => {
                        const value = row[column.id];
                        return (
                          <TableCell key={column.id} align={column.align}>
                            {column.format ? (
                              column.format(value)
                            ) : (
                              <button
                                onClick={() => handleaccess(row.name)}
                                className={`${
                                  value === "true"
                                    ? "bg-blue-500 hover:bg-blue-700"
                                    : "bg-red-500 hover:bg-red-700"
                                } text-white px-6 py-3 rounded-md focus:outline-none transform transition-transform animate__animated animate__bounce`}
                                id="myButton"
                              >
                                {value}
                              </button>
                            )}
                            {/* {column.format && column.format(value)} */}
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </>
  );
}

export default Userlist;
