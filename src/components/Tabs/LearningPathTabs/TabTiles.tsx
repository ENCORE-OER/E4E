import LessonCardsList from '../../Card/LessonCard/LessonCardsList';

type TabTilesProps = {
  isSmallerScreen?: boolean;
}

export default function TabTiles({ isSmallerScreen }: TabTilesProps) {

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
