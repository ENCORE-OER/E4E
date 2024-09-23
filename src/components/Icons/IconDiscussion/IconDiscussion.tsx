import { Icon, IconProps } from '@chakra-ui/react';
import { GiDiscussion } from "react-icons/gi";

export default function IconDiscussion({ ...rest }: IconProps) {
    return (
        <Icon
            {...rest}
            as={GiDiscussion}
            fontSize={'x-large'}
        //   fontWeight={'bold'}
        />
    );
}
