import useFormContext from "../context/FormContext";

export default function FormAuthenthication({ errors }) {
  const { handleChange, data } = useFormContext();
  return (
    <>
      <label className="mb-2" htmlFor="email-address">
        Email
      </label>
      <br></br>
      <input
        style={{ border: "1px solid black" }}
        className="p-2 mt-1 w-80 h-8 rounded"
        type="email"
        name="email"
        value={data.email}
        onChange={handleChange}
      />
      <span className="text-red-500 text-xs italic">{errors.email}</span>{" "}
      <br></br>
      <div className="mt-3">
        <label htmlFor="email-address">Password (6+characters)</label>
        <br></br>
        <input
          style={{ border: "1px solid black" }}
          className=" p-2 mt-1 w-80 h-8 rounded"
          type="password"
          value={data.password}
          onChange={handleChange}
          name="password"
        />
        <span className="text-red-500 text-xs italic">{errors.password}</span>
      </div>
    </>
  );
}
