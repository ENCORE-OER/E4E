import { Box, Button, Flex, Text } from '@chakra-ui/react';

import { useUser } from '@auth0/nextjs-auth0/client';
import { useRouter } from 'next/router';

//import { useCollectionsContext } from '../../components/CollectionsContext/CollectionsContext';
import React from 'react';
import { AiOutlineArrowRight } from 'react-icons/ai';
import HeadingPlanDesign from '../../components/Heading/HeadingPlanDesign';
import Navbar from '../../components/NavBars/NavBarEncore';
import SideBar from '../../components/SideBar/SideBar';

/*type DiscoverPageProps = {
  accessToken: string | undefined;
};*/

const Home = (/*props: DiscoverPageProps*/) => {
  const router = useRouter(); // router è un hook di next.js che fornisce l'oggetto della pagina corrente
  const { user } = useUser();
  //const { collections, deleteCollection } = useCollectionsContext();

  //const hydrated = useHasHydrated(); // used to avoid hydration failed

  // should i call the function "buttonCallBack"?
  const goToLearningPathDesignPage = async () => {
    router.push({
      pathname: `/plan/learningPathDesign`,
    });
  };
  return (
    <Flex w="100%" h="100%">
      <Navbar user={user} pageName="Plan" />
      <SideBar pagePath={'/plan'} />

      <Box ml="200px" py="115px" pl="40px" w="full" h="full" bg="background">
        <HeadingPlanDesign title="Concept map design" />

        <Box
          bg="white"
          w="90%"
          h="550px"
          mt={5}
          mb="0"
          p={3}
          position="relative"
        >
          <Text display="flex">
            This is a map of concepts generated from the collection.
            <br /> Select the relevant concepts and add new ones.
          </Text>

          <Button variant="primary" position="absolute" top="3rem" right="1rem">
            Add a new concept
          </Button>
          <Button
            variant="learningPathDesign"
            rightIcon={<AiOutlineArrowRight />}
            onClick={goToLearningPathDesignPage}
            position="absolute"
            bottom="1rem"
            right="1rem"
          >
            Design the learning path
          </Button>

          {/*<Box
            //display="flex"
            w="full"
            h="full"
            px={5}
            aria-orientation="vertical"
          >
            <Flex
            //alignContent="flex-start"
            //justifyContent="flex-end"
            //h="full"
            //w="full"
            >
              <Button variant="primary">Add a new concept</Button>
            </Flex>
            <Spacer />
            <Flex
            //display="flex"
            //alignContent="flex-end"
            //justifyContent="flex-end"
            //h="full"
            // w="full"
            >
              <Button
                variant="learningPathDesign"
                rightIcon={<AiOutlineArrowRight />}
                onClick={goToLearningPathDesignPage}
              >
                Design the learning path
              </Button>
            </Flex>
          </Box>*/}
        </Box>
      </Box>
    </Flex>
  );
};

export default Home;
