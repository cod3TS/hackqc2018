import React from "react";
import Graph from "../../assets/graph.png";
import Paper from "material-ui/Paper";
export default class PieChart extends React.Component {
    render() {
        return (
            <Paper>
                <img style={{ maxWidth: "100%" }} src={Graph} />
            </Paper>
        );
    }
}
