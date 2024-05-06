import { Icon, IconProps } from "@chakra-ui/react";
import { FaTable } from "react-icons/fa";

export default function IconTable({ ...rest }: IconProps) {
    return (
        <Icon {...rest} as={FaTable} />
    );
}