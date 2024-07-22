import React from 'react'
import { NavLink ,Link } from 'react-router-dom'
import "../Styles/ErrorStyle.css";


const Error=()=>{
    return(
    <>
   
    <div className="content-wrapper">
      {/* Content Header (Page header) */}
      <div className="content-header">
        <div className="container-fluid">
        <section className='err-pge'>
        <div className='container-content'>
            <h2 className='header'>404😓</h2>
            <h4>Sorry! Page not found</h4>
            <p>
                Oops! It seems like the page you're trying to access doesn't exist.
                If you believe there's an issue, feel free to report it , adn we'll look into it. 
            </p>
            <div className='btns'>
                <NavLink to="/" className="home-btn">return home</NavLink>
                <NavLink to="/contact" className="contact-btn">report problem</NavLink>
            </div>
        </div>
    </section>
            
          </div>
          {/* /.row */}
        </div>
        {/* /.container-fluid */}
      </div>
      {/* /.content-header */}

    </>
    )
}

export default Error