import React, { useEffect, useState } from "react";
import { Alert, Button, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { fetchAUser, updateUser } from "../../helpers/axiosHelper";
import { toast } from "react-toastify";
import { getUserProfile } from "../../pages/profile/userAction";
import { CustomInput } from "../custom-input/CustomInput";

const UpdateProfile = () => {
  const { user } = useSelector((state) => state.userInfo);
  const dispatch = useDispatch();
  const [form, setForm] = useState({});
  const [showForm, setShowForm] = useState(true);
  const [img, setImg] = useState("");
  useEffect(() => {
    setForm(user);
  }, []);

  const handleOnChange = (e) => {
    const { name, value } = e.target;

    setForm({
      ...form,
      [name]: value,
    });
  };
  const handleOnSubmit = async (e) => {
    debugger;
    if (window.confirm("Are your sure want to update profile?")) {
      e.preventDefault();
      const { name, value } = e.target;
      const formDt = new FormData();
      for (let key in form) {
        formDt.append(key, form[key]);
      }
      formDt.append("image", img);

      const pending = updateUser(form);
      toast.promise(pending, {
        pending: "please wait",
      });
      const { status, message } = await pending;
      toast[status](message);

      status === "success" && dispatch(getUserProfile());
      setShowForm(false);
    }
  };

  const handleOnImgAttached = (e) => {
    const { files } = e.target;
    setImg(files);
  };

  const inputs = [
    {
      label: "First Name",
      name: "fName",
      required: true,
      placeholder: "John",
      value: form.fName,
    },
    {
      label: "Last Name",
      name: "lName",
      required: true,
      placeholder: "Wick",
      value: form.lName,
    },
    {
      label: "Email",
      name: "email",
      required: true,
      placeholder: "John@email.com",
      value: form.email,
      disabled: true,
    },
    {
      label: "Password",
      name: "password",
      required: true,
      placeholder: "xxxxxxx",
    },
    {
      label: "Phone",
      name: "phone",
      placeholder: "040000000",
      value: form.phone,
    },
    {
      label: "Address",
      name: "address",
      placeholder: "1 george st Sydney",
      value: form.address,
    },
  ];
  return (
    <div>
      {showForm === true ? (
        <Form
          onSubmit={handleOnSubmit}
          className="m-auto border rounded shadow-lg p-3 mt-5"
          style={{ width: "500px" }}
        >
          <h3>Update Profile</h3>
          <hr />
          {inputs.map((item, i) => (
            <CustomInput key={i} {...item} onChange={handleOnChange} />
          ))}
          <Form.Group className="mb-3">
            <Form.Control
              type="file"
              name="img"
              required={true}
              // multiple
              onChange={handleOnImgAttached}
            />
          </Form.Group>
          <div className="d-grid">
            <Button type="submit">Update</Button>
          </div>
        </Form>
      ) : (
        <Alert variant="success">
          <h2>Your Profile is updated successfully</h2>
        </Alert>
      )}
    </div>
  );
};

export default UpdateProfile;
