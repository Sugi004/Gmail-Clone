import { UseContext } from "../../../Context/UserContext";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faTrash } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

function StarredMails() {
  const { data, status, parsingData, formatTime, handleDelete } =
    useContext(UseContext);

  const navigate = useNavigate();

  let starredMail = JSON.parse(localStorage.getItem("starredMails"));
  const [removeStarred, setRemoveStarred] = useState(starredMail);

  let inboxMail;
  let sentMail;
  let inboxStarData = [];
  let sentBoxStarData = [];

  if (status === "success") {
    inboxMail = data.data[0].receivedMails;
    sentMail = data.data[0].sentMails;
  } else {
    console.log("null");
  }

  if (
    (inboxMail && inboxMail.length > 0) ||
    (sentMail && sentMail.length > 0)
  ) {
    if (inboxMail && inboxMail.length > 0) {
      for (let e of inboxMail) {
        if (starredMail.includes(e._id)) {
          inboxStarData.push(e);
        }
      }
    }
    if (sentMail && sentMail.length > 0) {
      for (let e of sentMail) {
        if (starredMail.includes(e._id)) {
          sentBoxStarData.push(e);
        }
      }
    }
  } else {
    console.log("No mails");
  }

  const handleOpenStarredMail = async (id) => {
    try {
      let res = await axios.get(`${import.meta.env.VITE_API_URL}/mails/${id}`, {
        withCredentials: true
      });
      if (res.status === 200) {
        const data = res.data;
        navigate(`/mails/starred/${id}`, { state: data });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const unStarredMail = (id) => {
    if (removeStarred.includes(id)) {
      const updatedStarredMails = starredMail.filter((Id) => Id !== id);
      setRemoveStarred(updatedStarredMails);
    }
  };
  localStorage.setItem("starredMails", JSON.stringify([...removeStarred]));
  return (
    <>
      <div>
        <div className="gmail-table">
          <table>
            <thead></thead>
            <tbody>
              {inboxStarData.length > 0
                ? inboxStarData
                    .sort((a, b) => new Date(b.date) - new Date(a.date))
                    .map((e, i) => {
                      return (
                        <tr
                          key={i}
                          style={{
                            backgroundColor: "rgba(214, 236, 240, 0.349)"
                          }}
                        >
                          <td className="checkbox-cell">
                            <input type="checkbox" /> &nbsp; &nbsp;
                            <FontAwesomeIcon
                              icon={faStar}
                              className={`starIcon ${
                                !removeStarred.includes(e._id)
                                  ? ""
                                  : "buttonActive"
                              }`}
                              onClick={() => unStarredMail(e._id)}
                            />
                          </td>
                          <td></td>

                          <td
                            className={"normalFont"}
                            onClick={() => handleOpenStarredMail(e._id)}
                          >
                            {parsingData(e.from)}
                          </td>
                          <td onClick={() => handleOpenStarredMail(e._id)}>
                            <span className={"normalFont"}>
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
                            style={{ fontSize: "13px" }}
                            onClick={() => handleOpenStarredMail(e._id)}
                          >
                            {formatTime(e.date)}
                          </td>
                        </tr>
                      );
                    })
                : ""}
              {sentBoxStarData.length > 0
                ? sentBoxStarData
                    .sort((a, b) => new Date(b.date) - new Date(a.date))
                    .map((e, i) => {
                      return (
                        <tr
                          key={i}
                          style={{
                            backgroundColor: "rgba(214, 236, 240, 0.349)"
                          }}
                        >
                          <td className="checkbox-cell">
                            <input type="checkbox" /> &nbsp; &nbsp;
                            <FontAwesomeIcon
                              icon={faStar}
                              className={`starIcon ${
                                !removeStarred.includes(e._id)
                                  ? ""
                                  : "buttonActive"
                              }`}
                              onClick={() => unStarredMail(e._id)}
                            />
                          </td>
                          <td></td>

                          <td onClick={() => handleOpenStarredMail(e._id)}>
                            To:&nbsp;
                            {e.to.map((e) => {
                              return e;
                            })}
                          </td>
                          <td onClick={() => handleOpenStarredMail(e._id)}>
                            <span className={"normalFont"}>
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
                            style={{ fontSize: "13px" }}
                            onClick={() => handleOpenStarredMail(e._id)}
                          >
                            {formatTime(e.date)}
                          </td>
                        </tr>
                      );
                    })
                : ""}
              {!inboxStarData.length && !sentBoxStarData.length ? (
                <tr className="starRow">
                  <td>
                    <div
                      style={{
                        textAlign: "center",

                        fontWeight: 500,
                        marginTop: "12px"
                      }}
                    >
                      No starred messages. Stars let you give messages a special
                      status to make them easier to find. To star a message,
                      click on the star outline beside any message or
                      conversation.
                    </div>
                  </td>
                </tr>
              ) : (
                ""
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default StarredMails;
