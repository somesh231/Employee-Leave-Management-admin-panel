import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'; 
import "bootstrap-icons/font/bootstrap-icons.css";
import { Link } from 'react-router-dom';
import UserImg from "../images/user2-160x160.jpg";
import "../Styles/SidebarStyle.css";

const Sidebar = () => {
  return (
    <div>
      <aside className="main-sidebar sidebar-dark-primary elevation-4" style={{background:"midnightblue"}}>
  {/* Brand Logo */}
  <Link to="/" className="brand-link" style={{textDecoration:"none"}}>
    <img src="dist/img/AdminLTELogo.png" alt="AdminLTE Logo" className="brand-image img-circle elevation-3" style={{opacity: '.8'}} />
    <span className="brand-text font-weight-light">Leave Approval</span>
  </Link>
  {/* Sidebar */}
  <div className="sidebar">
    {/* Sidebar user panel (optional) */}
    <div className="user-panel mt-3 pb-3 mb-3 d-flex">
      <div className="image">
        <img src={UserImg} className="img-circle elevation-2" alt="User " />
      </div>
      <div className="info">
        <Link to="/" className="d-block" style={{textDecoration:"none"}}>Somesh Sharma</Link>
      </div>
    </div>
    {/* SidebarSearch Form */}
    <div className="form-inline" style={{width:"350px"}}>
      <div className="input-group" data-widget="sidebar-search">
        <input className="form-control form-control-sidebar" type="search" placeholder="Search" aria-label="Search" style={{background:"white"}}/>
        <div className="input-group-append">
          <button className="btn btn-sidebar" style={{background:"steelblue",width:"60px"}}>
            <i className="fas fa-search fa-fw" />
          </button>
        </div>
      </div>
    </div>
    {/* Sidebar Menu */}
    <nav className="mt-2">
      <ul className="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
        {/* Add icons to the links using the .nav-icon class
         with font-awesome or any other icon font library */}
        <li className="nav-item">
          <Link to="/" className="nav-link ">
            <i class="bi bi-speedometer2" style={{fontSize:"20px"}}></i>
            <p style={{marginLeft:"6px"}}>
              Dashboard
            </p>
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/departsec" className="nav-link">
            <i class="bi bi-bounding-box-circles" style={{fontSize:"20px"}}></i>
            <p style={{marginLeft:"6px"}}>
              Department Section
            </p>
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/empsec" className="nav-link">
            <i class="bi bi-person-gear" style={{fontSize:"20px"}}></i>
            <p style={{marginLeft:"6px"}}>
              Employee Section 
            </p>
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/leavetype" className="nav-link">
          <i class="bi bi-box-arrow-right" style={{fontSize:"20px"}}></i>
            <p style={{marginLeft:"6px"}}>
              Leave Types
            </p>
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/mngleave" className="nav-link">
            <i class="bi bi-briefcase" style={{fontSize:"20px"}}></i>
            <p style={{marginLeft:"6px"}}>
              Manage Leave
            </p>
          </Link>
        </li>
      </ul>
    </nav>
    {/* /.sidebar-menu */}
  </div>
  {/* /.sidebar */}
</aside>

    </div>
  )
}

export default Sidebar
