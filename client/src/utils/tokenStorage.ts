const TOKEN_KEY = "sadaora_auth_token";
const USER_KEY = "sadaora_user";

export const saveToken = (token: string): void => {
    localStorage.setItem(TOKEN_KEY, token);
};

export const getToken = (): string | null => {
    return localStorage.getItem(TOKEN_KEY);
};

export const removeToken = (): void => {
    localStorage.removeItem(TOKEN_KEY);
};

export const saveUser = (user: any): void => {
    localStorage.setItem(USER_KEY, JSON.stringify(user));
};

export const getUser = (): any | null => {
    const userStr = localStorage.getItem(USER_KEY);
    return userStr ? JSON.parse(userStr) : null;
};

export const removeUser = (): void => {
    localStorage.removeItem(USER_KEY);
};

export const clearAuth = (): void => {
    removeToken();
    removeUser();
};
