import { useEffect } from 'react';
import { useLearningPathDesignContext } from '../../../Contexts/LearningPathDesignContext/LearningPathDesignContext';
import LessonCardsList from '../../Card/LessonCard/LessonCardsList';

type TabTilesProps = {
  isSmallerScreen?: boolean;
};

export default function TabTiles({ isSmallerScreen }: TabTilesProps) {

  const { handleEditLessonPlanClick, isEditLessonPlanClicked } = useLearningPathDesignContext();

  useEffect(() => {
    if (isEditLessonPlanClicked) {
      handleEditLessonPlanClick(false);
    }
  }, [])
  return (
    // <LessonCard
    //   lessonTitle="Activity Title"
    //   lessonType="Learning"
    //   activityType="Activity Type"
    //   indexCard={1}
    //   activityDescription={description}
    //   isSmallerScreen={isSmallerScreen}
    // />

    <LessonCardsList isSmallerScreen={isSmallerScreen} />
  );
}
