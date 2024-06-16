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
  Tooltip,
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
import TagSelectedResource from '../../Tags/TagsAddContent/TagSelectedResource';

export default function AddContentModal({
  isOpen,
  onClose,
  indexLesson,
}: AddContentModalProps) {
  const hydrated = useHasHydrated();
  const {
    resourcesSelectedAddContent: resourcesSelected,
    addSelectedResourcesAddContent: addSelectedResources,
    lessonActivities,
    resetSelectedResourcesAddContent: resetSelectedResources,
    handleUpdateLessonContent,
  } = useLearningPathDesignContext();

  const handleSaveClick = () => {
    try {
      handleUpdateLessonContent(
        indexLesson !== undefined ? indexLesson : -1,
        resourcesSelected
      );
      onClose();
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    console.log(resourcesSelected);
  }, [resourcesSelected]);

  useEffect(() => {
    if (isOpen) {
      console.log('PRENDO');
      addSelectedResources(
        lessonActivities[indexLesson ?? -1]?.content?.oers ?? []
      );
    }
  }, [isOpen]);

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
                    <TagSelectedResource
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
              <Tooltip
                hasArrow
                placement="top"
                label={
                  'Save and add the attached resources to the lesson activity.'
                }
                aria-label={
                  'Save and add the attached resources to the lesson activity.'
                }
                //ml="1px"
                bg="white"
                color="primary"
                p={2}
                fontSize={'sm'}
                borderRadius={5}
                cursor="pointer"
              >
                {hydrated && (
                  <Button
                    isDisabled={
                      resourcesSelected.length === 0 &&
                      lessonActivities[indexLesson ?? -1]?.content?.oers
                        ?.length === 0
                    } // It is disabled if no resources are selected and if there aren't resources in the specific lesson activity: This means that no changes are done.
                    w="fit-content"
                    rightIcon={<IconSave />}
                    onClick={() => handleSaveClick()}
                    bg="gray.300"
                    borderRadius="lg"
                  >
                    Save and Close
                  </Button>
                )}
              </Tooltip>
            </Flex>
          </Flex>
        </ModalHeader>
        <ModalCloseButton />

        <ModalBody overflowY={'auto'}>
          <Flex w="100%" justify={'center'}>
            {hydrated && <AddContentTabs />}
          </Flex>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
