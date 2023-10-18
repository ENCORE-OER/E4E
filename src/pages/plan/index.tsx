import {
  Box,
  Flex,
  Heading,
  Text,
} from '@chakra-ui/react';

import { useUser } from '@auth0/nextjs-auth0/client';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import {
  useCollectionsContext
} from '../../components/CollectionsContext/CollectionsContext';
import CustomDropDownMenu from '../../components/CustomDropDownMenu/CustomDropDownMenu';
import CustomSearchBar from '../../components/CustomSearchBar/CustomSearchBar';
//import CheckboxMenu from '../../components/CheckboxMenu/CheckbomMenu';
import Navbar from '../../components/NavBars/NavBarEncore';
import SideBar from '../../components/SideBar/SideBar';
//import SearchBar from '../../components/SearchBar/SearchBarEncore';
import {
  OerSkillInfo,
} from '../../types/encoreElements';



const Home = (/*props: DiscoverPageProps*/) => {
  const { collections } = useCollectionsContext();
  const router = useRouter(); // router è un hook di next.js che fornisce l'oggetto della pagina corrente
  const { user } = useUser();
  const [selectedCollection, setSelectedCollection] = useState<boolean | null>(null);
  const bloomLevels = [
    { name: "Remember" },
    { name: "Understand" },
    { name: "Apply" },
    { name: "Create" }
  ];

  const [searchValue, setSearchValue] = useState<string[]>([]);
  const [selectedSkillIds, setSelectedSkillIds] = useState<number[]>([]);
  const [suggestions, setSuggestions] = useState<OerSkillInfo[]>([]);

  useEffect(() => {setSuggestions}, []);
  useEffect(() => {console.log("cambiato qualcosa")}, [selectedCollection]);
  

  const handleCollectionSelection = () => {
    // Aggiorna lo stato per mostrare il testo quando viene selezionata una collection
    setSelectedCollection(true);
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
          <Heading>Learning path design</Heading>
        </Flex>

        <Flex
          paddingTop="2rem"
          w="100%"
          justifyContent="left"
          //justify="space-between"
          >
          <Text>
            This section is designed to assist you in crafting a personalized learning journey to achieve specific learning objectives.
            <br />
            It does so by suggesting potential educational activities and learning resources based on the desired learning objectives.
          </Text>
        </Flex>

        <Box paddingTop="1.5rem" w="24%">
          <Text fontSize="sm">
            Select here the collection that contain potential relevant resources
          </Text>
          <CustomDropDownMenu
            initialTitle='Select Collection'
            data={collections}
            onData={handleCollectionSelection}
          />
        </Box>

        {/*selectedCollection && (*/}
        <Flex
          paddingTop="2rem"
          w="100%"
          //justifyContent="left"
          //justify="space-between"
          >
          <Text>
            To define a learning path effectively, it is crucial to choose the desired level within the Bloom taxonomy and provide  indications of the skills, concepts, and contextual information that need to be achieved
          </Text>
        </Flex>

        {/*Intestation flex*/}
        <Flex paddingTop="1.5rem" w="100%">
          <Text fontSize="sm" fontWeight="bold" paddingRight="3%" w="27%">
            Select the Bloom level for the learning objective
          </Text>
          <Text fontSize="sm" fontWeight="bold" paddingRight="3%" w="27%">
            Add here the skill or the concepts to be covered
          </Text>
          <Text fontSize="sm" fontWeight="bold" paddingRight="3%" w="27%">
            Add here the context
          </Text>
        </Flex>

        {/*Component flex*/}
        <Flex w="100%">
          <Box paddingRight="3%" w="27%">
            <CustomDropDownMenu
              initialTitle='Bloom Level'
              data={bloomLevels}
            />
          </Box>

          <Box paddingRight="3%" w="27%">
            <CustomSearchBar
              inputValue={searchValue}
              setInputValue={setSearchValue}
              inputValueIds={selectedSkillIds}
              setInputValueIds={setSelectedSkillIds}
              items={suggestions}
            />
          </Box>
          <Box paddingRight="3%" w="27%">
            <CustomSearchBar
              inputValue={searchValue}
              setInputValue={setSearchValue}
              inputValueIds={selectedSkillIds}
              setInputValueIds={setSelectedSkillIds}
              items={suggestions}
            />
          </Box>
        </Flex>

        {/*bottom box flex*/}
        <Flex w="100%">
          <Text fontSize="sm" paddingRight="3%" w="27%">
            This level indicates the cognitive complexity or depth of understanding associated with a particular learning objective
          </Text>
          <Text fontSize="sm" paddingRight="3%" w="27%">
            The selection of skills and concepts here is informed by the collection of Open Educational Resources (OERs).
          </Text>
          <Text fontSize="sm" paddingRight="3%" w="27%">
            Here the contextual information that will assist in delineating the specific context of the educational activity
          </Text>
        </Flex>
        <Flex paddingTop="1.5rem" w="100%">
          <Box w="50%">
            <Text fontSize="sm" paddingRight="3%">
              Select the verbs related to your learning objective 
            </Text>
            {/*<CheckboxMenu />*/}
          </Box>
          <Box w="50%"> 
          </Box>
          
        </Flex>
      </Box>
    </Flex>
  );
};

export default Home;
