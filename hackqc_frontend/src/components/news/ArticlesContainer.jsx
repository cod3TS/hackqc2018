import React from "react";
import PropTypes from "prop-types";
import "whatwg-fetch"; //use fetch for API call
import { Container, Row, Col, CardColumns } from "reactstrap";
import { Article } from "./Article";
import NewsAPI from "newsapi";

import "react-accessible-accordion/dist/fancy-example.css";

console.log(NewsAPI);
export default class ArticlesContainer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: true,
            articles: []
        };
    }

    componentDidMount() {
        fetch("/api/news")
            .then(res => res.json())
            .then(json => {
                this.setState(
                    Object.assign({}, this.state, {
                        articles: json,
                        loading: false
                    })
                );
            });
    }

    render() {
        if (this.state.loading) return <p>Loading...</p>;
        console.log(this.state);
        return (
            <CardColumns
                style={{ "text-align": "center", "margin-top": "50px" }}
            >
                {this.state.articles.map((article, i) => (
                    <Article
                        key={i}
                        url={article.url}
                        urlToImage={article.urlToImg}
                        title={article.title}
                        description={article.title}
                    />
                ))}
            </CardColumns>
        );
    }
}

ArticlesContainer.propTypes = {
    location: PropTypes.object.isRequired //from React Router
};
