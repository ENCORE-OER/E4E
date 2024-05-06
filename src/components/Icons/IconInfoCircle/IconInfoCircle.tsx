import { Icon, IconProps } from "@chakra-ui/react";
import { FaInfoCircle } from 'react-icons/fa';

export default function IconInfoCircle({ ...rest }: IconProps) {
    return (
        <Icon {...rest} as={FaInfoCircle} color="#9C9C9C" />
    );
}