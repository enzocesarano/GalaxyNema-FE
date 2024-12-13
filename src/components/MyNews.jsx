import React from "react";
import { Card, Col } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

const MyNews = () => {
  const location = useLocation();
  const news = useSelector((store) => store.news.news);

  const filterArticlesWithAuthor = (articles) => {
    return articles.filter((article) => article.author && article.author.trim() !== "");
  };

  const articlesWithAuthor = news.articles ? filterArticlesWithAuthor(news.articles) : [];

  return (
    <>
      {!(
        location.pathname.includes("/film/") ||
        location.pathname.includes("/checkout") ||
        location.pathname.includes("/administrator-panel")
      ) && (
        <Col
          className={`p-0 ps-xl-5 flex-column justify-content-between h-100 overflow-card mb-5 ${
            location.pathname.includes("/news")
              ? "col-12 col-xl-10"
              : "col-12 col-xl-4 d-none d-xl-flex"
          }`}
        >
          <h2 className="text-center text-secondary">NEWS</h2>
          <p className="text-center text-secondary mb-5">Tutte le news sul mondo del cinema!</p>
          <div>
            {articlesWithAuthor.length > 0 ? (
              articlesWithAuthor.map((article, index) => (
                <a
                  href={article.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  key={index}
                  className="text-decoration-none text-reset"
                >
                  <Card className="border-0 rounded-0 pb-3 mb-3 border-bottom border-black bg-transparent flex-row">
                    <div className="w-50 me-3">
                      {article.urlToImage && (
                        <Card.Img
                          variant="top"
                          className="rounded-4 w-100"
                          src={article.urlToImage}
                          alt={article.title}
                        />
                      )}
                    </div>

                    <Card.Body className="text-secondary w-75 m-0 p-0 flex-column justify-content-between">
                      <div>
                        <p className="fs-6 m-0 p-0 mb-1 fw-bold">{article.title}</p>
                        <p className="mb-2 fs-supersmall">
                          {article.author} - {new Date(article.publishedAt).toLocaleDateString()}
                        </p>
                      </div>
                      <p className="p-0 m-0 fs-supersmall d-none d-md-block">
                        {article.description || "Lorem ipsum, dolor sit amet consectetur..."}
                      </p>
                    </Card.Body>
                  </Card>
                </a>
              ))
            ) : (
              <p>Nessun articolo disponibile</p>
            )}
          </div>
        </Col>
      )}
    </>
  );
};

export default MyNews;
