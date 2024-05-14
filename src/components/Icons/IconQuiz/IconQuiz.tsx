import { Icon, IconProps } from '@chakra-ui/react';
import { MdQuiz } from "react-icons/md";

export default function IconQuiz({ ...rest }: IconProps) {
    return (
        <Icon
            {...rest}
            as={MdQuiz}
            fontSize={'x-large'}
        //   fontWeight={'bold'}
        />
    );
}
