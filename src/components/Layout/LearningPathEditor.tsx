import { Box, Flex, Text } from '@chakra-ui/react';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { OerProps } from '../../types/encoreElements';
import { useHasHydrated } from '../../utils/utils';
import ResourceCardList from '../Card/OerCard/ResourceCardsList';

type LearningPathEditorProps = {
  conceptSelectedIndex: number;
  setConceptSelectedIndex: Dispatch<SetStateAction<number>>;
  oers: OerProps[];
  collectionIndex: number;
};

export default function LearningPathEditor({
  conceptSelectedIndex,
  oers,
  collectionIndex,
  setConceptSelectedIndex,
}: LearningPathEditorProps) {
  const [isChangeCollection, setChangeCollection] = useState<boolean>(false);
  const [isChangeConcept, setChangeConcept] = useState<boolean>(false);
  const hydrated = useHasHydrated();

  useEffect(() => {
    console.log('collection index in LearningPathEditor: ' + collectionIndex);
    setChangeCollection(true);
    setConceptSelectedIndex(-1);
  }, [collectionIndex]);

  useEffect(() => {
    setChangeConcept(false);
    if (conceptSelectedIndex !== -1) {
      setChangeConcept(true);
    }
  }, [conceptSelectedIndex]);

  return (
    <>
      {hydrated &&
        (isChangeCollection || isChangeConcept) &&
        conceptSelectedIndex !== -1 && (
          <Flex p="10px">
            {/*<Box bg="white" w="70%" h="400px" mt={5} p={3}></Box>*/}

            <iframe
              width="70%"
              height="500px"
              src="https://node-editor-mxfmii88f-polyglot-edu.vercel.app/flows/07401216-f6d5-46cb-a051-2d9f51031d87"
            ></iframe>

            <Box flex="1" p={5}>
              <Text pb={5} fontSize="20" fontWeight="semibold">
                Relevant OERs
              </Text>
              <ResourceCardList
                oers={oers}
                isNormalSizeCard={false}
                itemsPerPage={5}
              />
            </Box>
          </Flex>
        )}
    </>
  );
}
