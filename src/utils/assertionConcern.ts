export const assertArgumentIsValidEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

export const assertArgumentIsValidStatus = (status: string) => {
    const acceptedStatus = ["recebido", "cancelado"]
    return acceptedStatus.includes(status)
};
