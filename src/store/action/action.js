import ActionTypes from '../constant/constant';
import history from '../../History';
import firebase from 'firebase';


// Initialize Firebase
var config = {
    apiKey: "AIzaSyAVrEGWIMxOgTkz8xAvyyK60TklDavNX7s",
    authDomain: "native-project-ssg.firebaseapp.com",
    databaseURL: "https://native-project-ssg.firebaseio.com",
    projectId: "native-project-ssg",
    storageBucket: "native-project-ssg.appspot.com",
    messagingSenderId: "1022802588674"
  };
  firebase.initializeApp(config);

export const signinAction = (user) => {
    return dispatch => {
        dispatch({ type: ActionTypes.SIGNINERROR, payload: '' });
        // console.log('user in signin', user);
        firebase.auth().signInWithEmailAndPassword(user.email, user.password)
        .then((user) => {
            let authed = false;        
            firebase.database().ref(`/users/${user.uid}`).on('value', snap => {
                let data = snap.val();
                console.log(data);
                if(data.accountType === 'admin'){
                    authed = true;
                    console.log(authed, 'authed')
                }
            })
            setTimeout(() => {
                console.log(authed, 'authed');            
                if(authed){
                    history.push('/home');
                }else{
                    firebase.auth().signOut()
                    .then(() => {
                        dispatch({type: ActionTypes.SIGNINERROR, payload: 'this is only for Admin go back'});
                    })
                }
            }, 2000);                
        })
        .catch((error) => {
            dispatch({ type: ActionTypes.SIGNINERROR, payload: error.message })
        })
    };
};
export const AddPost = (key) => {
    return dispatch => {
        firebase.database().ref(`/posts/${key}`).update({accepted: true});        
    };
};
export const DeletePost = (key) => {
    return dispatch => {
        firebase.database().ref(`/posts/${key}`).remove();        
    };
};
export const AddNGO = (key) => {
    return dispatch => {
        firebase.database().ref(`/users/${key}`).update({accepted: true});
    };
};
export const RemoveNGO = (key) => {
    return dispatch => {
        firebase.database().ref(`/users/${key}`).remove();
    };
};
export const GetUsers = () => {
    return dispatch => {
        firebase.auth().onAuthStateChanged((user) => {
            firebase.database().ref(`/users`).on('value', snap => {
                let data = snap.val();
                let users = [];
                let usersKeys = [];
                for(let key in data){
                    if(data[key]['accountType'] === 'user'){
                        users.push(data[key]);
                        usersKeys.push(key);
                    }
                }
                dispatch({type: ActionTypes.USERS, payload: users});
                dispatch({type: ActionTypes.USERSKEYS, payload: usersKeys});                
            })
        });
    };
};
export const GetPosts = () => {
    return dispatch => {
        firebase.auth().onAuthStateChanged((user) => {
            let postsKeys = [];                
            let posts = [];
            firebase.database().ref(`/posts/`).on('value' , snap => {
                let data = snap.val();
                for(let key in data){
                    postsKeys.push(key);
                    posts.push(data[key]);
                }
                dispatch({type: ActionTypes.POSTS, payload: posts});
                dispatch({type: ActionTypes.POSTSKEYS, payload: postsKeys});                        
            })                
        })
    };
};
export const GetNGOs = () => {
    return dispatch => {
        firebase.auth().onAuthStateChanged((user) => {
            firebase.database().ref(`/users`).on('value', snap => {
                let data = snap.val();
                let ngos = [];
                let ngoKeys = [];
                for(let key in data){
                    if(data[key]['accountType'] === 'ngo'){
                        ngos.push(data[key]);
                        ngoKeys.push(key);
                    }
                }
                dispatch({type: ActionTypes.NGO, payload: ngos});
                dispatch({type: ActionTypes.NGOKEYS, payload: ngoKeys});                
            })
        });
    };
};
                  
