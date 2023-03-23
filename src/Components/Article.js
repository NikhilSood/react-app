import React from "react";

function Article({ article }) {
    return (
        <div>
            <h2>{article.title}</h2>
            <img src={article.urlToImage} alt={article.title} />
            <p>{article.description}</p>
            <a href={article.url}>Read More</a>
        </div>
    );
}

export default Article;