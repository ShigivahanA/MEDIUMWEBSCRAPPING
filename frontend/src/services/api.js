export const fetchArticles = async (tag) => {
    const response = await fetch(`/articles?tag=${tag}`, { method: 'GET' });
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    if (!Array.isArray(data.articles)) {
      throw new Error('Unexpected response format');
    }
    return data.articles;
  };
  