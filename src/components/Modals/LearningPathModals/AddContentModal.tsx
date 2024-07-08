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
  UploadedFilesProps,
} from '../../../types/encoreElements';
import {
  removeFileFromIndexedDB,
  saveMultipleFilesToIndexedDB,
} from '../../../utils/indexedDB';
import { handleSaveLearningScenarioClick } from '../../../utils/learningScenarioUtils';
import {
  isOerInCollectionProps,
  isUploadedFilesProps,
  useHasHydrated,
} from '../../../utils/utils';
import IconAttach from '../../Icons/IconAttach/IconAttach';
import IconDocument from '../../Icons/IconDocuments/IconDocument';
import IconGenerateAI from '../../Icons/IconGenerateAI/IconGenerateAI';
import IconSave from '../../Icons/IconSave/IconSave';
import AddContentTabs from '../../Tabs/AddContentTabs';
import TagSelectedResource from '../../Tags/TagsAddContent/TagSelectedResource';

export default function AddContentModal({
  isOpen,
  onClose,
  activityIndex,
}: AddContentModalProps) {
  const hydrated = useHasHydrated();
  const {
    lessonActivities,
    // AddContent - Oers
    resourcesSelectedAddContent,
    addSelectedResourcesAddContent,
    resetSelectedResourcesAddContent,
    // AddContent - files
    uploadedFilesAddContent,
    // addUploadedFilesAddContent,
    resetUploadedFilesAddContent,
    handleUpdateActivityContent,
    loadUploadedFiles,
    removeSelectedResourceAddContent,
    removeUploadedFileAddContent,
    resetOersContent,
    resetFilesContent,
    idLearningScenario,
    selectedEducatorExperience,
    selectedContext,
    selectedGroupDimension,
    selectedLearnerExperience,
    bloomLevels,
    bloomLevelIndex,
    selectedSkillConceptTags,
    learningTextContext,
    learningObjectiveObjects,
    selectedOptions, // verbsBloomLevel
    titleLearningPath,
    macroSubject,
    handleIdLearningScenario,
  } = useLearningPathDesignContext();

  const handleCloseModal = () => {
    console.log('CLOSING MODAL...');
    if (addSelectedResourcesAddContent.length > 0) {
      resetSelectedResourcesAddContent();
    }
    if (uploadedFilesAddContent.length > 0) {
      resetUploadedFilesAddContent();
    }
    onClose();
  };

  const handleSave = async () => {
    await handleSaveLearningScenarioClick(
      idLearningScenario,
      selectedEducatorExperience,
      selectedContext,
      selectedGroupDimension,
      selectedLearnerExperience,
      bloomLevels,
      bloomLevelIndex,
      selectedOptions,
      selectedSkillConceptTags,
      learningTextContext,
      learningObjectiveObjects,
      titleLearningPath,
      macroSubject,
      lessonActivities,
      handleIdLearningScenario
    );
  };

  const handleSaveClick = async () => {
    try {
      if (resourcesSelectedAddContent?.length > 0) {
        await handleUpdateActivityContent(
          activityIndex !== undefined ? activityIndex : -1,
          resourcesSelectedAddContent
        );
      } else if (
        resourcesSelectedAddContent?.length === 0 &&
        lessonActivities[activityIndex].content.oers.length > 0
      ) {
        resetOersContent(activityIndex);
      }
      if (uploadedFilesAddContent.length > 0) {
        console.log('UPDATE FILES...');
        // await handleUpdateActivityContent(
        //   activityIndex !== undefined ? activityIndex : -1,
        //   uploadedFilesAddContent.map((file: UploadedFilesProps) => file.fileUploaded)  // Passing only File[] I'm saving on the DB
        // );(
        const filesToSave = uploadedFilesAddContent.filter(
          (uploadedFile: UploadedFilesProps) =>
            !lessonActivities[activityIndex].content.uploadedFiles.some(
              (fileLessonActivity: UploadedFilesProps) =>
                fileLessonActivity.fileName === uploadedFile.fileName
            )
        );
        console.log('FILES TO SAVE', filesToSave);
        if (filesToSave.length > 0) {
          await saveMultipleFilesToIndexedDB(
            filesToSave.map((file: UploadedFilesProps) => file.fileUploaded),
            activityIndex
          );
          await loadUploadedFiles(activityIndex, true);
        }
      } else if (
        uploadedFilesAddContent.length === 0 &&
        lessonActivities[activityIndex].content.uploadedFiles.length > 0
      ) {
        resetFilesContent(activityIndex);
      }
      await handleSave();
      handleCloseModal();
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteTagClick = async (
    item: OerInCollectionProps | UploadedFilesProps
  ) => {
    if (isOerInCollectionProps(item)) {
      removeSelectedResourceAddContent(item);
    } else if (isUploadedFilesProps(item)) {
      removeUploadedFileAddContent(item);
      await removeFileFromIndexedDB(
        `${activityIndex}_${item.fileUploaded.name}`
      );
    }
  };

  // useEffect(() => {
  //   console.log(resourcesSelectedAddContent);
  // }, [resourcesSelectedAddContent]);

  // Opening the modal I have to take the get the already selected resources
  useEffect(() => {
    const fetch = async () => {
      if (isOpen) {
        addSelectedResourcesAddContent(
          lessonActivities[activityIndex ?? -1]?.content?.oers ?? []
        );
        await loadUploadedFiles(activityIndex, false);
      }
    };
    fetch();
  }, [isOpen]);

  return (
    <Modal isOpen={isOpen} onClose={handleCloseModal} size={'100%'}>
      <ModalOverlay />
      <ModalContent w="90%" h="90%" bg="background">
        <ModalHeader>
          <Flex direction="row" align="center" w="95%" gap={3}>
            <Heading>Add Content</Heading>
            {hydrated &&
              (resourcesSelectedAddContent.length > 0 ||
                uploadedFilesAddContent.length > 0) && (
                <Flex
                  direction="row"
                  align="center"
                  justifyContent="flex-start"
                  gap={1}
                  wrap="wrap"
                >
                  {hydrated &&
                    resourcesSelectedAddContent.length > 0 &&
                    resourcesSelectedAddContent?.map(
                      (resource: OerInCollectionProps, index: number) => (
                        <TagSelectedResource
                          key={`oer-${index}`}
                          label={resource.title}
                          IconTag={
                            resource.generated_by_ai
                              ? IconGenerateAI
                              : IconAttach
                          }
                          handleDeleteClick={() =>
                            handleDeleteTagClick(resource)
                          }
                        />
                      )
                    )}
                  {hydrated &&
                    uploadedFilesAddContent.length > 0 &&
                    uploadedFilesAddContent?.map(
                      (resource: UploadedFilesProps, index: number) => (
                        <TagSelectedResource
                          key={`file-${index}`}
                          label={resource.fileUploaded.name}
                          IconTag={IconDocument}
                          handleDeleteClick={() =>
                            handleDeleteTagClick(resource)
                          }
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
                      resourcesSelectedAddContent.length === 0 &&
                      uploadedFilesAddContent.length === 0 &&
                      activityIndex !== undefined &&
                      // lessonActivities[indexLesson]?.content?.oers &&
                      lessonActivities[activityIndex]?.content?.oers?.length ===
                        0 &&
                      lessonActivities[activityIndex]?.content?.uploadedFiles
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
            {hydrated && <AddContentTabs activityIndex={activityIndex} />}
          </Flex>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
