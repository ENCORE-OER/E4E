import { Flex, MenuItem, MenuList, Text } from "@chakra-ui/react";
import IconDelete from "../../Icons/IconDelete/IconDelete";
import IconDuplicate from "../../Icons/IconDuplicate/IconDuplicate";

type ActionButtonsListCollectionProps = {
    handleClose: () => void;
    handleDuplicateButtonClick: () => Promise<void>;
    handleDeleteButtonClick: () => Promise<void>;
}

export default function ActionButtonsListCollection({
    handleClose,
    handleDuplicateButtonClick,
    handleDeleteButtonClick
}: ActionButtonsListCollectionProps
) {
    return (
        <MenuList w="fit-content" fontSize="md">
            <MenuItem
                onClick={async () => {
                    handleClose();
                    await handleDuplicateButtonClick();
                }}
            // isDisabled={}
            >
                <Flex direction="row" gap={2}>
                    <IconDuplicate />
                    <Text fontWeight="bold">Duplicate</Text>
                </Flex>
            </MenuItem>
            <MenuItem onClick={async () => {
                handleClose();
                await handleDeleteButtonClick();
            }}>
                <Flex direction="row" gap={2}>
                    <IconDelete />
                    <Text fontWeight="bold">Delete</Text>
                </Flex>
            </MenuItem>
        </MenuList>
    );
}