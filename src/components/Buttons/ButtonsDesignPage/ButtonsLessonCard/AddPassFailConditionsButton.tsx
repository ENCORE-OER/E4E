import IconPlus from '../../../Icons/IconPlus/IconPlus';
import UnderlinedButton from '../UnderlinedButton';

type AddPassFailConditionsButtonProps = {
    isSmallerScreen?: boolean | undefined;
    handleOpenModal: () => void;
};

export default function AddPassFailConditionsButton({
    handleOpenModal,
    isSmallerScreen
}: AddPassFailConditionsButtonProps) {

    // const { isOpen, onOpen, onClose } = useDisclosure();
    // const [condition, setCondition] = useState<string>('');
    // const [isPass, setIsPass] = useState<boolean>(true);


    return (
        <UnderlinedButton
            handleClick={handleOpenModal}
            nameButton={isSmallerScreen ? "" : "Add pass and fail conditions"}
            rightIcon={<IconPlus />}
            color="grey"
            fontWeight="normal"
        />
    );
}
