import {
  Box,
  Flex,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useDisclosure
} from '@chakra-ui/react';
import { forwardRef, useEffect, useState } from 'react';
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
  OerInCollectionProps,
  TableLearningPathProps,
  activityTypesObjectsProps,
} from '../../../types/encoreElements';
import { useHasHydrated } from '../../../utils/utils';
import ActionButton from '../../Buttons/ButtonsDesignPage/ButtonsLessonCard/ActionButton';
import AddContentButton from '../../Buttons/ButtonsDesignPage/ButtonsLessonCard/AddContentButton';
import UnderlinedButton from '../../Buttons/ButtonsDesignPage/UnderlinedButtons/UnderlinedButton';
import ActivityTypeDropDownMenu from '../../DropDownMenu/ActivityTypeDropDownMenu';
import LessonDropDownMenu from '../../DropDownMenu/LessonDropDownMenu';
import IconDrag from '../../Icons/IconDrag/IconDrag';
import EditDescriptionModal from '../../Modals/LearningPathModals/EditDescriptionModal';
import CustomNumberInput from '../../NumberInput/CustomNumberInput';
import TagContent from '../../Tags/TagsAddContent/TagContent';
import TagLessonType from '../../Tags/TagsLesson/TagLessonType';
import LabelEmptyFieldTable from '../../Texts/LabelEmptyFieldTable';

const CustomLearningPathTable = forwardRef<
  HTMLDivElement,
  TableLearningPathProps
