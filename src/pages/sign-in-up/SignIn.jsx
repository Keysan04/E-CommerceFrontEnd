import React, { useEffect, useRef } from "react";
import { Button, Form } from "react-bootstrap";
import { toast } from "react-toastify";
import ClientLayout from "../../components/layout/ClientLayout";
import { CustomInput } from "../../components/custom-input/CustomInput";
import { useLocation, useNavigate } from "react-router-dom";
import { postSignIn } from "../../helpers/axiosHelper";
import {
  autoLogin,
  getCategories,
  getUserProfile,
} from "../profile/userAction";
import { useDispatch, useSelector } from "react-redux";

const SignIn = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const emailRef = useRef("");
  const passwordRef = useRef("");
  const location = useLocation();

  const { user } = useSelector((state) => state.userInfo);
  const fromLocation =
    location?.state?.from?.location?.pathname || "/dashboard";

  useEffect(() => {
    // redirect to  dashboard
    user?._id && navigate(fromLocation);

    !user?._id && dispatch(autoLogin());
  }, [user?._id, navigate, dispatch, fromLocation]);

  const inputs = [
    {
      label: "Email",
      name: "email",
      required: true,
      placeholder: "kt@email.com",
      forwardRef: emailRef,
    },
    {
      label: "Password",
      name: "password",
      required: true,
      type: "password",
      placeholder: "xxxxxxx",
      forwardRef: passwordRef,
    },
  ];

  const handleOnSubmit = async (e) => {
    e.preventDefault();

    const email = emailRef.current.value;
    const password = passwordRef.current.value;

    if (email && password) {
      //call the api to get login done

      const resPending = postSignIn({ email, password });
      toast.promise(resPending, {
        pending: "Please wait ....",
      });
      const { status, message, jwts, cats } = await resPending;
      toast[status](message);
      if (status === "success") {
        navigate("/dashboard");
      }

      if (jwts?.accessJWT) {
        // store the token
        sessionStorage.setItem("accessJWT", jwts.accessJWT);
        localStorage.setItem("refreshJWT", jwts.refreshJWT);
        // get user profile data and store in redux
        dispatch(getUserProfile());
      }
    }
  };
  return (
    <ClientLayout>
      <div>
        <div className="text-center"> K Auto Parts</div>
        <hr />
        <Form
          onSubmit={handleOnSubmit}
          className="m-auto border rounded shadow-lg p-3 mt-5"
          style={{ width: "500px" }}
        >
          <h3>Sign</h3>
          <hr />
          {inputs.map((item, i) => (
            <CustomInput key={i} {...item} />
          ))}

          <div className="d-grid">
            <Button type="submit">Sign In</Button>
          </div>

          <div className="mt-4 text-end">
            Forget Password? <a href="/reset-password">Reset</a> Now.
          </div>
        </Form>
      </div>
    </ClientLayout>
  );
};

export default SignIn;
