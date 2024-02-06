import { useEffect } from "react";
import { useState } from "react";
import { Alert, Spinner } from "react-bootstrap";
import { useSearchParams } from "react-router-dom";
import { postVerifyEmail } from "../../helpers/axiosHelper";

//x. show spinner
//x. grab query strings from url
// call server with e and c
// remove spinner and show message from server
const VerifyEmail = () => {
  debugger;
  const [searchParams] = useSearchParams();

  const [showSpinner, setShowSpinner] = useState(true);
  const [resp, setResp] = useState({});
  const associate = searchParams.get("e");
  const token = searchParams.get("c");
  useEffect(() => {
    userEmailVerification();

    //call axios helper to call api
  }, []);

  const userEmailVerification = async () => {
    const response = await postVerifyEmail({ associate, token });
    setShowSpinner(false);
    setResp(response);
  };

  return (
    <div>
      <div className="text-center">Tech Gare System</div>
      <hr />

      <div className="text-center mt-5">
        {showSpinner && <Spinner variant="primary" animation="border" />}
      </div>

      {resp.message && (
        <Alert
          className="w-50 m-auto"
          variant={resp.status === "success" ? "success" : "danger"}
        >
          {resp.message}
        </Alert>
      )}

      {resp.status === "success" && <a href="/">Login Now</a>}
    </div>
  );
};

export default VerifyEmail;
