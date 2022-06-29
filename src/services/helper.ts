import { PersonalDetails } from "../models/PersonalDetails"
export const createPersonalDetails = (data: any): PersonalDetails => {
    return new PersonalDetails(
        data.name,
        data.Team,
        data.joinedAt,
        data.avatar
    )
}
export const fixBoolFields=(data:any[])=>{
    let tmp = data;
    tmp.forEach((item:any) => {
        if (item.madeDadeline === true) {
            item.madeDadeline = 'true';
        }
        else {
            item.madeDadeline = 'false';
        }
    })
    return tmp;
}
export const validateEmail = (email: string) => {
    const regEmail = new RegExp(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g);
    if (!regEmail.test(email)) {
        return "Email Isn't Valid";
    }
    return ('');
};
export const validatePassword = (password: string) => {
    const reg = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");
    if (!reg.test(password)) {
        return 'Password Must Contains: 8 characters length, 1 letter in Upper Case, 1 Special Character (!@#$&*),1 numerals (0-9),1 letter in Lower Case';
    }
    return '';
};
export const validateNoHebrew = (value: string) => {
    if (value === '') { return '' }
    const reg = new RegExp(/^[~`!@#$%^&*()_+=[\]\{}|;':",.\/<>?a-zA-Z0-9-]+$/);
    if (reg.test(value)) { return value }
    return value.slice(0, -1);
}
export const calcAvarage = (data: any[]) => {
    let sum: number = 0;
    data.forEach((element) => {
        sum += element.score;
    })
    return sum / data.length;
}
export const dadLineProjectPrecent = (data: any[]) => {
    let count: number = 0;
    data.forEach((element) => {
        if (element.madeDadeline === "true") {
            count++;
        }
    })
    return (count * 100) / data.length;
}