import {useMutation} from '@tanstack/react-query';
import {toast} from 'sonner';
import axios, {AxiosError} from 'axios';
import API_URL from '@/config/api';
import {useNavigate} from 'react-router-dom';

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
  const navigate = useNavigate();
  return useMutation({
    mutationFn: postSubmission,
    onSuccess: (data) => {
      toast.success('Submission sent successfully!');
      console.log('Submission response:', data);
      navigate(`/app/submissions/${data.submission.id}`);
    },
    onError: (error: AxiosError<{message: string}>) => {
      console.error('Submission error:', error);
      if (error.response?.status === 400) {
        toast.error(error.response.data.message || 'Bad request');
      } else {
        toast.error('Error sending submission. Please try again.');
      }
    },
  });
};

export default useSubmissionMutation;
