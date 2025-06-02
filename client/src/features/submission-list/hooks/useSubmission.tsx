import API_URL from '@/config/api';
import {SubmissionWithRelations} from '@/types';
import {useQuery} from '@tanstack/react-query';
import axios from 'axios';

interface APIResponse {
  submission: SubmissionWithRelations;
}

const fetchSubmission = async (): Promise<SubmissionWithRelations> => {
  const response = await axios.get<APIResponse>(`${API_URL}/submissions`, {
    withCredentials: true,
  });

  console.log('Fetched submission:', response.data.submission);
  return response.data.submission;
};

const useSubmission = () => {
  return useQuery({
    queryKey: ['submission'],
    queryFn: () => fetchSubmission(),
  });
};

export default useSubmission;
