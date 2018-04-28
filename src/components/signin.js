import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
import { signinAction } from '../store/action/action';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import Card, { CardContent, } from 'material-ui/Card';
import { SnackbarContent } from 'material-ui/Snackbar';
import TextField from 'material-ui/TextField';
import FileUpload from 'material-ui-icons/FileUpload';
import { connect } from 'react-redux';

class Signin extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: ''
        };
    };
    onSubmit = (e) => {
        e.preventDefault();
        const { email, password } = this.state;
        if(email.trim() && password.trim()){
            let obj = { email, password };
            this.props.signinWithEmailPassword(obj);
            this.setState({email: ''});
        }else{
            alert('Please enter all fields correctly');
        }
    };
    render() {
        return (
            <div className="App">
                <AppBar position="static" color="default">
                    <Toolbar>
                    <Typography variant="title" color="inherit">
                        Please Login
                    </Typography>
                    </Toolbar>
                </AppBar>
                <Card style={styles.card}>
                <SnackbarContent style={style.snackbar} message="Welcome Admin" />
                    <CardContent>
                    <form onSubmit={this.onSubmit}>
                        <TextField
                            label="Admin@gmail.com"
                            placeholder="Email"
                            margin="normal"
                            type='email'
                            required
                            value={this.state.email} 
                            onChange={(e) => this.setState({ email: e.target.value.trim() })}
                            style={styles.TextField}            
                        />
                        <br /> 
                        <TextField
                            label="Password"
                            placeholder="*********"
                            margin="normal"
                            value={this.state.password}                             
                            required 
                            type='password'                            
                            onChange={(e) => this.setState({ password: e.target.value.trim() })}                    
                            style={styles.TextField}
                        />
                        <br />
                            <p style={{color: 'red'}}>{this.props.error}</p>
                        <br />
                        <Button type='submit' style={styles.button} variant="raised" color="default">
                        Login
                        <FileUpload />
                        </Button>
                    </form>
                    </CardContent>
                </Card>
            </div>
        );
    };
};
const style = theme => ({
    snackbar: {
      margin: theme.spacing.unit,
    },
});
const styles = {
    card: {
      maxWidth: '30%',
      margin: '0 auto',
      textAlign: 'center',
      marginTop: '5%',
      height: 'auto',
    },
    button: {
      width: '70%',
    },
    TextField: {
      width: '70%',
    },
};

function mapStateToProp(state) {
    return ({
        // userName: state.root.userName,
        error: state.root.error,
    });
};
function mapDispatchToProp(dispatch) {
    return ({
        // changeUserName: ()=>{dispatch(changeUserName())}
        signinWithEmailPassword: (user) => {
            dispatch(signinAction(user))
        },
    });
};



export default connect(mapStateToProp, mapDispatchToProp)(Signin);