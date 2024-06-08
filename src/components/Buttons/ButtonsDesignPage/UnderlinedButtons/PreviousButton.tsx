import { Flex, Tooltip } from '@chakra-ui/react';
import IconBack from '../../../Icons/IconBack/IconBack';
import UnderlinedButton from './UnderlinedButton';

type PreviousButtonProps = {
    isEditClicked?: boolean;
    handlePreviousClick: () => void;
    isSmallerScreen: boolean | undefined;
    label_tooltip?: string;
};

export default function PreviousButton({
    // isEditClicked,
    handlePreviousClick,
    isSmallerScreen,
    label_tooltip,
}: PreviousButtonProps) {
    return (
        <Tooltip
            hasArrow
            placement="top"
            label={label_tooltip}
            aria-label={label_tooltip}
            //ml="1px"
            bg="white"
            color="primary"
            p={2}
            fontSize={'sm'}
            borderRadius={5}
        >
            <Flex w="fit-content">
                <UnderlinedButton
                    handleClick={handlePreviousClick}
                    isSmallerScreen={isSmallerScreen}
                    nameButton="Previous"
                    leftIcon={<IconBack />}
                    color="primary"
                />
            </Flex>
        </Tooltip>
    );
}
