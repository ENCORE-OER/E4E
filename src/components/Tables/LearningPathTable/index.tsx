import { Button, Flex } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useLearningPathDesignContext } from '../../../Contexts/LearningPathDesignContext/LearningPathDesignContext';
import {
  DataTableLearningPathProps,
  LessonProps,
} from '../../../types/encoreElements';
import { useHasHydrated } from '../../../utils/utils';
import AddContentButton from '../../Buttons/ButtonsDesignPage/ButtonsLessonCard/AddContentButton';
import IconVerticalPoints from '../../Icons/IconVerticalPoints/IconVerticalPoints';
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
  const { isEditLessonPlanClicked, lessonActivities: lessonsActivities } =
    useLearningPathDesignContext();
  const hydrated = useHasHydrated();

  // const data: DataTableLearningPathProps[] =
  //   lessonsActivities?.map(
  //     (lesson: LessonProps, index: number) => ({
  //       number: index + 1,
  //       type: <Button variant="solid">{lesson.lessonType}</Button>,
  //       activity: lesson.activityType,
  //       time: lesson.timeDuration,
  //       description: lesson.activityDescription,
  //       content: <AddContentButton />,
  //       action: (
  //         <Button shadow={'none'} bg="none" w="fit-content">
  //           <IconVerticalPoints />
  //         </Button>
  //       ),
  //     })
  //   ) || [];

  const [tableData, setTableData] =
    useState<DataTableLearningPathProps[]>([]);

  useEffect(() => {
    setTableData(lessonsActivities?.map(
      (lesson: LessonProps, index: number) => ({
        number: index + 1,
        type: <Button variant="solid">{lesson.lessonType}</Button>,
        activity: lesson.activityType,
        time: lesson.timeDuration,
        description: lesson.activityDescription,
        content: <AddContentButton />,
        action: (
          <Button shadow={'none'} bg="none" w="fit-content">
            <IconVerticalPoints />
          </Button>
        ),
      })
    ) || [])
  }, [lessonsActivities])

  return (
    <Flex direction="column">
      {hydrated && <CustomLearningPathTable
        data={tableData}
        handleData={setTableData}
        titles={titleColumns}
        isEditLessonPlanClicked={isEditLessonPlanClicked}
      />}
    </Flex>
  );
}
