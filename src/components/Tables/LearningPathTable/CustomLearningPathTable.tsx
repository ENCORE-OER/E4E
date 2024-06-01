import {
  Box,
  Flex,
  Table,
  TableContainer,
  Tbody,
  Td,
  Textarea,
  Th,
  Thead,
  Tr
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
  LessonProps,
  OptionsTypeOfAssignmentProps,
  TableLearningPathProps
} from '../../../types/encoreElements';
import { useHasHydrated } from '../../../utils/utils';
import ActionButton from '../../Buttons/ButtonsDesignPage/ButtonsLessonCard/ActionButton';
import AddContentButton from '../../Buttons/ButtonsDesignPage/ButtonsLessonCard/AddContentButton';
import ActivityTypeDropDownMenu from '../../DropDownMenu/ActivityTypeDropDownMenu';
import LessonDropDownMenu from '../../DropDownMenu/LessonDropDownMenu';
import IconDrag from '../../Icons/IconDrag/IconDrag';
import CustomNumberInput from '../../NumberInput/CustomNumberInput';
import TagLessonType from '../../Tags/TagsLesson/TagLessonType';
import LabelEmptyFieldTable from '../../Texts/LabelEmptyFieldTable';

const OptionsTypeOfAssignment: OptionsTypeOfAssignmentProps[] = [
  {
    name: "Learning",
    colorBackground: "blue.200"
  },
  {
    name: "Assessment",
    colorBackground: "blue.100"
  },
  {
    name: "Other",
    colorBackground: 'gray.200'
  }
];

export default function CustomLearningPathTable({
  titles,
  data,
  handleData,
  isEditLessonPlanClicked,
  handleAddContentClick
}: TableLearningPathProps) {
  const hydrated = useHasHydrated();

  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) return;

    const items = Array.from(data);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    handleData(items);
  };

  const handleLessonTypeChange = (index: number, selectedTypeIndex: number) => {
    const updatedData = data.map((item: LessonProps, idx: number) =>
      idx === index ? { ...item, lessonType: OptionsTypeOfAssignment[selectedTypeIndex].name } : item
    );
    handleData(updatedData);
  }

  const handleActivityTypeChange = (index: number, selectedTypeIndex: number) => {
    const updatedData = data.map((item, idx) =>
      idx === index ? { ...item, activityType: OptionsTypeOfAssignment[selectedTypeIndex].name } : item
    );
    handleData(updatedData);
  }

  const handleTimeDurationChange = (index: number, value: string) => {
    const updatedData = data.map((item: LessonProps, idx: number) =>
      idx === index ? { ...item, timeDuration: parseInt(value, 10) || 0 } : item
    );
    handleData(updatedData);
  };

  const handleDescriptionChange = (index: number, value: string) => {
    const updatedData = data.map((item: LessonProps, idx: number) =>
      idx === index ? { ...item, activityDescription: value } : item
    );
    handleData(updatedData);
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
              <Th px={0}>
                <Box></Box>
              </Th>
            )}
            {hydrated &&
              titles.map((title: string, index: number) => (
                <Th
                  key={index}
                  borderWidth="2px"
                  borderColor="primary"
                  color="white"
                  textTransform="none"
                  px={0}
                >
                  <Flex justify="center">
                    {title}
                  </Flex>
                </Th>
              ))}
          </Tr>
        </Thead>
        {data.length > 0 && (
          <DragDropContext onDragEnd={handleDragEnd}>
            <Droppable droppableId="droppable">
              {(provided: DroppableProvided) => (
                <Tbody
                  bg="white"
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                >
                  {hydrated &&
                    data.map((row: LessonProps, indexRow: number) => (
                      <Draggable
                        key={indexRow}
                        draggableId={`draggable-${indexRow}`}
                        index={indexRow}
                      >
                        {(provided: DraggableProvided) => (
                          <Tr
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                          >
                            {isEditLessonPlanClicked && (
                              <Td
                                borderWidth="2px"
                                borderColor="primary"
                                p={0}
                                {...provided.dragHandleProps}
                              >
                                <Flex
                                  w="100%"
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
                              {`${indexRow + 1}.`}
                            </Td>
                            <Td borderWidth="2px" borderColor="primary" >
                              {isEditLessonPlanClicked ?
                                <LessonDropDownMenu
                                  options={OptionsTypeOfAssignment}
                                  title={row.lessonType}
                                  onChange={(selectedTypeIndex) => handleLessonTypeChange(indexRow, selectedTypeIndex)}
                                />
                                : <TagLessonType labelTag={row.lessonType} />
                              }
                            </Td>
                            <Td borderWidth="2px" borderColor="primary">
                              {isEditLessonPlanClicked ?
                                <ActivityTypeDropDownMenu
                                  title={row.activityType}
                                  onChange={(selectedTypeIndex) => handleActivityTypeChange(indexRow, selectedTypeIndex)}
                                />
                                :
                                (row.activityType ||
                                  (<LabelEmptyFieldTable label='Type of Activity' />))
                              }
                            </Td>
                            <Td borderWidth="2px" borderColor="primary" justifyContent={'center'}>
                              {isEditLessonPlanClicked ?
                                <CustomNumberInput
                                  valueNumber={row.timeDuration ?? 0}
                                  handleChangeValue={(value: string) => handleTimeDurationChange(indexRow, value)}
                                  steppers={true}
                                  fontSize="small"
                                  minW="75px"
                                  maxW="100px"
                                />
                                : (`${row.timeDuration ?? 0} min` ||
                                  (<LabelEmptyFieldTable label='Minutes' />))
                              }
                            </Td>
                            <Td borderWidth="2px" borderColor="primary">
                              {isEditLessonPlanClicked ?
                                <Textarea
                                  value={row.activityDescription || ''}
                                  onChange={(e) => handleDescriptionChange(indexRow, e.target.value)}
                                  placeholder='Short summary of the activity'
                                  fontSize="small"
                                />
                                : (row.activityDescription ||
                                  (<LabelEmptyFieldTable label='Short summary of the activity' />))
                              }
                            </Td>
                            <Td borderWidth="2px" borderColor="primary">
                              <AddContentButton onClick={handleAddContentClick} />
                            </Td>
                            <Td borderWidth="2px" borderColor="primary">
                              <ActionButton />
                            </Td>
                          </Tr>
                        )}
                      </Draggable>
                    ))}
                  {provided.placeholder}
                </Tbody>
              )}
            </Droppable>
          </DragDropContext>
        )}
      </Table>
    </TableContainer>
  );
}
