export const getToken = () => {
    let token = localStorage.getItem('token');

    if(!token) {
        token = 'dummy_token_for_testing';
        localStorage.setItem('token', token);
    }

    return token;
}