import Tabs from "./Tabs.jsx";
import "./inbox.css";
import Loaders from "../../../LoaderComponents/Loaders";
import { toast } from "react-toastify";
import { UseContext } from "../../../Context/UserContext";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faTrash } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

function Inbox() {
  const {
    data,
    isLoading,
    status,
    parsingData,
    isError,
    formatTime,
    handleDelete
  } = useContext(UseContext);

  const navigate = useNavigate();

  const initialOpenedMails = JSON.parse(localStorage.getItem("openedMails"));
  const [openedMail, setOpenedMail] = useState(initialOpenedMails);
  console.log("openMail", openedMail);
  // Check error while fetching data
  if (isError) {
    toast.error("Error fetching data, please retry");
  }

  // Open the mail using ID and also store the status of mail whether it's already opened using Local Storage
  const handleOpenMail = async (id) => {
    try {
      setOpenedMail((prevOpenedMaills) => {
        if (prevOpenedMaills.includes(id)) {
          localStorage.setItem(
            "openedMails",
            JSON.stringify([...prevOpenedMaills, id])
          );

          return prevOpenedMaills;
        } else {
          console.log("hello");
          return [...prevOpenedMaills, id];
        }
      });

      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/mails/${id}`,
        {
          withCredentials: true
        }
      );

      if (res.status === 200) {
        const data = res.data.recievedMail.receivedMails[0];
        navigate(`/mails/${id}`, { state: data });
      }
    } catch (error) {
      toast.error("Error opening the mail");
    }
  };

  return (
    <>
      <Tabs />
      <div>
        {isLoading === true && (
          <div style={{ textAlign: "center", marginTop: "30%" }}>
            <Loaders />
          </div>
        )}
        <div className="gmail-table">
          <table>
            <thead></thead>
            <tbody>
              {status === "success" &&
                data.data[0].receivedMails
                  .sort((a, b) => new Date(b.date) - new Date(a.date))
                  .map((e, i) => {
                    return (
                      <tr
                        key={i}
                        className={openedMail.includes(e._id) ? "opened " : ""}
                        onClick={() => handleOpenMail(e._id)}
                      >
                        <td className="checkbox-cell">
                          <input type="checkbox" />
                        </td>
                        <td>
                          <FontAwesomeIcon icon={faStar} className="faIcon" />
                        </td>
                        <td
                          className={
                            openedMail.includes(e._id)
                              ? "normalFont"
                              : "boldFont"
                          }
                          onClick={() => handleOpenMail(e._id)}
                        >
                          {parsingData(e.from)}
                        </td>
                        <td onClick={() => handleOpenMail(e._id)}>
                          <span
                            className={
                              openedMail.includes(e._id)
                                ? "normalFont"
                                : "boldFont"
                            }
                          >
                            {e.subject ? e.subject : "(no-subject)"}
                          </span>
                          &nbsp; - <span>{e.body}</span>
                        </td>

                        <td style={{ position: "relative" }}>
                          <div className="delete-icon">
                            <div className="deleteIcon">
                              <FontAwesomeIcon
                                icon={faTrash}
                                className="faIcon"
                                onClick={() => {
                                  handleDelete(e._id);
                                }}
                              />
                            </div>
                          </div>
                        </td>
                        <td
                          onClick={() => handleOpenMail(e._id)}
                          style={{ fontSize: "13px" }}
                        >
                          {formatTime(e.date)}
                        </td>
                      </tr>
                    );
                  })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default Inbox;
