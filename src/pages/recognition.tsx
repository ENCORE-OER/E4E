// import { useUser } from '@auth0/nextjs-auth0/client';
import { Box, Button, Flex, Heading, Text } from '@chakra-ui/react';
import Image from 'next/image'; // Import the Image component from Next.js
import Navbar from '../components/NavBars/NavBarEncore';
import SideBar from '../components/SideBar/SideBar';
import qrCodeImage from '../public/qr-code.png'; // Adjust the path as needed
import { useIsSmallerScreen } from '../utils/utils';

const Recognition = () => {
  // const { user } = useUser();
  const isSmallerScreen = useIsSmallerScreen();

  const handleClaimBadge = () => {
    const badgeClaimUrl = 'https://openeducator.orcapods.org/achievements/92a20f9f-659a-4440-afcf-2af512f7cf6f/claim';
    window.open(badgeClaimUrl, '_blank');
  };

  return (
    <Flex w="100%" h="100%">
      <SideBar pagePath={'/recognition'} />
      <Navbar
        //  user={user}
        pageName="Recognition"
      />

      <Box
        py="115px"
        pl={isSmallerScreen ? '90px' : '240px'}
        w="full"
        minH="100vh"
        bg="background"
      >
        <Box w="100%" h="100%">
          <Flex w="100%" justifyContent="left">
            <Heading>Open Recognition</Heading>
          </Flex>

          <Box w={isSmallerScreen ? '95%' : '90%'} paddingTop="2rem">
            <Text>
              Earn recognition for your activity on the ENCORE platform with an
              open badge! Claim your badge by following this link to the{' '}
              <b>orcapods.org</b> platform.
            </Text>
          </Box>
          <Box w={isSmallerScreen ? '95%' : '90%'} paddingTop="2rem">
            <Button
              border="1px solid"
              borderRadius="lg"
              size="lg"
              colorScheme="yellow"
              onClick={handleClaimBadge}
            >
              <Text as="b">Claim your Badge</Text>
            </Button>
          </Box>

          <Box w={isSmallerScreen ? '95%' : '90%'} paddingTop="2rem">
            <Text>Or scan the QR code to claim your badge.</Text>
            <Image src={qrCodeImage} alt="QR Code" width={200} height={200} />
          </Box>

          <Box w={isSmallerScreen ? '95%' : '90%'} paddingTop="2rem">
            <Text>
              Please use one of the methods above to claim your badge.
            </Text>
          </Box>
        </Box>
      </Box>
    </Flex>
  );
};

export default Recognition;
