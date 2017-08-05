import Api from "./api"

class RestaurantServiceImpl {

    Api = Api;



    async getData(_hash) {

        let res = await this.Api.get(`/restaurant/combined`,{
            body:{
                _hash
            }
        });
        if (res.err) throw res.err;

        return res.body;
    }



}

export const RestaurantService = new RestaurantServiceImpl();