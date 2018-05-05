import React from 'react';
import Auth from '../../Helper/Auth';
import './Base.css';
import { Link } from 'react-router';

const Base = ({ children }) => (
    <div>
        <nav className="nav-bar indigo lighten-1">
            <div className="nav-wrapper">
                <Link to="/" className="brand-logo">&nbsp;&nbsp;Tap News</Link>
                <ul id="nav-mobile" className="right">
                    {/*if authed (this is JSX syntax, not html5)*/}
                    {Auth.isUserAuthenticated() ?
                        (<div>
                            <li>{Auth.getEmail()}</li>
                            <li><Link to="/logout">Log out</Link></li>
                        </div>)
                        :
                        (<div>
                            <li><Link to="/login">Log in</Link></li>
                            <li><Link to="/signup">Sign up</Link></li>
                        </div>)
                    }
                </ul>
            </div>
        </nav>
        <br/>
        {children}
    </div>
);

export default Base;