import { useUser } from '@auth0/nextjs-auth0/client';
import {
  Box,
  Button,
  Flex,
  Heading,
  Text,
  useBreakpointValue,
} from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useCollectionsContext } from '../../Contexts/CollectionsContext/CollectionsContext';
import { useLearningPathDesignContext } from '../../Contexts/LearningPathDesignContext';
import CustomDropDownMenu from '../../components/CustomDropDownMenu/CustomDropDownMenu';
import Navbar from '../../components/NavBars/NavBarEncore';
import PathDesignCentralBars from '../../components/PathDesignCentralBars/';
import SideBar from '../../components/SideBar/SideBar';
import LearningStepper from '../../components/Stepper/Stepper';
import { IconPathEdit } from '../../public/Icons/svgToIcons/iconPatheEdit';
import { CustomToast } from '../../utils/Toast/CustomToast';

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

  // ==================================================================

  // Use this for the responsive design of the page
  const isSmallerScreen = useBreakpointValue({
    base: true,
    sm: true,
    md: false,
    lg: false,
  });

  // ==================================================================

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
        <SideBar pagePath={'/design'} />
        <Navbar user={user} pageName="Design" />

        <Box
          //ml="200px"
          py="115px"
          pl={isSmallerScreen ? '90px' : '240px'}
          w="full"
          h={step >= 2 ? 'full' : '100vh'}
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
              <Box w={isSmallerScreen ? '95%' : '90%'}>
                <LearningStepper
                  activeStep={1}
                  isSmallerScreen={isSmallerScreen}
                />
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
            <Box w={isSmallerScreen ? '50%' : `${DIMENSION - SPACING}%`}>
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
                    isSmallerScreen={isSmallerScreen}
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
