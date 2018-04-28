import React, { Component } from 'react';
import {connect} from 'react-redux';
import { GetNGOs, AddNGO, RemoveNGO } from '../store/action/action';
import Card, { CardContent } from 'material-ui/Card';
import Avatar from 'material-ui/Avatar';
import deepPurple from 'material-ui/colors/deepPurple';
import Badge from 'material-ui/Badge';
import MailIcon from 'material-ui-icons/Mail';
import deleteIcon from '../images/delete.png';
import { ListItemText } from 'material-ui/List';

class NGOs extends Component {
    componentWillMount(){
        this.props.getNGOs();
    };
    firstName = (name) => {
        return name.charAt(0);
    };
    addNGO = (index) => {
        let key = this.props.ngoKeys[index];
        this.props.addNGO(key);
    };
    removeNGO = (index) => {
        let key = this.props.ngoKeys[index];
        this.props.removeNGO(key);
    };
    render() {
        console.log(this.props.ngos, this.props.ngoKeys);
        return (
            <div>
                {
                    this.props.ngos.map((ngo, index) => {
                        return <Card key={index}>
                        <CardContent>
                            <div style={{display: 'flex', flexDirection: 'row'}}>
                                <Avatar style={styles.orangeAvatar}>{this.firstName(ngo.name)}</Avatar>
                                <ListItemText style={{marginTop: 10}} primary={ngo.name} secondary={ngo.email} />
                            </div>
                            <div style={{display: 'flex', flexDirection: 'row'}}>
                            </div>
                            <div style={{ width: 40, height: 40, display: 'flex', flexDirection: 'flex-last', cursor: 'pointer'}}>  
                                <img 
                                    style={{ width: 20, height: 20}} 
                                    src={deleteIcon} 
                                    onClick={() => this.removeNGO(index)}
                                />
                                {ngo.accepted === false ? <input type='button' onClick={() =>this.addNGO(index)} value='Add' /> : 'Accepted'}
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
        ngos: state.root.ngos,
        ngoKeys: state.root.ngoKeys,
    });
};
function mapDispatchToProp(dispatch){
    return({
        getNGOs: () => {
            dispatch(GetNGOs())
        },
        addNGO: (key) => {
            dispatch(AddNGO(key))
        },
        removeNGO: (key) => {
            dispatch(RemoveNGO(key))
        },
    });
};

export default connect(mapStateToProp,mapDispatchToProp)(NGOs);

