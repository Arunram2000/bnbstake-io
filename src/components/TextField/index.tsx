import React, { InputHTMLAttributes } from "react";
import { Field, ErrorMessage } from "formik";

import "./TextField.scss";

interface ITextField extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label: string;
}

const TextField: React.FC<ITextField> = ({ name, label, type = "text", ...rest }) => {
  return (
    <div className="form_input">
      <label htmlFor={name}>{label}</label>
      <Field id={name} name={name} type={type} {...rest} />
      <ErrorMessage component={"div"} className="form_input-error" name={name} />
    </div>
  );
};

export default TextField;
