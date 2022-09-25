interface Props {
  children?: string;
  onClick?: () => void;
}

const Button = ({ children, onClick }: Props) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-xl px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
    >
      {children}
    </button>
  );
};

export default Button;
