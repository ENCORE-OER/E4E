import { Button, ButtonProps, Text } from "@chakra-ui/react";

interface UnderlinedButtonProps extends ButtonProps {
    handleClick: () => void;
    nameButton: string;
    isSmallerScreen?: boolean;
}

export default function UnderlinedButton({
    isSmallerScreen,
    nameButton,
    handleClick,
    ...rest
}: UnderlinedButtonProps) {
    return (
        <Button
            {...rest}
            variant="link"
            // bg={'secondary'}
            color="primary"
            //px="30px"
            display="flex"
            border={'none'}
            // borderRadius={'xl'}
            onClick={handleClick}
            px={isSmallerScreen ? 0 : undefined}
            //rightIcon={isEditClicked ? <CheckIcon /> : <IconEdit />}
            w="fit-content"
        >
            <Text textDecoration="underline">
                {nameButton}
            </Text>
        </Button>
    );
}