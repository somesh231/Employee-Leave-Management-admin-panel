import React from "react"
import { Link } from "react-router-dom"
import LeaveCard from '../components/LeaveCard'
import "../Styles/LeaveTypeStyle.css";
import LeaveData from "../components/LeaveData";

const LeaveTypes = ()=>{

    return(
        <>
  <div className="content-wrapper">
      {/* Content Header (Page header) */}
      <div className="content-header">
        <div className="container-fluid">
          <div className="row mb-2">
            <div className="col-sm-6">
              <h1 className="m-0">Leave Types</h1>
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
        <div className="main-div">
          {
            LeaveData.map((el)=>{
              return(
                <LeaveCard 
                type={el.type}
                description = {el.description}
                allottedLeaves = {el.allottedLeaves}
                note = {el.note}
              />
              )
            })
          }
        </div>
      </div>
      {/* /.content-header */}
      </div>
    </>
    )
}

export default LeaveTypes;