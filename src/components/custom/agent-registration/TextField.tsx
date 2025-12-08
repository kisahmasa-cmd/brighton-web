import { InputGroup, InputGroupAddon, InputGroupButton, InputGroupInput, InputGroupText } from '@/components/ui/input-group';
import { cn } from '@/lib/utils';
import { X } from 'lucide-react';
import FieldWrapper from './FieldWrapper';

interface TextFieldProps<T> {
  type?: string;
  ref?: React.Ref<HTMLInputElement>;
  label?: string;
  field: keyof T;
  errorText?: string;
  placeholder?: string,
  value: T[keyof T] | undefined,
  onChange: (field: keyof T, value: string | undefined) => void;
  required?: boolean;
  inputMode?: "text" | "search" | "email" | "tel" | "url" | "none" | "numeric" | "decimal" | undefined;
  pattern?: string;
  suffixText?: string;
  minLength?: number;
  maxLength?: number;
  max?: number;
  disabled?: boolean;
}

function TextField<T>({
  type="text",
  ref,
  label = "",
  errorText,
  field,
  placeholder = "",
  value,
  onChange,
  required = false,
  inputMode,
  pattern,
  suffixText,
  minLength,
  maxLength,
  max,
  disabled = false,
}: TextFieldProps<T>) {
  return (
    <FieldWrapper id={field as string} label={label} errorText={errorText} required={required}>
      <InputGroup
        className={cn(
          "rounded-full overflow-hidden",
          errorText && "border-red-500",
        )}
      >
        <InputGroupInput
          type={type}
          ref={ref}
          id={field as string}
          placeholder={placeholder}
          value={(value as string) || ""}
          onChange={(e) => onChange(field, e.target.value)}
          required={required}
          inputMode={inputMode}
          pattern={pattern}
          minLength={minLength}
          maxLength={maxLength}
          max={max}
          disabled={disabled}
        />
        {value && (
          <InputGroupAddon align="inline-end">
            <InputGroupButton
              onClick={disabled ? () => {} : () => onChange(field, undefined)}
              className="rounded-full"
              tabIndex={-1}
            >
              <X className="w-4 h-4" />
            </InputGroupButton>
          </InputGroupAddon>
        )}
        {suffixText && (
          <InputGroupAddon align="inline-end">
            <InputGroupText>{suffixText}</InputGroupText>
          </InputGroupAddon>
        )}
      </InputGroup>
    </FieldWrapper>
  );
};

export default TextField;
