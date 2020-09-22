// IAM
const IAM_BASE_URL = "http://localhost:8080/v1";
const IAM_LOGIN_URL = IAM_BASE_URL + "/users/${username}/login"
const IAM_VERIFY_URL = IAM_BASE_URL + "/users/self/login"
const IAM_CREATE_ACCOUNT_URL = IAM_BASE_URL + "/users"
const IAM_GET_USER_DATA_URL = IAM_BASE_URL + "/users/self"
const IAM_UPDATE_USER_DATA_URL = IAM_BASE_URL + "/users/self"

// Payments Service
const PAYMENT_BASE_URL = "http://localhost:4242"
const PAYMENT_CREATE_SESSION_URL = PAYMENT_BASE_URL + "/create-session"

// Stripe
const STRIPE_PUBLIC_KEY = '';
