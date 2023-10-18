import { UseContext } from "../../../Context/UserContext";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faTrash } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import useAuth from "../../../Validation/useAuth.jsx";

function StarredMails() {
  useAuth();
  const { data, parsingData, formatTime, handleDelete } =
    useContext(UseContext);

  const navigate = useNavigate();

  let starredMail = JSON.parse(localStorage.getItem("starredMails"));
  let inboxMail = data.data[0].receivedMails;
  let sentMail = data.data[0].sentMails;

  let starData = [];
  let allMails = [...inboxMail, ...sentMail];

  for (let e of allMails) {
    if (starredMail.includes(e._id)) {
      starData.push(e);
    }
  }
  const [removeStarred, setRemoveStarred] = useState(starredMail);

  const handleOpenStarredMail = async (id) => {
    try {
      let res = await axios.get(`${import.meta.env.VITE_API_URL}/mails/${id}`, {
        withCredentials: true
      });
      if (res.status === 200) {
        const data = res.data.recievedMail.receivedMails[0];
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
            {starData.length > 0 ? (
              starData
                .sort((a, b) => new Date(b.date) - new Date(a.date))
                .map((e, i) => {
                  return (
                    <tbody key={i}>
                      <tr
                        style={{
                          backgroundColor: "rgba(214, 236, 240, 0.349)"
                        }}
                      >
                        <td className="checkbox-cell">
                          <input type="checkbox" /> &nbsp; &nbsp;
                          <FontAwesomeIcon
                            icon={faStar}
                            className={"starIcon buttonActive "}
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
                    </tbody>
                  );
                })
            ) : (
              <tr>
                <td>
                  <div
                    style={{
                      textAlign: "center",

                      fontWeight: 500,
                      marginTop: "12px"
                    }}
                  >
                    No starred messages. Stars let you give messages a special
                    status to make them easier to find. To star a message, click
                    on the star outline beside any message or conversation.
                  </div>
                </td>
              </tr>
            )}
          </table>
        </div>
      </div>
    </>
  );
}

export default StarredMails;
