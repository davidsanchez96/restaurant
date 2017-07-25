import Api from "./api"

class AuthServiceImpl {

    Api = Api;


    async confirmCode(code) {

        let res = await this.Api.post('/token/client/verification', {
            body: {
                code: code
            }
        });
        if (res.err) throw res.err;
        return res;
    }

    async sendCode(phone) {

        let res = await this.Api.get(`/token/client/%2B${phone}`);
        if (res.err) throw res.err;

        Api.jwt(res.body.token);
        res.body.phone = phone;
        return res.body;
    }

}

export const AuthService = new AuthServiceImpl();