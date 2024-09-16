import { Icon, IconProps } from '@chakra-ui/react';
import { GiBrain } from "react-icons/gi";

export default function IconBrain({ ...rest }: IconProps) {
    return (
        <Icon
            {...rest}
            as={GiBrain}
            fontSize={'x-large'}
        //   fontWeight={'bold'}
        />
    );
}
