import React from 'react';
import PropTypes from 'prop-types';
import Article from './Article';
import "../styles/App.css"

const ArticleList = ({ articles }) => {
  return (
    <div className="articles-container">
      {Array.isArray(articles) && articles.length > 0 ? (
        articles.map((article, index) => (
          <Article key={index} article={article} />
        ))
      ) : (
        <p>No articles available</p>
      )}
    </div>
  );
};

ArticleList.propTypes = {
  articles: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      author: PropTypes.string.isRequired,
      date: PropTypes.string.isRequired,
      url: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default ArticleList;
