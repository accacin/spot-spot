import Link from 'next/link';
import LocationIcon from '../../../public/location-icon.svg';
import { LoginButton } from '../../../components/common';

const Nav = () => {
  return (
    <nav className="bg-white border-b-2">
      <div className="container mx-auto px-4 py-4 md:px-6 lg:px-8 flex flex-row items-center justify-between">
        <Link href="/">
          <div className="flex text-lg select-none cursor-pointer">
            <span className="pr-1 text-green-700">Spot</span>
            <LocationIcon className="w-5 text-gray-900 fill-current" />
            <span className="pl-1">Spot</span>
          </div>
        </Link>
        <div className="flex text-lg select-none">
          <LoginButton />
        </div>
      </div>
    </nav>
  );
};

export default Nav;
