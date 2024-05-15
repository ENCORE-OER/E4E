import { useState } from 'react';
import IconUpload from '../../../Icons/IconUpload/IconUpload';
import StandardButton from '../StandardButton';

interface UploadButtonProps {
    handleUploadFile: (file: File) => Promise<void>;
    disabled?: boolean;
}

export default function UploadButton({
    handleUploadFile,
    disabled
}: UploadButtonProps) {
    const [selectedFile, setSelectedFile] = useState<File | null>(null);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        if (files && files.length > 0) {
            setSelectedFile(files[0]);
        }
    };

    const handleUpload = () => {
        if (selectedFile) {
            handleUploadFile(selectedFile);
        }
        document.getElementById('fileInput')?.click()
    };

    return (
        <>
            <input type="file" onChange={handleChange} style={{ display: 'none' }} />
            <StandardButton
                buttonText={'Upload From Your Computer'}
                handleClick={handleUpload}
                w="fit-content"
                leftIcon={<IconUpload />}
                disabled={disabled}
            />
        </>
    );
}