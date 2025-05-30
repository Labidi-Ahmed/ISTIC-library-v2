import {useMutation} from '@tanstack/react-query';
import {toast} from 'sonner';
import axios from 'axios';
import API_URL from '@/config/api';

interface SubmissionData {
  file: File;
  message: string;
  professorId: string;
}

const postSubmission = async (data: SubmissionData) => {
  const formData = new FormData();
  formData.append('file', data.file);
  formData.append('message', data.message);
  formData.append('professorId', data.professorId);
  console.log('Submitting data:', data);
  const response = await axios.post(`${API_URL}/submissions`, formData, {
    headers: {'Content-Type': 'multipart/form-data'},
    withCredentials: true,
  });

  return response.data;
};

const useSubmissionMutation = () => {
  return useMutation({
    mutationFn: postSubmission,
    onSuccess: () => {
      toast.success('Submission sent successfully!');
    },
    onError: (error) => {
      console.error('Submission error:', error);
      toast.error('Error sending submission. Please try again.');
    },
  });
};

export default useSubmissionMutation;
