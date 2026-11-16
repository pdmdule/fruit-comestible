import React from 'react';

interface BadgeProps {
  className?: string;
}

export function TwintBadge({ className = '' }: BadgeProps) {
  return (
    <div
      className={`inline-flex items-center justify-center h-8 px-3 rounded-md bg-white border border-stone-200 shadow-2xs ${className}`.trim()}
      title="TWINT"
      aria-label="TWINT"
    >
      <svg
        className="w-3.5 h-3.5 mr-1.5 shrink-0"
        viewBox="0 0 24 24"
        fill="none"
        aria-hidden="true"
      >
        <rect width="24" height="24" rx="5" fill="#111827" />
        <path
          d="M7 9.5L10.2 15.5L12.5 11.2L14.8 15.5L18 9.5"
          stroke="#FFFFFF"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle cx="17.5" cy="7" r="1.5" fill="#10B981" />
      </svg>
      <span className="text-xs font-extrabold tracking-tight text-stone-900 font-sans">
        TWINT
      </span>
    </div>
  );
}

export function VisaBadge({ className = '' }: BadgeProps) {
  return (
    <div
      className={`inline-flex items-center justify-center h-8 px-3 rounded-md bg-white border border-stone-200 shadow-2xs ${className}`.trim()}
      title="Visa"
      aria-label="Visa"
    >
      <span className="text-xs font-black italic tracking-tight text-[#1A1F71] font-sans">
        VISA
      </span>
    </div>
  );
}

export function MastercardBadge({ className = '' }: BadgeProps) {
  return (
    <div
      className={`inline-flex items-center justify-center h-8 px-3 rounded-md bg-white border border-stone-200 shadow-2xs ${className}`.trim()}
      title="Mastercard"
      aria-label="Mastercard"
    >
      <svg
        className="w-6 h-4 shrink-0"
        viewBox="0 0 36 22"
        aria-hidden="true"
      >
        <circle cx="13" cy="11" r="8" fill="#EB001B" />
        <circle cx="23" cy="11" r="8" fill="#F79E1B" fillOpacity="0.9" />
      </svg>
    </div>
  );
}

export function ApplePayBadge({ className = '' }: BadgeProps) {
  return (
    <div
      className={`inline-flex items-center justify-center h-8 px-3 rounded-md bg-white border border-stone-200 shadow-2xs ${className}`.trim()}
      title="Apple Pay"
      aria-label="Apple Pay"
    >
      <svg
        className="w-3.5 h-3.5 text-black mr-1 -mt-0.5 fill-current shrink-0"
        viewBox="0 0 170 170"
        aria-hidden="true"
      >
        <path d="M150.37 130.25c-2.45 5.66-5.35 10.87-8.71 15.66-4.58 6.53-8.33 11.05-11.22 13.56-4.48 4.12-9.28 6.23-14.42 6.35-3.69 0-8.14-1.05-13.32-3.18-5.19-2.12-9.97-3.17-14.34-3.17-4.58 0-9.49 1.05-14.75 3.17-5.26 2.13-9.5 3.24-12.74 3.35-4.35.13-9.13-1.9-14.34-6.08-3.69-3.03-7.61-7.82-11.77-14.37-5.93-9.28-10.76-19.99-14.48-32.12-3.73-12.13-5.59-23.38-5.59-33.74 0-12.71 3.19-23.16 9.56-31.35 6.37-8.19 14.39-12.44 24.04-12.75 4.92 0 10.45 1.51 16.6 4.53 6.14 3.02 10.09 4.58 11.85 4.69 1.34 0 5.67-1.79 12.99-5.37 7.04-3.35 13.19-4.75 18.45-4.2 13.63 1.12 23.86 6.48 30.69 16.1-12.19 7.38-18.17 17.66-17.95 30.85.22 10.29 4.25 18.84 12.08 25.66 5.48 4.81 11.96 7.6 19.45 8.38-1.57 4.81-3.3 9.45-5.2 13.92zM119.22 31.02c0 8.06-2.96 15.61-8.88 22.65-7.14 8.36-15.79 13.18-25.21 12.41-.19-.97-.29-2.03-.29-3.19 0-7.73 3.36-16.01 9.33-22.84 2.98-3.44 6.77-6.3 11.37-8.58 4.6-2.27 8.95-3.54 13.06-3.81.41 1.15.62 2.27.62 3.36z" />
      </svg>
      <span className="text-xs font-semibold tracking-tight text-black font-sans">
        Pay
      </span>
    </div>
  );
}

export function GooglePayBadge({ className = '' }: BadgeProps) {
  return (
    <div
      className={`inline-flex items-center justify-center h-8 px-3 rounded-md bg-white border border-stone-200 shadow-2xs ${className}`.trim()}
      title="Google Pay"
      aria-label="Google Pay"
    >
      <svg
        className="w-3.5 h-3.5 mr-1 shrink-0"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <path
          fill="#4285F4"
          d="M23.49 12.27c0-.79-.07-1.54-.19-2.27H12v4.51h6.47c-.29 1.48-1.14 2.73-2.4 3.58v2.98h3.86c2.26-2.09 3.56-5.17 3.56-8.8z"
        />
        <path
          fill="#34A853"
          d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.86-2.98c-1.08.72-2.45 1.16-4.07 1.16-3.13 0-5.78-2.11-6.73-4.96H1.29v3.09C3.26 21.3 7.31 24 12 24z"
        />
        <path
          fill="#FBBC05"
          d="M5.27 14.31c-.24-.72-.38-1.49-.38-2.31s.14-1.59.38-2.31V6.6H1.29C.47 8.23 0 10.06 0 12s.47 3.77 1.29 5.4l3.98-3.09z"
        />
        <path
          fill="#EA4335"
          d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.31 0 3.26 2.7 1.29 6.6l3.98 3.09c.95-2.85 3.6-4.94 6.73-4.94z"
        />
      </svg>
      <span className="text-xs font-semibold tracking-tight text-stone-700 font-sans">
        Pay
      </span>
    </div>
  );
}

export function PaymentBadgesRow({ className = '' }: BadgeProps) {
  return (
    <div className={`flex flex-wrap items-center gap-2 ${className}`.trim()}>
      <TwintBadge />
      <VisaBadge />
      <MastercardBadge />
      <ApplePayBadge />
      <GooglePayBadge />
    </div>
  );
}
