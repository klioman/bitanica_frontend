import { connectedRouterRedirect } from 'redux-auth-wrapper/history4/redirect';
import locationHelperBuilder from 'redux-auth-wrapper/history4/locationHelper';
import { getAuthIsAuthenticated, getAuthIsNotAuthenticated } from 'redux/reducers/auth/selectors';

const locationHelper = locationHelperBuilder({});

// ==========================================:
export const isAuth = connectedRouterRedirect({
	redirectPath: '/login',
	authenticatedSelector: getAuthIsAuthenticated,
	wrapperDisplayName: 'FrontUserIsAuthenticated',
});

// ==========================================:
export const isGuest = connectedRouterRedirect({
	redirectPath: (state, ownProps) => locationHelper.getRedirectQueryParam(ownProps) || '/',
	allowRedirectBack: false,
	authenticatedSelector: getAuthIsNotAuthenticated,
	wrapperDisplayName: 'FrontUserIsNotAuthenticated',
});
