export const testPassword = 'Qvjh!UZck3yrW';
export const testConfirmPassword = testPassword;
export const testEmail = 'john.dee@someemail.com';
export const testToken = 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9';
export const testPhoneNumber = '+380631112233';

// ==========================================:
export const testLoginData = {
	email: testEmail,
	password: testPassword,
	captcha:
		'03AGdBq25s1k26ma9GPe5Iwi90Vvac9g39kFe71P7dG6rWM0vAMW08nxA3DPmWKOFXp0tilNcL8QmXBww-ON6KeBAgWYv64Bj4DDidYNfQR9bP_vPMKP5muSOaOfsFuVtwJ19bqS5gv1a_27-G9TdXb6m0_WzCVDZlY4bp9u6zbvGn45UY5dCIl52AL3sppQNXjwU4pyyXZfe0KNHaLxeWz64NiRM-3gb-CGSHCbGdDnW7wCtiiy9hHFn264dKF-zibTMzGQRz6U_sTYKYaVOzru7AE5PVO4Aa5IXkdids6F-4F8cxFlsAfpqp9yIDBJDg3cF0ux-YEqyBoKFrQyDK9jWYIe2j0BmqCkHesMaaTa0elUHTlDrF_8NN3CfUcYjhRqRbkShh_hnye8NsCaCRuhvEHijlSE1Y3Csr4Y3ptERXWxWuHG6FoNPPqVwQhngx6l8IPcmu8Br0',
};

export const testRequestLoginData = {
	token:
		'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOi8vN21hY3c0Z2dtYi5jb3JwLm1lcmVoZWFkLnh5ei9hcGkvbG9naW4iLCJpYXQiOjE2MzgyODA3NzYsImV4cCI6MTYzODI4NDM3NiwibmJmIjoxNjM4MjgwNzc2LCJqdGkiOiJtTnBiTEg5bzhZeGczYUFaIiwic3ViIjoxMywicHJ2IjoiMjNiZDVjODk0OWY2MDBhZGIzOWU3MDFjNDAwODcyZGI3YTU5NzZmNyJ9.ks77g8qMyZDHr10lBfTxkmsP1WOFbPfWStUO5SiSvNw',
	socket_token: 'uBI5CImUil4BAb9mx30i39hDKukmYRIK',
	user_data: {
		id: 13,
		email: 'developer@mail.com',
		email_confirmed: 1,
		google2fa_enabled: 0,
		type_id: 2,
		status_id: 1,
		kyc_message: null,
		last_login: 1638280776,
		blocked: '0',
		is_active: true,
		last_activity: '-',
		invite_key: '4YXkIUwmp0ISnmEFRtRSqAzmGunoGhKl',
		created_at: 1638193475,
		username: ' ',
		invite_url: 'https://7macw4ggmb.corp.merehead.xyz/signup/?4YXkIUwmp0ISnmEFRtRSqAzmGunoGhKl',
		data: {
			user_id: 13,
			first_name: null,
			last_name: null,
			phone: null,
			dob: null,
			country: null,
			state: null,
			city: null,
			street: null,
			post_code: null,
			created_at: '2021-11-29T13:44:35.000000Z',
			updated_at: '2021-11-29T13:44:35.000000Z',
		},
		status: {
			id: 1,
			name: 'unverified',
		},
	},
	token_expired_at: 1638284376,
};
// ==========================================:
export const testRegistrData = {
	acceptTerms: true,
	captcha:
		'03AGdBq25s1k26ma9GPe5Iwi90Vvac9g39kFe71P7dG6rWM0vAMW08nxA3DPmWKOFXp0tilNcL8QmXBww-ON6KeBAgWYv64Bj4DDidYNfQR9bP_vPMKP5muSOaOfsFuVtwJ19bqS5gv1a_27-G9TdXb6m0_WzCVDZlY4bp9u6zbvGn45UY5dCIl52AL3sppQNXjwU4pyyXZfe0KNHaLxeWz64NiRM-3gb-CGSHCbGdDnW7wCtiiy9hHFn264dKF-zibTMzGQRz6U_sTYKYaVOzru7AE5PVO4Aa5IXkdids6F-4F8cxFlsAfpqp9yIDBJDg3cF0ux-YEqyBoKFrQyDK9jWYIe2j0BmqCkHesMaaTa0elUHTlDrF_8NN3CfUcYjhRqRbkShh_hnye8NsCaCRuhvEHijlSE1Y3Csr4Y3ptERXWxWuHG6FoNPPqVwQhngx6l8IPcmu8Br0',
	confirmPassword: testPassword,
	cookiePolicy: true,
	email: testEmail,
	password: testPassword,
};

// ==========================================:
export const accountList = [
	{
		order: 1,
		name: 'General settings',
		icon: 'icon-settings',
		link: '/general-settings',
	},
];
