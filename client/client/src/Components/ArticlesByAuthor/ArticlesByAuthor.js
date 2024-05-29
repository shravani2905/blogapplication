import React, { useEffect, useState } from "react";
import { axiosWithToken } from "../../axioswithToken";
import { useSelector } from "react-redux";
import { useNavigate, Outlet } from "react-router-dom";
import "./ArticlesByAuthor.css";

function ArticlesByAuthor() {
  const [articlesList, setArticlesList] = useState([]);
  const navigate = useNavigate();
  const { currentUser } = useSelector(
    (state) => state.userAuthoruserAuthorLoginReducer
  );

  const getArticlesOfCurrentAuthor = async () => {
    try {
      const res = await axiosWithToken.get(
        `http://localhost:4000/author-api/articles/${currentUser.username}`
      );
      setArticlesList(res.data.payload);
    } catch (error) {
      console.error("Error fetching articles:", error);
    }
  };

  const readArticleByArticleId = (articleObj) => {
    navigate(`../article/${articleObj.articleId}`, { state: articleObj });
  };

  useEffect(() => {
    getArticlesOfCurrentAuthor();
  }, []);

  return (
    <div>
      {articlesList.length === 0 ? (
        <p className="notfound">No articles posted.</p>
      ) : (
        <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-4 mt-5">
          {articlesList.map((article) => (
            <div className="col" key={article.articleId}>
              <div className="card h-100">
                <div className="card-body">
                  <h5 className="card-title">{article.title}</h5>
                  <p className="card-text">
                    {article.content.substring(0, 80) + "...."}
                  </p>
                  <button
                    className="custom-btn btn-success btn-4"
                    onClick={() => readArticleByArticleId(article)}
                  >
                    <span className="readmore">Read More</span>
                  </button>
                </div>
                <div className="card-footer">
                  <small className="text-body-secondary">
                    Last updated on {article.dateOfModification}
                  </small>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      <Outlet />
    </div>
  );
}

export default ArticlesByAuthor;
