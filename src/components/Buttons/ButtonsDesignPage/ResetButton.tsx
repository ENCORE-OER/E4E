import { ButtonProps } from '@chakra-ui/react';
import { CustomToast } from '../../../utils/Toast/CustomToast';
import CustomButton from '../CustomButton';

interface ResetButtonProps extends ButtonProps {
    textButton: string;
    handleResetAll: (value: boolean) => void;
    pathname?: string; // This is needed if you are using this button to navigate to another page
}

export default function ResetButton({
    textButton,
    pathname,
    handleResetAll,
} //...rest
    : ResetButtonProps) {

    const { addToast } = CustomToast();

    const handleResetClick = () => {
        console.log('Reset clicked');
        handleResetAll(true);
        addToast({
            message: 'All values have been reset.',
            type: 'info',
        });

    };

    return (
        <CustomButton
            //{...rest}
            pathname={pathname}
            text={textButton}
            handleCustomClick={handleResetClick}
            colorScheme="gray"
            w="100%"
            border={'1px solid'}
        />
    );
}
