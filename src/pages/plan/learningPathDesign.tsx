import { Box, Flex, Text } from '@chakra-ui/react';

import { useUser } from '@auth0/nextjs-auth0/client';
//import { useRouter } from 'next/router';

import React, { useEffect, useState } from 'react';
import ConceptButtonsList from '../../components/Buttons/ConceptButtonsList';
import { useCollectionsContext } from '../../components/CollectionsContext/CollectionsContext';
import HeadingPlanDesign from '../../components/Heading/HeadingPlanDesign';
import LearningPathEditor from '../../components/Layout/LearningPathEditor';
import Navbar from '../../components/NavBars/NavBarEncore';
import SideBar from '../../components/SideBar/SideBar';
import { APIV2 } from '../../data/api';
import { useHasHydrated } from '../../utils/utils';

type DiscoverPageProps = {
  accessToken: string | undefined;
};

const Home = (props: DiscoverPageProps) => {
  //const router = useRouter(); // router è un hook di next.js che fornisce l'oggetto della pagina corrente
  const { user } = useUser();
  const { collections, indexCollectionClicked } = useCollectionsContext();

  const [oersById, setOersById] = useState<any[]>([]);

  const hydrated = useHasHydrated(); // used to avoid hydration failed
  const concepts = ['concept 1', 'concept 2', 'concept 3'];
  const [conceptSelectedIndex, setConceptSelectedIndex] = useState<number>(-1);

  const getDataOerById = async (id_oer: any) => {
    const api = new APIV2(props.accessToken);

    try {
      const oer = await api.getOerById(id_oer);
      return oer[0];
    } catch (error) {
      throw error;
    }
  };

  // setIndexCollectionClicked is used in CollectionMenu component
  useEffect(() => {
    if (collections?.length > 0 && hydrated && indexCollectionClicked >= 0) {
      try {
        const fetchOerData = async () => {
          const oerData = await Promise.all(
            collections[indexCollectionClicked]?.oers?.map(async (oer: any) => {
              const oerFound = await getDataOerById(oer.idOer);
              return oerFound;
            })
          );
          setOersById(oerData);
        };

        fetchOerData();

        console.log(oersById);
      } catch (error) {
        throw error;
      }
    }
  }, [indexCollectionClicked]);

  useEffect(() => {
    console.log(conceptSelectedIndex);
  }, [conceptSelectedIndex]);

  return (
    <Flex w="100%" h="100%">
      <Navbar user={user} pageName="Plan" />
      <SideBar pagePath={'/plan'} />

      <Box
        ml="200px"
        py="115px"
        pl="40px"
        w="full"
        h={conceptSelectedIndex === -1 ? '100vh' : 'full'}
        bg="background"
      >
        <HeadingPlanDesign title="Learning path design" />
        <Text pt="30px" pb="7px">
          For each concept add the educational activities.
        </Text>

        <ConceptButtonsList
          concepts={concepts}
          conceptSelectedIndex={conceptSelectedIndex}
          setConceptSelectedIndex={setConceptSelectedIndex}
        />

        <LearningPathEditor
          oers={oersById}
          conceptSelectedIndex={conceptSelectedIndex}
        />
      </Box>
    </Flex>
  );
};

export default Home;
