import { Icon, IconProps } from '@chakra-ui/react';
import { IoDuplicate } from "react-icons/io5";

// interface IconDeleteProps extends IconProps {

// }

export default function IconDuplicate({ ...rest }: IconProps) {
    return <Icon {...rest} as={IoDuplicate} fontSize="x-large" />;
}
