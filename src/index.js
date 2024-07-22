import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { ToastContainer } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

ReactDOM.render(<>
  <App/>
{/* Same as */}
<ToastContainer/>
</>,document.getElementById("root"))
