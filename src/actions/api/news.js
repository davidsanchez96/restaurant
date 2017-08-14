import Api from "./api"
import moment from "moment";

class NewsServiceImpl {

    Api = Api;


    async getNews(restaurantId) {


        /*let url = restaurantId ? '/news/restaurant/' + restaurantId : '/news';

         let res = await this.Api.get(url);
         if (res.err) throw res.err;

         return res.body;*/


        function delay(ms) {
            return new Promise((resolve, reject) => {
                setTimeout(resolve, ms);
            });
        }

        return delay(1000).then(() => {
            return {
                news: [
                    {

                        id: 1,
                        name: 'Открытие летней веранда рестобара',
                        description: 'Описание',
                        date: moment(),
                        restaurant: 'Рестобар Chester'
                    },
                    {
                        id: 2,
                        name: 'Открытие летней веранда рестобара',
                        description: 'Описание 2',
                        date: moment().add(-1, 'days'),
                        restaurant: 'Рестобар Chester'
                    },
                    {
                        id: 3,
                        name: 'Открытие летней веранда рестобара',
                        description: 'Описание 3',
                        date: moment().add(-2, 'days'),
                        restaurant: 'Рестобар Chester'
                    }
                ]
            }
        });
    }

}

export const NewsService = new NewsServiceImpl();