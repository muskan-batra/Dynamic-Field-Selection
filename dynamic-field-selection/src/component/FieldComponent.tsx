import React from "react";
import { Controller } from "react-hook-form";
import Select from "react-select";
import PhoneInput from "react-phone-input-2";
import DatePicker from "react-datepicker";
import "react-phone-input-2/lib/style.css";
import "react-datepicker/dist/react-datepicker.css";

interface Field {
  id: string;
  label: string;
  type: string;
  options?: string[];
  condition?: {
fieldId: string;
    value: any;
  };
}

const FieldComponent = ({ field, watch, control, register }: { field: Field; watch: any; control: any; register: any }) => {
  const showField = !field.condition || watch(field.condition.fieldId) === field.condition.value;

  if (!showField) return null;

  return (
    <div className="form-group">
      <label>{field.label}</label>
      {field.type === "text" && <input {...register(field.id)} className="form-input" />}
      
      {field.type === "dropdown" && (
        <Controller control={control} name={field.id} render={({ field: controllerField }) => (
          <Select {...controllerField} options={field.options?.map(opt => ({ label: opt, value: opt }))} />
        )} />
      )}

      {field.type === "radio" && field.options?.map(opt => (
        <label key={opt} className="form-radio">
          <input type="radio" value={opt} {...register(field.id)} /> {opt}
        </label>
      ))}

      {field.type === "checkbox" && <input type="checkbox" {...register(field.id)} className="form-checkbox" />}

      {field.type === "date" && (
        <Controller control={control} name={field.id} render={({ field }) => (
          <DatePicker {...field} selected={field.value} className="form-input" />
        )} />
      )}

      {field.type === "phone" && (
        <Controller control={control} name={field.id} render={({ field }) => (
          <PhoneInput country="us" {...field} containerClass="form-phone" />
        )} />
      )}

      {field.type === "file" && <input type="file" {...register(field.id)} className="form-input" />}
    </div>
  );
};

export default FieldComponent;
