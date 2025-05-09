import {useMutation} from '@tanstack/react-query';
import {toast} from 'sonner';
import axios from 'axios';
import API_URL from '@/api/config';
import {FormValues} from '@/components/report-publish/report-form';
import {useNavigate} from 'react-router-dom';

const submitReport = async (data: FormValues) => {
  const formData = new FormData();

  if (data.pdfFile) {
    formData.append('pdfFile', data.pdfFile);
  }

  if (data.class) formData.append('class', data.class);
  if (data.field) formData.append('field', data.field);
  if (data.description) formData.append('description', data.description);

  const res = await axios.post(`${API_URL}/reports`, formData, {
    withCredentials: true,
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  return res.data;
};

export function useSubmitReport() {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: submitReport,
    onSuccess: () => {
      toast.success('Report uploaded successfully!');
    },
    onError: (error: any) => {
      if (error?.response?.status === 403) {
        // Handle 403 Forbidden (unsigned PDF)
        toast.error('The document needs to be verified before submission');
        navigate('/app/validate');
      } else {
        // Handle other errors
        toast.error(
          `Error uploading report: ${
            error instanceof Error ? error.message : 'Unknown error'
          }`
        );
      }
    },
  });
}
