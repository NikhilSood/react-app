import React from "react";
import Article from "./Home";

function News({ articles }) {
    return (
        <div>
            {articles?.map((article, index) => (
                <Article key={index} article={article} />
            ))}
        </div>
    );
}

export default News;