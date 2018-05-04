import Base from './Components/Base/Base';
import App from './app/App';
import LoginPage from './Components/Login/LoginPage';
import SignUpPage from './Components/SignUp/SignUpPage';
import Auth from './Helper/Auth';

const routes = {
    component: Base,
    childRoutes: [
        {
            path: '/',
            getComponent: (location, callback) => {
                if (Auth.isUserAuthenticated()) {
                    callback(null, App);
                } else {
                    callback(null, LoginPage);
                }
            }},
        {
            path: '/login',
            component: LoginPage},
        {
            path: '/signup',
            component: SignUpPage},
        {
            path: '/logout',
            onEnter: (nextState, replace) => {
                Auth.deauthenticateUser();
                replace('/');
            }}]
};

export default routes;