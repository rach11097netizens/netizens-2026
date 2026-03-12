import React from "react";

interface InputProps extends React.InputHTMLAttributes<
  HTMLInputElement | HTMLTextAreaElement
> {
  label: string;
  isTextArea?: boolean;
  id?: string;
}

export function Input({
  label,
  isTextArea = false,
  className = "",
  id,
  ...props
}: InputProps) {
  const baseStyles =
    "w-full bg-white border border-black/10 rounded-[10px] px-4 py-2 sm:py-3 text-charcoal font-sans text-sm focus:outline-none focus:border-regal-navy transition-colors placeholder:text-charcoal/60";

  const inputId = id || props.name || label.toLowerCase().replace(/\s+/g, "-");

  return (
    <div className="w-full">
      <label htmlFor={inputId} className="sr-only">
        {label}
      </label>
      {isTextArea ? (
        <textarea
          id={inputId}
          placeholder={label}
          className={`${baseStyles} h-[80px] resize-none ${className}`}
          {...(props as React.TextareaHTMLAttributes<HTMLTextAreaElement>)}
        />
      ) : (
        <input
          id={inputId}
          placeholder={label}
          className={`${baseStyles} sm:h-[52px] ${className}`}
          {...(props as React.InputHTMLAttributes<HTMLInputElement>)}
        />
      )}
    </div>
  );
}
