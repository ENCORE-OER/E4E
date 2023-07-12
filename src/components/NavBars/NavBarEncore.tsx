import { UserProfile } from '@auth0/nextjs-auth0/client';
import { Button, HStack, Image, Text } from '@chakra-ui/react';
import Link from 'next/link';
import brandLogo from '../../public/logo_encore.png';
import Nav from '../Layout/NavBarEncore';

type NavBarProps = {
  user: UserProfile | undefined;
};

export default function Navbar({ user }: NavBarProps) {
  return (
    <Nav>
      <HStack>
        <Image
          src={brandLogo.src}
          className="mr-3"
          alt="Encore Logo"
          height="43px" // with Image from next/image don't use px
          width="100px"
          //ml="50px"
          //mt="8px"
          border-radius="0px"
        />

        <Text variant="navbar_label">Discover</Text>
      </HStack>
      <HStack>
        {!user ? (
          <div className="rounded-lg bg-cyan-400 pr-2 pl-2 pt-1 pb-1">
            <Link
              href={'/api/auth/login'}
              className="text-white"
              style={{ textDecoration: 'none' }}
            >
              Sign in
            </Link>
          </div>
        ) : (
          <HStack>
            <div>{user.name}</div>
            <Link href={'/api/auth/logout'} style={{ textDecoration: 'none' }}>
              <Button colorScheme="red" size={['sm', 'md']}>
                Log out
              </Button>
            </Link>
          </HStack>
        )}
      </HStack>
    </Nav>
  );
}
