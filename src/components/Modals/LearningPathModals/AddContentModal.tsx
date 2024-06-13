import {
  Button,
  Flex,
  Heading,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
} from '@chakra-ui/react';
import { useEffect } from 'react';
import { useLearningPathDesignContext } from '../../../Contexts/LearningPathDesignContext/LearningPathDesignContext';
import {
  AddContentModalProps,
  OerInCollectionProps,
} from '../../../types/encoreElements';
import { useHasHydrated } from '../../../utils/utils';
import IconAttach from '../../Icons/IconAttach/IconAttach';
import IconSave from '../../Icons/IconSave/IconSave';
import AddContentTabs from '../../Tabs/AddContentTabs';
import TagSelectedResourceTooltip from '../../Tags/TagsAddContent/TagSelectedResourceTooltip';

export default function AddContentModal({
  isOpen,
  onClose,
  indexLesson
}: AddContentModalProps) {
  const hydrated = useHasHydrated();
  const { resourcesSelected, resetSelectedResources, handleUpdateLessonContent } =
    useLearningPathDesignContext();

  useEffect(() => {
    console.log(resourcesSelected);
  }, [resourcesSelected]);

  // useEffect(() => {
  //   resetSelectedResources();
  // }, [])

  return (
    <Modal
      isOpen={isOpen}
      onClose={() => {
        onClose();
        resetSelectedResources();
      }}
      size={'100%'}
    >
      <ModalOverlay />
      <ModalContent w="90%" h="90%" bg="background">
        <ModalHeader>
          <Flex direction="row" align="center" w="95%" gap={3}>
            <Heading>Add Content</Heading>
            {hydrated && resourcesSelected.length > 0 && (
              <Flex
                direction="row"
                align="center"
                justifyContent="flex-start"
                gap={1}
                wrap="wrap"
              >
                {resourcesSelected?.map(
                  (resource: OerInCollectionProps, index: number) => (
                    <TagSelectedResourceTooltip
                      label={resource.title}
                      IconTag={IconAttach}
                      key={index}
                      oer={resource}
                    />
                  )
                )}
              </Flex>
            )}
            <Flex flex="1" justify="flex-end">
              <Button
                isDisabled={resourcesSelected.length === 0}
                w="fit-content"
                rightIcon={<IconSave />}
                onClick={() => handleUpdateLessonContent(indexLesson !== undefined ? indexLesson : -1, resourcesSelected)}
              >
                Save and Close
              </Button>
            </Flex>
          </Flex>
        </ModalHeader>
        <ModalCloseButton />

        <ModalBody overflowY={'auto'}>
          <Flex w="100%" justify={'center'}>
            <AddContentTabs />
          </Flex>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
