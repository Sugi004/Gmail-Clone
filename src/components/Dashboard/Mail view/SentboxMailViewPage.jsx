import { useLocation } from "react-router-dom";
import "./mailView.css";
import { UseContext } from "../../../Context/UserContext";
import { useContext } from "react";
import profile from "../../../assets/Images/profile.png";

function SentboxMailViewPage() {
  const location = useLocation();
  const mailData = location.state;
  const { parsingData, formatDate } = useContext(UseContext);
  return (
    <>
      <div>
        <div className="subject-wrapper">
          {mailData.subject ? mailData.subject : "(no-subject)"}
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
                        <span data-hovercard-id={mailData.to}>
                          <span style={{ fontWeight: 600 }}>
                            {parsingData(mailData.from)}
                          </span>
                          <span
                            style={{
                              verticalAlign: "top",
                              color: "#5e5e5e"
                            }}
                          >
                            <span
                              style={{
                                fontSize: "12px",
                                overflow: "hidden",
                                textOverflow: "ellipsis"
                              }}
                            >
                              &nbsp;
                              {mailData.from}
                            </span>
                          </span>
                        </span>
                      </span>
                    </h3>
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
                                  {formatDate(mailData.date)}
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
                          to:
                          {mailData.to}
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
      <div style={{ padding: "30px 50px 20px 70px" }}>{mailData.body}</div>
    </>
  );
}

export default SentboxMailViewPage;
