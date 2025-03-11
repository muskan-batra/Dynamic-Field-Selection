import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import "./style.css";
import Section from "./Section";
import { validationSchema } from "./ValidationScheme";
import { initialSections } from "./Data";

const DynamicForm = () => {
  const [sections, setSections] = useState(initialSections);
  const [fieldType, setFieldType] = useState("text");

  const schema = yup.object().shape(validationSchema(sections));

  const { register, handleSubmit, control, watch } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data: any) => {
    console.log("Form Data:", data);
  };

  const addSection = () => {
    setSections((prev) => [
      ...prev,
      {
        id: `section-${prev.length + 1}`,
        title: `Section ${prev.length + 1}`,
        fields: [],
        subSections: [],
      },
    ]);
  };

  return (
    <div className="form-container">
      <h2 className="form-title">Dynamic Form with Nested Sections</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="form">
        {sections.map((section) => (
          <Section key={section.id} section={section} watch={watch} control={control} register={register} setSections={setSections} fieldType={fieldType} />
        ))}

        <button type="submit" className="btn-submit">
          Submit
        </button>
      </form>

      <div className="field-selector">
        <select value={fieldType} onChange={(e) => setFieldType(e.target.value)}>
          <option value="text">Text Field</option>
          <option value="dropdown">Dropdown</option>
          <option value="radio">Radio Button</option>
          <option value="file">File Upload</option>
          <option value="checkbox">Checkbox</option>
          <option value="date">Date Picker</option>
          <option value="phone">Phone Number</option>
        </select>
        <button onClick={addSection} className="btn-add">
          Add Section
        </button>
      </div>
    </div>
  );
};

export default DynamicForm;
