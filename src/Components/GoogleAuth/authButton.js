import React from "react";

// can be used for other authentication types too
const AuthButton = ({state, onSignOutClick, onSignInClick}) => {
    console.log(state,'state')
    if (state.isSignedIn === 'null') {
        return <div>Loading...</div>
    }
    else if (state.isSignedIn) {
    return <button data-testid="authButton" className="btn btn-danger" onClick={onSignOutClick}>{state.label.signOut}</button>
    } else {
    return <button data-testid="authButton" className="btn btn-danger" onClick={onSignInClick}><i className="fa fa-google"></i>{state.label.signIn}</button>
    }
}

export default AuthButton;