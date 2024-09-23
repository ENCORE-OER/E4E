import { Box, Flex, Td, Text, Tr } from '@chakra-ui/react';
import { useEffect } from 'react';
import { DraggableProvided } from 'react-beautiful-dnd';
import {
  activityTypesObjectsProps,
  LessonProps,
  OerInCollectionProps,
  OptionsTypeOfAssignmentProps,
  UploadedFilesProps,
} from '../../../types/encoreElements';
import { useHasHydrated } from '../../../utils/utils';
import ActionButton from '../../Buttons/ButtonsDesignPage/ButtonsLessonCard/ActionButton/ActionButton';
import AddContentButton from '../../Buttons/ButtonsDesignPage/ButtonsLessonCard/AddContentButton';
import UnderlinedButton from '../../Buttons/ButtonsDesignPage/UnderlinedButtons/UnderlinedButton';
import ActivityTypeDropDownMenu from '../../DropDownMenu/ActivityTypeDropDownMenu';
import LessonDropDownMenu from '../../DropDownMenu/LessonDropDownMenu';
import IconDrag from '../../Icons/IconDrag/IconDrag';
import CustomNumberInput from '../../NumberInput/CustomNumberInput';
import TagContent from '../../Tags/TagsAddContent/TagContent';
import TagLessonType from '../../Tags/TagsLesson/TagLessonType';
import LabelEmptyFieldTable from '../../Texts/LabelEmptyFieldTable';

interface TableLearningPathRowProps {
  indexRow: number;
  row: LessonProps;
  activityTypes: activityTypesObjectsProps[];
  optionsTypeOfAssignment: OptionsTypeOfAssignmentProps[];
  isEditLessonPlanClicked: boolean;
  editRowIndex: number | null;
  handleEditLesson: (index: number) => void;
  // handleSaveLesson: () => void;
  handleAddContentClick: (index: number) => void;
  removeLessonActivity: (index: number) => Promise<void>;
  isPrinting: boolean;
  loadUploadedFiles: (
    activityIndex: number,
    isLessonView: boolean
  ) => Promise<void>;
  providedDraggable: DraggableProvided;
  handleLessonTypeChange: (index: number, selectedTypeIndex: number) => void;
  handleActivityTypeChange: (index: number, selectedTypeIndex: number) => void;
  handleTimeDurationChange: (index: number, value: string) => void;
  openDescriptionModal: (index: number, description: string) => void;
  activityRef: (el: HTMLDivElement | HTMLTableRowElement | null) => void;
}

