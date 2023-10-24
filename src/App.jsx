import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import "./App.css";

import Login from "./components/Login/main";
import CreateAccount from "./components/Create Account/CreateAccount";
import Dashboard from "./components/Dashboard/Dashboard";
import Inbox from "./components/Dashboard/Inbox/Inbox";
import Sent from "./components/Dashboard/Sent/Sent";
import UserContext from "./Context/UserContext";
import InboxMailViewPage from "./components/Dashboard/Mail view/InboxMailViewPage";
import SentboxMailViewPage from "./components/Dashboard/Mail view/SentboxMailViewPage";
import StarredMailViewPage from "./components/Dashboard/Mail view/StarredMailViewPage";
import StarredMails from "./components/Dashboard/StarredMails/StarredMails";

function App() {
  return (
    <>
      <UserContext>
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/sign-up" element={<CreateAccount />} />

            <Route path="/mails" element={<Dashboard />}>
              <Route path="inbox" element={<Inbox />} />
              <Route path="sent" element={<Sent />} />
              <Route path="inbox/:id" element={<InboxMailViewPage />} />
              <Route path="sent/:id" element={<SentboxMailViewPage />} />
              <Route path="starred" element={<StarredMails />} />
              <Route path="starred/:id" element={<StarredMailViewPage />} />
            </Route>

            <Route path="/*" element={<Navigate to="/login" />} />
          </Routes>
        </BrowserRouter>
      </UserContext>
    </>
  );
}

export default App;
