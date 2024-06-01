import {
  Box,
  Flex,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react';
import {
  DragDropContext,
  Draggable,
  DraggableProvided,
  DropResult,
  Droppable,
  DroppableProvided,
} from 'react-beautiful-dnd';
import {
  DataTableLearningPathProps,
  TableLearningPathProps,
} from '../../../types/encoreElements';
import { useHasHydrated } from '../../../utils/utils';
import IconDrag from '../../Icons/IconDrag/IconDrag';

export default function CustomLearningPathTable({
  titles,
  data,
  handleData,
  isEditLessonPlanClicked,
}: TableLearningPathProps) {
  const hydrated = useHasHydrated();

  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) return;

    const items = Array.from(data);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    handleData(items);
  };

  return (

    <TableContainer fontSize={'sm'} borderRadius="md" borderStyle="solid">

      <Table borderWidth="1px" borderColor="primary">
        <Thead
          bg="primary"
          color="white"
          borderWidth="2px"
          borderColor="primary"
        >
          <Tr>
            {isEditLessonPlanClicked && (
              <Th p={0}>
                <Box></Box>
              </Th>
            )}
            {hydrated && titles.map((title: string, index: number) => (
              <Th
                key={index}
                borderWidth="2px"
                borderColor="primary"
                color="white"
                textTransform="none"
              >
                {title}
              </Th>
            ))}
          </Tr>
        </Thead>
        {data.length > 0 &&
          <DragDropContext onDragEnd={handleDragEnd} >
            <Droppable droppableId="droppable">
              {(provided: DroppableProvided) => (
                <Tbody
                  bg="white"
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                >
                  {hydrated && data?.map((row: DataTableLearningPathProps, index: number) => (
                    <Draggable
                      key={row.number}
                      draggableId={`draggable-${row.number}`}
                      index={index}
                    >
                      {(provided: DraggableProvided) => (
                        <Tr
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          // {...provided.dragHandleProps}
                          // borderWidth="1px"
                          // borderColor="primary"
                          alignItems="center"
                        >
                          {isEditLessonPlanClicked && (
                            <Td borderWidth="2px" borderColor="primary" p={0}>
                              <Flex
                                {...provided.dragHandleProps}
                                justify="center"
                              >
                                <IconDrag />
                              </Flex>
                            </Td>
                          )}
                          <Td
                            borderWidth="2px"
                            borderColor="primary"
                            justifyContent={'center'}
                          >
                            {`${row.number}.`}
                          </Td>
                          <Td borderWidth="2px" borderColor="primary">
                            {row.type}
                          </Td>
                          <Td borderWidth="2px" borderColor="primary">
                            {row.activity}
                          </Td>
                          <Td borderWidth="2px" borderColor="primary">
                            {row.time}
                          </Td>
                          <Td borderWidth="2px" borderColor="primary">
                            {row.description}
                          </Td>
                          <Td borderWidth="2px" borderColor="primary">
                            {row.content}
                          </Td>
                          <Td borderWidth="2px" borderColor="primary">
                            {row.action}
                          </Td>
                        </Tr>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </Tbody>
              )}
            </Droppable>
          </DragDropContext>}
      </Table>
    </TableContainer>

  );
}
