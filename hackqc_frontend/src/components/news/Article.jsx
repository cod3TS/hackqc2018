import React from "react";
import PropTypes from "prop-types";
import {
    Card,
    CardActions,
    CardHeader,
    CardMedia,
    CardTitle,
    CardText
} from "material-ui/Card";

export class Article extends React.Component {
    render() {
        console.log(this.props);
        return (
            <Card className="article">
                <CardMedia>
                    <a href={this.props.url} target="_blank">
                        <img
                            src={this.props.urlToImage}
                            className="imga"
                            alt="Article image"
                        />
                    </a>
                </CardMedia>
                <CardText>{this.props.description}</CardText>
            </Card>
        );
    }
}

Article.propTypes = {
    url: PropTypes.string,
    urlToImage: PropTypes.string,
    title: PropTypes.string,
    description: PropTypes.string
};
