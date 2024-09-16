import { Icon, IconProps } from '@chakra-ui/react';
import { CiViewList } from "react-icons/ci";

export default function IconList({ ...rest }: IconProps) {
    return (
        <Icon
            {...rest}
            as={CiViewList}
            fontSize={'x-large'}
        //   fontWeight={'bold'}
        />
    );
}
