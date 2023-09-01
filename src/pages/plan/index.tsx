import { Box, Flex, Heading, Text } from '@chakra-ui/react';

import { useUser } from '@auth0/nextjs-auth0/client';
import { useRouter } from 'next/router';

//import { useCollectionsContext } from '../../components/CollectionsContext/CollectionsContext';
import CreatePathCollectionButton from '../../components/Buttons/CreatePathCollectionButton';
import Navbar from '../../components/NavBars/NavBarEncore';
import SideBar from '../../components/SideBar/SideBar';
import { IconBookmarkCheckCustom } from '../../public/Icons/svgToIcons/iconBookmarkCheckCustom';

/*type DiscoverPageProps = {
  accessToken: string | undefined;
};*/

const Home = (/*props: DiscoverPageProps*/) => {
  const router = useRouter(); // router è un hook di next.js che fornisce l'oggetto della pagina corrente
  const { user } = useUser();
  //const { collections, deleteCollection } = useCollectionsContext();

  //const hydrated = useHasHydrated(); // used to avoid hydration failed

  const goToConceptMapDesignPage = async () => {
    router.push({
      pathname: `/plan/conceptMapDesign`,
    });
  };

  return (
    <Flex w="100%" h="100%">
      <Navbar user={user} pageName="Plan" />
      <SideBar pagePath={router.pathname} />

      <Box ml="200px" py="115px" pl="40px" w="full" h="100vh" bg="background">
        <Flex
          w="100%"
          justifyContent="left"
          //justify="space-between"
        >
          <Heading>Plan</Heading>
        </Flex>

        <Box p={5}>
          <CreatePathCollectionButton onClick={goToConceptMapDesignPage} />
        </Box>

        <Box
          display="flex"
          borderTop={3}
          borderTopColor="gray.200"
          borderTopStyle="solid"
          w="70%"
          p={5}
        >
          {/* TODO: create component for learning path card */}

          <Box
            display="flex"
            w="90%"
            h="120px"
            border="1.5px"
            borderColor="secondary"
            borderStyle="solid"
            borderRadius="5px"
            bg="white"
            p={3}
            alignItems="center"
          >
            <Flex>
              <Box>
                <IconBookmarkCheckCustom
                  stroke="black"
                  fillCheck="black"
                  w="50px"
                  h="50px"
                  strokeWidthBorder="1"
                />
              </Box>
              <Box>
                <Text noOfLines={1} variant="title_card">
                  Learning Path title
                </Text>
                <Text variant="author_card">create 06 June 2023</Text>
                <Text>Description of the learning path</Text>
              </Box>
            </Flex>
          </Box>
        </Box>
      </Box>
    </Flex>
  );
};

export default Home;
