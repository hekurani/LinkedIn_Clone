import { createContext, useState, useContext } from "react";

const FormContext = createContext({});
export const FormProvider = ({ children }) => {
  const title = {
    0: "CreditialsForm",
    1: "PersonalDataForm",
  };
  const handleChange = (e) => {
    const type = e.target.type;

    const name = e.target.name;

    const value = type === "checkbox" ? e.target.checked : e.target.value;

    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const [page, setPage] = useState(0);

  const [data, setData] = useState({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    professionId: "",
  });
  const canSubmit = page === Object.keys(title).length - 1;
  const [error, setError] = useState({});
  return (
    <FormContext.Provider
      value={{
        handleChange,
        page,
        setPage,
        data,
        setData,
        title,
        canSubmit,
        error,
        setError,
      }}
    >
      {children}
    </FormContext.Provider>
  );
};

export default function useFormContext() {
  return useContext(FormContext);
}
