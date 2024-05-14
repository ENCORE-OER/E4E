import { Button, ButtonProps } from "@chakra-ui/react";

export default function AddContentButton({ ...rest }: ButtonProps) {

    const handleAddContentClick = () => {
        console.log('Add Content')
    }

    return (
        <Button {...rest} variant="solid" px={7} bg='gray.300' onClick={handleAddContentClick} borderRadius={10}>Add Content</Button>
    );
}