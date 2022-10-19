import Image from "next/image";
interface Props {
  url?: string;
}
const ProfilePicture = ({ url }: Props) => {
  if (url == null) return <h1>no image</h1>;
  return <Image src={url} alt="User Profile Picture" width="25" height="25" />;
};

export default ProfilePicture;
