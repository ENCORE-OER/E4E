import { Box, Flex, Text } from '@chakra-ui/react';

import { useUser } from '@auth0/nextjs-auth0/client';
//import { useRouter } from 'next/router';

import router from 'next/router';
import { useEffect, useState } from 'react';
import { LearningPathProvider } from '../../Contexts/learningPathContext';
import ConceptButtonsList from '../../components/Buttons/ConceptButtonsList';
import { useCollectionsContext } from '../../components/CollectionsContext/CollectionsContext';
import HeadingPlanDesign from '../../components/Heading/HeadingPlanDesign';
import LearningPathEditor from '../../components/Layout/LearningPathEditor';
import Navbar from '../../components/NavBars/NavBarEncore';
import SideBar from '../../components/SideBar/SideBar';
import { APIV2 } from '../../data/api';
import { OerInCollectionProps, OerProps } from '../../types/encoreElements';
import { CustomToast } from '../../utils/Toast/CustomToast';
import { useHasHydrated } from '../../utils/utils';

type DiscoverPageProps = {
  accessToken: string | undefined;
};

const Home = (props: DiscoverPageProps) => {
  //const router = useRouter();
  const { user } = useUser();
  const { collections, indexCollectionClicked, setIndexCollectionClicked } =
    useCollectionsContext();

  const [oersById, setOersById] = useState<OerProps[]>([]);

  const { addToast } = CustomToast();
  const hydrated = useHasHydrated(); // used to avoid hydration failed
  const [conceptSelectedIndex, setConceptSelectedIndex] = useState<number>(-1);

  const getDataOerById = async (id_oer?: number) => {
    const api = new APIV2(props.accessToken);

    if (id_oer) {
      try {
        const oer = await api.getOerById(id_oer);
        return oer[0];
      } catch (error) {
        throw error;
      }
    }
  };

  // setIndexCollectionClicked is used in CollectionMenu component
  useEffect(() => {
    console.log(indexCollectionClicked);

    if (collections?.length > 0 && hydrated && indexCollectionClicked >= 0) {
      if (collections[indexCollectionClicked]?.oers?.length > 0) {
        try {
          const fetchOerData = async () => {
            const oerData = await Promise.all(
              collections[indexCollectionClicked]?.oers?.map(
                async (oer: OerInCollectionProps) => {
                  const oerFound = await getDataOerById(oer?.id);
                  return oerFound;
                }
              )
            );
            setOersById(oerData);
          };

          fetchOerData();

          //console.log(oersById);

          if (
            collections[indexCollectionClicked]?.conceptsSelected?.length === 0
          ) {
            addToast({
              message: 'No concepts selected in this collection!',
              type: 'error',
            });
            addToast({
              message:
                'You need to select concepts from the saved OERs to create learning paths.',
              type: 'warning',
            });
          } else {
            setConceptSelectedIndex(0);
          }
        } catch (error) {
          throw error;
        }
      } else {
        addToast({
          message: 'No OERs found in this collection!',
          type: 'error',
        });
        addToast({
          message: 'You need to save OERs to create learning paths.',
          type: 'warning',
        });
      }
    } else if (collections?.length === 0 && indexCollectionClicked < 0) {
      addToast({
        message: 'No collection created!',
        type: 'error',
      });
      addToast({
        message:
          'Before accessing Plan, create a collection and save the OERs that interest you.',
        type: 'warning',
      });
      setTimeout(() => {
        router.push({
          pathname: '/',
        });
      }, 1000);
    }
  }, [indexCollectionClicked]);

  useEffect(() => {
    console.log(conceptSelectedIndex);
  }, [conceptSelectedIndex]);

  return (
    <LearningPathProvider>
      <Flex w="100%" h="100%">
        <Navbar user={user} pageName="Plan" />
        <SideBar pagePath={'/plan'} />

        <Box
          ml="200px"
          py="115px"
          px="40px"
          w="full"
          h={conceptSelectedIndex === -1 ? '100vh' : 'full'}
          bg="background"
        >
          <HeadingPlanDesign
            collections={collections}
            collectionIndex={indexCollectionClicked}
            setCollectionIndex={setIndexCollectionClicked}
            title="Learning path design"
          />
          <Text pt="30px" pb="7px">
            For each concept add its learning fragment.
          </Text>

          <Box position="relative">
            <Flex>
              <Box
                p={3}
                w="80%"
                h="auto"
                border="2px"
                borderRadius="10px"
                borderColor="secondary"
                borderStyle="solid"
              >
                <ConceptButtonsList
                  collections={collections}
                  conceptSelectedIndex={conceptSelectedIndex}
                  setConceptSelectedIndex={setConceptSelectedIndex}
                  collectionIndex={indexCollectionClicked}
                />
              </Box>

              {/* TODO: add onClick function to add concepts */}
              {/*}
            <Box display="flex" flex="1" px={5}>
              <Button variant="primary">Add a new concept</Button>
           </Box>*/}
            </Flex>

            <LearningPathEditor
              collectionIndex={indexCollectionClicked}
              setConceptSelectedIndex={setConceptSelectedIndex}
              oers={oersById}
              conceptSelectedIndex={conceptSelectedIndex}
              collectionColor={collections[indexCollectionClicked]?.color}
            />
          </Box>
        </Box>
      </Flex>
    </LearningPathProvider>
  );
};

export default Home;
