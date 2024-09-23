import { Icon, IconProps } from '@chakra-ui/react';
import { FaSearch } from "react-icons/fa";

export default function IconSearch({ ...rest }: IconProps) {
    return (
        <Icon
            {...rest}
            as={FaSearch}
            fontSize={'x-large'}
        //   fontWeight={'bold'}
        />
    );
}
