import { useSession, signIn } from "next-auth/react";
import { Button, ProfilePicture } from "../../../components/common";

function LoginButton() {
  const { data: session } = useSession();
  if (session?.user?.image) {
    return <ProfilePicture url={session.user.image}  />;
  }
  return (
    <>
      {" "}
      <Button onClick={() => signIn()}>Sign in</Button>{" "}
    </>
  );
}

export default LoginButton;