export default function LearningPathTableRow({
  indexRow,
  row,
  isEditLessonPlanClicked,
  handleAddContentClick,
  activityTypes,
  optionsTypeOfAssignment,
  removeLessonActivity,
  editRowIndex,
  handleEditLesson, // handleSaveLesson
  isPrinting,
  loadUploadedFiles,
  providedDraggable,
  handleLessonTypeChange,
  handleActivityTypeChange,
  handleTimeDurationChange,
  openDescriptionModal,
  activityRef,
}: TableLearningPathRowProps) {
  const hydrated = useHasHydrated();

  useEffect(() => {
    const load = async () => {
      try {
        await loadUploadedFiles(indexRow, true);
      } catch (error) {
        console.error(error);
      }
    };

    load();
  }, []);

  return (
    <Tr
      ref={(el) => {
        providedDraggable.innerRef(el);
        activityRef(el);
      }}
      {...providedDraggable.draggableProps}
    >
      {/* Drag item */}
      {isEditLessonPlanClicked && (
        <Td
          borderWidth="2px"
          borderColor="primary"
          px={0}
          {...providedDraggable.dragHandleProps}
          w="fit-content"
        >
          <Flex w="100%" justify="center" px={0}>
            <IconDrag />
          </Flex>
        </Td>
      )}
      {/* Number */}
      <Td borderWidth="2px" borderColor="primary" w="fit-content" px={2}>
        <Flex w="100%" justify="center" px={0} cursor="default">
          {`${indexRow + 1}.`}
        </Flex>
      </Td>
      {/* Lesson Type */}
      <Td
        borderWidth="2px"
        borderColor="primary"
        w="fit-content"
        px={isEditLessonPlanClicked || editRowIndex !== null ? 2 : 5}
      >
        <Flex w="100%" justify="center" px={0}>
          {isEditLessonPlanClicked || indexRow === editRowIndex ? (
            <LessonDropDownMenu
              options={optionsTypeOfAssignment}
              title={row.lessonType}
              onChange={(selectedTypeIndex) =>
                handleLessonTypeChange(indexRow, selectedTypeIndex)
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
        px={isEditLessonPlanClicked || editRowIndex !== null ? 2 : 5}
      >
        <Flex w="100%" justify="center" px={0}>
          {isEditLessonPlanClicked || indexRow === editRowIndex ? (
            <ActivityTypeDropDownMenu
              activityTypes={activityTypes}
              title={row.activityType}
              //selectedOption={row.activityType}
              lessonType={row.lessonType}
              onChange={(selectedTypeIndex) =>
                handleActivityTypeChange(indexRow, selectedTypeIndex)
              }
              size="sm"
              isDisabled={row.lessonType ? false : true}
            />
          ) : (
            (row.activityType && (
              <Text cursor="default">{row.activityType}</Text>
            )) || <LabelEmptyFieldTable label="Type of Activity" />
          )}
        </Flex>
      </Td>
      {/* Time */}
      <Td
        borderWidth="2px"
        borderColor="primary"
        w="fit-content"
        px={isEditLessonPlanClicked || editRowIndex !== null ? 2 : 5}
      >
        <Flex w="100%" justify="center" px={0}>
          {isEditLessonPlanClicked || indexRow === editRowIndex ? (
            <CustomNumberInput
              valueNumber={row.timeDuration ?? 0}
              handleChangeValue={(value: string) =>
                handleTimeDurationChange(indexRow, value)
              }
              steppers={true}
              fontSize="small"
              size="sm"
              minW="75px"
              maxW="100px"
            />
          ) : row.timeDuration !== undefined && row.timeDuration > 0 ? (
            <Text cursor="default">{`${row.timeDuration} min`}</Text>
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
        px={isEditLessonPlanClicked || editRowIndex !== null ? 2 : 5}
      >
        <Flex w="100%" justify="flex-start" px={0}>
          {isEditLessonPlanClicked || indexRow === editRowIndex ? (
            <Box
              as="button"
              onClick={() =>
                openDescriptionModal(indexRow, row.activityDescription || '')
              }
              w="100%"
              textAlign="left"
              // display="block"
              cursor="pointer"
            >
              {row.activityDescription || (
                <LabelEmptyFieldTable
                  label="Short summary of the activity"
                  cursor="pointer"
                />
              )}
            </Box>
          ) : (
            (row.activityDescription && (
              <Text cursor="default">{row.activityDescription}</Text>
            )) || <LabelEmptyFieldTable label="Short summary of the activity" />
          )}
        </Flex>
      </Td>
      {/* Content */}
      <Td
        borderWidth="2px"
        borderColor="primary"
        w="fit-content"
        px={isEditLessonPlanClicked || editRowIndex !== null ? 2 : 5}
      >
        <Flex w="100%" justify="center" px={0}>
          {hydrated &&
          ((row.content?.oers?.length ?? 0) > 0 ||
            (row.content?.uploadedFiles?.length ?? 0) > 0) &&
          !isPrinting ? (
            <Flex direction="column" gap={0.5}>
              {hydrated &&
                row.content?.oers?.map(
                  (content: OerInCollectionProps, index: number) => (
                    // <Text
                    //   key={index}
                    //   whiteSpace="pre-wrap"
                    // >
                    //   {content.title}
                    // </Text>
                    <TagContent
                      key={index}
                      label={content.title}
                      bg={'#FFCC49'}
                    />
                  )
                )}
              {hydrated &&
                row.content?.uploadedFiles?.map(
                  (content: UploadedFilesProps, index: number) => (
                    // <Text
                    //     key={`file-${index}`}
                    //     whiteSpace="pre-wrap"
                    //     // as="link"
                    //     cursor="pointer"
                    //     onClick={(e) => {
                    //         e.preventDefault();
                    //         console.log('NAME', content);
                    //         window?.open(
                    //             content.urlFile,
                    //             '_blank'
                    //         );
                    //     }}
                    // >
                    //     {`${content?.fileName ?? ''};\n`}
                    // </Text>
                    <TagContent
                      key={index}
                      label={content?.fileName ?? ''}
                      bg={'yellow.100'}
                      handleClick={() => {
                        // console.log('NAME', content);
                        window?.open(content.urlFile, '_blank');
                      }}
                    />
                  )
                )}
              <UnderlinedButton
                fontWeight={0}
                color="primary"
                nameButton="Add/Edit Content"
                size="sm"
                fontSize="sm"
                handleClick={() => handleAddContentClick(indexRow)}
                pt={1}
              />
            </Flex>
          ) : isPrinting ? (
            <Flex direction="column" gap={0.5}>
              {row.content?.oers?.map(
                (content: OerInCollectionProps, index: number) => (
                  <Text key={`oer-${index}`} whiteSpace="pre-wrap">
                    {`${content.title};\n`}
                  </Text>
                )
              )}
              {row.content?.uploadedFiles?.map(
                (content: UploadedFilesProps, index: number) => (
                  <Text
                    key={`file-${index}`}
                    whiteSpace="pre-wrap"
                    // as="link"
                    // onClick={(e) => {
                    //     e.preventDefault();
                    //     window?.open(
                    //         content.urlFile,
                    //         '_blank'
                    //     );
                    // }}
                  >
                    {`${content.fileName};\n`}
                  </Text>
                )
              )}
            </Flex>
          ) : (
            <AddContentButton
              size="sm"
              fontSize="sm"
              onClick={() => handleAddContentClick(indexRow)}
            />
          )}
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
            isEditLessonPlanClicked={isEditLessonPlanClicked}
            handleDeleteLessonActivity={async () =>
              await removeLessonActivity(indexRow)
            }
            handleEditLessonActivity={() => handleEditLesson(indexRow)}
          />
        </Flex>
      </Td>
    </Tr>
  );
}
