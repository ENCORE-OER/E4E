import { Box, Center, Flex, Spinner, Text, VStack } from '@chakra-ui/react';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { useLearningPathContext } from '../../Contexts/learningPathContext';
import { OerProps } from '../../types/encoreElements';
import { PolyglotFlow } from '../../types/polyglot/PolyglotFlow';
import { useHasHydrated } from '../../utils/utils';
import ResourceCardList from '../Card/OerCard/ResourceCardsList';

type LearningPathEditorProps = {
  conceptSelectedIndex: number;
  setConceptSelectedIndex: Dispatch<SetStateAction<number>>;
  oers: OerProps[];
  collectionIndex: number;
  collectionColor?: string;
};

export default function LearningPathEditor({
  conceptSelectedIndex,
  oers,
  collectionIndex,
  collectionColor,
  setConceptSelectedIndex,
}: LearningPathEditorProps) {
  const [learningPath, setLearningPath] = useState<PolyglotFlow>();
  const { getFragment } = useLearningPathContext();

  const [isFrameLoading, setIsFrameLoading] = useState<boolean>(true);
  const [isChangeCollection, setChangeCollection] = useState<boolean>(false);
  const [isChangeConcept, setChangeConcept] = useState<boolean>(false);
  const hydrated = useHasHydrated();

  useEffect(() => {
    console.log('collection index in LearningPathEditor: ' + collectionIndex);
    setChangeCollection(true);
    setConceptSelectedIndex(-1);
    setIsFrameLoading(true);
  }, [collectionIndex]);

  useEffect(() => {
    setChangeConcept(false);
    if (conceptSelectedIndex !== -1) {
      setChangeConcept(true);
      setIsFrameLoading(true);
    }
  }, [conceptSelectedIndex]);

  useEffect(() => {
    (async () => {
      const fragment = await getFragment(conceptSelectedIndex);
      setLearningPath(fragment);
    })();
  }, [conceptSelectedIndex, getFragment]);

  return (
    <>
      {hydrated &&
        (isChangeCollection || isChangeConcept) &&
        conceptSelectedIndex !== -1 && (
          <Flex p="10px">
            {/**/}
            <Box p={0} m={0} w="70%" h="400px" mt={5}>
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
                height="500px"
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

            <Box flex="1" p={5}>
              <Text pb={5} fontSize="20" fontWeight="semibold">
                Relevant OERs
              </Text>
              <ResourceCardList
                oers={oers}
                isNormalSizeCard={false}
                itemsPerPage={3}
                collectionColor={collectionColor}
                isResourcePage={false}
              />
            </Box>
          </Flex>
        )}
    </>
  );
}
