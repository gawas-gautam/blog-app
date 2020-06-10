import React from "react";
import AuthButton from "./authButton";

class GoogleAuth extends React.Component {
    state = {
        isSignedIn: null,
        userId: null,
        userName: '',
        label: {
            signIn: " Sign in with Google",
            signOut: " Sign out"
        }
    };
    componentDidMount() {
        window.gapi.load("client:auth2", () => {
            window.gapi.client
                .init({
                    clientId:
                        "337819797616-kpmv7a4k82m51fs17ra44euqpkkmlr5o.apps.googleusercontent.com",
                    scope: "email",
                    cookiepolicy: 'single_host_origin',
                })
                .then(() => {
                    this.auth = window.gapi.auth2.getAuthInstance();
                    this.setState({ isSignedIn: this.auth.isSignedIn.get() });
                    // listens if the user signs out and updates the state immediates and not only on refreshing the page
                    this.auth.isSignedIn.listen(this.changeSignedStatus);
                });
        });
    }

    onSignInClick = () => this.auth.signIn();

    onSignOutClick = () => this.auth.signOut();

    changeSignedStatus = () => this.setState({ 
        isSignedIn: this.auth.isSignedIn.get(), 
        userId: this.auth.currentUser.get().getId(),
        userName: this.auth.currentUser.get().getBasicProfile().getName()
    });

    render() {
        return <AuthButton state={this.state} onSignInClick={this.onSignInClick} onSignOutClick={this.onSignOutClick}/>
    }
}

export default GoogleAuth;