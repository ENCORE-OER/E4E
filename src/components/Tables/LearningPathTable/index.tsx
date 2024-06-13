import { Flex } from '@chakra-ui/react';
import { forwardRef, useState } from 'react';
import { useLearningPathDesignContext } from '../../../Contexts/LearningPathDesignContext/LearningPathDesignContext';
import { useHasHydrated } from '../../../utils/utils';
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
      isEditLessonPlanClicked,
      lessonActivities,
      setLessonActivities,
      activityTypes,
      removeLessonActivity,
      optionsTypeOfAssignment,
      editLessonIndex: editRowIndex,
      handleEditLesson,
    } = useLearningPathDesignContext();
    const hydrated = useHasHydrated();
    const [indexLesson, setIndexLesson] = useState<number>(-1);

    // Handle "Add Content Modal"
    const [isAddContentModalOpen, setIsAddContentModalOpen] =
      useState<boolean>(false);

    const handleAddContentClick = (index: number) => {
      setIsAddContentModalOpen(true);
      setIndexLesson(index);
    };

    const handleCloseAddContentModal = () => {
      setIsAddContentModalOpen(false);
    };

    return (
      <Flex direction="column" overflow={'auto'}>
        {hydrated && (
          <CustomLearningPathTable
            data={lessonActivities}
            handleData={setLessonActivities}
            titles={titleColumns}
            isEditLessonPlanClicked={isEditLessonPlanClicked}
            handleAddContentClick={handleAddContentClick}
            activityTypes={activityTypes}
            optionsTypeOfAssignment={optionsTypeOfAssignment}
            removeLessonActivity={removeLessonActivity}
            editRowIndex={editRowIndex}
            handleEditLesson={handleEditLesson}
            ref={ref}
            isPrinting={isPrinting}
          />
        )}
        <AddContentModal
          isOpen={isAddContentModalOpen}
          onClose={handleCloseAddContentModal}
          indexLesson={indexLesson}
        />
      </Flex>
    );
  }
);

TableLearningPath.displayName = 'TableLearningPath';
export default TableLearningPath;
