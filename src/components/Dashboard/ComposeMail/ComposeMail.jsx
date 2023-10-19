import PropTypes from "prop-types";
import "./composeMail.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/esm/Button";
import { useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import Loaders from "../../../LoaderComponents/Loaders";

function ComposeMail({ toggleSlideUp, istoggleVisibile }) {
  const [isLoading, setIsloading] = useState(false);

  let [inputs, setInputs] = useState({
    to: [],
    subject: "",
    body: ""
  });

  const handleSendMail = async () => {
    try {
      setIsloading(true);
      if (!inputs.to.length) {
        toast.error("Please specify at least one recipient.");
        setIsloading(false);
      }

      let res = await axios.post(
        `${import.meta.env.VITE_API_URL}/send`,

        {
          to: inputs.to.split(";"),
          subject: inputs.subject,
          body: inputs.body
        },

        {
          withCredentials: true
        }
      );

      if (res.status === 200) {
        toast.success(res.data.message, {
          position: "bottom-left",
          autoClose: 500
        });

        toggleSlideUp();
      }
    } catch (error) {
      setIsloading(false);
      toast.error(error.response.data.message, {
        autoClose: 500
      });
    }
  };

  const handleInputs = (e) => {
    setInputs({
      ...inputs,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className={`slide-up-component ${istoggleVisibile ? "active" : ""}`}>
      <div className="composeMail-title">
        New Message
        <div>
          <FontAwesomeIcon
            icon={faXmark}
            onClick={toggleSlideUp}
            style={{ cursor: "pointer" }}
          />
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
                name="to"
                onChange={handleInputs}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <input
                type="email"
                className="emailForm"
                placeholder="Subject"
                name="subject"
                onChange={handleInputs}
              />
            </Form.Group>
            <Form.Group
              className="mb-2"
              controlId="exampleForm.ControlTextarea1"
            >
              <textarea
                className="textArea"
                type="textarea"
                name="body"
                onChange={handleInputs}
              />
            </Form.Group>
            <Button
              className="sendButton"
              disabled={isLoading}
              onClick={handleSendMail}
            >
              {isLoading ? <Loaders /> : "Send"}
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
