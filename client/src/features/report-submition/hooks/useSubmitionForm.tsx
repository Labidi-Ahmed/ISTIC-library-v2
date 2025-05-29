import {useState} from 'react';
import useFileUpload from './useFileUpload';
import useProfessorSearch from './useProfessorSearch';
import useSubmissionMutation from './useSubmissionMutation';

const useSubmissionForm = () => {
  const [message, setMessage] = useState('');

  const fileUpload = useFileUpload({
    allowedTypes: ['application/pdf'],
    maxSize: 10 * 1024 * 1024, // 10MB
  });

  const professorSearch = useProfessorSearch();

  const submissionMutation = useSubmissionMutation();

  const handleSubmit = () => {
    if (!fileUpload.selectedFile || !professorSearch.selectedProfessor) {
      return;
    }

    submissionMutation.mutate({
      file: fileUpload.selectedFile,
      message,
      professorId: professorSearch.selectedProfessor.id,
    });
  };

  const isSubmitDisabled =
    !fileUpload.selectedFile ||
    !professorSearch.selectedProfessor ||
    submissionMutation.isPending;

  return {
    // Form state
    message,
    setMessage,

    // Composed functionality
    fileUpload,
    professorSearch,

    // Submission
    handleSubmit,
    isSubmitting: submissionMutation.isPending,
    isSubmitDisabled,
  };
};

export default useSubmissionForm;
