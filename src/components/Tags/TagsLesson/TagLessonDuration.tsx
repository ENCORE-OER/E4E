import { Icon, Tag, TagLabel } from "@chakra-ui/react";
import IconTime from "../../Icons/IconTime/IconTime";

type TagLessonTypeProps = {
    time: number;
}

export default function TagLessonDuration({
    time
}: TagLessonTypeProps) {
    return (
        <Tag bg={'none'} border='none' w='fit-content' gap={1}>
            {/* <Text variant="label_tag_genAI">{labelTag}</Text> */}
            <Icon as={IconTime} color={'grey'} />
            <TagLabel display="flex" w='fit-content'>{`${time} min`}</TagLabel>
        </Tag>
    );
}