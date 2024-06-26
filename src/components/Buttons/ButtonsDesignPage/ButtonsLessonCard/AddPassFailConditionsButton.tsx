import IconPlus from '../../../Icons/IconPlus/IconPlus';
import UnderlinedButton from '../UnderlinedButtons/UnderlinedButton';

type AddPassFailConditionsButtonProps = {
  editIndex?: boolean;
  isSmallerScreen?: boolean | undefined;
  handleOpenModal: () => void;
};

export default function AddPassFailConditionsButton({
  handleOpenModal,
  isSmallerScreen,
  editIndex
}: AddPassFailConditionsButtonProps) {
  // const { isOpen, onOpen, onClose } = useDisclosure();
  // const [condition, setCondition] = useState<string>('');
  // const [isPass, setIsPass] = useState<boolean>(true);

  return (
    <UnderlinedButton
      handleClick={handleOpenModal}
      nameButton={(isSmallerScreen || editIndex) ? '' : 'Add pass and fail conditions'}
      rightIcon={<IconPlus />}
      color="grey"
      fontWeight="normal"
      isDisabled={true}
    />
  );
}