>((props, ref) => {
  const {
    titles,
    data,
    handleData,
    isEditLessonPlanClicked,
    handleAddContentClick,
    activityTypes,
    optionsTypeOfAssignment,
    removeLessonActivity,
    editRowIndex,
    handleEditLesson, // handleSaveLesson
    isPrinting,
  } = props;
  const hydrated = useHasHydrated();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [currentDescription, setCurrentDescription] = useState('');
  const [currentEditIndex, setCurrentEditIndex] = useState<number | null>(null);

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

  // Handle description
  const handleDescriptionChange = (index: number, value: string) => {
    const updatedData = data.map((item: LessonProps, idx: number) =>
      idx === index ? { ...item, activityDescription: value } : item
    );
    handleData(updatedData);
  };

  const openDescriptionModal = (index: number, description: string) => {
    setCurrentEditIndex(index);
    setCurrentDescription(description);
    onOpen();
  };

  const saveDescription = () => {
    if (currentEditIndex !== null) {
      handleDescriptionChange(currentEditIndex, currentDescription);
      onClose();
    }
  };

  useEffect(() => {
    if (editRowIndex !== null) {
      const activityTypeIndex = activityTypes.findIndex(
        (type) => type.activityType === data[editRowIndex].activityType
      );
      handleActivityTypeChange(editRowIndex, activityTypeIndex);
    }
  }, [editRowIndex, activityTypes, data, handleActivityTypeChange]);

  // useEffect(() => {
  //   console.log('DATA: ', data);
  // }, [data]);

  return (
    <Flex ref={ref}>
      <TableContainer fontSize={'sm'} borderRadius="lg" borderStyle="solid">
        <Table borderWidth="1px" borderColor="primary">
          <Thead
            bg="primary"
            color="white"
            borderWidth="2px"
            borderColor="primary"
          >
            <Tr w="fit-content">
              {isEditLessonPlanClicked && <Th px={0}></Th>}
              {hydrated &&
                titles.map((title: string, index: number) => (
                  <Th
                    key={index}
                    borderWidth="2px"
                    borderColor="primary"
                    color="white"
                    textTransform="none"
                    px={0}
                    display={
                      isPrinting && title === 'Action' ? 'none' : 'table-cell'
                    }
                  // className={isPrinting && title === 'Action' ? 'hide-on-print' : ''}
                  // maxW={index === 4 ? "30%" : 'auto'}
                  >
                    <Flex justify="center" p={0}>
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
                              {/* Drag item */}
                              {isEditLessonPlanClicked && (
                                <Td
                                  borderWidth="2px"
                                  borderColor="primary"
                                  px={0}
                                  {...provided.dragHandleProps}
                                  w="fit-content"
                                >
                                  <Flex w="100%" justify="center" px={0}>
                                    <IconDrag />
                                  </Flex>
                                </Td>
                              )}
                              {/* Number */}
                              <Td
                                borderWidth="2px"
                                borderColor="primary"
                                w="fit-content"
                                px={2}
                              >
                                <Flex w="100%" justify="center" px={0}>
                                  {`${indexRow + 1}.`}
                                </Flex>
                              </Td>
                              {/* Lesson Type */}
                              <Td
                                borderWidth="2px"
                                borderColor="primary"
                                w="fit-content"
                                px={
                                  isEditLessonPlanClicked ||
                                    editRowIndex !== null
                                    ? 2
                                    : 5
                                }
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
                                      size="sm"
                                    />
                                  ) : (
                                    <TagLessonType labelTag={row.lessonType} />
                                  )}
                                </Flex>
                              </Td>
                              {/* Activity Type */}
                              <Td
                                borderWidth="2px"
                                borderColor="primary"
                                w="fit-content"
                                px={
                                  isEditLessonPlanClicked ||
                                    editRowIndex !== null
                                    ? 2
                                    : 5
                                }
                              >
                                <Flex w="100%" justify="center" px={0}>
                                  {isEditLessonPlanClicked ||
                                    indexRow === editRowIndex ? (
                                    <ActivityTypeDropDownMenu
                                      activityTypes={activityTypes}
                                      title={row.activityType}
                                      //selectedOption={row.activityType}
                                      lessonType={row.lessonType}
                                      onChange={(selectedTypeIndex) =>
                                        handleActivityTypeChange(
                                          indexRow,
                                          selectedTypeIndex
                                        )
                                      }
                                      size="sm"
                                    />
                                  ) : (
                                    row.activityType || (
                                      <LabelEmptyFieldTable label="Type of Activity" />
                                    )
                                  )}
                                </Flex>
                              </Td>
                              {/* Time */}
                              <Td
                                borderWidth="2px"
                                borderColor="primary"
                                w="fit-content"
                                px={
                                  isEditLessonPlanClicked ||
                                    editRowIndex !== null
                                    ? 2
                                    : 5
                                }
                              >
                                <Flex w="100%" justify="center" px={0}>
                                  {isEditLessonPlanClicked ||
                                    indexRow === editRowIndex ? (
                                    <CustomNumberInput
                                      valueNumber={row.timeDuration ?? 0}
                                      handleChangeValue={(value: string) =>
                                        handleTimeDurationChange(
                                          indexRow,
                                          value
                                        )
                                      }
                                      steppers={true}
                                      fontSize="small"
                                      size="sm"
                                      minW="75px"
                                      maxW="100px"
                                    />
                                  ) : row.timeDuration > 0 ? (
                                    `${row.timeDuration} min`
                                  ) : (
                                    <LabelEmptyFieldTable label="Minutes" />
                                  )}
                                </Flex>
                              </Td>
                              {/* Description */}
                              <Td
                                borderWidth="2px"
                                borderColor="primary"
                                // w="100%"
                                w="fit-content"
                                whiteSpace="pre-wrap"
                                // flex="1"
                                px={
                                  isEditLessonPlanClicked ||
                                    editRowIndex !== null
                                    ? 2
                                    : 5
                                }
                              >
                                <Flex w="100%" justify="flex-start" px={0}>
                                  {isEditLessonPlanClicked ||
                                    indexRow === editRowIndex ? (
                                    <Box
                                      as="button"
                                      onClick={() =>
                                        openDescriptionModal(
                                          indexRow,
                                          row.activityDescription || ''
                                        )
                                      }
                                      w="100%"
                                      textAlign="left"
                                    // display="block"
                                    >
                                      {row.activityDescription || (
                                        <LabelEmptyFieldTable label="Short summary of the activity" />
                                      )}
                                    </Box>
                                  ) : (
                                    row.activityDescription || (
                                      <LabelEmptyFieldTable label="Short summary of the activity" />
                                    )
                                  )}
                                </Flex>
                              </Td>
                              {/* Content */}
                              <Td
                                borderWidth="2px"
                                borderColor="primary"
                                w="fit-content"
                                px={
                                  isEditLessonPlanClicked ||
                                    editRowIndex !== null
                                    ? 2
                                    : 5
                                }
                              >
                                <Flex w="100%" justify="center" px={0}>
                                  {hydrated &&
                                    ((row.content?.oers?.length ?? 0) > 0 &&
                                      !isPrinting) ? (
                                    <Flex direction="column" gap={0.5}>
                                      {row.content?.oers?.map(
                                        (
                                          content: OerInCollectionProps,
                                          index: number
                                        ) => (
                                          // <Text
                                          //   key={index}
                                          //   whiteSpace="pre-wrap"
                                          // >
                                          //   {content.title}
                                          // </Text>
                                          <TagContent key={index} label={content.title} />
                                        )
                                      )}
                                      <UnderlinedButton
                                        fontWeight={0}
                                        color="primary"
                                        nameButton="Add/Edit Content"
                                        size="sm"
                                        fontSize="sm"
                                        handleClick={() =>
                                          handleAddContentClick(indexRow)
                                        } />
                                    </Flex>
                                  ) : (
                                    isPrinting ? (
                                      <Flex direction="column" gap={0.5}>
                                        {row.content?.oers?.map(
                                          (
                                            content: OerInCollectionProps,
                                            index: number
                                          ) => (
                                            <Text
                                              key={index}
                                              whiteSpace="pre-wrap"
                                            >
                                              {content.title}
                                            </Text>
                                          )
                                        )}
                                      </Flex>
                                    ) :
                                      (
                                        <AddContentButton
                                          size="sm"
                                          fontSize="sm"
                                          onClick={() =>
                                            handleAddContentClick(indexRow)
                                          }
                                        />
                                      ))}
                                </Flex>
                              </Td>
                              {/* Action */}
                              <Td
                                borderWidth="2px"
                                borderColor="primary"
                                w="fit-content"
                                px={2}
                                // className={isPrinting ? 'hide-on-print' : ''}
                                display={isPrinting ? 'none' : 'table-cell'}
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
      <EditDescriptionModal
        isOpen={isOpen}
        onClose={onClose}
        currentDescription={currentDescription}
        handleCurrentDescription={setCurrentDescription}
        saveDescription={saveDescription}
      />
    </Flex>
  );
});

CustomLearningPathTable.displayName = 'CustomLearningPathTable';
export default CustomLearningPathTable;
