import { Nav, Container } from "../../../components/layout";

interface Props {
  children?: React.ReactNode;
}

const Layout = ({ children }: Props) => {
  return (
    <div className="w-screen h-screen flex flex-col">
      <Nav />
      <Container>{children}</Container>
    </div>
  );
};

export default Layout;
