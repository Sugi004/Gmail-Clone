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
    isInitialLoading,
    status,
    parsingData,
    isError,
    formatTime,
    handleDelete,
    isStarred,
    handleStarMail
  } = useContext(UseContext);

  const navigate = useNavigate();

  // Check error while fetching data

  if (isError) {
    toast.error("Session Expired, please login");
  }

  // Set an Empty localstorage if anyone didn't exists
  if (!localStorage.getItem("openedMails"))
    // Set an empty array in localStorage only if it doesn't exist
    localStorage.setItem("openedMails", JSON.stringify([]));

  // Get the openedMails list from Local stordage and assign it to state
  const initialOpenedMails =
    JSON.parse(localStorage.getItem("openedMails")) || [];
  const [openedMail, setOpenedMail] = useState(initialOpenedMails);
  localStorage.setItem("openedMails", JSON.stringify([...openedMail]));

  // Open the mail using ID and also store the status of mail whether it's already opened using Local Storage
  const handleOpenMail = async (id) => {
    try {
      if (!openedMail.includes(id)) {
        setOpenedMail([...openedMail, id]);
      }

      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/mails/${id}`,
        {
          withCredentials: true
        }
      );

      if (res.status === 200) {
        const data = res.data.recievedMail.receivedMails[0];
        navigate(`/mails/inbox/${id}`, {
          state: data
        });
      }
    } catch (error) {
      toast.error("Error opening the mail");
    }
  };

  return (
    <>
      <Tabs />
      <div>
        {isInitialLoading === true && (
          <div style={{ textAlign: "center", marginTop: "30%" }}>
            <Loaders />
          </div>
        )}

        <div className="gmail-table">
          <table>
            <thead></thead>
            <tbody>
              {status === "success" && data.data[0].receivedMails.length > 0 ? (
                data.data[0].receivedMails
                  .sort((a, b) => new Date(b.date) - new Date(a.date))
                  .map((e, i) => {
                    return (
                      <tr
                        key={i}
                        className={openedMail.includes(e._id) ? "opened " : ""}
                      >
                        <td className="checkbox-cell">
                          <input type="checkbox" /> &nbsp; &nbsp;
                          <FontAwesomeIcon
                            icon={faStar}
                            className={`starIcon ${
                              isStarred.includes(e._id) ? "buttonActive" : ""
                            }
                            `}
                            onClick={() => handleStarMail(e._id)}
                          />
                        </td>
                        <td></td>

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
                  })
              ) : (
                <tr className="noDataRow">
                  <td>
                    <div
                      style={{
                        textAlign: "center",

                        fontWeight: 500,
                        marginTop: "12px"
                      }}
                    >
                      No Mails to display!!!
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default Inbox;
