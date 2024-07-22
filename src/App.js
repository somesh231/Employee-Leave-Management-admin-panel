import React from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
// import Home from './Pages/Home';
import Header from './components/Header';
import Footer from './components/Footer';
import Sidebar from './components/Sidebar';
import DepartmentSec from './Pages/DepartmentSec.jsx';
import EmployeeSec from './Pages/EmployeeSec.jsx';
import LeaveTypes from './Pages/LeaveTypes';
import ManageLeave from './Pages/ManageLeave';
import Contact from './Pages/Contact';
import Home from './Pages/Home.js';
import Error from './Pages/Error.jsx';
import UpdateMng from './components/UpdateMng.js';

function Layout({ children }) {
  const location = useLocation();
  const isAuthPage = location.pathname === '/login' || location.pathname === '/register';

  return (
    <>
      {!isAuthPage && <Header />}
      {!isAuthPage && <Sidebar />}
      <div>
        {children}
      </div>
      {!isAuthPage && <Footer />}
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/Admin/adminsite' element={<Home/>}/>
          <Route path="/contact" element={<Contact/>} />
          <Route path="/departsec" element={<DepartmentSec/>} />
          <Route path="/empsec" element={<EmployeeSec/>} />
          <Route path="/leavetype" element={<LeaveTypes/>} />
          <Route path="/mngleave" element={<ManageLeave/>} />
          <Route path="/UpdateMng" element={<UpdateMng/>}/>
          <Route path="*" element={<Error/>}/>
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;