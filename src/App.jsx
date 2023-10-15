import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import "./App.css";
import Login from "./components/Login/main";
import CreateAccount from "./components/Create Account/CreateAccount";
import Dashboard from "./components/Dashboard/Dashboard";
import Inbox from "./components/Dashboard/Inbox/Inbox";
import Sent from "./components/Dashboard/Sent/Sent";
import UserContext from "./Context/UserContext";
import MailViewPage from "./components/Dashboard/Mail view/MailViewPage";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/sign-up" element={<CreateAccount />} />

          <Route path="/mails" element={<Dashboard />}>
            <Route
              path="inbox"
              element={
                <UserContext>
                  <Inbox />
                </UserContext>
              }
            />
            <Route
              path="sent"
              element={
                <UserContext>
                  <Sent />
                </UserContext>
              }
            />
            <Route
              path=":id"
              element={
                <UserContext>
                  <MailViewPage />
                </UserContext>
              }
            />
          </Route>

          <Route path="/*" element={<Navigate to="/login" />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
