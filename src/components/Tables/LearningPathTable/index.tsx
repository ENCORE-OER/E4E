import { Button, Flex } from '@chakra-ui/react';
import { useState } from 'react';
import { useLearningPathDesignContext } from '../../../Contexts/LearningPathDesignContext';
import { DataTableLearningPathProps } from '../../../types/encoreElements';
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

const data = [
  {
    number: 1,
    type: <Button variant="solid">Type</Button>,
    activity: 'Activity A',
    time: '30 min',
    description: 'Description A',
    content: <AddContentButton />,
    action: (
      <Button shadow={'none'} bg="none" w="fit-content">
        <IconVerticalPoints />
      </Button>
    ),
  },
  {
    number: 2,
    type: <Button variant="solid">Type</Button>,
    activity: 'Activity B',
    time: '30 min',
    description: 'Description B',
    content: <AddContentButton />,
    action: (
      <Button shadow={'none'} bg="none" w="fit-content">
        <IconVerticalPoints />
      </Button>
    ),
  },
  {
    number: 3,
    type: <Button variant="solid">Type</Button>,
    activity: 'Activity C',
    time: '20 min',
    description: 'Description C',
    content: <AddContentButton />,
    action: (
      <Button shadow={'none'} bg="none" w="fit-content">
        <IconVerticalPoints />
      </Button>
    ),
  },
  {
    number: 4,
    type: <Button variant="solid">Type</Button>,
    activity: 'Activity D',
    time: '10 min',
    description: 'Description D',
    content: <AddContentButton />,
    action: (
      <Button shadow={'none'} bg="none" w="fit-content">
        <IconVerticalPoints />
      </Button>
    ),
  },
  // Add more data as needed
];

export default function TableLearningPath() {
  const [tableData, setTableData] =
    useState<DataTableLearningPathProps[]>(data);

  const { isEditLessonPlanClicked } = useLearningPathDesignContext();

  return (
    <Flex direction="column">
      <CustomLearningPathTable
        data={tableData}
        handleData={setTableData}
        titles={titleColumns}
        isEditLessonPlanClicked={isEditLessonPlanClicked}
      />
    </Flex>
  );
}
