import { Icon, IconProps } from '@chakra-ui/react';
import { MdAccessTimeFilled } from "react-icons/md";

export default function IconTime({ ...rest }: IconProps) {
    return (
        <Icon
            {...rest}
            as={MdAccessTimeFilled}
            fontSize={'x-large'}
        //   fontWeight={'bold'}
        />
    );
}
