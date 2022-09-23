interface Props {
  children?: React.ReactNode;
}

const Container = ({ children }: Props) => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-4 md:px-6 lg:px-8 xl:px-10">
      {children}
    </div>
  );
};

export default Container;
