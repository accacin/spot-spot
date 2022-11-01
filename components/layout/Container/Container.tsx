interface Props {
  children?: React.ReactNode;
}

const Container = ({ children }: Props) => {
  return (
    <main className="flex h-full w-full">
      {children}
    </main>
  );
};

export default Container;
