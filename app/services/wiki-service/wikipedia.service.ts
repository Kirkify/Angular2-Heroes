import { Injectable } from '@angular/core';
import { Jsonp, URLSearchParams } from '@angular/http';
import { Observable }       from 'rxjs/Observable';

@Injectable()
export class WikipediaService {
    constructor(private jsonp: Jsonp) {}

    search (term: string) {
        let wikiUrl = 'http://en.wikipedia.org/w/api.php';
        let params = new URLSearchParams();
        params.set('search', term); // the user's search value
        params.set('action', 'opensearch');
        params.set('format', 'json');
        params.set('callback', 'JSONP_CALLBACK');
        // TODO: Add error handling
        return this.jsonp
            .get(wikiUrl, { search: params })
            .map(request => <string[]> request.json()[1])
            ;
    }

    private handleError (error: any) {
        // In a real world app, we might use a remote logging infrastructure
        // We'd also dig deeper into the error to get a better message
        let errMsg = (error.message) ? error.message :
            error.status ? `${error.status} - ${error.statusText}` : 'Server error';
        console.error(errMsg); // log to console instead
        return Observable.throw(errMsg);
    }
}