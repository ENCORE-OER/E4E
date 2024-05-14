import { Card, CardBody, CardFooter, CardHeader, Flex } from "@chakra-ui/react";
import EditButtonLessonCard from "../../Buttons/ButtonsDesignPage/ButtonsLessonCard/EditButtonLessonCard";
import RegenerateButtonLessonCard from "../../Buttons/ButtonsDesignPage/ButtonsLessonCard/RegenerateButtonLessonCard";
import TagLessonCompulsory from "../../Tags/TagsLesson/TagLessonCompulsory";
import TagLessonDuration from "../../Tags/TagsLesson/TagLessonDuration";
import TagLessonType from "../../Tags/TagsLesson/TagLessonType";

type LessonCardProps = {

}

export default function LessonCard({ }: LessonCardProps) {
    return (
        <Card display='flex' borderRadius={'10px'} border={'1px'}>
            <CardHeader>
                <Flex w='100%' direction='row'>
                    <Flex flex='1' justify='flex-start' direction='row' align='center'>
                        <TagLessonType labelTag='Learning' />
                        <TagLessonDuration time={30} />
                        <TagLessonCompulsory isChecked={true} />
                    </Flex>

                    <Flex flex='1' justify='flex-end' direction='row' align='center' gap={5}>
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

            <CardBody>

            </CardBody>

            <CardFooter>


            </CardFooter>
        </Card >
    );
}