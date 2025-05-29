import {useState} from 'react';
import {toast} from 'sonner';

interface UseFileUploadOptions {
  allowedTypes?: string[];
  maxSize?: number; // in bytes
}

const useFileUpload = (options: UseFileUploadOptions = {}) => {
  const {allowedTypes = ['application/pdf'], maxSize} = options;
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) {
      setSelectedFile(null);
      return;
    }

    if (!allowedTypes.includes(file.type)) {
      setSelectedFile(null);
      const typesList = allowedTypes
        .map((type) => type.split('/')[1].toUpperCase())
        .join(', ');
      toast.error(`Only ${typesList} files are allowed.`);
      return;
    }

    // Size validation
    if (maxSize && file.size > maxSize) {
      setSelectedFile(null);
      toast.error(`File size must be less than ${maxSize / 1024 / 1024}MB.`);
      return;
    }

    setSelectedFile(file);
  };

  const resetFile = () => {
    setSelectedFile(null);
  };

  return {
    selectedFile,
    handleFileChange,
    resetFile,
  };
};

export default useFileUpload;
