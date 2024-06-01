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
  Tr,
} from '@chakra-ui/react';
import { useEffect } from 'react';
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
  TableLearningPathProps,
  activityTypesObjectsProps,
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

export default function CustomLearningPathTable({
  titles,
  data,
  handleData,
  isEditLessonPlanClicked,
  handleAddContentClick,
  activityTypes,
  optionsTypeOfAssignment,
  removeLessonActivity,
  editRowIndex,
  handleEditLesson,
} // handleSaveLesson
  : TableLearningPathProps) {
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
      idx === index
        ? {
          ...item,
          lessonType: optionsTypeOfAssignment[selectedTypeIndex].name,
        }
        : item
    );
    handleData(updatedData);
  };

  const handleActivityTypeChange = (
    index: number, // index row
    selectedTypeIndex: number
  ) => {
    const filteredActivityTypes = activityTypes.filter(
      (type: activityTypesObjectsProps) =>
        type.lessonType === data[index].lessonType
    );

    const selectedActivityType =
      filteredActivityTypes[selectedTypeIndex]?.activityType;

    const updatedData = data.map((item, idx) =>
      idx === index
        ? {
          ...item,
          activityType: selectedActivityType,
        }
        : item
    );

    console.log(updatedData);
    handleData(updatedData);
  };

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

  useEffect(() => {
    console.log('DATA: ', data);
  }, [data]);

  return (
    <TableContainer fontSize={'sm'} borderRadius="lg" borderStyle="solid">
      <Table borderWidth="1px" borderColor="primary">
        <Thead
          bg="primary"
          color="white"
          borderWidth="2px"
          borderColor="primary"
        >
          <Tr w="fit-content">
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
                  <Flex justify="center">{title}</Flex>
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
                                w="fit-content"
                              >
                                <Flex w="100%" justify="center">
                                  <IconDrag />
                                </Flex>
                              </Td>
                            )}
                            <Td
                              borderWidth="2px"
                              borderColor="primary"
                              w="fit-content"
                            >
                              <Flex w="100%" justify="center" px={0}>
                                {`${indexRow + 1}.`}
                              </Flex>
                            </Td>
                            <Td
                              borderWidth="2px"
                              borderColor="primary"
                              w="fit-content"
                            >
                              <Flex w="100%" justify="center" px={0}>
                                {isEditLessonPlanClicked ||
                                  indexRow === editRowIndex ? (
                                  <LessonDropDownMenu
                                    options={optionsTypeOfAssignment}
                                    title={row.lessonType}
                                    onChange={(selectedTypeIndex) =>
                                      handleLessonTypeChange(
                                        indexRow,
                                        selectedTypeIndex
                                      )
                                    }
                                  />
                                ) : (
                                  <TagLessonType labelTag={row.lessonType} />
                                )}
                              </Flex>
                            </Td>
                            <Td
                              borderWidth="2px"
                              borderColor="primary"
                              w="fit-content"
                            >
                              <Flex w="100%" justify="center" px={0}>
                                {isEditLessonPlanClicked ||
                                  (indexRow === editRowIndex && hydrated) ? (
                                  <ActivityTypeDropDownMenu
                                    title={row.activityType}
                                    lessonType={row.lessonType}
                                    onChange={(selectedTypeIndex) =>
                                      handleActivityTypeChange(
                                        indexRow,
                                        selectedTypeIndex
                                      )
                                    }
                                  />
                                ) : (
                                  row.activityType || (
                                    <LabelEmptyFieldTable label="Type of Activity" />
                                  )
                                )}
                              </Flex>
                            </Td>
                            <Td
                              borderWidth="2px"
                              borderColor="primary"
                              w="fit-content"
                            >
                              <Flex w="100%" justify="center" px={0}>
                                {isEditLessonPlanClicked ||
                                  indexRow === editRowIndex ? (
                                  <CustomNumberInput
                                    valueNumber={row.timeDuration ?? 0}
                                    handleChangeValue={(value: string) =>
                                      handleTimeDurationChange(indexRow, value)
                                    }
                                    steppers={true}
                                    fontSize="small"
                                    minW="75px"
                                    maxW="100px"
                                  />
                                ) : (
                                  row.timeDuration > 0 ?
                                    `${row.timeDuration} min` : (
                                      <LabelEmptyFieldTable label="Minutes" />
                                    )
                                )}
                              </Flex>
                            </Td>
                            <Td
                              borderWidth="2px"
                              borderColor="primary"
                              w="fit-content"
                            >
                              <Flex w="100%" justify="center" px={0}>
                                {isEditLessonPlanClicked ||
                                  indexRow === editRowIndex ? (
                                  <Textarea
                                    value={row.activityDescription || ''}
                                    onChange={(e) =>
                                      handleDescriptionChange(
                                        indexRow,
                                        e.target.value
                                      )
                                    }
                                    placeholder="Short summary of the activity"
                                    fontSize="small"
                                  />
                                ) : (
                                  row.activityDescription || (
                                    <LabelEmptyFieldTable label="Short summary of the activity" />
                                  )
                                )}
                              </Flex>
                            </Td>
                            <Td
                              borderWidth="2px"
                              borderColor="primary"
                              w="fit-content"
                            >
                              <Flex w="100%" justify="center" px={0}>
                                <AddContentButton
                                  onClick={handleAddContentClick}
                                />
                              </Flex>
                            </Td>
                            <Td
                              borderWidth="2px"
                              borderColor="primary"
                              w="fit-content"
                            >
                              <Flex w="100%" justify="center" gap={1} px={0}>
                                <ActionButton
                                  isEditLessonPlanClicked={
                                    isEditLessonPlanClicked
                                  }
                                  handleDeleteLessonActivity={() =>
                                    removeLessonActivity(indexRow)
                                  }
                                  handleEditLessonActivity={() =>
                                    handleEditLesson(indexRow)
                                  }
                                />
                                {/* {editRowIndex === indexRow && (
                                  <Button
                                    fontSize="small"
                                    onClick={handleSaveLesson}
                                  >
                                    Done
                                  </Button>
                                )} */}
                              </Flex>
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
