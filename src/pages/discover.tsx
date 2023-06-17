/* This page is NOT USED */
/* View the "index.tsx" page, it is all there*/

import { Box, Flex, Heading, Text } from '@chakra-ui/react';

import { useUser } from '@auth0/nextjs-auth0/client';
import { useRouter } from 'next/router';
import { useState } from 'react';
import Navbar from '../components/NavBars/NavBarEncore';
//import SearchBar from '../components/SearchBar/SearchBarEncore';
import SearchBar from '../components/SearchBar/SearchBarNoButtonEncore';
import SideBar from '../components/SideBar/SideBar';
import { EncoreTab } from '../components/Tabs/EncoreTab';

/*type DiscoverPageProps = {
  accessToken: string | undefined;
};*/

const Home = () => {
  const router = useRouter(); // router è un hook di next.js che fornisce l'oggetto della pagina corrente
  const [searchValue, setSearchValue] = useState<string[]>([]);
  //const [suggestions, setSuggestions] = useState<string[]>([]);
  //const suggestions: string[] = [];

  //const optionsText = selectedOptions.join(', ');
  const { user } = useUser();
  //const [data, setData] = useState<any[]>([]) || undefined;
  //const data: any[] = [];
  //let data_list: string[] = [];

  const { searchData } = router.query;
  console.log('Search Data: ' + searchData);

  // the skill should be extracted from the oers
  const [skill] = useState('circular economy');

  {
    /*const searchCallback = async () => {
    const api = new APIV2(props.accessToken);

    const resp = await api.getSkills();
    const skills = resp.data?.data || [];
    const labels = skills.map((skill: any) => skill.label); // extract only "label" fields from every object
    setData(skills);
    setSuggestions(labels);
   };*/
  }

  //console.log(data);
  //console.log(suggestions);
  /*useEffect(() => {
    console.log('ciao');
    const api = new APIV2(props.accessToken);

    // nella useEffect le funzioni async fanno fatte così, è sbagliato mettere async subito la prima
    (async () => {
      const resp = await api.getSkills();
      console.log(resp.data?.data);
    })();

  }, []);*/

  return (
    <>
      <Navbar user={user} />
      <SideBar pagePath={'/'} />
      {JSON.stringify(searchData)}
      <Flex ml="200px" h="100vh" mt="60px">
        <Box flex="1" py="30px" px="30px" h="100%">
          <Flex
            w="100%"
            justifyContent="left"
            //justify="space-between"
          >
            <Heading fontFamily="title">
              <Text>Discover</Text>
            </Heading>
          </Flex>
          <Box w="100%">
            <Text variant="label" my="6px">
              Keywords
            </Text>

            <SearchBar
              inputValue={searchValue}
              setInputValue={setSearchValue}
              placeholder="Search resources..."
            />
          </Box>
        </Box>

        <EncoreTab
          skill={skill}
          flex="1" // "flex='1'" fill the rest of the page
          py="30px"
          px="30px"
          h="100%"
          backgroundColor="background"
          borderLeft="0.5px"
          borderLeftColor={'secondary'}
          borderLeftStyle={'solid'}
        />
      </Flex>
    </>
  );
};

export default Home;
