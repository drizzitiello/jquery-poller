import $ from 'jquery';


export default class HttpRequest {

    static get(url, options) {
        this.request(url, 'get', options);
    }

    static post(url, options) {
        this.request(url, 'post', options);
    }

    static request(url, method, options) {
        const DEFAULT_OPTIONS = {
            cache: false,
            timeout: 10000,
            onSuccess: () => {},
            onError: () => {}
        };

        options = $.extend({}, DEFAULT_OPTIONS, options);

        $.ajax({
            url: url,
            method: method,
            cache: options.cache,
            timeout: options.timeout,
            success: options.onSuccess,
            error: options.onError
        });
    }
}
