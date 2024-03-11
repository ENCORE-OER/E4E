import { Button, Input, InputGroup, InputRightElement } from "@chakra-ui/react";
import { useState } from "react";

type InputAPIKeyProps = {
    apiKey: string | undefined;
    handleApiKey: (apiKey: string) => void;
}

export default function InputAPIKey({
    apiKey,
    handleApiKey
}: InputAPIKeyProps) {

    const [show, setShow] = useState<boolean>(true)
    const handleClick = () => setShow(!show)

    return (
        <InputGroup size='sm' w='40%'>
            <Input
                variant='flushed'
                type={show ? 'text' : 'password'}
                placeholder='Enter your OpenAI API Key'
                focusBorderColor="yellow.500"
                value={apiKey}
                onChange={(e) => handleApiKey(e.target.value)}
            />
            <InputRightElement width='4.5rem'>
                <Button h='1.75rem' size='sm' onClick={handleClick}>
                    {show ? 'Hide' : 'Show'}
                </Button>
            </InputRightElement>
        </InputGroup>
    )
}