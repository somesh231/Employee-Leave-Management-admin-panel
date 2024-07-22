import React, { useEffect } from "react";
import "../Styles/HomeStyle.css";
import BusinessCenterOutlinedIcon from '@mui/icons-material/BusinessCenterOutlined';
import Groups2OutlinedIcon from '@mui/icons-material/Groups2Outlined';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import AssignmentTurnedInOutlinedIcon from '@mui/icons-material/AssignmentTurnedInOutlined';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
// import { Line, Bar } from "react-chartjs-2";
import LineChart from "../components/LineChart";
import BarChart from "../components/BarChart";
import { Link } from "react-router-dom";

import { useState } from "react";



const Home = () => {

  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    Title,
    Tooltip,
    Legend
  );

  const [chartData] = useState({
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
    datasets: [
      {
        label: "Total Revenue",
        data: [35000, 40000, 50000, 30000, 25000, 35000, 40000],
        borderColor: "rgba(75, 192, 192, 1)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
      },
      {
        label: "Total Cost",
        data:[15000, 10000, 12000, 15000, 20000, 10000, 12000],
        borderColor: "rgba(153, 102, 255, 1)",
        backgroundColor: "rgba(153, 102, 255, 0.2)",
      },
    ],
  });


  const [CountApproved,setCountApproved] = useState();
  const [CountDeclined,setCountDeclined] = useState();
  const [CountEmp,setCountEmp] =useState();


useEffect(()=>{

  const getapprovedcount = async()=>{
    try {
      const response = await fetch("http://localhost:5000/api/empleav/countrequestapproved",{
        method:"GET"
      })
  
      if(response.ok){
        const data= await response.json();
        setCountApproved(data.count);
      }
      
    } catch (error) {
      console.error(error);
    }
  }

  const getdeclinedcount = async()=>{
    try {
      const response = await fetch("http://localhost:5000/api/empleav/countrequestdeclined",{
        method:"GET"
      })
  
      if(response.ok){
        const data= await response.json();
        setCountDeclined(data.count);
      }
      
    } catch (error) {
      console.error(error);
    }
  }

  const getusercount = async()=>{
    try {
      const response = await fetch("http://localhost:5000/api/auth/countuser",{
        method:"GET"
      })
  
      if(response.ok){
        const data= await response.json();
        setCountEmp(data.Countuser);
      }
      
    } catch (error) {
      console.error(error);
    }
  }
  getdeclinedcount();
  getapprovedcount();
  getusercount();
},[])
  

  return (
    <>
      {/* Content Wrapper. Contains page content */}
<div className="content-wrapper">
  {/* Content Header (Page header) */}
  <div className="content-header">
    <div className="container-fluid">
      <div className="row mb-2">
        <div className="col-sm-6">
          <h1 className="m-0">Dashboard</h1>
        </div>{/* /.col */}
        <div className="col-sm-6">
          <ol className="breadcrumb float-sm-right">
            <li className="breadcrumb-item"><Link to="/">Home</Link></li>
            <li className="breadcrumb-item active">Dashboard</li>
          </ol>
        </div>{/* /.col */}
      </div>{/* /.row */}
    </div>{/* /.container-fluid */}
  </div>
  {/* /.content-header */}
  {/* Main content */}
  <section className="content">
    <div className="container-fluid">
      {/* Small boxes (Stat box) */}
      <div className="row">
        <div className="col-lg-3 col-6">
          {/* small box */}
          <div className="small-box " style={{backgroundColor:"midnightblue",color:"white"}}>
            <div className="inner">
              <h3>12</h3>
              <p>Available Leave Types</p>
            </div>
            <div className="icon">
              <BusinessCenterOutlinedIcon style={{color:"white"}}/>
            </div>
            <a href="/leavetype" className="small-box-footer">More info <i className="fas fa-arrow-circle-right" /></a>
          </div>
        </div>
        {/* ./col */}
        <div className="col-lg-3 col-6">
          {/* small box */}
          <div className="small-box "  style={{backgroundColor:"midnightblue",color:"white"}} >
            <div className="inner">
              <h3>{CountEmp}<sup style={{fontSize: 20}}></sup></h3>
              <p>Registered Employees</p>
            </div>
            <div className="icon">
              <Groups2OutlinedIcon style={{color:"white"}}/>
            </div>
            <a href="/EmpSec" className="small-box-footer">More info <i className="fas fa-arrow-circle-right" /></a>
          </div>
        </div>
        {/* ./col */}
        <div className="col-lg-3 col-6">
          {/* small box */}
          <div className="small-box"  style={{backgroundColor:"midnightblue",color:"white"}}>
            <div className="inner">
              <h3>{CountDeclined}</h3>
              <p>Declined Requests</p>
            </div>
            <div className="icon">
              <CloseOutlinedIcon style={{color:"white"}}/>
            </div>
            <a href="/mngleave" className="small-box-footer">More info <i className="fas fa-arrow-circle-right" /></a>
          </div>
        </div>
        {/* ./col */}
        <div className="col-lg-3 col-6">
          {/* small box */}
          <div className="small-box"  style={{backgroundColor:"midnightblue",color:"white"}}>
            <div className="inner">
              <h3>{CountApproved}</h3>
              <p>Approved Requests</p>
            </div>
            <div className="icon">
              <AssignmentTurnedInOutlinedIcon style={{color:"white"}}/>
            </div>
            <a href="/mngleave" className="small-box-footer">More info <i className="fas fa-arrow-circle-right" /></a>
          </div>
        </div>
        {/* ./col */}
      </div>
      {/* /.row */}
      <LineChart chartData={chartData} />
      <BarChart chartData={chartData} />
    </div>{/* /.container-fluid */}
  </section>
  {/* /.content */}
</div>
{/* /.content-wrapper */}

    </>
  );
};

export default Home;
