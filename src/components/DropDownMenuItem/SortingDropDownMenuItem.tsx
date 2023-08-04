import { HStack, Icon, Text } from "@chakra-ui/react";
import { SortingDropDownMenuItemProps } from "../../types/encoreElements/SortingDropDownMenu";

export default function SortingDropDownMenuItem({ icon, name }: SortingDropDownMenuItemProps) {
    return (
        <HStack>
            {icon && <Icon as={icon} />}
            <Text>{name}</Text>
        </HStack>
    );
}