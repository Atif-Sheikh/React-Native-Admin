import React, { Component } from 'react';
import {connect} from 'react-redux';
import history from '../History';
import * as firebase from 'firebase';
import { GetPosts } from '../store/action/action';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import IconButton from 'material-ui/IconButton';
import MenuIcon from 'material-ui-icons/Menu';
import Drawer from 'material-ui/Drawer';
import Button from 'material-ui/Button';
import List from 'material-ui/List';
import Divider from 'material-ui/Divider';
import Posts from './posts';
import Users from './users';
import NGOs from './ngos';

class Home extends Component {
    constructor(){
        super();
        this.state = {
            open: false,
            users: false,
            posts: true,
            ngos: false,
        };
    };
    componentWillMount(){
        this.props.getPosts();
    };
    toggleDrawer = (bool) => {
        this.setState({
          open: bool,
        });
    };
    render() {
        return (
            <div>
                <AppBar position="static">
                    <Toolbar>
                    <IconButton onClick={() => this.toggleDrawer(true)} style={styles.menuButton} color="inherit" aria-label="Menu">
                        <MenuIcon />
                    </IconButton>
                    <Typography style={styles.flex} variant="title" color="inherit">
                        Admin
                    </Typography>
                        <Button onClick={() => firebase.auth().signOut().then(() => history.push('/'))} color="inherit">Logout</Button>
                    </Toolbar>
                </AppBar>
                <Drawer open={this.state.open} onClose={() => this.toggleDrawer(false)}>
                    <div
                        style={{width: '200px', textAlign: 'center'}}
                        role="button"
                        onClick={() => this.toggleDrawer(false)}
                        onKeyDown={() => this.toggleDrawer(false)}
                    >
                        <div>
                            <List onClick={() => this.setState({posts: true, users: false, ngos: false})} style={{cursor: 'pointer', margin: 10}}>Posts</List>
                                <Divider />
                            <List onClick={() => this.setState({posts: false, users: true, ngos: false})} style={{cursor: 'pointer', margin: 10}}>Users</List>
                                <Divider />
                            <List onClick={() => this.setState({posts: false, users: false, ngos: true})} style={{cursor: 'pointer', margin: 10}}>NGOs</List>
                                <Divider />                        
                        </div>
                    </div>
                </Drawer>
                <div>
                {
                    this.state.posts ? <div style={{margin: 5}}>
                        {
                            this.props.posts ? this.props.posts.map((post, index) => {
                                return <Posts index={index} post={post} key={index} />
                            }) : null
                        }
                    </div> : null
                }
                    {
                        this.state.users ? <Users /> : null                        
                    }
                    {
                        this.state.ngos ? <NGOs /> : null                        
                    }
                </div>
            </div>
        )
    };
};
const styles = {
    root: {
      flexGrow: 1,
    },
    flex: {
      flex: 1,
    },
    menuButton: {
      marginLeft: -12,
      marginRight: 20,
    },
};
  
function mapStateToProp(state){
    return({
        posts: state.root.posts,
        // postsKeys: state.root.postsKeys,
    });
};
function mapDispatchToProp(dispatch){
    return({
    //     changeUserName: ()=>{dispatch(changeUserName())}
        getPosts: () => {
            dispatch(GetPosts())
        },
    });
};

export default connect(mapStateToProp,mapDispatchToProp)(Home);

