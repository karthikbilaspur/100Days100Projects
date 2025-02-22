class Auth {
    constructor() {
        this.users = JSON.parse(localStorage.getItem('users')) || [];
    }

    register(username, password) {
        const user = { username, password };
        this.users.push(user);
        localStorage.setItem('users', JSON.stringify(this.users));
    }

    login(username, password) {
        const user = this.users.find((user) => user.username === username && user.password === password);
        if (user) {
            localStorage.setItem('currentUser', JSON.stringify(user));
            return true;
        }
        return false;
    }

    logout() {
        localStorage.removeItem('currentUser');
    }

    getCurrentUser() {
        return JSON.parse(localStorage.getItem('currentUser'));
    }
}

const auth = new Auth();
export default auth;