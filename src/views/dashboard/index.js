import React, { memo, Fragment, useState } from "react";
import { Row, Col } from "react-bootstrap";
import Card from "../../components/Card/card";
import { getCounts } from "../../Redux/commonApi";
import { useEffect } from "react";
import { userData } from "../../Redux/auth/authSlice";
import CountUp from "react-countup";
import { useSelector } from "react-redux";

const Index = memo(() => {
  const [loading, setLoading] = useState(true); 
  const [agentCount, setAgentCount] = useState(0); 
  const [accountCount, setAccountCount] = useState(0);
  const user = useSelector(userData);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true); 
      const data = await getCounts();
      console.log(data);
      setAgentCount(data.data.data.agent);
      setAccountCount(data.data.data.accountCount);
    } catch (error) {
      console.error("Error fetching Count data", error);
    } finally {
      setLoading(false); 
    }
  };

  return (
    <Fragment>
      <Row>
        {user.role==="admin" && <Col lg="3" md="6">
          <Card className="bg-info-subtle">
            <Card.Body>
              <div className="d-flex justify-content-between align-items-center">
                <div className="bg-info-subtle rounded p-3">
                  <svg
                    className="icon-20"
                    width="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M11.997 15.1746C7.684 15.1746 4 15.8546 4 18.5746C4 21.2956 7.661 21.9996 11.997 21.9996C16.31 21.9996 19.994 21.3206 19.994 18.5996C19.994 15.8786 16.334 15.1746 11.997 15.1746Z"
                      fill="currentColor"
                    ></path>
                    <path
                      opacity="0.4"
                      d="M11.9971 12.5838C14.9351 12.5838 17.2891 10.2288 17.2891 7.29176C17.2891 4.35476 14.9351 1.99976 11.9971 1.99976C9.06008 1.99976 6.70508 4.35476 6.70508 7.29176C6.70508 10.2288 9.06008 12.5838 11.9971 12.5838Z"
                      fill="currentColor"
                    ></path>
                  </svg>
                </div>
                <div className="text-end">
                  {/* Only show CountUp when loading is false */}
                  {!loading && (
                    <h2 className="counter">
                      <CountUp end={agentCount} duration={3} separator="" />
                    </h2>
                  )}
                  Total Agents
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>}

        <Col lg="3" md="6">
          <Card className="bg-warning-subtle">
            <Card.Body>
              <div className="d-flex justify-content-between align-items-center">
                <div className="bg-warning-subtle rounded p-3">
                  <svg
                    className="icon-20"
                    width="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M11.997 15.1746C7.684 15.1746 4 15.8546 4 18.5746C4 21.2956 7.661 21.9996 11.997 21.9996C16.31 21.9996 19.994 21.3206 19.994 18.5996C19.994 15.8786 16.334 15.1746 11.997 15.1746Z"
                      fill="currentColor"
                    ></path>
                    <path
                      opacity="0.4"
                      d="M11.9971 12.5838C14.9351 12.5838 17.2891 10.2288 17.2891 7.29176C17.2891 4.35476 14.9351 1.99976 11.9971 1.99976C9.06008 1.99976 6.70508 4.35476 6.70508 7.29176C6.70508 10.2288 9.06008 12.5838 11.9971 12.5838Z"
                      fill="currentColor"
                    ></path>
                  </svg>
                </div>
                <div className="text-end">
                  {/* Only show CountUp when loading is false */}
                  {!loading && (
                    <h2 className="counter">
                      <CountUp end={accountCount} duration={3} separator="" />
                    </h2>
                  )}
                  Total Accounts
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Fragment>
  );
});

Index.displayName = "Index";
export default Index;
