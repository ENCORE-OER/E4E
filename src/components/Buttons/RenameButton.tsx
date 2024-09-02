import { Button, ButtonProps, Tooltip } from "@chakra-ui/react";
import IconEdit from "../Icons/IconEdit/IconEdit";

type RenameButtonProps = {

} & ButtonProps;

export default function RenameButton({ ...props }: RenameButtonProps) {
    return (
        <Tooltip
            aria-label="Tooltip for rename button"
            label="Rename"
            hasArrow
            placement="top"
            bg="gray.100"
            color="primary"
            fontSize={'sm'}
            p={2}
        >
            <Button
                size="small"
                w="fit-content"
                p={1}
                {...props}
            >
                <IconEdit />
            </Button>
        </Tooltip>
    );
}