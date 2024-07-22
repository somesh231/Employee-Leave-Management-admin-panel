import React from "react";
import {useNavigate } from "react-router-dom";





const UpdateMng=()=>{
    const navigate = useNavigate();
    return(
    <>
        <div className="Manager-card">
              <div className="main-card">
                <h5>If you want to go to Manage Admin</h5>
                <h5>If you want to go to Change Name of Manager</h5>
                <div className="btn-div">
                  <button
                    onClick={() => {
                      navigate("/mngadmin");
                    }}
                    className="btn-mngadmin"
                  >
                    Manage Admin
                  </button>
                  <button className="btn-changename">Change Name</button>
                  <input className="new-mng-inpt" type="text"/>
                </div>
              </div>
            </div>
    </>
    )
}

export default UpdateMng;