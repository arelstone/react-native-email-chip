export const isValidEmail = (email: string) => !email.length || /(.+)@(.+){2,}\.(.+){2,}/gmi.test(email);
