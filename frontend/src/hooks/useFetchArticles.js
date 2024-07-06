import { useState, useEffect } from 'react';
import { fetchArticles } from '../services/api';

const useFetchArticles = (fetchTrigger) => {
  const [articles, setArticles] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (fetchTrigger) {
      const fetchData = async () => {
        try {
          const data = await fetchArticles(fetchTrigger);
          setArticles(data);
        } catch (error) {
          setError(error);
        }
      };

      fetchData();
    }
  }, [fetchTrigger]);

  return { articles, error };
};

export default useFetchArticles;
