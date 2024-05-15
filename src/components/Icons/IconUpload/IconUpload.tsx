import { Icon, IconProps } from '@chakra-ui/react';
import { MdFileUpload } from "react-icons/md";

export default function IconUpload({ ...rest }: IconProps) {
    return (
        <Icon
            {...rest}
            as={MdFileUpload}
            fontSize={'x-large'}
            fontWeight={'bold'}
        />
    );
}
