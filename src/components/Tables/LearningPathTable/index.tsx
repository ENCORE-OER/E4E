import { Flex } from '@chakra-ui/react';
import { useState } from 'react';
import { useLearningPathDesignContext } from '../../../Contexts/LearningPathDesignContext/LearningPathDesignContext';
import { useHasHydrated } from '../../../utils/utils';
import AddContentModal from '../../Modals/LearningPathModals/AddContentModal';
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

export default function TableLearningPath() {
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

  // Handle "Add Content Modal"
  const [isAddContentModalOpen, setIsAddContentModalOpen] =
    useState<boolean>(false);

  const handleAddContentClick = () => {
    setIsAddContentModalOpen(true);
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
        />
      )}
      <AddContentModal
        isOpen={isAddContentModalOpen}
        onClose={handleCloseAddContentModal}
      />
    </Flex>
  );
}
