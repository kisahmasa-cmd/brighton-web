interface ErrorFieldTextProps {
  text: string;
}

const ErrorFieldText: React.FC<ErrorFieldTextProps> = ({ text }) => {
  return (
    <p className="text-red-500 text-xs">{text}</p>
  );
};

export default ErrorFieldText;
