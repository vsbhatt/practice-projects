import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { IHttpOptions, IRequestOptions } from './http-interface';
import { environment } from '../../../environments/environment';

@Injectable()
export class HttpClientApiService {
  constructor(private http: HttpClient) { }

  //call http get method
  get(url: string, headers?: any, params?: any, options?: IHttpOptions) {
    url = this.setURL(url);
    return this.http.get(url, (this.getRequestOptions(headers, params, options)) as any);
  }

  // http post method
  post(
    url: string,
    body: any,
    headers?: any,
    params?: any,
    options?: IHttpOptions
  ) {
    url = this.setURL(url);
    return this.http.post(url, body, (
      this.getRequestOptions(headers, params, options)
    ) as any);
  }

  // http put
  put(url: string, body: any, headers?: any, params?: any, options?: IHttpOptions) {
    url = this.setURL(url);
    return this.http.put(url, body, this.getRequestOptions(headers, params, options) as any);
  }

  // http delete request
  delete(url: string, headers?: any, params?: any, options?: IHttpOptions) {
    url = this.setURL(url);
    return this.http.delete(url, this.getRequestOptions(headers, params, options) as any);
  }

  // build URL from the url received from service
  private setURL(req: string) {
    if (req.indexOf('https://') === -1) {
      return `${environment.APIEndPoint}/${req}`;
    } else {
      return req;
    }
  }

  // set request parameters
  private getRequestOptions(
    headers?: any,
    params?: any,
    options?: IHttpOptions
  ): IRequestOptions {
    headers = headers || {};
    params = params || {};
    options = options || {};

    if (!headers['Content-Type']) {
      headers['Content-Type'] = 'application/json';
    }
    const customHeader = new HttpHeaders(headers);

    const customParams = new HttpParams();
    for (const key of Object.keys(params)) {
      customParams.append(key, params[key]);
    }
    const requestOptions = Object.assign({}, options);
    requestOptions['headers'] = customHeader;
    requestOptions['params'] = customParams;
    return requestOptions;
  }

}
