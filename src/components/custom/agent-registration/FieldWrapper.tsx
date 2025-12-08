import { Label } from "@/components/ui/label";
import React from "react";
import ErrorFieldText from "./ErrorFieldText";

interface FieldWrapperProps {
  children: React.ReactNode;
  id: string;
  label: string;
  errorText?: string;
  required?: boolean;
}

const FieldWrapper: React.FC<FieldWrapperProps> = ({ children, id, label, errorText, required=false }) => {
  return (
    <div className="space-y-2">
      {label !== "" && (
        <Label htmlFor={id}>
          {label}
          {required && <span className="text-red-500">*</span>}
        </Label>
      )}
      {children}
      {errorText && <ErrorFieldText text={errorText} />}
    </div>
  );
};

export default FieldWrapper;
