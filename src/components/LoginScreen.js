import React, { useState } from 'react';
import './LoginScreen.css';
import { SignupScreen } from './';

const LoginScreen = () => {
    const [ signIn, setSignIn] = useState(false);

    return (
        <div className="loginScreen">
            <div className="loginScreen__background">
                <img className="loginScreen__backgroundImage" src="https://assets.nflxext.com/ffe/siteui/vlv3/68c9706b-acd1-4472-bb1d-ef3ca933154c/86c88196-9b60-42b1-81ea-411722a1f541/VN-en-20211011-popsignuptwoweeks-perspective_alpha_website_medium.jpg" alt=""/>
                <div className="loginScreen__gradient" />
                <img className="loginScreen__logo" alt="netflix-logo" src="https://www.freepnglogos.com/uploads/netflix-logo-0.png"/>
                <button className="loginScreen__button" onClick={() => setSignIn(true)} >Sign in</button>
            </div>

            <div className="loginScreen__body">
                {signIn ? (
                    <SignupScreen />
                ) : (
                    <>
                        <h1>Unlimited movies, TV shows, and more.</h1>
                        <h2>Watch anywhere. Cancel anytime.</h2>
                        <h3>Ready to watch? Enter your email to create or restart your membership.</h3>

                        <div className="loginScreen__input">
                            <form>
                                <input
                                    type="email"
                                    placeholder="Email address"
                                />
                                <button onClick={() => setSignIn(true)} className="loginScreen__getStarted">Get Started</button>
                            </form>
                        </div>
                    </>
                )}
            </div>

        </div>
    )
}

export default LoginScreen;
