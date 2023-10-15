import PropTypes from "prop-types";
import "./composeMail.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/esm/Button";
import { useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";

function ComposeMail({ toggleSlideUp, istoggleVisibile }) {
  let [inputs, setInputs] = useState({
    to: "",
    subject: "",
    body: ""
  });

  const handleSendMail = async () => {
    try {
      if (inputs.to !== "") {
        let res = await axios.post(
          `${import.meta.env.VITE_API_URL}/send`,
          {
            to: inputs.to,
            subject: inputs.subject,
            body: inputs.body
          },
          {
            withCredentials: true
          }
        );

        if (res.status === 200) {
          toast.success(res.data.message, {
            autoClose: 500
          });
          toggleSlideUp;
        }
      } else {
        toast.error("Please specify at least one recipient.");
      }
    } catch (error) {
      toast.error(error.response.data.message, {
        autoClose: 500
      });
    }
  };

  return (
    <div className={`slide-up-component ${istoggleVisibile ? "active" : ""}`}>
      <div className="composeMail-title">
        New Message
        <div>
          <FontAwesomeIcon icon={faXmark} onClick={toggleSlideUp} />
        </div>
      </div>
      <div className="content">
        <div>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <input
                type="email"
                className="emailForm"
                placeholder="Recipients"
                onChange={(e) => {
                  setInputs({ to: e.target.value });
                }}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <input type="email" className="emailForm" placeholder="Subject" />
            </Form.Group>
            <Form.Group
              className="mb-2"
              controlId="exampleForm.ControlTextarea1"
              onChange={(e) => {
                setInputs({ body: e.target.value });
              }}
            >
              <textarea className="textArea" type="textarea" />
            </Form.Group>
            <Button className="sendButton" onClick={handleSendMail}>
              Send
            </Button>
          </Form>
        </div>
      </div>
    </div>
  );
}

export default ComposeMail;

ComposeMail.propTypes = {
  istoggleVisibile: PropTypes.node.isRequired,
  toggleSlideUp: PropTypes.node.isRequired
};
