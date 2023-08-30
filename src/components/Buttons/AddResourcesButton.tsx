import CustomButton from './CustomButton';

type AddResourcesButtonProps = {
  text: string;
  pathname?: string;
  variant?: string;
};

export default function AddResourcesButton({
  text,
  pathname,
  variant,
}: AddResourcesButtonProps) {
  return <CustomButton text={text} pathname={pathname} variant={variant} />;
}
