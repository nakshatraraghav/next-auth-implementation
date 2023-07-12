"use client";

import { FieldValues, UseFormRegister, FieldErrors } from "react-hook-form";
import clsx from "clsx";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  id: string;
  label: string;
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors;
  disabled?: boolean;
}

const Input: React.FC<InputProps> = ({
  id,
  type,
  label,
  register,
  errors,
  disabled,
  ...aria
}) => {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium leading-6">
        {label}
      </label>
      <input
        id={id}
        type={type}
        disabled={disabled}
        {...register(id)}
        {...aria}
        className={clsx(
          `
          form-input 
          block 
          w-full 
          rounded-lg
          bg-transparent 
          border-0 
          py-2 
          shadow-lg 
          ring-[1.5px]
          ring-inset 
          ring-gray-600 
          placeholder:text-gray-400 
          focus:ring-2 
          focus:ring-inset s
          m:text-sm 
          sm:leading-6`,
          errors[id] && "focus:ring-rose-500 mt-0",
          disabled && "opacity-50 cursor-not-allowed"
        )}
      />
      {errors[id] && (
        <p className="text-sm font-semibold text-rose-500">
          {errors[id]?.message?.toString()}
        </p>
      )}
    </div>
  );
};

export default Input;
