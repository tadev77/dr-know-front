interface CardProps {
  title: string;
  children: React.ReactNode;
}

const Card = ({ title, children }: CardProps) => {
  return (
    <div className="w-full p-6 rounded-[16px] border border-[#20344E]">
      <h3 className="text-white text-lg font-medium mb-6">{title}</h3>
      {children}
    </div>
  );
};

export default Card; 