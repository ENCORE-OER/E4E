import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Flex,
  Icon,
  Text,
} from '@chakra-ui/react';
import { useState } from 'react';
import {
  LessonCardProps,
  PassFailConditionsProps,
} from '../../../types/encoreElements';
import { useHasHydrated } from '../../../utils/utils';
import AddContentButton from '../../Buttons/ButtonsDesignPage/ButtonsLessonCard/AddContentButton';
import AddPassFailConditionsButton from '../../Buttons/ButtonsDesignPage/ButtonsLessonCard/AddPassFailConditionsButton';
import EditButtonLessonCard from '../../Buttons/ButtonsDesignPage/ButtonsLessonCard/EditButtonLessonCard';
import RegenerateButtonLessonCard from '../../Buttons/ButtonsDesignPage/ButtonsLessonCard/RegenerateButtonLessonCard';
import UnderlinedButton from '../../Buttons/ButtonsDesignPage/UnderlinedButtons/UnderlinedButton';
import ShowHideButton from '../../Buttons/ShowHideButton';
import IconBookOpen from '../../Icons/IconBookOpen/IconBookOpen';
import AddContentModal from '../../Modals/LearningPathModals/AddContentModal';
import TagLessonCompulsory from '../../Tags/TagsLesson/TagLessonCompulsory';
import TagLessonDuration from '../../Tags/TagsLesson/TagLessonDuration';
import TagLessonType from '../../Tags/TagsLesson/TagLessonType';

export default function LessonCard({
  lesson,
  indexCard,
  isSmallerScreen,
  handleOpenModal,
}: LessonCardProps) {
  const hydrated = useHasHydrated();

  // Show Generate Learning Objectives area
  const [showBox, setShowBox] = useState<boolean>(false); // used to show the Activity

  // Handle "Add Content Modal"
  const [isAddContentModalOpen, setIsAddContentModalOpen] = useState<boolean>(false);

  const handleAddContentClick = () => {
    setIsAddContentModalOpen(true);
  };

  const handleCloseAddContentModal = () => {
    setIsAddContentModalOpen(false);
  };

  // const [passFailConditions, setPassFailConditions] = useState<PassFailConditionsProps[]>([]);

  return (
    <>
      <Card display="flex" borderRadius={'10px'} border={'1px'} w="100%">
        <CardHeader pb={0}>
          <Flex w="100%" direction="row">
            <Flex flex="1" justify="flex-start" direction="row" align="center">
              <TagLessonType labelTag={lesson.lessonType} />
              <TagLessonDuration time={30} />
              <TagLessonCompulsory isChecked={true} />
            </Flex>

            <Flex
              flex="1"
              justify="flex-end"
              direction="row"
              align="center"
              gap={5}
            >
              <EditButtonLessonCard
                handleEditClick={() => console.log('edit')}
                isEditClicked={false}
              />
              <RegenerateButtonLessonCard
                handleRegenerateClick={() => console.log('regenerate')}
              />
            </Flex>
          </Flex>
        </CardHeader>

        <CardBody justifyContent="flex-start" display="flex" w="100%" py={0}>
          <Flex w="100%" direction="column">
            <Flex p={3}>
              <ShowHideButton
                showBox={showBox}
                setShowBox={setShowBox}
                showButtonName={`${indexCard}. ${lesson.lessonTitle}`}
                isUpDown={false}
                fontWeight="bold"
                color="primary"
                border="none"
                fontSize="x-large"
              />
            </Flex>
            <Text
              noOfLines={showBox ? undefined : 1}
              variant="description_card"
            >
              {lesson.activityDescription}
            </Text>
            <Flex direction="column" gap={0.5} pt={1}>
              {showBox &&
                hydrated &&
                lesson.passFailConditions?.length > 0 &&
                lesson.passFailConditions?.map(
                  (
                    condition: PassFailConditionsProps,
                    indexCondition: number
                  ) => (
                    <Flex
                      direction="row"
                      gap={3}
                      align="center"
                      key={indexCondition}
                    >
                      <Flex
                        direction="row"
                        gap={1}
                        py={1}
                        px={3}
                        bg={condition.isPass ? 'green.100' : 'red.100'}
                        borderRadius={10}
                        w="50%"
                      >
                        <Text fontWeight={'bold'}>
                          {condition.isPass ? 'If pass: ' : 'If fail: '}
                        </Text>
                        <Text>{condition.condition}</Text>
                      </Flex>
                      <UnderlinedButton
                        handleClick={() => {
                          handleOpenModal !== undefined &&
                            indexCard !== undefined &&
                            handleOpenModal(indexCard, indexCondition);
                        }}
                        nameButton="Change"
                        fontWeight="normal"
                      />
                    </Flex>
                  )
                )}
            </Flex>
          </Flex>
        </CardBody>

        <CardFooter>
          <Flex direction={'row'} w="100%" align="center">
            <Flex direction="row" gap={1} flex="1" justify="flex-start">
              <Text fontWeight="bold">Activity type: </Text>
              <Text>{lesson.activityType}</Text>
              <Icon as={IconBookOpen} />
            </Flex>

            <Flex direction="row" gap={3} flex="1" justify="flex-end">
              <AddPassFailConditionsButton
                handleOpenModal={() => {
                  handleOpenModal !== undefined &&
                    indexCard !== undefined &&
                    handleOpenModal(indexCard, null);
                }}
                isSmallerScreen={isSmallerScreen}
              />
              <AddContentButton onClick={handleAddContentClick} />
            </Flex>
          </Flex>
        </CardFooter>
      </Card>
      <AddContentModal
        isOpen={isAddContentModalOpen}
        onClose={handleCloseAddContentModal}
      />
    </>
  );
}
