import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class HelloworldService {

    constructor(private http: HttpClient) { };

    // host target defined in proxy.conf.json
    target: string = 'http://localhost:3000';

    getHello() {
        let content = this.http.get(`${this.target}/hello`, {
            responseType: "text"
        });
        return content;
    }

    getGqlHello() {
        // possibly a terrible way to call a graphql api
        let content = this.http.post<{"data": {"hello": String}}>(`${this.target}/graphql`, {
            "query": "{hello}"
        });
        return content;
    }
}