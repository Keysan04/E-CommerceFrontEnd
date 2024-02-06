import { Form } from "react-bootstrap";

export const CustomInput = ({ label, forwardRef, photo, ...rest }) => {
  return (
    <Form.Group className="mb-3">
      {label && <Form.Label>{label}</Form.Label>}

      <Form.Control ref={forwardRef} {...rest} />
    </Form.Group>
  );
};
