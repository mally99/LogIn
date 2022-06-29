import axios from "axios";

const postFunc = async (email: string, password: string) => {

    let res: any = {};
    await axios.post('https://private-052d6-testapi4528.apiary-mock.com/authenticate', {
        email: email,
        password: password
    })
        .then(function (response: any) {
            res = response;
        })
        .catch(function (error: any) {
            res = error;
        });
    return res;
}
const getFunc = async (token: string) => {
    let res: any = {};
    const config = { headers: { Authorization: `Bearer ${token}` } }
    await axios.get('https://private-052d6-testapi4528.apiary-mock.com/info', config)
        .then(function (response: any) {
            res = response;
        })
        .catch(function (error: any) {
            res = error;
        });
    return res;
}
export { postFunc, getFunc };