import { Icon, IconProps } from '@chakra-ui/react';
import { PiProjectorScreenBold } from "react-icons/pi";

export default function IconProject({ ...rest }: IconProps) {
    return (
        <Icon
            {...rest}
            as={PiProjectorScreenBold}
            fontSize={'x-large'}
        // fontWeight={'bold'}
        />
    );
}
