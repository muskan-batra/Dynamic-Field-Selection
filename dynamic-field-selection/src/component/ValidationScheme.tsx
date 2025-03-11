import * as yup from "yup";

interface Section {
  fields: { id: string; label: string; required: boolean }[];
}

export const validationSchema = (sections: Section[]) => {
  return sections.reduce((acc: { [key: string]: yup.StringSchema }, section) => {
    section.fields.forEach(field => {
      if (field.required) {
        acc[field.id] = yup.string().required(`${field.label} is required`);
      }
    });
    return acc;
  }, {});
};
