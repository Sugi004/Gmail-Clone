import "./sent.css";
import Loaders from "../../../LoaderComponents/Loaders";
import { toast } from "react-toastify";
import { UseContext } from "../../../Context/UserContext";
import { useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faTrash } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Sent() {
  const {
    data,
    isLoading,
    status,
    isError,
    formatTime,
    handleDelete,
    handleStarMail,
    isStarred,
    seachedText
  } = useContext(UseContext);

  const navigate = useNavigate();

  // Check error while fetching data
  if (isError) {
    toast.error("Error fetching data, please retry");
  }

  // Open the mail using Id
  const handleOpenMail = async (id) => {
    const res = await axios.get(`${import.meta.env.VITE_API_URL}/mails/${id}`, {
      withCredentials: true
    });

    if (res.status === 200) {
      const data = res.data.sentMail.sentMails[0];
      navigate(`/mails/sent/${id}`, { state: data });
    }
  };

  console.log("sentBox", seachedText);

  return (
    <>
      <div>
        {isLoading === true && (
          <div style={{ textAlign: "center", marginTop: "30%" }}>
            <Loaders />
          </div>
        )}
        <div className="gmail-SentTable">
          <table>
            <thead></thead>
            <tbody>
              {status === "success" && data.data[0].sentMails.length > 0 ? (
                data.data[0].sentMails
                  .sort((a, b) => new Date(b.date) - new Date(a.date))
                  .map((e, i) => {
                    return (
                      <tr key={i}>
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
                        <td onClick={() => handleOpenMail(e._id)}>
                          To:&nbsp;
                          {e.to.map((e) => {
                            return e;
                          })}
                        </td>
                        <td onClick={() => handleOpenMail(e._id)}>
                          <span>{e.subject ? e.subject : "(no-subject)"}</span>
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
                        fontSize: "17px",
                        fontWeight: 500,
                        marginTop: "12px"
                      }}
                    >
                      No mails Sent!!!
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

export default Sent;
