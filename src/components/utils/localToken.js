/**
 * @typedef {Object} hasLocalToken - does the user have a local token
 * @property {boolean} hasToken - does the user have a locally stored token
 * @property {string} token - the user's token
 */

/**
 * Checks for a locally stored token.
 * @return {hasLocalToken}
 */
export let checkForToken = function() {
    let token = window.localStorage.getItem("token");
    let retObj = {
        token: token
    };
    if (token.length > 1) {
        retObj.hasToken = true;
    } else {
        retObj.hasToken = false;
    }
    return retObj;
};

/**
 * Emit the locally stored token FUNCTION MUST BE BOUND
 */
export let checkForTokenAndEmit = function () {
    emitToken(checkForToken().token);
};

/**
 * Emit the token passed
 * FUNCTION MUST BE BOUND
 * @param {string} token
 */
export function emitToken (token) {
    this.$emit("tokenUpdate", token);
}

/**
 * Remove the locally stored token
 */
export let removeLocalToken = function() {
    dumbSetLocalToken("");
};

/**
 * Remove the locally stored token and pass the blank token up
 * FUNCTION MUST BE BOUND
 */
export let logoutAndEmit = function () {
    removeLocalToken();
    emitToken("").bind(this);
};

/**
 * Sets the local token, does not validate
 * @param {string} token - the token
 */
export let dumbSetLocalToken = function (token) {
    window.localStorage.setItem("token", token);
}
