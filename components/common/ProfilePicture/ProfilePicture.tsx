import Image from 'next/future/image';
interface Props {
  url?: string;
}
const ProfilePicture = ({ url }: Props) => {
  if (url == null) return <h1>no image</h1>;
  return (
    <Image
      src={url}
      alt="User Profile Picture"
      width="35"
      height="35"
      className="rounded-full border-gray-300 border-2"
    />
  );
};

export default ProfilePicture;
