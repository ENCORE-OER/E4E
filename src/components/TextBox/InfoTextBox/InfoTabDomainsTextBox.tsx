import InfoTextBox from './InfoTextBox';

type InfoTabDomainsTextBoxProps = {
    isSmallerScreen?: boolean;
};

export default function InfoTabDomainsTextBox({
    isSmallerScreen,
}: InfoTabDomainsTextBoxProps) {
    return (
        <InfoTextBox
            // textInfo="The number of OERs displayed in the Venn Diagram might be less than the total number of OERs found in the search, which means that some OERs do not cover any domains."
            textInfo="OERs that do not cover any domains will not be visualized."
            // isSmallerScreen={isSmallerScreen}
            bg="accent.200"
            isSmallerScreen={isSmallerScreen}
            p={2}
        />
    );
}
