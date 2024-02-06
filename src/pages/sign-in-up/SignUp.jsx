import { Button, Form } from "react-bootstrap";

import { useState } from "react";
import { toast } from "react-toastify";
import { CustomInput } from "../../components/custom-input/CustomInput";
import ClientLayout from "../../components/layout/ClientLayout";
import { postNewUser } from "../../helpers/axiosHelper";

const SignUp = () => {
  const [form, setForm] = useState({});

  const handleOnChange = (e) => {
    const { name, value } = e.target;

    // if (name === "confirmPassword") {
    //   form.password !== form.confirmPassword &&
    //     toast.error("Password do not match");
    // }

    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleOnSubmit = async (e) => {
    debugger;
    e.preventDefault();

    const { confirmPassword, ...rest } = form;
    if (confirmPassword !== rest.password) {
      toast.error("Password do not match");
      return;
    }
    const userPending = postNewUser(rest);
    toast.promise(userPending, {
      pending: "Please wait...",
    });

    const { status, message } = await userPending;
    toast[status](message);
  };

  const inputs = [
    {
      label: "First Name",
      name: "fName",
      required: true,
      placeholder: "kisan",
    },
    {
      label: "Last Name",
      name: "lName",
      required: true,
      placeholder: "thapa",
    },
    {
      label: "Email",
      name: "email",
      required: true,
      placeholder: "k@email.com",
    },
    {
      label: "Phone",
      name: "phone",
      placeholder: "000",
    },
    {
      label: "Address",
      name: "address",
      placeholder: "1 george st",
    },
    {
      label: "Password",
      name: "password",
      required: true,

      placeholder: "xxxxxxx",
    },
    {
      label: "Confirm Password",
      name: "confirmPassword",
      required: true,
      placeholder: "xxxxxxxxx",
      type: "password",
    },
  ];

  return (
    <ClientLayout title="signup ">
      <div className="text-center">Tech Gare Client cms</div>
      <hr />
      <Form
        onSubmit={handleOnSubmit}
        className=" form-center m-auto border rounded shadow-lg p-3 mt-5"
        style={{ width: "500px" }}
      >
        {inputs.map((item, i) => (
          <CustomInput key={i} {...item} onChange={handleOnChange} />
        ))}

        <div className="d-grid">
          <Button type="submit">Sign Up</Button>
        </div>
      </Form>
    </ClientLayout>
  );
};

export default SignUp;
