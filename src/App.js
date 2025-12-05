import './App.css';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useContext } from 'react';
import Home from './Pages/home/Home';
import Login from './Pages/login/Login';
import List from './Pages/list/List';
import Single from './Pages/single/single';
import New from './Pages/new/New';
import Passenger from './components/datatable/Passenger';
import Rider from './components/datatable/Rider';
import RideReq from './components/datatable/RideReq';
import Earnings from './components/datatable/Earnings';
import { productInputs, userInputs } from './formSource';
import "./style/dark.scss";
import { AuthContext } from './context/AuthContext';
import { DarkModeContext } from './context/darkMOdeContext';

// Add the missing page imports
import Logout from './Pages/logout/Logout';
import Notification from './Pages/notification/Notification';
import Profile from './Pages/profile/Profile';
import Settings from './Pages/settings/Settings';
import Status from './Pages/status/Status';
import SystemHealth from './Pages/systemHealth/SystemHealth';
import Logs from './Pages/logs/Logs';

function App() {
  const { darkMode } = useContext(DarkModeContext);
  const { currentUser } = useContext(AuthContext);

  const RequireAuth = ({ children }) => {
    return currentUser ? children : <Navigate to="/login" />;
  };

  return (
    <div className={darkMode ? "app dark" : "app"}>
      <BrowserRouter>
        <Routes>

          {/* Public route */}
          <Route path="/login" element={<Login />} />

          {/* Protected routes */}
          <Route path="/" element={<RequireAuth><Home /></RequireAuth>} />
          
          <Route path="/users" element={<RequireAuth><List /></RequireAuth>} />
          <Route path="/users/:userId" element={<RequireAuth><Single /></RequireAuth>} />
          <Route path="/users/new" element={<RequireAuth><New inputs={userInputs} title="Add New User" /></RequireAuth>} />

          <Route path="/passengers" element={<RequireAuth><Passenger /></RequireAuth>} />
          <Route path="/riders" element={<RequireAuth><Rider /></RequireAuth>} />
          <Route path="/rideReq" element={<RequireAuth><RideReq /></RequireAuth>} />
          <Route path="/earnings" element={<RequireAuth><Earnings /></RequireAuth>} />

          {/* Added pages */}
          <Route path="/status" element={<RequireAuth><Status /></RequireAuth>} />
          <Route path="/notification" element={<RequireAuth><Notification /></RequireAuth>} />
          <Route path="/system-health" element={<RequireAuth><SystemHealth /></RequireAuth>} />
          <Route path="/logs" element={<RequireAuth><Logs /></RequireAuth>} />
          <Route path="/settings" element={<RequireAuth><Settings /></RequireAuth>} />
          <Route path="/profile" element={<RequireAuth><Profile /></RequireAuth>} />
          <Route path="/logout" element={<RequireAuth><Logout /></RequireAuth>} />

        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
