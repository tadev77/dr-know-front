interface CardProps {
  title?: string;
  children: React.ReactNode;
  className?: string;
}

const Card = ({ title, children, className = '' }: CardProps) => {
  return (
    <div className={`bg-[#111C2A] rounded-[24px] shadow-lg p-6 w-full max-w-[400px] transition-all ${className}`}>
      {title && (
        <h2 className="text-white text-lg font-medium mb-4">{title}</h2>
      )}
      <div className="w-full">
        {children}
      </div>
    </div>
  );
};

export default Card; 