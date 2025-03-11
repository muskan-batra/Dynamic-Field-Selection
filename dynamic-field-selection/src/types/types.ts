export type FieldType = "text" | "dropdown" | "radio" | "checkbox" | "file" | "date" | "phone";

export interface FormField {
  id: string;
  label: string;
  type: FieldType;
  options?: string[]; // For dropdown/radio
  required?: boolean;
  conditional?: { fieldId: string; value: string }; // Conditional logic
}

export interface FormSection {
  id: string;
  title: string;
  fields: FormField[];
}


