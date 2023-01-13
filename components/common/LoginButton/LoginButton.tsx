import { useSession, signIn } from 'next-auth/react';
import { Button, Dropdown } from '../../../components/common';

function LoginButton() {
  const { data: session } = useSession();
  if (session?.user?.image) {
    return (
      <Dropdown image={session.user.image} name={session.user.name ?? ''} />
    );
  }
  return (
    <>
      {' '}
      <Button onClick={() => signIn(undefined, { callbackUrl: '/lists' })}>
        Sign in
      </Button>{' '}
    </>
  );
}

export default LoginButton;
