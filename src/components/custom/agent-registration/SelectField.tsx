import { cn } from "@/lib/utils";
import ActionClear from "../ActionClear";
import FieldWrapper from "./FieldWrapper";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface SelectFieldProps<T> {
  label: string;
  field: keyof T;
  errorText?: string;
  placeholder?: string;
  options: string[];
  value: T[keyof T] | undefined;
  onChange: (field: keyof T, value: string | undefined) => void;
  required?: boolean;
  ref?: React.Ref<HTMLButtonElement>;
  disabled?: boolean;
}

function SelectField<T>({
  label,
  errorText,
  field,
  placeholder = "Pilih salah satu",
  options,
  value,
  onChange,
  required = false,
  ref,
  disabled = false,
}: SelectFieldProps<T>) {
  return (
    <FieldWrapper
      id={field as string}
      label={label}
      errorText={errorText}
      required={required}
    >
      <ActionClear
        value={value as string | undefined}
        onClear={disabled ? () => {} : () => onChange(field, undefined)}
      >
        <Select
          value={value as string | undefined}
          onValueChange={(value) => onChange(field, value)}
          required={required}
        >
          <SelectTrigger
            className={cn("w-full cursor-pointer rounded-full", errorText && "border-red-500")}
            ref={ref}
            disabled={disabled}
          >
            <SelectValue placeholder={placeholder} />
          </SelectTrigger>
          <SelectContent id={field as string}>
            {options.map((option) => (
              <SelectItem
                key={option}
                value={option}
                className="cursor-pointer"
              >
                {option}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </ActionClear>
    </FieldWrapper>
  );
}

export default SelectField;
