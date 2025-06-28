import useFormContext from "../context/FormContext";
import { useEffect, useState } from "react";
import axios from "axios";
import AsyncSelect from "react-select/async";
import getAllProfessions from "../../utilities/profession/getAllProfesions";

export default function FormPersonalDetails({ errors }) {
  const { handleChange, data, setData } = useFormContext();

  const loadOptions = async () => {
    try {
      const response = await getAllProfessions();
      console.log("response: ", response);
      return response.data.map(profession => ({
        value: profession.id,
        label: profession.name
      }));
    } catch (error) {
      console.error('Error fetching professions:', error);
      return [];
    }
  };

  const handleProfessionChange = (selectedOption) => {
    setData(prev => ({
      ...prev,
      professionId: selectedOption ? selectedOption.value : null
    }));
  };

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
          className="p-2 mt-1 w-80 h-8 rounded"
          type="text"
          value={data.lastName}
          onChange={handleChange}
          name="lastName"
        />
        <span className="text-red-500 text-xs italic">{errors.lastName}</span>
      </div>
      <div className="mt-3">
        <label htmlFor="profession">Profession</label>
        <br></br>
        <AsyncSelect
          cacheOptions
          defaultOptions
          loadOptions={loadOptions}
          onChange={handleProfessionChange}
          value={data.professionId ? {
            value: data.professionId,
            label: data.professionName
          } : null}
          placeholder="Select a profession"
          styles={{
            control: (base) => ({
              ...base,
              border: "1px solid black",
              borderRadius: "4px",
              width: "320px",
              height: "32px",
              minHeight: "32px"
            }),
            menu: (base) => ({
              ...base,
              width: "320px"
            }),
            option: (base, state) => ({
              ...base,
              backgroundColor: state.isFocused ? "#f3f4f6" : "white",
              color: "black",
              "&:hover": {
                backgroundColor: "#f3f4f6"
              }
            })
          }}
        />
        <span className="text-red-500 text-xs italic">{errors.professionId}</span>
      </div>
    </>
  );
}
