export const isValidEmail = (email: string): boolean => {
    const re = /(.+)@(.+){2,}\.(.+){2,}/gmi;

    return re.test(email);
};
