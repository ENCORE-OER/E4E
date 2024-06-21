import InfoTextBox from './InfoTextBox';

type InfoAPISetupTextBoxProps = {
  isSmallerScreen?: boolean;
};

export default function InfoAPISetupTextBox({
  isSmallerScreen,
}: InfoAPISetupTextBoxProps) {
  return (
    <InfoTextBox
      textInfo="It’s necessary to insert the API Key in order to use the generative AI for creating content.  Without it you will still be able to design a learning path by yourself, but some functionalities won’t be available."
      // isSmallerScreen={isSmallerScreen}
      bg="accent.200"
      isSmallerScreen={isSmallerScreen}
      p={3}
    />
  );
}
