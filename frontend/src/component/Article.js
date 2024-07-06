import React from 'react';
import PropTypes from 'prop-types';
import "../styles/Article.css"

const Article = ({ article }) => {
  return (
    <div class="task">
        <div class="tags">
          <span class="tag">{article.author}</span>
          <button class="options">
          </button>
        </div>
        <p>{article.title}</p>
        <div class="stats">
            {article.date}
            <div class="viewer"><a href={article.url} target="_blank" rel="noopener noreferrer">Read More</a></div>
        </div>   
      </div>
  );
};

Article.propTypes = {
  article: PropTypes.shape({
    title: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
  }).isRequired,
};

export default Article;
