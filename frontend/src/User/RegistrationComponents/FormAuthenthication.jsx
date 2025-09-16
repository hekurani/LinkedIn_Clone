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
        className="p-2 pl-3 mt-2 w-80 rounded h-12"
        placeholder="Email or Phone"
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
          className="p-2 pl-3 w-80 h-12 rounded"
          placeholder="Password"
          type="password"
          name="password"
          value={data.password}
          onChange={handleChange}
        />
        <span className="text-red-500 text-xs italic">{errors.password}</span>
      </div>
    </>
  );
}
