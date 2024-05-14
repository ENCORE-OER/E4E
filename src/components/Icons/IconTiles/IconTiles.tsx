import { Icon, IconProps } from '@chakra-ui/react';
import { HiOutlineRectangleStack } from "react-icons/hi2";

export default function IconTiles({ ...rest }: IconProps) {
    return <Icon {...rest} as={HiOutlineRectangleStack} fontSize={'x-large'} fontWeight={'bold'} />;
}
