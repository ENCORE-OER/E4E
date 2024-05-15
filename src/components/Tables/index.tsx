import { Button, Flex } from '@chakra-ui/react';
import AddContentButton from '../Buttons/ButtonsDesignPage/ButtonsLessonCard/AddContentButton';
import IconVerticalPoints from '../Icons/IconVerticalPoints/IconVerticalPoints';
import CustomTable from './CustomTable';

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
    number: 3,
    type: <Button variant="solid">Type</Button>,
    activity: 'Activity A',
    time: '20 min',
    description: 'Description A',
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
    activity: 'Activity A',
    time: '10 min',
    description: 'Description A',
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

  return (
    <Flex direction="column">
      <CustomTable data={data} titles={titleColumns} />
    </Flex>
  );
}
