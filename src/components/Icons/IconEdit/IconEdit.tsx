import { Icon, IconProps } from '@chakra-ui/react';
import { MdEdit } from "react-icons/md";

// interface IconEditProps extends IconProps {

// }

export default function IconEdit({ ...rest }: IconProps) {

    return (
        <Icon
            {...rest}
            as={MdEdit}
            fontSize='x-large'
        />
    );
}
