export const validateEmail = (email: string): boolean => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
};

export const validatePassword = (password: string): boolean => {
    return password.length >= 6;
};

export const validateName = (name: string): boolean => {
    return name.trim().length >= 2;
};
