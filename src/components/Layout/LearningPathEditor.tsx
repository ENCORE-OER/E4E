import { Box, Center, Spinner, Text, VStack } from '@chakra-ui/react';
import { /*Dispatch, SetStateAction,*/ useEffect, useState } from 'react';
import { useLearningPathContext } from '../../Contexts/learningPathContext';
import { OerProps } from '../../types/encoreElements';
import { OerFreeSearchProps } from '../../types/encoreElements/oer/OerFreeSearch';
import { PolyglotFlow } from '../../types/polyglot/PolyglotFlow';
import { useHasHydrated } from '../../utils/utils';
import ResourceCardList from '../Card/OerCard/ResourceCardsList';
//import { useLearningPathDesignContext } from '../../Contexts/LearningPathDesignContext';

type LearningPathEditorProps = {
  conceptSelectedIndex: number;
  //setConceptSelectedIndex: Dispatch<SetStateAction<number>>;
  oers: (OerProps | undefined | OerFreeSearchProps)[];
  collectionColor?: string | string[];
  isLoading: boolean;
  wPathEditor?: string;
};

export default function LearningPathEditor({
  conceptSelectedIndex,
  oers,
  collectionColor,
  isLoading, //setConceptSelectedIndex,
  wPathEditor,
}: LearningPathEditorProps) {
  const hydrated = useHasHydrated();
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [learningPath, setLearningPath] = useState<PolyglotFlow>();
  const { getFragment } = useLearningPathContext();
  //const { collectionIndex } = useLearningPathDesignContext();

  const [isFrameLoading, setIsFrameLoading] = useState<boolean>(true);
  // const [isChangeCollection, setChangeCollection] = useState<boolean>(false);
  //const [isChangeConcept, setChangeConcept] = useState<boolean>(false);

  /* useEffect(() => {
    console.log('collection index in LearningPathEditor: ' + collectionIndex);
    setChangeCollection(true);
    setConceptSelectedIndex(-1);
    setIsFrameLoading(true);
  }, [collectionIndex]);*/

  /*useEffect(() => {
    setChangeConcept(false);
    if (conceptSelectedIndex !== -1) {
      setChangeConcept(true);
      setIsFrameLoading(true);
    }
  }, [conceptSelectedIndex]);*/

  useEffect(() => {
    (async () => {
      const fragment = await getFragment(conceptSelectedIndex);
      setLearningPath(fragment);
    })();
  }, [conceptSelectedIndex, getFragment]);

  useEffect(() => {
    console.log(learningPath);
  }, [learningPath]);

  useEffect(() => {
    console.log(collectionColor);
  }, []);

  return (
    <>
      {hydrated &&
        //(isChangeCollection || isChangeConcept) &&
        conceptSelectedIndex !== -1 && (
          <Box p="10px">
            {/**/}
            <Box
              p={0}
              m={0}
              w={wPathEditor || '80%'}
              h="full"
              mt={5}
              border={'1px solid #CED4DA'}
            >
              {isFrameLoading && (
                <Center height="500px" bg={'white'}>
                  <VStack>
                    <Spinner
                      thickness="4px"
                      speed="0.65s"
                      emptyColor="gray.200"
                      color="blue.500"
                      size="xl"
                    />
                    <Text fontSize={'xl'} fontWeight={'bold'}>
                      Loading...
                    </Text>
                  </VStack>
                </Center>
              )}
              <iframe
                width="100%"
                height="750px"
                hidden={isFrameLoading}
                src={
                  process.env.POLYGLOT_DASHBOARD + '/flows/' + learningPath?._id
                }
                onLoad={() => {
                  setIsFrameLoading(false);
                  console.log('close spinner');
                }}
              />
            </Box>

            <Box flex="1" p={5} w="90%">
              <Text pb={5} fontSize="20" fontWeight="semibold">
                Relevant OERs
              </Text>

              {isLoading && (
                <div className="loading-spinner">
                  <div className="spinner"></div>
                  <p>Loading...</p>
                </div>
              )}

              {oers && !isLoading && (
                <ResourceCardList
                  oers={oers}
                  isNormalSizeCard={false}
                  itemsPerPage={3}
                  collectionsColor={collectionColor ? collectionColor : ''}
                  isResourcePage={false}
                  oersLength={oers.length}
                  currentPage={currentPage}
                  setCurrentPage={setCurrentPage}
                />
              )}
            </Box>
          </Box>
        )}
    </>
  );
}
