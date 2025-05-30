import {useState} from 'react';
import {useQuery} from '@tanstack/react-query';
import axios from 'axios';
import API_URL from '@/config/api';

interface Professor {
  id: string;
  username: string;
  email: string;
  avatarUrl?: string;
}

const searchProfessorsAPI = async (query: string): Promise<Professor[]> => {
  const response = await axios.get(
    `${API_URL}/professors?search=${encodeURIComponent(query)}`,
    {withCredentials: true}
  );
  return response.data.data as Professor[];
};

const useProfessorSearch = (
  minQueryLength: number = 2,
  debounceMs: number = 300
) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProfessor, setSelectedProfessor] = useState<Professor | null>(
    null
  );
  const [showDropdown, setShowDropdown] = useState(false);

  const {data: professors = [], isLoading} = useQuery({
    queryKey: ['professors', searchQuery],
    queryFn: () => searchProfessorsAPI(searchQuery),
    enabled: searchQuery.trim().length >= minQueryLength,
    staleTime: debounceMs,
  });

  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
    if (value.trim().length >= minQueryLength) {
      setShowDropdown(true);
    } else {
      setShowDropdown(false);
    }
  };

  const handleProfessorSelect = (professor: Professor) => {
    setSelectedProfessor(professor);
    setSearchQuery(professor.username);
    setShowDropdown(false);
  };

  const resetSearch = () => {
    setSearchQuery('');
    setSelectedProfessor(null);
    setShowDropdown(false);
  };

  return {
    searchQuery,
    professors,
    selectedProfessor,
    showDropdown,
    loading: isLoading,
    handleSearchChange,
    handleProfessorSelect,
    resetSearch,
    setShowDropdown,
  };
};

export default useProfessorSearch;
