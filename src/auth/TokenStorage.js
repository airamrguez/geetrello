const JWT_KEY = 'jwtToken';

class TokenStorage {
  constructor() {
    this.token = null;
  }
  get() {
    if (this.token != null) {
      return this.token;
    }
    this.token = localStorage.getItem(JWT_KEY);
    if (isValid(this.token)) {
      return this.token;
    }
    // Token has expired.
    this.token = null;
    return this.token;
  }
  set(jwt) {
    this.token = jwt;
    localStorage.setItem(JWT_KEY, jwt);
  }
  remove() {
    localStorage.removeItem(JWT_KEY);
  }
}

function isValid(token) {
  try {
    const meta = JSON.parse(atob(token.split('.')[1]));
    const exp = meta.exp;
    const now = Date.now() / 1000;
    return now < exp;
  } catch (e) {
    return false;
  }
}

export default new TokenStorage();
