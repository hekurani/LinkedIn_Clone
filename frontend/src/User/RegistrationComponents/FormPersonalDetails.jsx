import useFormContext from "../context/FormContext";
export default function FormPersonalDetails({ errors }) {
  const { handleChange, data } = useFormContext();
  return (
    <>
      <label className="mb-2" htmlFor="email-address">
        First name
      </label>
      <br></br>
      <input
        style={{ border: "1px solid black" }}
        className="p-2 mt-1 w-80 h-8 rounded"
        type="text"
        value={data.firstName}
        onChange={handleChange}
        name="firstName"
      />
      <span className="text-red-500 text-xs italic">{errors.firstName}</span>{" "}
      <br></br>
      <div className="mt-3">
        <label htmlFor="email-address">Last name</label>
        <br></br>
        <input
          style={{ border: "1px solid black" }}
          className=" p-2 mt-1 w-80 h-8 rounded"
          type="text"
          value={data.lastName}
          onChange={handleChange}
          name="lastName"
        />
        <span className="text-red-500 text-xs italic">{errors.lastName}</span>
      </div>
    </>
  );
}
