import { ButtonHTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
  variant?: 'primary' | 'secondary' | 'success' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
}

const Button = ({ 
  label, 
  variant = 'primary', 
  size = 'md', 
  fullWidth = false,
  className = '',
  ...props 
}: ButtonProps) => {
  const baseStyles = 'inline-flex items-center justify-center rounded-full font-medium transition-colors duration-200';
  
  const variants = {
    primary: 'bg-[#00A3FF] hover:bg-[#0088D4] text-white gap-2',
    secondary: 'bg-gray-600 hover:bg-gray-700 text-white',
    success: 'bg-green-600 hover:bg-green-700 text-white',
    danger: 'bg-red-600 hover:bg-red-700 text-white',
  };

  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
  };

  const widthClass = fullWidth ? 'w-full' : '';

  return (
    <button
      className={`
        ${baseStyles}
        ${variants[variant]}
        ${sizes[size]}
        ${widthClass}
        ${className}
      `}
      {...props}
    >
      {variant === 'primary' && (
        <svg xmlns="http://www.w3.org/2000/svg" width="25" height="24" viewBox="0 0 25 24" fill="none">
        <path d="M14.3462 6.06773L14.3462 6.06776C15.0843 7.90859 16.5424 9.36679 18.3833 10.1048L18.3833 10.1048L22.9622 11.9404L18.3833 13.7759L18.3833 13.7759C16.5424 14.5139 15.0843 15.9721 14.3462 17.813L14.3462 17.813L12.5107 22.3919L10.6751 17.813L10.6751 17.813C9.9371 15.9721 8.4789 14.5139 6.63807 13.7759L6.63804 13.7759L2.05917 11.9404L6.63804 10.1048L6.63807 10.1048C8.4789 9.36679 9.9371 7.90859 10.6751 6.06776L10.6751 6.06773L12.5107 1.48886L14.3462 6.06773Z" fill="white" stroke="white"/>
        <path d="M4.29966 21.507C4.01453 20.9724 3.57647 20.5343 3.04183 20.2492C3.57647 19.9641 4.01453 19.526 4.29966 18.9914C4.5848 19.526 5.02286 19.9641 5.5575 20.2492C5.02286 20.5343 4.5848 20.9724 4.29966 21.507Z" stroke="white"/>
        <path d="M19.4168 3.77305C19.9515 3.48792 20.3895 3.04986 20.6747 2.51522C20.9598 3.04986 21.3979 3.48792 21.9325 3.77305C21.3979 4.05819 20.9598 4.49625 20.6747 5.03089C20.3895 4.49625 19.9515 4.05819 19.4168 3.77305Z" stroke="white"/>
        </svg>
      )}
      {label}
    </button>
  );
};

export default Button; 