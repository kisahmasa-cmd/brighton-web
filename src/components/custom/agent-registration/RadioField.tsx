import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import FieldWrapper from './FieldWrapper';
import { Label } from '@/components/ui/label';
import ActionClear from '../ActionClear';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';

interface RadioFieldProps<T> {
  label: string;
  field: keyof T;
  errorText?: string;
  options: string[],
  value: T[keyof T] | undefined,
  onChange: (field: keyof T, value: string | undefined) => void;
  required?: boolean;
}

function RadioField<T>({ label, errorText, field, options, value, onChange, required = false }: RadioFieldProps<T>) {
  return (
    <FieldWrapper id={field as string} label={label} errorText={errorText} required={required}>
      <RadioGroup value={value as string | undefined} onValueChange={(value) => onChange(field, value)}>
        <div className="grid grid-cols-2 gap-4">
          {options.map((option, index) => (
            <Label key={index} htmlFor={`${field.toString()}-${option}`} className="relative flex items-center space-x-3 border rounded-full p-3 hover:bg-gray-50 cursor-pointer">
              <RadioGroupItem value={option} id={`${field.toString()}-${option}`} />
              <span className="flex-1">{ option}</span>
              {/* Clear Field Button */}
              {value === option && (
                <div
                  onClick={(e) => {
                    e.stopPropagation();
                    e.preventDefault();
                    onChange(field, undefined);
                  }}
                  className="z-20 absolute right-2 top-1/2 -translate-y-1/2 cursor-pointer rounded-full w-6 h-6 border border-grey-200 bg-white hover:bg-black/20 flex justify-center items-center"
                >
                  <X className="w-3 h-3"/>
                </div>
              )}
            </Label>
          ))}
        </div>
      </RadioGroup>
    </FieldWrapper>
  );
};

export default RadioField;
