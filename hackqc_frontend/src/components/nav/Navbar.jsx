import React from 'react';
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import { List, ListItem } from 'material-ui/List'
import { Link } from 'react-router-dom'
import Place from 'material-ui/svg-icons/maps/place';
import Chat from 'material-ui/svg-icons/communication/chat';
import Info from 'material-ui/svg-icons/action/info';
import News from 'material-ui/svg-icons/action/announcement';
import Stats from 'material-ui/svg-icons/action/timeline';
import { withRouter } from 'react-router-dom'

const titleForUrl = {
    'login': 'Connexion',
    'chat': 'Forum',
    'map': 'Carte',
    'info': 'Information',
    'news': 'Nouvelles',
    'stats': 'Statistiques'
};

class Navbar extends React.Component {
    constructor(){
        super();
        this.state = {
            drawerisOpen: false
        };
        this.toggleDrawer = this.toggleDrawer.bind(this);
    }
    toggleDrawer() {
        this.setState({
            drawerIsOpen: !this.state.drawerIsOpen
        });
    }
    navigate(path) {
        return () => {
            this.props.history.push(path);
        }
    }
    render() {
        return (
            <React.Fragment>
                <Drawer
                    docked={false}
                    width={200}
                    open={this.state.drawerIsOpen}
                    onRequestChange={this.toggleDrawer}
                >
                    <List>
                        <ListItem primaryText="Carte" onClick={this.navigate('/map')} leftIcon={<Place />} />
                        <ListItem primaryText="Forum" onClick={this.navigate('/chat')} leftIcon={<Chat />} />
                        <ListItem primaryText="Information" onClick={this.navigate('/info')} leftIcon={<Info />} />
                        <ListItem primaryText="Nouvelles" onClick={this.navigate('/news')} leftIcon={<News />} />
                        <ListItem primaryText="Statistiques" onClick={this.navigate('/stats')} leftIcon={<Stats />} />
                    </List>
                </Drawer>
                <AppBar
                    title={titleForUrl[window.location.href.match(/[^\/]*$/)]}
                    onLeftIconButtonClick={this.toggleDrawer}
                />
            </React.Fragment>
        );
    }
}

export default withRouter(Navbar);
