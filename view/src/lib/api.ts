import axios, {AxiosInstance} from "axios";
import { EnvironmentHelper } from "./EnvironmentHelper";
// @ts-ignore
import qs from 'query-string';

const url = new EnvironmentHelper()

const grpcServer: AxiosInstance = axios.create({
    baseURL: url.baseUrl,
    headers: {
        'content-type': 'application/json',
    },
    //params: {base64_encoded: 'true', fields: 'stdout'},
});

const judgeApi: AxiosInstance = axios.create({
    baseURL: "https://judge0-ce.p.rapidapi.com",
    headers: {
        'content-type': 'application/json',
        'X-RapidAPI-Key': '08f852edfamsh149af67cd3c6cfap1388c3jsn22fb3e2dc084',
        'X-RapidAPI-Host': 'judge0-ce.p.rapidapi.com'
    },
    params: {base64_encoded: 'true', fields: '*'},
});

export const api = {

    async submitCode() {
        try {
            return await judgeApi.post<{token: string}>(`/submissions?${qs.stringify({
                language_id: 60,
                source_code: "cGFja2FnZSBtYWluCgp0eXBlIEFwcGxlIHN0cnVjdCB7CgluYW1lICBzdHJpbmcKCWJyYW5kIHN0cmluZwp9CgpmdW5jIG1haW4oKSB7CgoJYXBwbGUgOj0gJkFwcGxlewoJCW5hbWU6ICAiR3Jhbm55IFNtaXRoIiwKCQlicmFuZDogIkpvY2hhbSIsCgl9CgoJdmFyIHggPSAyMgoJdmFyIHkgPSAxMDAKCglwcmludGxuKHggKiB5KQoJcHJpbnRsbigiR29vZCBqb2IiKQoKCXByaW50bG4oYXBwbGUubmFtZSkKfQo=",
                stdin: "SnVkZ2Uw"
            })}`).then(res => {
                return judgeApi.get<{stderr: string}>(`/submissions/${res.data.token}`)
                    .then(res => {
                        return atob(res.data.stderr);
                    })
            })
        }catch (err) {
            console.log("error" + err);
        }
    },

}
