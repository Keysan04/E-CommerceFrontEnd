import { Alert, Button, Form } from "react-bootstrap";

import { useRef, useState } from "react";
import {
  logoutUser,
  requestOTP,
  resetPassword,
} from "../../helpers/axiosHelper";
import { toast } from "react-toastify";
import { CustomInput } from "../../components/custom-input/CustomInput";
import { useSelector } from "react-redux";
const initialState = {
  otp: "",
  password: "",
  confirmPassword: "",
};
const ResetPassword = () => {
  const emailRef = useRef("");
  const [showOtp, setShowOtp] = useState(true);
  const [respons, setRespons] = useState({});

  const [form, setForm] = useState(initialState);
  const { user } = useSelector((state) => state.userInfo);
  const handleOnOtpRequest = async (e) => {
    e.preventDefault();
    const email = emailRef.current.value;
    if (!email) {
      return toast.error("Email is required");
    }

    const pending = requestOTP(email);
    toast.promise(pending, {
      pending: "Please wait...",
    });

    const resp = await pending;
    setRespons(resp);
    setForm({ email });
    resp.status === "success" && setShowOtp(false);
  };

  const handleOnChange = (e) => {
    const { name, value } = e.target;

    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleOnPasswordResetSubmit = async (e) => {
    e.preventDefault();

    const { confirmPassword, ...rest } = form;

    if (!rest.email || rest.password !== confirmPassword) {
      return toast.error("Password do not match or email is not provided");
    }
    // call api and send data

    const pending = resetPassword(rest);

    toast.promise(pending, {
      pending: "please wait...",
    });

    const resp = await pending;
    logoutUser(user._id);
    setRespons(resp);
  };

  const inputsOtp = [
    {
      label: "Email",
      name: "email",
      required: true,
      placeholder: "John@email.com",
      forwardRef: emailRef,
    },
  ];

  const inputsResetPassword = [
    {
      label: "OTP",
      name: "otp",
      required: true,
      placeholder: "345564",
    },

    {
      label: "Password",
      name: "password",
      required: true,
      type: "password",
      placeholder: "xxxxxxx",
    },
    {
      label: "Confirm Password",
      name: "confirmPassword",
      required: true,
      type: "password",
      placeholder: "xxxxxxx",
    },
  ];

  return (
    <div>
      <div className="text-center">Tech Gare Admin cms</div>
      <hr />

      {respons.message && (
        <Alert variant={respons.status === "success" ? "success" : "danger"}>
          {respons.message}
        </Alert>
      )}
      {showOtp ? (
        <Form
          onSubmit={handleOnOtpRequest}
          className="m-auto border rounded shadow-lg p-3 mt-5"
          style={{ width: "500px" }}
        >
          <div>Request OTP to reset password</div>
          <hr />
          {inputsOtp.map((item, i) => (
            <CustomInput key={i} {...item} />
          ))}

          <div className="d-grid">
            <Button type="submit">Request OTP</Button>
          </div>

          <div className="mt-4 text-end">
            Ready to Sign In? <a href="/">Sign In</a> Now.
          </div>
        </Form>
      ) : (
        <Form
          onSubmit={handleOnPasswordResetSubmit}
          className="m-auto border rounded shadow-lg p-3 mt-5"
          style={{ width: "500px" }}
        >
          <div>Update your password</div>
          <hr />
          {inputsResetPassword.map((item, i) => (
            <CustomInput key={i} {...item} onChange={handleOnChange} />
          ))}

          <div className="d-grid">
            <Button type="submit">Update Password</Button>
          </div>

          <div className="mt-4 text-end">
            Ready to Sign In? <a href="/">Sign In</a> Now.
          </div>
        </Form>
      )}
    </div>
  );
};

export default ResetPassword;
