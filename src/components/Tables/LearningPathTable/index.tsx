import { Flex } from '@chakra-ui/react';
import { forwardRef, useEffect, useRef, useState } from 'react';
import { useLearningPathDesignContext } from '../../../Contexts/LearningPathDesignContext/LearningPathDesignContext';
import { BloomLevelString } from '../../../types/encoreElements';
import { mapStringToString, useHasHydrated } from '../../../utils/utils';
import AddContentModal from '../../Modals/LearningPathModals/AddContentModal';
import { TabTableProps } from '../../Tabs/LearningPathTabs/TabTable';
import CustomLearningPathTable from './CustomLearningPathTable';

const titleColumns = [
  'Nb',
  'Type',
  'Activity',
  'Time',
  'Description',
  'Content',
  'Action',
];

const TableLearningPath = forwardRef<HTMLDivElement, TabTableProps>(
  (props, ref) => {
    const { isPrinting } = props;
    const {
      bloomLevelIndex,
      bloomLevels,
      isEditLessonPlanClicked,
      lessonActivities,
      setLessonActivities,
      activityTypes,
      removeLessonActivity,
      optionsTypeOfAssignment,
      editActivityLessonIndex,
      handleEditActivityLesson,
      loadUploadedFiles,
      scrollToIndex,
      setScrollToIndex,
    } = useLearningPathDesignContext();
    const hydrated = useHasHydrated();
    const [activityIndex, setActivityIndex] = useState<number>(-1);
    const activityRefs = useRef<
      (null | HTMLDivElement | HTMLTableRowElement)[]
    >([]);

    // Handle "Add Content Modal"
    const [isAddContentModalOpen, setIsAddContentModalOpen] =
      useState<boolean>(false);

    const handleAddContentClick = (index: number) => {
      setIsAddContentModalOpen(true);
      setActivityIndex(index);
    };

    const handleCloseAddContentModal = async () => {
      setIsAddContentModalOpen(false);
      // await loadUploadedFiles(activityIndex, true);
    };

    useEffect(() => {
      if (
        scrollToIndex !== null &&
        activityRefs !== null &&
        activityRefs?.current[scrollToIndex]
      ) {
        activityRefs?.current[scrollToIndex]?.scrollIntoView({
          behavior: 'auto',
        });
        setScrollToIndex(null);
      }
    }, [scrollToIndex]);

    return (
      <Flex direction="column" overflow={'auto'}>
        {hydrated && (
          <CustomLearningPathTable
            data={lessonActivities}
            handleData={setLessonActivities}
            titles={titleColumns}
            isEditLessonPlanClicked={isEditLessonPlanClicked}
            handleAddContentClick={handleAddContentClick}
            activityTypes={
              activityTypes[
                mapStringToString(
                  bloomLevels[bloomLevelIndex].name ||
                    bloomLevels[bloomLevelIndex].title ||
                    '',
                  BloomLevelString
                )
              ]
            }
            optionsTypeOfAssignment={optionsTypeOfAssignment}
            removeLessonActivity={removeLessonActivity}
            editRowIndex={editActivityLessonIndex}
            handleEditLesson={handleEditActivityLesson}
            ref={ref}
            isPrinting={isPrinting}
            loadUploadedFiles={loadUploadedFiles}
            activityRefs={activityRefs}
          />
        )}
        <AddContentModal
          isOpen={isAddContentModalOpen}
          onClose={handleCloseAddContentModal}
          activityIndex={activityIndex}
        />
      </Flex>
    );
  }
);

TableLearningPath.displayName = 'TableLearningPath';
export default TableLearningPath;
