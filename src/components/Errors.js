import React, { useEffect } from "react";
import { useSelector } from "react-redux";

import { displayError } from "../validate/displayError";

function Errors(msg) {
  const { errors } = useSelector((state) => state.errors);
  useEffect(() => {
    errors?.forEach(({ response }) => {
      response?.data?.errors?.forEach((err) => {
        displayError(err.msg);
      });
    });
    displayError(msg);
  }, [errors]);

  return <></>;
}

export default Errors;
