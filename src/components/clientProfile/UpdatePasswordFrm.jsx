import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { toast } from "react-toastify";
import { logoutUser, updatePassword } from "../../helpers/axiosHelper";
import { CustomInput } from "../custom-input/CustomInput";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../../pages/profile/userSlice";

const initialState = {
  confirmPassword: "",
  newPassword: "",
  oldPassword: "",
};
export const UpdatePasswordFrm = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.userInfo);
  const [form, setForm] = useState({});
  const navigate = useNavigate();
  const handleOnPasswordUpdateSubmit = async (e) => {
    debugger;
    e.preventDefault();
    console.log(form);

    const { confirmPassword, ...rest } = form;
    if (confirmPassword !== rest.newPassword) {
      return toast.error("Password do not match");
    }

    //call api
    const pending = updatePassword(rest);
    toast.promise(pending, {
      pending: "Please wait...",
    });

    const { status, message } = await pending;
    toast[status](message);

    if (status === "success") {
      logoutUser(user._id);
      localStorage.removeItem("refreshJWT");
      sessionStorage.removeItem("accessJWT");
      dispatch(setUser({}));
      navigate("/");
    }
  };

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    //apply pasword strngth validation

    setForm({
      ...form,
      [name]: value,
    });
  };

  const inputs = [
    {
      label: "Current Password",
      name: "oldPassword",
      type: "password",
      required: true,
      placeholder: "******",
    },

    {
      label: "New Password",
      name: "newPassword",
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
    <div className="mb-4">
      <Form onSubmit={handleOnPasswordUpdateSubmit}>
        {inputs.map((item, i) => (
          <CustomInput key={i} {...item} onChange={handleOnChange} />
        ))}

        <div className="d-grid">
          <Button variant="danger" type="submit">
            Update Password
          </Button>
        </div>
      </Form>
    </div>
  );
};
