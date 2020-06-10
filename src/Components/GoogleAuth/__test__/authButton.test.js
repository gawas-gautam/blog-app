import React from "react";
import AuthButton from "../authButton";
import { render, cleanup, getByText } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import renderer from "react-test-renderer";

afterEach(cleanup)

it('renders the button correctly', () => {
    const { queryAllByTestId } = render(<AuthButton state={{ isSignedIn: true }} onSignInClick={() => { }} onSignOutClick={() => { }} />)
    expect(queryAllByTestId('authButton')).toBeTruthy()
})

it('check button for signed in', () => {
    const { getByTestId } = render(<AuthButton state={{ isSignedIn: true }} onSignInClick={() => { }} onSignOutClick={() => { }} />)
    expect(getByTestId('authButton')).toHaveTextContent('Sign out')
})

it('check button for signed out', () => {
    const { getByTestId } = render(<AuthButton state={{ isSignedIn: false }} onSignInClick={() => { }} onSignOutClick={() => { }} />)
    expect(getByTestId('authButton')).toHaveTextContent('Sign in with Google')
})

