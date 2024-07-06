import React, { useState } from 'react';
import ArticleList from '../component/ArticleList';
import useFetchArticles from '../hooks/useFetchArticles';
import "../styles/App.css"
import "../styles/form.css"

const HomePage = () => {
  const [tag, setTag] = useState('');
  const [fetchTrigger, setFetchTrigger] = useState('');
  const [loading, setLoading] = useState(false);
  const [validationError, setValidationError] = useState('');
  const [noArticles, setNoArticles] = useState(false); // New state to handle no articles case

  const { articles, error } = useFetchArticles(fetchTrigger);

  const handleTagChange = (e) => {
    setTag(e.target.value);
    if (validationError) {
      setValidationError(''); // Clear validation error when user types
    }
  };

  const handleScrape = async () => {
    if (!tag.trim()) {
      setValidationError('Topic cannot be empty');
      return;
    }

    console.log('Scrape button clicked');
    setLoading(true);
    setNoArticles(false); // Reset no articles state before new scrape

    try {
      const response = await fetch('/scrape', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ topic: tag })
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      console.log('Scrape response:', data);
      if (data.articles.length === 0) {
        setNoArticles(true); // Set no articles state if no articles found  https://mediumwebscrapping.onrender.com
      } else {
        setFetchTrigger(tag); // Set the fetch trigger only after a successful scrape
      }
    } catch (error) {
      console.error('Error scraping articles:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Articles</h1>
        <div className="form-control">
    <input
      type="text"
      value={tag}
      onChange={handleTagChange}
      className="search-input"
      required 
    />
    <label className={tag ? "active" : ""}> {/* Add active class if tag has value */}
        <span style={{ transitionDelay: "0ms" }}>S</span>
        <span style={{ transitionDelay: "50ms" }}>c</span>
        <span style={{ transitionDelay: "100ms" }}>r</span>
        <span style={{ transitionDelay: "150ms" }}>a</span>
        <span style={{ transitionDelay: "200ms" }}>p</span>
        <span style={{ transitionDelay: "250ms" }}>e</span>
        
    </label>
</div>

        {validationError && <p className="error-message">{validationError}</p>}
        <button onClick={handleScrape} disabled={loading}>
          {loading ? 'Scraping...' : 'Scrape Articles'}
        </button>
      </header>
      <main>
        {loading && <p className="loading-message">Loading...</p>}
        {error && <p className="error-message">{error.message}</p>}
        {noArticles && <p className="no-articles-message">No articles found</p>}
        {!noArticles && <ArticleList articles={articles} />}
      </main>
    </div>
  );
};

export default HomePage;
