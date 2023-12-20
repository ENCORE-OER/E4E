import { Box, Flex, Heading, Text, Button } from '@chakra-ui/react';
import { useUser } from '@auth0/nextjs-auth0/client';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useCollectionsContext } from '../../Contexts/CollectionsContext/CollectionsContext';
import { useLearningPathDesignContext } from '../../Contexts/LearningPathDesignContext';
import CustomDropDownMenu from '../../components/CustomDropDownMenu/CustomDropDownMenu';
import Navbar from '../../components/NavBars/NavBarEncore';
import SideBar from '../../components/SideBar/SideBar';
import { IconPathEdit } from '../../public/Icons/svgToIcons/iconPatheEdit';
import LearningStepper from '../../components/Stepper/Stepper';
import { CustomToast } from '../../utils/Toast/CustomToast';
import PathDesignCentralBars from '../../components/PathDesignCentralBars/PathDesignCentralBars';

const Home = (/*props: DiscoverPageProps*/) => {
  const {
    DIMENSION,
    SPACING,
    bloomLevelIndex,
    text,
    step,
    collectionIndex,
    selectedSkillConceptsTags,
    handleStepChange,
    selectedOptions,
    //handleResetStep0,
    handleCollectionIndexChange,
  } = useLearningPathDesignContext();
  const { collections } = useCollectionsContext();
  const router = useRouter(); // router è un hook di next.js che fornisce l'oggetto della pagina corrente
  const { user } = useUser();
  const { addToast } = CustomToast();
  const [selectedCollection, setSelectedCollection] = useState<boolean | null>(
    null
  );
  const [isNextButtonClicked, setIsNextButtonClicked] = useState(false);

  const handleCollectionSelection = () => {
    // Update the state to show the text when a collection is selected
    setSelectedCollection(true);
  };

  const handleCollectionChange = (collectionIndex: number) => {
    //console.log('COLLECTION INDEX: ' + collectionIndex);
    handleCollectionIndexChange(collectionIndex);
    handleStepChange(1); // Update the state to show the text when a collection is selected
  };

  const handlePrevButtonClick = () => {
    //handleResetStep0();
    router.push({
      pathname: '/design',
    });
  };

  return (
    <>
      <Flex w="100%" h="100%">
        <Navbar user={user} pageName="Design" />
        <SideBar pagePath={'/design'} />

        <Box
          ml="200px"
          py="115px"
          pl="40px"
          w="full"
          h={'100vh'}
          bg="background"
        >
          <Box w="100%" h="100%">
            <Flex
              w="100%"
              justifyContent="left"
              //justify="space-between"
            >
              <Heading>Learning path design</Heading>
            </Flex>

            <Box
              paddingTop="1.5rem"
              w="100%"
              justifyContent="left"
              //justify="space-between"
            >
              <Box w="80% ">
                <LearningStepper activeStep={1} />
              </Box>
              <Box w="100% " paddingTop="1.5rem">
                <Text>
                  This section is designed to assist you in crafting a
                  personalized learning journey to achieve specific learning
                  objectives.
                  <br />
                  It does so by suggesting potential educational activities and
                  learning resources based on the desired learning objectives.
                </Text>
              </Box>
            </Box>

            <Flex w="100%" paddingTop="1.5rem">
              <Text fontSize="sm">
                Select here the collection that contain potential relevant
                resources
              </Text>
            </Flex>
            <Box w={`${DIMENSION - SPACING}%`}>
              <CustomDropDownMenu
                data={collections}
                onData={handleCollectionSelection}
                onSelectionChange={handleCollectionChange}
                isHighlighted={isNextButtonClicked}
                isBloomLevel={false}
              />
            </Box>

            {step >= 1 && (
              <>
                <Flex paddingTop="1.5rem" w="90%">
                  <Text>
                    To define a learning path effectively, it is crucial to
                    choose the desired level within the Bloom taxonomy and
                    provide indications of the skills, concepts, and contextual
                    information that need to be achieved
                  </Text>
                </Flex>
                <Box>
                  <PathDesignCentralBars
                    collectionIndex={collectionIndex}
                    isNextButtonClicked={isNextButtonClicked}
                  />
                </Box>
              </>
            )}
            <Flex paddingTop="1.5rem" w="100%">
              <Flex
                w="auto"
                paddingRight={`${SPACING}%`}
                position={'fixed'}
                bottom="5%"
                right="11%"
              >
                <Button
                  marginRight={'1px'}
                  border={'1px solid'}
                  w="50%"
                  colorScheme="yellow"
                  onClick={handlePrevButtonClick}
                >
                  <Text fontWeight="bold" fontSize="lg">
                    Previous
                  </Text>
                </Button>

                <Button
                  marginLeft={'1px'}
                  border={'1px solid'}
                  w="50%"
                  leftIcon={<IconPathEdit />}
                  colorScheme="yellow"
                  onClick={() => {
                    if (
                      selectedCollection !== null &&
                      bloomLevelIndex !== null &&
                      selectedSkillConceptsTags.length > 0 &&
                      text?.trim() !== '' &&
                      bloomLevelIndex !== -1 &&
                      ((bloomLevelIndex > 1 && selectedOptions.length === 0) ||
                        (bloomLevelIndex <= 1 && selectedOptions.length > 0))
                    ) {
                      router.push({
                        pathname: '/design/learningPathDesign',
                      });
                    } else {
                      addToast({
                        message:
                          'Please ensure all required fields are filled out before proceeding.',
                        type: 'warning',
                      });
                      setIsNextButtonClicked(true);
                    }
                  }}
                >
                  <Text fontWeight="bold" fontSize="lg">
                    Next
                  </Text>
                </Button>
              </Flex>
            </Flex>
          </Box>
        </Box>
      </Flex>
    </>
  );
};

export default Home;
