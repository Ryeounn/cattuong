
interface CustomPagingProps {
    className: string;
    onClick: () => void;
}

const CustomPaging: React.FC<CustomPagingProps> = ({ className, onClick }) => {
    return (
      <div
        className={`customPaging ${className}`}
        onClick={onClick}
      >
      </div>
    );
  }

export default CustomPaging;