"use client";

import { useState, type ReactNode } from "react";

export function AuthField({
  label,
  name,
  type = "text",
  placeholder,
  autoComplete,
  hint,
  rightSlot,
}: {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
  autoComplete?: string;
  hint?: ReactNode;
  rightSlot?: ReactNode;
}) {
  const [show, setShow] = useState(false);
  const isPassword = type === "password";
  const inputType = isPassword ? (show ? "text" : "password") : type;

  return (
    <div className="mb-4">
      <div className="mb-[7px] flex items-center justify-between">
        <label htmlFor={name} className="text-[12.5px] font-medium text-sub">
          {label}
        </label>
        {rightSlot}
      </div>
      <div className="relative">
        <input
          id={name}
          name={name}
          type={inputType}
          placeholder={placeholder}
          autoComplete={autoComplete}
          className="h-11 w-full rounded-[10px] border border-white/12 bg-white/[0.03] px-[13px] text-[14.5px] text-ink outline-none placeholder:text-mut focus:border-coral focus:shadow-[0_0_0_4px_rgba(251,122,92,0.2)]"
        />
        {isPassword && (
          <button
            type="button"
            onClick={() => setShow((s) => !s)}
            aria-label={show ? "Hide password" : "Show password"}
            className="absolute right-[11px] top-1/2 -translate-y-1/2 text-mut transition-colors hover:text-ink"
          >
            <svg className="h-[18px] w-[18px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
              <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7z" />
              <circle cx="12" cy="12" r="3" />
            </svg>
          </button>
        )}
      </div>
      {hint && (
        <p className="mt-1.5 flex items-center gap-1.5 text-[11.5px] text-mut">{hint}</p>
      )}
    </div>
  );
}
