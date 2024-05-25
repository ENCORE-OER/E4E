import { Flex, FlexProps, Textarea, Tooltip } from '@chakra-ui/react';
import { ChangeEvent, Dispatch, SetStateAction } from 'react';

type NumberInputTextBoxProps = {
    numberInput: number;
    setNumberInput: Dispatch<SetStateAction<number>>;
    minNumber: number;
    maxNumber: number;
    isNumberZero: boolean;
    setIsNumberZero: Dispatch<SetStateAction<boolean>>;
    label_tooltip?: string;
} & FlexProps;

export default function NumberInputTextBox({
    numberInput,
    minNumber,
    maxNumber,
    isNumberZero,
    label_tooltip,
    setNumberInput,
    // setIsNumberZero,
    ...rest
}: NumberInputTextBoxProps) {
    const handleNumberChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        const newValue = e.target.value.trim(); // Rimuovi eventuali spazi vuoti
        const newNumber = parseInt(newValue); // Converti il valore in un numero intero

        // Verifica se il valore inserito è un numero valido
        if (!isNaN(newNumber)) {
            // Se è un numero valido, limita il valore tra minNumber e maxNumber
            const clampedNumber = Math.min(Math.max(newNumber, minNumber), maxNumber);
            setNumberInput(clampedNumber); // Imposta il nuovo valore
        } else {
            // Se il valore inserito non è un numero valido, visualizza 0
            setNumberInput(0);
        }
    };

    return (
        <Flex align="center" {...rest}>
            <Tooltip
                label={label_tooltip}
                bg={'accent.900'}
                color="black"
                placement={'top'}
                borderRadius={'md'}
                visibility={label_tooltip ? 'visible' : 'hidden'}
            >
                <Textarea
                    display="flex"
                    textAlign={'center'}
                    justifyContent={'center'}
                    variant="solid"
                    resize="none"
                    //size="sm"
                    w="60px"
                    //h='50px'
                    border={isNumberZero ? '2.5px solid #bf5521ff' : '1px solid'}
                    borderRadius="lg"
                    rows={1}
                    flexWrap="nowrap"
                    overflowWrap={'break-word'}
                    typeof="number"
                    errorBorderColor={
                        numberInput === 0 ? '2.5px solid #bf5521ff' : 'none'
                    }
                    value={numberInput}
                    onChange={handleNumberChange}
                />
            </Tooltip>
        </Flex>
    );
}
