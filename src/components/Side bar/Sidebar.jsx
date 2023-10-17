import "./sidebar.css";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import ComposeMail from "../Dashboard/ComposeMail/ComposeMail";

function Sidebar() {
  const [currentMailBox, setcurrentMailBox] = useState("");
  const [istoggleVisibile, setToggleVisibility] = useState(false);

  const navigate = useNavigate();
  useEffect(() => {
    const storedPage = localStorage.getItem("currentMailBox");
    if (storedPage) {
      setcurrentMailBox(storedPage);
    }
  }, []);

  const toggleSlideUp = () => {
    setToggleVisibility(!istoggleVisibile);
  };
  return (
    <>
      <div className="sideBar-wrapper">
        <div>
          <button className="button" onClick={toggleSlideUp}>
            <FontAwesomeIcon icon={faPen} size="2xl" bounce /> &nbsp; Compose
          </button>
        </div>
        <ul>
          <li
            className={
              currentMailBox === "inbox" ? "nav-link collapsed active" : ""
            }
            onClick={() => {
              navigate("/mails/inbox");
              setcurrentMailBox("inbox");
              localStorage.setItem("currentMailBox", "inbox");
            }}
          >
            Inbox
          </li>
          <li className="disabled">
            <Link className="nav-link collapsed">Starred</Link>
          </li>
          <li className="disabled">
            <Link className="nav-link collapsed ">Snoozed</Link>
          </li>
          <li className="disabled">
            <Link className="nav-link collapsed">Important</Link>
          </li>
          <li
            className={
              currentMailBox === "sent" ? "nav-link collapsed active" : ""
            }
            onClick={() => {
              navigate("/mails/sent");
              setcurrentMailBox("sent");
              localStorage.setItem("currentMailBox", "sent");
            }}
          >
            Sent
          </li>
          <li className="disabled">
            <Link className="nav-link collapsed">Drafts</Link>
          </li>
        </ul>
      </div>
      <div>
        {istoggleVisibile ? (
          <ComposeMail
            toggleSlideUp={toggleSlideUp}
            istoggleVisibile={istoggleVisibile}
          />
        ) : (
          ""
        )}
        {/* <div
          className={`slide-up-component ${istoggleVisibile ? "active" : ""}`}
        >
          <div className="composeMail-title">
            New Message
            <div>
              <FontAwesomeIcon icon={faXmark} onClick={toggleSlideUp} />
            </div>
          </div>
          <div className="content">
            <div>
              <Form>
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlInput1"
                >
                  <input
                    type="email"
                    className="emailForm"
                    placeholder="Recipients"
                  />
                </Form.Group>
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlInput1"
                >
                  <input
                    type="email"
                    className="emailForm"
                    placeholder="Subject"
                  />
                </Form.Group>
                <Form.Group
                  className="mb-2"
                  controlId="exampleForm.ControlTextarea1"
                >
                  <textarea className="textArea" type="textarea" />
                </Form.Group>
                <Button className="sendButton"> Send</Button>
              </Form>
            </div>
          </div>
        </div> */}
      </div>
    </>
  );
}

export default Sidebar;
