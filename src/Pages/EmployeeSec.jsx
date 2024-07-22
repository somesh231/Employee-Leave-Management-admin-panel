import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../Styles/EmployeeSecStyle.css";
const EmployeeSec = () => {
  const [dataList, setDataList] = useState([]);

  useEffect(() => {
    const getFetchData = async () => {
      const response = await fetch("http://localhost:5000/api/auth/userData",{
        method:"GET"
      });
      
      if (response.ok) {
        const data = await response.json();
        setDataList(data.data);
        // alert(data.data.message);
      }
    };

    getFetchData();
  }, [dataList]);

  return (
    <>
      <div className="content-wrapper">
        {/* Content Header (Page header) */}
        <div className="content-header">
          <div className="container-fluid">
            <div className="row mb-2">
              <div className="col-sm-6">
                <h1 className="m-0">Employee Section</h1>
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
          {/* /.container-fluid */}
        </div>
        {/* /.content-header */}
        <div className="main-sec-emp">
          <table class="table">
            <thead>
              <tr className="table-row">
                <th scope="col" style={{ width: "190px", fontStyle: "normal" }}>
                  Employee Name
                </th>
                <th scope="col" style={{ width: "250px" }}>
                  Employee Email
                </th>
                <th scope="col" style={{ width: "150px" }}>
                  Employee Phone
                </th>
                <th scope="col" style={{ width: "190px" }}>
                  Employee Role
                </th>
                <th scope="col" style={{ width: "130px" }}>
                  Total Leaves
                </th>
              </tr>
            </thead>
            <tbody>
              {dataList.map((el) => {
                if (el) {
                  return (
                    <tr className="table-row-emp">
                      <td>
                        {el.name}
                        <br />
                        {el.username}
                      </td>
                      <td>{el.email}</td>
                      <td>{el.phone}</td>
                      <td className="name-admin">{el.role}</td>
                      <td>{el.CountLeave}</td>
                    </tr>
                  );
                }else{
                      return null
                }
              })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default EmployeeSec;
