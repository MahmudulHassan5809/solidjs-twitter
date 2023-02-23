export type GliderInputEvent = InputEvent & {
    currentTarget: HTMLInputElement;
    target: Element;
};

export type Form = {
    [key: string]: string;
};

export type AuthForm = {
    email: string;
    password: string;
} & Form;

export type RegisterForm = {
    fullName: string;
    nickName: string;
    avatar: string;
    passwordConfirmation: string;
} & Form;

export type SubmitCallback<T extends Form> = (f: T) => void;
