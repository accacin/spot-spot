// import Link from "next/link";
import LocationIcon from "../../public/location-icon.svg";
import { Container, LoginButton } from "../../components";

const Nav = () => {
  return (
    <nav className="bg-white border-b-2">
      <Container>
        <div className="flex flex-row items-center justify-between">
          <div className="flex text-lg select-none">
            <span className="pr-1 text-green-700">Spot</span>
            <LocationIcon className="w-5 text-gray-900 fill-current" />
            <span className="pl-1">Spot</span>
          </div>
          <LoginButton />
        </div>
      </Container>
    </nav>
  );
};

export default Nav;
