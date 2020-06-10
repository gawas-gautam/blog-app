import React from "react";

const AuthButton = ({state, onSignOutClick, onSignInClick}) => {
    console.log(state,'state', onSignInClick, '2', onSignOutClick)
    if (state.isSignedIn === 'null') {
        return <div>no idea</div>
    }
    else if (state.isSignedIn) {
        return <button data-testid="authButton" className="btn btn-danger" onClick={onSignOutClick}>Sign out</button>

    } else {
        return <button data-testid="authButton" className="btn btn-danger" onClick={onSignInClick}><i className="fa fa-google"></i> Sign in with <b>Google</b></button>
    }

}

export default AuthButton;