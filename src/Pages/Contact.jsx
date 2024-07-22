import React, { useState } from "react";
import { Link } from "react-router-dom";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import "../Styles/ContactStyle.css"; // Make sure to adjust the path to your CSS file if needed
import axios from 'axios';


axios.defaults.baseURL ="http://localhost:5000/api/form";
const Contact = () => {

  const [contact,setContact] = useState({
    username: "",
    email: "",
    phone: "",
    message: "",
  })

  const handleInput = (e)=>{
    e.preventDefault();
    const name = e.target.name;
    const value = e.target.value;

    setContact({
      ...contact,
      [name]:value,
    });
  }

  const handleSubmit =async (e) => {
    e.preventDefault();
    console.log('Form submitted:', contact);
    // Your form submission logic here
    const data =await axios.post("/contact",contact);
    try{
      if(data.data.success){
        alert("your message delivered");
      }
    }catch(err){
      console.error(err);
    }
  };



  return (
    <>
    <div className="content-wrapper" style={{ backgroundColor: "beige" }}>
      {/* Content Header (Page header) */}
      <div className="content-header">
        <div className="container-fluid">
          <div className="row mb-2">
            <div className="col-sm-6">
              <h1 className="m-0">Contact Us</h1>
            </div>
            {/* /.col */}
            <div className="col-sm-6">
              <ol className="breadcrumb float-sm-right">
                <li className="breadcrumb-item">
                  <Link to="/">Home</Link>
                </li>
                <li className="breadcrumb-item active">Contact Us</li>
              </ol>
            </div>
            {/* /.col */}
          </div>
          {/* /.row */}
        </div>
        {/* /.container-fluid */}
      </div>
      {/* /.content-header */}

      {/* Main content */}
      <div className="main-content">
        <h1 style={{position:"absolute",left:"100px",fontSize:"80px",fontFamily:"monospace",textShadow:"7px 4px 4px rgba(64,106,149,0.6"}}>Contact Us</h1>
        <div className="side-form">
          <form className="inside-form" onSubmit={handleSubmit}>
            <TextField
              id="username"
              name="username"
              label="username"
              variant="outlined"
              fullWidth
              value={contact.username}
              onChange={handleInput}
              autoComplete="off"
              margin="normal"
              style={{width:"300px"}}
            />
            <br/>
            <TextField
              id="email"
              label="Email"
              name="email"
              variant="outlined"
              fullWidth
              value={contact.email}
              autoComplete="off"
              onChange={handleInput}
              margin="20px"
              style={{width:"300px"}}
            />
            <br />
            <TextField
              id="phone"
              label="Phone"
              name="phone"
              variant="outlined"
              fullWidth
              value={contact.phone}
              autoComplete="off"
              onChange={handleInput}
              margin="normal"
              style={{width:"300px"}}
            />
            <br />
            <TextField
              id="message"
              label="Message"
              name="message"
              variant="outlined"
              fullWidth
              value={contact.message}
              autoComplete="off"
              onChange={handleInput}
              margin="normal"
              multiline
              rows={4}
              style={{width:"300px"}}
            />
            <br />
            <Box textAlign="center">
              <Button variant="contained" color="primary" type="submit">
                Send Message
              </Button>
            </Box>
          </form>
        </div>
      </div>
      {/* /.main-content */}
    </div>
    </>
  );
};

export default Contact;