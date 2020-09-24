/**
 * Returns true if username is valid, false otherwise
 * @param {String} username
 */
export let isValidUsername = (username) => {
    return (username.length > 0 && username.length < 256);
};

/**
 * Returns true if strings match
 * @param {String} stringA
 * @param {String} stringB
 */
export let stringsMatch = (stringA, stringB) => {
    return stringA === stringB;
};

/**
 * Returns true if email is an @tcd.ie email
 * Not strict checking
 * @param {String} email
 */
export let isValidEmail = (email) => {
    const re = /^\S+@tcd.ie$/;
    return re.test(String(email).toLowerCase());
};

/**
 * Returns true if password is the correct length
 * @param {String} password
 */
export let isValidPassword = (password) => {
    return password.length > 7 && password.length < 256;
};
