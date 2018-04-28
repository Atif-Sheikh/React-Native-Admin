import React, { Component } from 'react';
import { connect } from 'react-redux';
import Card, { CardContent } from 'material-ui/Card';
import Avatar from 'material-ui/Avatar';
import deepPurple from 'material-ui/colors/deepPurple';
import Badge from 'material-ui/Badge';
import MailIcon from 'material-ui-icons/Mail';
import { ListItemText } from 'material-ui/List';
import deleteIcon from '../images/delete.png';
import { AddPost, DeletePost } from '../store/action/action';

class Posts extends Component {
    deletePost = (e) => {
        e.preventDefault();
        let key = this.props.postsKeys[this.props.index];
        this.props.deletePost(key);
    };
    addPost = (e) => {
        e.preventDefault();
        let key = this.props.postsKeys[this.props.index];
        this.props.addPost(key);
    };
    render() {
        console.log(this.props.postsKeys[this.props.index]);
        let { name, email, requirement, rupees, likes, month, year, date, comments, donation, accepted } = this.props.post;
        // let donationCircle = Math.floor((donation/rupees)*100);
        let first = name.charAt(0);
        return (
            <div>
            {   
                <Card>
                    <CardContent>
                        <div style={{display: 'flex', flexDirection: 'row'}}>
                            <Avatar style={styles.orangeAvatar}>{ first }</Avatar>
                            <ListItemText style={{marginTop: 10}} primary={name} secondary={email} />                            
                            <h4 style={{margin: 30}}>{ requirement }, It Will be Cost around PKR: {rupees}/-</h4>
                        </div>
                        <div style={{ width: 40, height: 40, display: 'flex', flexDirection: 'flex-last', cursor: 'pointer'}}>  
                            <img 
                                style={{ width: 20, height: 20}} 
                                src={deleteIcon} 
                                onClick={this.deletePost}
                            />
                        </div>
                        <div style={{display: 'flex', flexDirection: 'row'}}>
                        <Badge style={{marginLeft: 50, marginTop: 50, cursor: 'pointer', float: 'left'}} badgeContent={likes} color="secondary">
                            Likes
                        </Badge>
                        <Badge style={{marginLeft: 50, marginTop: 50, cursor: 'pointer', float: 'right'}} badgeContent={comments} color="secondary">
                            <MailIcon />
                        </Badge>
                        </div>
                        {
                            accepted === false ? <input type='button' onClick={this.addPost} value='Add' /> : 'accpeted'
                        }
                            
                    </CardContent>
                </Card>
            }      
            </div>
        );
    };
};
const styles = {
    orangeAvatar: {
        margin: 5,
        color: '#fff',
        backgroundColor: deepPurple[500],
        width: 60,
        height: 60,
    },
};
  
function mapStateToProp(state){
    return({
        postsKeys: state.root.postsKeys,        
    });
};
function mapDispatchToProp(dispatch){
    return({
    //     changeUserName: ()=>{dispatch(changeUserName())}
        addPost: (key) => {
            dispatch(AddPost(key))
        },
        deletePost: (key) => {
            dispatch(DeletePost(key))
        },
    });
};

export default connect(mapStateToProp,mapDispatchToProp)(Posts);

