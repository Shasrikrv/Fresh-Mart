import { useEffect, useState } from "react";

export const FieldType = {
  NAME: "name",
  EMAIL: "email",
  ADDRESS: "address",
  STATE: "state",
};

const useInput = (initialVal, type, name) => {
  const [val, setVal] = useState(initialVal);
  const [isValid, setIsValid] = useState(false);
  const [isTouched, setIsTouched] = useState(false);
  const [errorMessage, setErrorMessage] = useState({});

  useEffect(() => {
    validate();
  }, [val, type]);

  const validate = function () {
    const newError = {};
    if (type === FieldType.NAME) {
      if (val.trim().length < 3) {
        newError[name] = "Enter a valid detials";
        setIsValid(false);
      } else {
        setIsValid(true);
      }
    } else if (type === FieldType.EMAIL) {
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val)) {
        newError[name] = "Enter a valid emial";
        setIsValid(false);
      } else {
        setIsValid(true);
      }
    } else if (type === FieldType.ADDRESS) {
      if (!/^[0-9]+\s[A-Za-z\s]+$/.test(val)) {
        newError[name] = "Enter a valid address";
        setIsValid(false);
      } else {
        setIsValid(true);
      }
    } else if (type === FieldType.STATE) {
      if (val.trim() === "") {
        newError[name] = "select a state";
        setIsValid(false);
      } else {
        setIsValid(true);
      }
    }
    setErrorMessage({ ...newError });
  };

  return {
    val,
    setVal,
    isValid,
    isTouched,
    setIsTouched,
    errorMessage,
  };
};

export default useInput;
