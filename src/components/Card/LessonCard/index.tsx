import { Card, CardBody, CardFooter, CardHeader, Flex, Text } from '@chakra-ui/react';
import { useState } from 'react';
import EditButtonLessonCard from '../../Buttons/ButtonsDesignPage/ButtonsLessonCard/EditButtonLessonCard';
import RegenerateButtonLessonCard from '../../Buttons/ButtonsDesignPage/ButtonsLessonCard/RegenerateButtonLessonCard';
import ShowHideButton from '../../Buttons/ShowHideButton';
import TagLessonCompulsory from '../../Tags/TagsLesson/TagLessonCompulsory';
import TagLessonDuration from '../../Tags/TagsLesson/TagLessonDuration';
import TagLessonType from '../../Tags/TagsLesson/TagLessonType';

type LessonCardProps = {
    lessonType: string;
    activityName: string;
    indexCard: number;  // Specifies the order of the lessons
    descriptionActivity: string;
};

export default function LessonCard({
    activityName,
    lessonType,
    indexCard,
    descriptionActivity
}: LessonCardProps) {

    // Show Generate Learning Objectives area
    const [showBox, setShowBox] = useState(false); // used to show the Activity


    return (
        <Card display="flex" borderRadius={'10px'} border={'1px'}>
            <CardHeader>
                <Flex w="100%" direction="row">
                    <Flex flex="1" justify="flex-start" direction="row" align="center">
                        <TagLessonType labelTag={lessonType} />
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

            <CardBody justifyContent='flex-start' display='flex' w='100%'>
                <Flex w='100%' direction='column'>
                    <Flex p={3}>
                        <ShowHideButton
                            showBox={showBox}
                            setShowBox={setShowBox}
                            showButtonName={`${indexCard}. ${activityName}`}
                            isUpDown={false}
                            fontWeight="bold"
                            color="primary"
                            border="none"
                            fontSize="x-large"
                        />
                    </Flex>
                    <Text noOfLines={showBox ? undefined : 1} variant="description_card">
                        {descriptionActivity}
                    </Text>
                </Flex>
            </CardBody>

            <CardFooter></CardFooter>
        </Card>
    );
}
