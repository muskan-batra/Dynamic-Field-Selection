import React from "react";
import FieldComponent from "./FieldComponent";

interface SectionProps {
  section: {
    id: string;
    title: string;
    fields: {
      id: string;
      label: string;
      type: string;
      options?: string[];
    }[];
  };
  watch: any;
  control: any;
  register: any;
  setSections: React.Dispatch<React.SetStateAction<any>>;
  fieldType: string;
}

const Section: React.FC<SectionProps> = ({
  section,
  watch,
  control,
  register,
  setSections,
  fieldType,
}) => {
  const addField = (sectionId: string) => {
    setSections((prev: any) =>
      prev.map((sec: any) =>
        sec.id === sectionId
          ? {
              ...sec,
              fields: [
                ...sec.fields,
                {
                  id: `${sec.id}-field-${sec.fields.length + 1}`,
                  label: `Field ${sec.fields.length + 1}`,
                  type: fieldType,
                  options:
                    fieldType === "dropdown" || fieldType === "radio"
                      ? ["Plutus21 ", "Muskan"]
                      : undefined,
                },
              ],
            }
          : sec
      )
    );
  };

  return (
    <div className="form-section">
      <h3>{section.title}</h3>
      {section.fields.map((field) => (
        <FieldComponent
          key={field.id}
          field={field}
          watch={watch}
          control={control}
          register={register}
        />
      ))}

      <button
        type="button"
        onClick={() => addField(section.id)}
        className="btn-add"
      >
        Add Field
      </button>
    </div>
  );
};

export default Section;
