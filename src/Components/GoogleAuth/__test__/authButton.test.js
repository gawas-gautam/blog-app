import React from "react";
import AuthButton from "../authButton";
import { render, cleanup, getByText, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import renderer from "react-test-renderer";

const state = {
    isSignedIn: true,
    label: {
        signIn: " Sign in with Google",
        signOut: " Sign out"
    }
}

afterEach(cleanup)

it('renders the button correctly', () => {
    const { queryAllByTestId } = render(<AuthButton state={state} />)
    expect(queryAllByTestId('authButton')).toBeTruthy()
})

describe('checking for button text as per state', () => {
    it('check button for signed in', () => {
        const { getByTestId } = render(<AuthButton state={state} />)
        expect(getByTestId('authButton')).toHaveTextContent('Sign out')
    })

    it('check button for signed out', () => {
        const { getByTestId } = render(<AuthButton state={{ ...state, isSignedIn: false }} />)
        expect(getByTestId('authButton')).toHaveTextContent('Sign in with Google')
    })
})

describe('checking for button click', () => {
    it('checks for signedin clicked', () => {
        const onSignInClick = jest.fn()
        const { getByTestId } = render(<AuthButton state={{ ...state, isSignedIn: false }} onSignInClick={onSignInClick} />)
        fireEvent.click(getByTestId('authButton'))
        expect(onSignInClick).toHaveBeenCalled()
    })

    it('checks for signedOut clicked', () => {
        const onSignOutClick = jest.fn()
        const { getByTestId } = render(<AuthButton state={state} onSignOutClick={onSignOutClick} />)
        fireEvent.click(getByTestId('authButton'))
        expect(onSignOutClick).toHaveBeenCalled()
    })
})