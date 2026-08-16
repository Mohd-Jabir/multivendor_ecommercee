const TOKEN_KEY = "token";
const USER_KEY = "user";
export const saveAuth = (authData) => {
  const { token, userId, name, email, role } = authData;
  const user = {
    userId,
    name,
    email,
    role,
  };
  localStorage.setItem(TOKEN_KEY, token);
  localStorage.setItem(USER_KEY, JSON.stringify(user));
  return user;
};
export const getToken = () => {
  return localStorage.getItem(TOKEN_KEY);
};
export const getUser = () => {
  try {
    const user = localStorage.getItem(USER_KEY);
    return user ? JSON.parse(user) : null;
  } catch {
    clearAuth();
    return null;
  }
};
export const clearAuth = () => {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(USER_KEY);
};
export const isAuthenticated = () => {
  return Boolean(getToken());
};
