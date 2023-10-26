import { Box, Flex, Heading, Text, Button } from '@chakra-ui/react';
import { useUser } from '@auth0/nextjs-auth0/client';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useCollectionsContext } from '../../components/CollectionsContext/CollectionsContext';
import CustomDropDownMenu from '../../components/CustomDropDownMenu/CustomDropDownMenu';
import SearchBarPathDesign from '../../components/CustomSearchBar/SearchBarSkillsConcepts';
import CheckboxMenu from '../../components/CheckboxMenu/CheckboxMenu';
import Navbar from '../../components/NavBars/NavBarEncore';
import SideBar from '../../components/SideBar/SideBar';
import TextBox from '../../components/TextBox/TextBox';
import { IconPathEdit } from '../../public/Icons/svgToIcons/iconPatheEdit';

const Home = (/*props: DiscoverPageProps*/) => {
  const DIMENSION = 30;
  const SPACING = 3;
  const { collections } = useCollectionsContext();
  const router = useRouter(); // router è un hook di next.js che fornisce l'oggetto della pagina corrente
  const { user } = useUser();
  const [selectedCollection, setSelectedCollection] = useState<boolean | null>(
    null
  );
  const [step, setStep] = useState<number>(0); // for the steps of the page
  const [collectionIndex, setcollectionIndex] = useState<number>(0);
  const [bloomLevelIndex, setBloomLevelIndex] = useState<number>(0);
  const [selectedSkillConceptsTags, setSelectedSkillConceptsTags] = useState<
    string[]
  >([]);
  const [selectedContextTags, setSelectedContextTags] = useState<string[]>([]);
  const bloomLevels = [
    { name: 'Remember' },
    { name: 'Understand' },
    { name: 'Apply' },
    { name: 'Create' },
  ];

  const [text, setText] = useState('');
  const handleTextChange = (newText: string) => {
    setText(newText);
  };
  useEffect(() => {
    //console.log('cambiato qualcosa');
  }, [text]);

  const [selectedOptions, setSelectedOptions] = useState(['List']);
  const handleOptionsChange = (newSelectedOptions: string[]) => {
    setSelectedOptions(newSelectedOptions);
  };
  useEffect(() => {
    //console.log('cambiato qualcosa');
  }, [selectedOptions]);

  useEffect(() => {
    //console.log('cambiato qualcosa');
  }, [selectedCollection]);
  useEffect(() => {
    //console.log('cambiato qualcosa');
  }, [collectionIndex]);
  useEffect(() => {
    //console.log('cambiato qualcosa');
  }, [bloomLevelIndex]);
  useEffect(() => {
    console.log('SELECTED SKILLS: ' + selectedSkillConceptsTags);
  }, [selectedSkillConceptsTags]);

  const handleCollectionSelection = () => {
    // Update the state to show the text when a collection is selected
    setSelectedCollection(true);
  };

  const handleCollectionChange = (collectionIndex: number) => {
    //console.log('COLLECTION INDEX: ' + collectionIndex);
    setcollectionIndex(collectionIndex);
    setStep(1); // Update the state to show the text when a collection is selected
  };

  const handleBloomLevelChange = (bloomLevelIndex: number) => {
    //console.log('BloomLevel INDEX: ' + bloomLevelIndex);
    setBloomLevelIndex(bloomLevelIndex);
    setStep(2);
  };
  /*const handleStepChange = () => {
    // Update the state to show the text when a bloom level is selected
    setStep(2);
  };*/
  const handleCreatePath = () => {
    const pathDesing = [
      { collection: collections[collectionIndex].name },
      { bloomLevel: bloomLevels[bloomLevelIndex].name },
      { skills: selectedSkillConceptsTags },
      { concepts: selectedContextTags },
      { verbsLearingObjective: selectedOptions },
      { textLearingObjective: text },
    ];
    console.log(pathDesing);
    // Use the router to navigate to the pathDesign page
    router.push({
      pathname: '/plan/pathDesign',
      query: { selectedItems: JSON.stringify(pathDesing) }, // Converti l'array in una stringa JSON
    });
  };

  return (
    <Flex w="100%" h="100%">
      <Navbar user={user} pageName="Plan" />
      <SideBar pagePath={router.pathname} />

      <Box ml="200px" py="115px" pl="40px" w="full" h="100vh" bg="background">
      
        <Box w="100%" h="100%">
          <Flex
            w="100%"
            justifyContent="left"
            //justify="space-between"
          >
            <Heading>Learning path design</Heading>
          </Flex>

          <Flex
            paddingTop="1.5rem"
            w="100%"
            justifyContent="left"
            //justify="space-between"
          >
            <Text>
              This section is designed to assist you in crafting a personalized
              learning journey to achieve specific learning objectives.
              <br />
              It does so by suggesting potential educational activities and
              learning resources based on the desired learning objectives.
            </Text>
          </Flex>

          <Flex w="100%" paddingTop="1.5rem">
            <Text fontSize="sm">
              Select here the collection that contain potential relevant
              resources
            </Text>
          </Flex>
          <Box w={`${DIMENSION - SPACING}%`}>
            <CustomDropDownMenu
              initialTitle="Select Collection"
              data={collections}
              onData={handleCollectionSelection}
              onSelectionChange={handleCollectionChange}
            />
          </Box>
          {step >= 1 && (
            <>
              <Flex paddingTop="1.5rem" w="90%">
                <Text>
                  To define a learning path effectively, it is crucial to choose
                  the desired level within the Bloom taxonomy and provide
                  indications of the skills, concepts, and contextual
                  information that need to be achieved
                </Text>
              </Flex>

              <Flex paddingTop="1.5rem" w="100%">
                <Text
                  fontSize="sm"
                  fontWeight="bold"
                  paddingRight={`${SPACING}%`}
                  w={`${DIMENSION}%`}
                >
                  Select the Bloom level for the learning objective
                </Text>
                <Text
                  fontSize="sm"
                  fontWeight="bold"
                  paddingRight={`${SPACING}%`}
                  w={`${DIMENSION}%`}
                >
                  Add here the skill or the concepts to be covered
                </Text>
                <Text
                  fontSize="sm"
                  fontWeight="bold"
                  paddingRight={`${SPACING}%`}
                  w={`${DIMENSION}%`}
                >
                  Add here the context
                </Text>
              </Flex>

              <Flex w="100%">
                <Box paddingRight={`${SPACING}%`} w={`${DIMENSION}%`}>
                  <CustomDropDownMenu
                    initialTitle="Bloom Level"
                    data={bloomLevels}
                    onSelectionChange={handleBloomLevelChange}
                  />
                </Box>

                <Box paddingRight={`${SPACING}%`} w={`${DIMENSION}%`}>
                  <SearchBarPathDesign
                    collectionIndex={collectionIndex}
                    isSkillsConcepts={true}
                    selectedTags={selectedSkillConceptsTags}
                    setSelectedTags={setSelectedSkillConceptsTags}
                  />
                </Box>
                <Box paddingRight={`${SPACING}%`} w={`${DIMENSION}%`}>
                  <SearchBarPathDesign
                    collectionIndex={collectionIndex}
                    isSkillsConcepts={false}
                    selectedTags={selectedContextTags}
                    setSelectedTags={setSelectedContextTags}
                  />
                </Box>
              </Flex>

              <Flex w="100%">
                <Text
                  fontSize="sm"
                  paddingRight={`${SPACING}%`}
                  w={`${DIMENSION}%`}
                >
                  This level indicates the cognitive complexity or depth of
                  understanding associated with a particular learning objective
                </Text>
                <Text
                  fontSize="sm"
                  paddingRight={`${SPACING}%`}
                  w={`${DIMENSION}%`}
                >
                  The selection of skills and concepts here is informed by the
                  collection of Open Educational Resources (OERs).
                </Text>
                <Text
                  fontSize="sm"
                  paddingRight={`${SPACING}%`}
                  w={`${DIMENSION}%`}
                >
                  Here the contextual information that will assist in
                  delineating the specific context of the educational activity
                </Text>
              </Flex>
            </>
          )}
          {step >= 2 && (
            <Flex paddingTop="1.5rem" w="100%">
              <Box w={`${DIMENSION}%`}>
                <Text
                  fontSize="sm"
                  fontWeight="bold"
                  paddingRight={`${SPACING}%`}
                >
                  Select the verbs related to your learning objective
                </Text>
                <CheckboxMenu onOptionsChange={handleOptionsChange} />
              </Box>
              <Box w="47%" paddingRight={`${SPACING}%`}>
                <TextBox
                  backgroundColor="#EDF2F7"
                  placeholder="Add some text..."
                  onTextChange={handleTextChange}
                />
              </Box>
              <Box w="5%" paddingRight={`${SPACING}%`}>
                <Button
                  leftIcon={<IconPathEdit />}
                  colorScheme="yellow"
                  position={'absolute'}
                  bottom="5%"
                  right="10%"
                  onClick={handleCreatePath}
                >
                  <Text fontWeight="bold" fontSize="lg">
                    Create Path
                  </Text>
                </Button>
              </Box>
            </Flex>
          )}
        
        </Box>
      </Box>
    </Flex>
  );
};

export default Home;
