import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../Styles/ManageLeaveStyle.css";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import PendingActionsIcon from '@mui/icons-material/PendingActions';
// Add this line

const ManageLeave = () => {
  const [dataList, setDataList] = useState([]);
  const [approveList, setApproveList] = useState([]);
  const [declinedList, setDeclinedList] = useState([]);
  const [selectedLeave, setSelectedLeave] = useState("");
  const [addSection, setAddSection] = useState(false);
  const Status = [`Approved`, `Declined`];

  useEffect(() => {
    const getFetchPendingData = async () => {
      const response = await fetch("http://localhost:5000/api/empleav/Emp", {
        method: "GET",
      });

      if (response.ok) {
        const data = await response.json();
        setDataList(data.data.filter((item)=>item.Status==="Pending"));
        setApproveList(data.data.filter((item)=>item.Status==="Approved"));
        setDeclinedList(data.data.filter((item)=>item.Status==="Declined"));
      }
    };
    getFetchPendingData();
  }, [dataList]);

  const handleClick = (e) => {
    const value = e.target.value;
    console.log(e);
    console.log(value);
    setAddSection(true);
    setSelectedLeave(value);
  };


  const handleApprove = async () => {
    const response = await fetch("http://localhost:5000/api/empleav/approve", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
      },
      body: JSON.stringify({
        _id: selectedLeave,
        Status: Status[0],
      }),
    });
    console.log(selectedLeave._id);
    console.log(response);
    if(response.ok){
      setAddSection(false);
      toast.success('leave Approved',{autoClose: 1300,});
    }
  };


  const handleDecline = async () => {
    const response = await fetch("http://localhost:5000/api/empleav/approve", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
      },
      body: JSON.stringify({
        _id: selectedLeave,
        Status: Status[1],
      }),
    });
    if(response.ok){
      setAddSection(false);
      toast.error('Leave Declined',{autoClose:1300});
    }
  };

  return (
    <>
      <div className="content-wrapper">
        {/* Content Header (Page header) */}
        <div className="content-header">
          <div className="container-fluid">
            <div className="row mb-2">
              <div className="col-sm-6">
                <h1 className="m-0">Manage Leave</h1>
              </div>
              {/* /.col */}
              <div className="col-sm-6">
                <ol className="breadcrumb float-sm-right">
                  <li className="breadcrumb-item">
                    <Link to="/">Home</Link>
                  </li>
                </ol>
              </div>
              {/* /.col */}
            </div>
            {/* /.row */}
          </div>
          <div className="nav-sec" style={{ width: "100%" }}>
            <nav class="navbar navbar-expand-lg navbar-light bg-light">
              <button
                class="navbar-toggler"
                type="button"
                data-toggle="collapse"
                data-target="#navbarSupportedContent"
                aria-controls="navbarSupportedContent"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <span class="navbar-toggler-icon"></span>
              </button>

              <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav mr-auto">
                  <li class="nav-item">
                    <a class="nav-link" href="#pending">
                      Pending
                    </a>
                  </li>
                  <li class="nav-item">
                  <a class="nav-link" href="#approved">
                      Approved
                    </a>
                  </li>
                  <li class="nav-item">
                  <a class="nav-link" href="#declined">
                      Declined
                    </a>
                  </li>
                </ul>
              </div>
            </nav>
          </div>

          <div className="main-sec">
            <div className="pending-sec" id="pending">
              <h1
                className="montserrat-h1"
                style={{ marginTop: "50px", marginLeft: "50px" }}
              >
                {" "}
                Pending
              </h1>
              <table class="table">
                <thead>
                  <tr className="table-row">
                    <th
                      scope="col"
                      style={{ width: "200px", fontStyle: "normal" }}
                    >
                      Employee Name
                    </th>
                    <th scope="col" style={{ width: "170px" }}>
                      Starting Date
                    </th>
                    <th scope="col" style={{ width: "170px" }}>
                      Ending Date
                    </th>
                    <th scope="col" style={{ width: "150px" }}>
                      Leave Type
                    </th>
                    <th scope="col" style={{ width: "250px" }}>
                      Description
                    </th>
                    <th scope="col" style={{ width: "100px" }}>
                      Duration
                    </th>
                    <th scope="col" style={{ width: "150px" }}>
                      Status
                    </th>
                    <th scope="col" style={{ width: "70px" }}>
                      Manage Leave
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {dataList.map((el) => {
                    if (el) {
                      return (
                        <tr className="table-row-emp">
                          <td>{el.EmpName}</td>
                          <td>
                            {el.StartingDate.split("-").reverse().join("-")}
                          </td>
                          <td>
                            {el.EndingDate.split("-").reverse().join("-")}
                          </td>
                          <td className="name-admin">{el.LeaveType}</td>
                          <td>{el.Description}</td>
                          <td>
                            {parseInt(
                              el.EndingDate.slice(8, 10) -
                                parseInt(el.StartingDate.slice(8, 10))
                            ) + " days"}
                          </td>
                          <td>{el.Status} <PendingActionsIcon  style={{marginLeft:"10px",color:"yellowgreen"}}/></td>
                          <td>
                            <button value={el._id} onClick={handleClick}>
                              Approve
                            </button>
                          </td>
                        </tr>
                      );
                    }else{
                      return null
                    }
                  })}
                </tbody>
              </table>
            </div>
            <div className="approved-sec" id="approved">
              <h1
                className="montserrat-h1"
                style={{ marginTop: "50px", marginLeft: "50px" }}
              >
                {" "}
                Approved
              </h1>
              <table class="table">
                <thead>
                  <tr className="table-row">
                    <th
                      scope="col"
                      style={{ width: "190px", fontStyle: "normal" }}
                    >
                      Employee Name
                    </th>
                    <th scope="col" style={{ width: "150px" }}>
                      Starting Date
                    </th>
                    <th scope="col" style={{ width: "150px" }}>
                      Ending Date
                    </th>
                    <th scope="col" style={{ width: "150px" }}>
                      Leave Type
                    </th>
                    <th scope="col" style={{ width: "250px" }}>
                      Description
                    </th>
                    <th scope="col" style={{ width: "150px" }}>
                      Duration
                    </th>
                    <th scope="col" style={{ width: "150px" }}>
                      Status/reason
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {approveList.map((el) => {
                    if (el) {
                      return (
                        <tr className="table-row-emp">
                          <td>{el.EmpName}</td>
                          <td>
                            {el.StartingDate.split("-").reverse().join("-")}
                          </td>
                          <td>
                            {el.EndingDate.split("-").reverse().join("-")}
                          </td>
                          <td className="name-admin">{el.LeaveType}</td>
                          <td>{el.Description}</td>
                          <td>
                            {parseInt(
                              el.EndingDate.slice(8, 10) -
                                parseInt(el.StartingDate.slice(8, 10))
                            ) + " days"}
                          </td>
                          <td>{el.Status}<CheckCircleIcon style={{marginLeft:"10px",color:"green"}}/></td>
                        </tr>
                      );
                    }else{
                      return null
                    }
                  })}
                </tbody>
              </table>
            </div>
            <div className="declined-sec" id="declined">
              <h1
                className="montserrat-h1"
                style={{ marginTop: "50px", marginLeft: "50px" }}
              >
                {" "}
                Declined
              </h1>
              <table class="table">
                <thead>
                  <tr className="table-row">
                    <th
                      scope="col"
                      style={{ width: "190px", fontStyle: "normal" }}
                    >
                      Employee Name
                    </th>
                    <th scope="col" style={{ width: "150px" }}>
                      Starting Date
                    </th>
                    <th scope="col" style={{ width: "150px" }}>
                      Ending Date
                    </th>
                    <th scope="col" style={{ width: "150px" }}>
                      Leave Type
                    </th>
                    <th scope="col" style={{ width: "250px" }}>
                      Description
                    </th>
                    <th scope="col" style={{ width: "150px" }}>
                      Duration
                    </th>
                    <th scope="col" style={{ width: "150px" }}>
                      Status/reason
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {declinedList.map((el) => {
                    if (el) {
                      return (
                        <tr className="table-row-emp">
                          <td>{el.EmpName}</td>
                          <td>
                            {el.StartingDate.split("-").reverse().join("-")}
                          </td>
                          <td>
                            {el.EndingDate.split("-").reverse().join("-")}
                          </td>
                          <td className="name-admin">{el.LeaveType}</td>
                          <td>{el.Description}</td>
                          <td>
                            {parseInt(
                              el.EndingDate.slice(8, 10) -
                                parseInt(el.StartingDate.slice(8, 10))
                            ) + " days"}
                          </td>
                          <td>{el.Status}<CancelIcon style={{marginLeft:"10px",color:"red"}}/></td>
                        </tr>
                      );
                    }else{
                      return null
                    }
                  })}
                </tbody>
              </table>
            </div>
            <div className="LeaveHistory-sec"></div>
          </div>

          {/* /.container-fluid */}
          {addSection && (
            <div
              className="approve-card"
              style={{ zIndex: "2" }}
              onClick={(event) => {
                setAddSection(false);
              }}
            >
              <div
                className="main-card"
                name="id"
                style={{ zIndex: "1" }}
                onClick={(event) => {
                  event.stopPropagation();
                }}
              >
                <div className="btn-div">
                  <button className="approve-btn" onClick={handleApprove}>
                    Approve
                  </button>
                  <button className="decline-btn" onClick={handleDecline}>
                    Decline
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
        {/* /.content-header */}
      </div>
    </>
  );
};

export default ManageLeave;
