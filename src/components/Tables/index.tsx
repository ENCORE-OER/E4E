import { Button, Flex } from '@chakra-ui/react';
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
    content: <Button variant="solid">Add Content</Button>,
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
    content: <Button variant="solid">Add Content</Button>,
    action: <IconVerticalPoints />,
  },
  {
    number: 3,
    type: <Button variant="solid">Type</Button>,
    activity: 'Activity A',
    time: '20 min',
    description: 'Description A',
    content: <Button variant="solid">Add Content</Button>,
    action: <IconVerticalPoints />,
  },
  {
    number: 4,
    type: <Button variant="solid">Type</Button>,
    activity: 'Activity A',
    time: '10 min',
    description: 'Description A',
    content: <Button variant="solid">Add Content</Button>,
    action: <IconVerticalPoints />,
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
