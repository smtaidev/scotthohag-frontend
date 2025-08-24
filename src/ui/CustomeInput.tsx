import React, { forwardRef, useState } from "react";
import { LuEye, LuEyeOff, LuCalendar } from "react-icons/lu";

interface CustomInputProps
  extends React.InputHTMLAttributes<HTMLInputElement | HTMLSelectElement> {
  label?: string;
  error?: string;
  showPasswordToggle?: boolean;
  showDatePicker?: boolean;
  containerClassName?: string;
  labelClassName?: string;
  inputClassName?: string;
  errorClassName?: string;
  options?: Array<{ value: string | number; label: string }>; // For select input
  inputType?: "text" | "password" | "select" | "date" | "email" | "number"; // Extended input types
}

const CustomInput = forwardRef<
  HTMLInputElement | HTMLSelectElement,
  CustomInputProps
>(
  (
    {
      label,
      error,
      showPasswordToggle = false,
      showDatePicker = false,
      containerClassName = "",
      labelClassName = "",
      inputClassName = "",
      errorClassName = "",
      type = "text",
      inputType = "text",
      id,
      options = [],
      className,
      ...props
    },
    ref
  ) => {
    const [showPassword, setShowPassword] = useState(false);
    const [inputFieldType, setInputFieldType] = useState(type);

    const togglePasswordVisibility = () => {
      if (
        showPasswordToggle &&
        (inputType === "password" || inputFieldType === "password")
      ) {
        setShowPassword(!showPassword);
        setInputFieldType(showPassword ? "password" : "text");
      }
    };

    const baseInputClassName = `w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-primary ${
      error ? "border-red-500" : "border-gray-200"
    }`;

    const finalInputClassName = inputClassName
      ? `${baseInputClassName} ${inputClassName}`
      : baseInputClassName;

    // Determine what type of input to render
    const renderInput = () => {
      switch (inputType) {
        case "select":
          return (
            <select
              ref={ref as React.RefObject<HTMLSelectElement>}
              id={id}
              defaultValue={"defaultValue"}
            
              className={finalInputClassName}
              {...(props as React.SelectHTMLAttributes<HTMLSelectElement>)}
            >
              <option  value="defaultValue" key={"defaultValue"}  >
                Please select an option
              </option>
              {options.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          );

        case "date":
          return (
            <div className="relative">
              <input
                ref={ref as React.RefObject<HTMLInputElement>}
                id={id}
                type="date"
                className={finalInputClassName}
                {...(props as React.InputHTMLAttributes<HTMLInputElement>)}
              />
              {showDatePicker && (
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none">
                  <LuCalendar size={18} />
                </div>
              )}
            </div>
          );

        default:
          return (
            <div className="relative">
              <input
                ref={ref as React.RefObject<HTMLInputElement>}
                id={id}
                type={showPasswordToggle ? inputFieldType : type}
                className={finalInputClassName}
                {...(props as React.InputHTMLAttributes<HTMLInputElement>)}
              />

              {showPasswordToggle && inputType === "password" && (
                <button
                  type="button"
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 focus:outline-none"
                  onClick={togglePasswordVisibility}
                >
                  {showPassword ? <LuEyeOff size={18} /> : <LuEye size={18} />}
                </button>
              )}
            </div>
          );
      }
    };

    return (
      <div className={`space-y-2 w-full ${containerClassName}`}>
        {label && (
          <label
            htmlFor={id}
            className={`text-sm font-medium block ${labelClassName}`}
          >
            {label}
          </label>
        )}

        {renderInput()}

        {error && (
          <p className={`text-red-500 text-xs ${errorClassName}`}>{error}</p>
        )}
      </div>
    );
  }
);

CustomInput.displayName = "CustomInput";

export default CustomInput;
