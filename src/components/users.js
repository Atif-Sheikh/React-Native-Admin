import React, { Component } from 'react';
import {connect} from 'react-redux';
import Card, { CardContent } from 'material-ui/Card';
import Avatar from 'material-ui/Avatar';
import deepPurple from 'material-ui/colors/deepPurple';
import Badge from 'material-ui/Badge';
import MailIcon from 'material-ui-icons/Mail';
import deleteIcon from '../images/delete.png';
import { GetUsers } from '../store/action/action';
import { ListItemText } from 'material-ui/List';

class Users extends Component {
    componentWillMount(){
        this.props.getUsers();
    };
    firstName = (name) => {
        return name.charAt(0);
    };
    render() {
        console.log(this.props.users, this.props.userKeys);
        return (
            <div>
                {
                    this.props.users.map((user, index) => {
                        return <Card key={index}>
                        <CardContent>
                            <div style={{display: 'flex', flexDirection: 'row'}}>
                                <Avatar style={styles.orangeAvatar}>{this.firstName(user.name)}</Avatar>
                                <ListItemText style={{marginTop: 10}} primary={user.name} secondary={user.email} />
                            </div>
                            <div style={{display: 'flex', flexDirection: 'row'}}>
                            </div>
                            <div style={{ width: 40, height: 40, display: 'flex', flexDirection: 'flex-last', cursor: 'pointer'}}>  
                                <img 
                                    style={{ width: 20, height: 20}} 
                                    src={deleteIcon} 
                                />
                            </div>
                        </CardContent>
                    </Card>
                    })
                }     
            </div>
        );
    };
};
const styles = {   
        orangeAvatar: {
        margin: 10,
        color: '#fff',
        backgroundColor: deepPurple[500],
    },
};
  
function mapStateToProp(state){
    return({
        users: state.root.users,
        userKeys: state.root.usersKeys,
    });
};
function mapDispatchToProp(dispatch){
    return({
        getUsers: () => {
            dispatch(GetUsers())
        }, 
    });
};

export default connect(mapStateToProp, mapDispatchToProp)(Users);

