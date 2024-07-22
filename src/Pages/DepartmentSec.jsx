import React, { useEffect, useState } from "react";
import "../Styles/DepartmentSecStyles.css";
import { Link, useNavigate } from "react-router-dom";
import AddBoxIcon from "@mui/icons-material/AddBox";
import CloseIcon from "@mui/icons-material/Close";
import axios from 'axios';

axios.defaults.baseURL = "http://localhost:5000/api/";

const DepartmentSec = () => {
  const [addSection, setAddSection] = useState(false); 
  const [addSection2, setAddSection2] = useState(false);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    departmentid: "",
    departmentName: "",
    description: "",
    Manager: "",
    Leaveapprovalflow: "",
  });

  const [dataList, setDataList] = useState([]);
  // const[managerId,setManagerId] = useState({newId:""})
  const [selectedManagerId, setSelectedManagerId] = useState({ id: "" });
  const [newManager, setNewManager] = useState({ Manager: "" });
  const handleOnChange = (e) => {
    const { name, value } = e.target;
    console.log(formData);
    setFormData(() => {
      return {
        ...formData,
        [name]: value,
      };
    });
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();

      const res = await fetch(`http://localhost:5000/api/depsec/depsecform`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json; charset=UTF-8",
        },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setAddSection(false);
        alert("data submitted");
        setDataList([...dataList]);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleClick = (e) => {
    const name = e.target.attributes[1].value;
    const value = e.target.attributes[2].value;
    console.log(name);
    setAddSection2(true);
    setSelectedManagerId(value);
  };

  // console.log(newManager)
  const handleinputmng = (e) => {
    const { name, value } = e.target;
    console.log(newManager);
    setNewManager((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const handleSubmitManager = async (e) => {
    try {
      e.preventDefault();

      const res = await fetch(
        `http://localhost:5000/api/depsec/updateName/${selectedManagerId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json; charset=UTF-8", 
          },
          body: JSON.stringify({
            id: selectedManagerId.id,
            Manager: newManager.Manager,
          }),
        }
      );

      console.log(res);

      if (res.ok) {
        setAddSection2(false);
        alert("Data Updated");
        setDataList((prevDataList) => {
          return prevDataList.map((el) => {
            if (el._id === selectedManagerId.id) {
              return { ...el, Manager: newManager.Manager };
            }
            return el;
          });
        });
      } else {
        console.error("Error updating Manager name");
      }
    } catch (err) {
      console.error("Error:", err);
    }
  };

  useEffect(() => {
    const getFetchData = async () => {
      const response = await fetch("http://localhost:5000/api/depsec/",{
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
                <h1 className="m-0">Department Section</h1>
              </div>
              {/* /.col */}
              <div className="col-sm-6">
                <ol className="breadcrumb float-sm-right">
                  <li className="breadcrumb-item">
                    <Link to="/">Home</Link>
                  </li>
                </ol>
              </div>
              <div className="buttonAdd">
                <button
                  className="add-dept"
                  onClick={() => setAddSection(true)}
                >
                  <AddBoxIcon
                    className="box-icon"
                    style={{ marginRight: "10px" }}
                  />
                  Add Department
                </button>
              </div>
              {/* /.col */}
            </div>
            {/* /.row */}
          </div>
          {/* /.container-fluid */}
          {addSection && (
            <div className="modal-wrapper">
              <div className="form-container">
                <form onSubmit={handleSubmit}>
                  <button
                    className="close-btn"
                    onClick={() => {
                      setAddSection(false);
                    }}
                  >
                    <CloseIcon />
                  </button>
                  <br />
                  <label htmlFor="name">Department Id :</label>
                  <input
                    type="text"
                    id="deptid"
                    name="departmentid"
                    autoComplete="off"
                    onChange={handleOnChange}
                  />

                  <label htmlFor="name">Department name :</label>
                  <input
                    type="text"
                    id="deptname"
                    name="departmentName"
                    autoComplete="off"
                    onChange={handleOnChange}
                  />
                  <label htmlFor="name">Description :</label>
                  <input
                    type="text"
                    id="desc"
                    name="description"
                    autoComplete="off"
                    onChange={handleOnChange}
                  />
                  <label htmlFor="name">Manager :</label>
                  <input
                    type="text"
                    id="manager"
                    name="Manager"
                    autoComplete="off"
                    onChange={handleOnChange}
                  />

                  <label htmlFor="name">Leave Approval Workflow :</label>
                  <input
                    type="text"
                    id="appFlow"
                    name="Leaveapprovalflow"
                    autoComplete="off"
                    onChange={handleOnChange}
                  />

                  <button className="form-dept-submit" onSubmit={handleSubmit}>
                    Submit
                  </button>
                </form>
              </div>
            </div>
          )}

          {addSection2 && (
            <div
              className="Manager-card"
              style={{ zIndex: "2" }}
              onClick={(event) => {
                setAddSection2(false);
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
                <h5>If you want to go to Manage Admin</h5>
                <h5>If you want to go to Change Name of Manager</h5>
                <div className="btn-div">
                  <button
                    onClick={() => {
                      navigate("/");
                    }}
                    className="btn-mngadmin"
                  >
                    Manage Admin
                  </button>
                  <button
                    className="btn-changename"
                    type="submit"
                    onClick={handleSubmitManager}
                  >
                    Change Name
                  </button>
                  <input
                    className="new-mng-inpt"
                    type="text"
                    name="Manager"
                    value={newManager.Manager}
                    onChange={handleinputmng}
                  />
                </div>
              </div>
            </div>
          )}
        </div>
        {/* /.content-header */}

        {/* Main content */}
        <div className="main-sec-dep">
          <table class="table">
            <thead>
              <tr className="table-row">
                <th scope="col" style={{ width: "20px" }}>
                  Department Id
                </th>
                <th scope="col" style={{ width: "150px" }}>
                  Department
                  <br />
                  Name
                </th>
                <th scope="col" style={{ width: "320px" }}>
                  Description
                </th>
                <th scope="col" style={{ width: "120px" }}>
                  Manager
                </th>
                <th scope="col">Leave Approval Workflow</th>
              </tr>
            </thead>
            <tbody>
              <tr className="table-row">
                <th scope="row">IT-001</th>
                <td>IT Department</td>
                <td>Responsible for software devlopment and maintenance</td>
                <td className="name-admin">John Doe</td>
                <td>
                  Department {">"} Manager {">"} HR {">"} CEO
                </td>
              </tr>
              <tr className="table-row">
                <th scope="row">HR-001</th>
                <td>Human Resources</td>
                <td>Handles employee relations,benefits,and recruitment</td>
                <td
                  className="name-admin"
                  onClick={(e) => {
                    console.log(e);
                    setAddSection2(true);
                  }}
                >
                  Jane Smith
                </td>
                <td>
                  Department {">"} Manager {">"} CEO
                </td>
              </tr>
              <tr className="table-row">
                <th scope="row">MKT-001</th>
                <td>Marketing Department</td>
                <td>Develops and executes marketing campaigns</td>
                <td className="name-admin" onClick={() => setAddSection2(true)}>
                  Bob Johnson
                </td>
                <td>
                  Department {">"} Manager {">"} HR {">"} CEO
                </td>
              </tr>
              <tr className="table-row">
                <th scope="row">PKT-001</th>
                <td>Product/Service Development</td>
                <td>
                  {" "}
                  develops new and existing products or services for sale
                </td>
                <td
                  className="name-admin"
                  onClick={() => {
                    setAddSection2(true);
                  }}
                >
                  Mike Thomson
                </td>
                <td>
                  Department {">"} Manager {">"} HR {">"} CEO
                </td>
              </tr>
              {dataList.map((el) => {
                if (el) {
                  return (
                    <tr>
                      <th scope="row">{el.departmentid}</th>
                      <td>{el.departmentName}</td>
                      <td> {el.description}</td>
                      <td
                        className="name-admin"
                        name={el.Manager}
                        value={el._id}
                        onClick={handleClick}
                        key={el._id}
                      >
                        {el.Manager}
                      </td>
                      <td>{el.Leaveapprovalflow}</td>
                    </tr>
                  );
                }else{
                  return(<></>)
                }
              })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};
export default DepartmentSec;
