import { Icon, IconProps } from '@chakra-ui/react';
import { FaFilePdf } from "react-icons/fa6";

export default function IconPDF({ ...rest }: IconProps) {
    return (
        <Icon
            {...rest}
            as={FaFilePdf}
            fontSize={'x-large'}
        // fontWeight={'bold'}
        />
    );
}
