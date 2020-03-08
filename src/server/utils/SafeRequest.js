import config from "@config";
import { get as _get } from "axios";
const { baseUrl } = config;
console.log("获取的baseurl",baseUrl);
class SafeRequest {
    constructor(url) {
        this.url = url;
        this.baseUrl = baseUrl;
    }
    get(params = {}) {
        let result = {
            code: 0,
            message: "",
            data: []
        }
        return new Promise((resolve, reject) => {
            _get(this.baseUrl + this.url, {
                params
            })
                .then(function (response) {
                    if (response.status == 200) {
                        const data = response.data;
                        result.data = data;
                        resolve(result);
                    } else {
                        result.code = 1;
                        result.message = "后台请求出错";
                        reject(result);
                    }
                })
                .catch(function (error) {
                    result.code = 1;
                    result.message = error;
                    reject(result);
                });
        })
    }
}
export default SafeRequest;