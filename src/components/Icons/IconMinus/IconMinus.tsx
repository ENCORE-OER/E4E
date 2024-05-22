import { Icon, IconProps } from '@chakra-ui/react';
import { FaMinus } from "react-icons/fa6";

export default function IconMinus({ ...rest }: IconProps) {
    return (
        <Icon {...rest} as={FaMinus} fontSize={'x-large'} fontWeight={'bold'} />
    );
}
