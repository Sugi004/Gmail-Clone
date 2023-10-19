import { useLocation } from "react-router-dom";
import "./mailView.css";
import { UseContext } from "../../../Context/UserContext";
import { useContext } from "react";
import profile from "../../../assets/Images/profile.png";

function StarredMailViewPage() {
  const location = useLocation();
  const mailData = location.state;
  const { parsingData, formatDate } = useContext(UseContext);

  let inbox = mailData.recievedMail.receivedMails[0];
  let sentBox = mailData.sentMail.sentMails[0];

  console.log(inbox, sentBox);

  return (
    <>
      <div>
        <div className="subject-wrapper">
          {(inbox && inbox.subject) ||
            (sentBox && sentBox.subject) ||
            "(no-subject)"}
        </div>
      </div>

      <div style={{ margin: 0, display: "flex" }}>
        <div className="profile">
          <div>
            <img id="img" src={profile} aria-hidden="true" />
          </div>
        </div>
        <div style={{ margin: 0, padding: "0 0 20px 0", width: "100px" }}>
          <div style={{ paddingLeft: "20px 0 0" }}>
            <table
              cellPadding={0}
              style={{
                borderCollapse: "collapse",
                marginTop: "10px",
                width: "100%"
              }}
            >
              <tbody>
                <tr>
                  <td>
                    <h3 className="fromEmail">
                      <span translate="no" role="gridcell" tabIndex={-1}>
                        <span data-hovercard-id={mailData.from}>
                          <span style={{ fontWeight: 600 }}>
                            {inbox
                              ? parsingData(inbox.from)
                              : parsingData(sentBox.from)}
                          </span>
                          <span
                            style={{
                              verticalAlign: "top",
                              color: "#5e5e5e"
                            }}
                          >
                            <span style={{ fontSize: "12px" }}>
                              &nbsp;
                              {inbox ? inbox.from : sentBox.from}
                            </span>
                          </span>
                        </span>
                      </span>
                    </h3>{" "}
                  </td>

                  <td>
                    <span></span>
                    <table>
                      <tbody>
                        <tr>
                          <td>
                            <h3 className="fromEmail">
                              <span
                                translate="no"
                                role="gridcell"
                                tabIndex={-1}
                              >
                                <span>&nbsp;</span>
                                <span style={{ fontSize: "12px" }}>
                                  &nbsp;
                                  {inbox
                                    ? formatDate(inbox.date)
                                    : formatDate(sentBox.date)}
                                </span>
                              </span>
                            </h3>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </td>
                </tr>
                <tr>
                  <td>
                    <h3 className="fromEmail">
                      <span translate="no" role="gridcell" tabIndex={-1}>
                        <span>&nbsp;</span>
                        <span style={{ fontSize: "13px" }}>
                          {inbox ? (
                            ""
                          ) : (
                            <span>
                              to:{" "}
                              {sentBox.to.map((e) => {
                                return e;
                              })}{" "}
                            </span>
                          )}
                        </span>
                      </span>
                    </h3>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div style={{ padding: "30px 50px 20px 70px" }}>
        {inbox ? inbox.body : sentBox.body}
      </div>
    </>
  );
}

export default StarredMailViewPage;
