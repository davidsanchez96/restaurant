import Api from "./api"
import moment from "moment";

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
        //Api.jwt(res.body.token);
        res.body.phone = phone;
        return res.body;
    }

    async getUserData() {
        let res = await this.Api.get(`/client/current`);
        if (res.err) throw res.err;
        return res.body;
    }

    async updateUserData(data) {
        let res = await this.Api.put(`/client/current`, {
            body: data
        });
        if (res.err) throw res.err;
        return res.body;
    }

    async sendTicket(data) {
        let res = await this.Api.post(`/ticket`, {
            body: data
        });
        if (res.err) throw res.err;
        return res.body;
    }


    async getTableReserves() {
        let res = await this.Api.get(`/client/current/operations`, {
            body: {timestamp: moment().add(-3, 'years').unix()}
        });
        if (res.err) throw res.err;
        return res.body;
    }

}

export const AuthService = new AuthServiceImpl();