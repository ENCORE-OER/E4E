import { Icon, IconProps } from '@chakra-ui/react';
import { FaLightbulb } from "react-icons/fa";

export default function IconLightbulb({ ...rest }: IconProps) {
    return (
        <Icon
            {...rest}
            as={FaLightbulb}
            fontSize={'x-large'}
        //   fontWeight={'bold'}
        />
    );
}
