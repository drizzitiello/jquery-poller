import $ from 'jquery';
import HttpRequest from 'http_request';

export default class Poller {
    /**
     * Usage:
     *
     * a) Start polling after 10 seconds:
     *
     *     var p = new Poller(url, {
     *         delay: 10000,
     *         onSuccess: function(self, data, xhr) {
     *             console.log(xhr.status);
     *             console.log(self.getNumberOfRequests());
     *         },
     *         onError: function(self, error) {
     *         }
     *     });
     *
     *     p.startPolling();
     *
     * b) Limit the number of failed requests:
     *
     *     var p = new Poller(url, {
     *         delay: 10000,
     *         maxFailed: 2
     *     });
     *
     *     p.startPolling();
     *
     * c) Make an initial request and start polling after 10 seconds:
     *
     *     var p = new Poller(url, {
     *         delay: 10000
     *     });
     *
     *     p.makeRequest();
     *     p.startPolling();
     *
     */
    constructor(url, options) {
        const DEFAULT_OPTIONS = {
            delay:      30000,   // milliseconds to delay request
            maxFailed:  3,       // max number of failed requests before giving up
            limit:      -1,      // limit  the number of successful requests (-1 for unlimited)
            cache:      false,   // append cache buster to query string
            timeout:    10000,   // milliseconds before request timeouts and fails
            onSuccess:  function(){},
            onError:    function(){}
        };

        this.url = url;
        this.options = $.extend(DEFAULT_OPTIONS, options);
        this.isPolling = false;
        this.timeoutId = null;
        this.requestsCount = 0;
        this.errorsCount = 0;
    }

    makeRequest() {
        this.requestsCount++;

        HttpRequest.get(this.url, {
            cache: this.options.cache,
            timeout: this.options.timeout,
            onSuccess: this.onSuccess.bind(this),
            onError: this.onError.bind(this)
        });
    }

    delayRequest() {
        if (!this.isPolling) {
            return;
        }

        if (this.timeoutId) {
            window.clearTimeout(this.timeoutId);
        }

        this.timeoutId = window.setTimeout(() => {
            this.makeRequest();
        }, this.options.delay);
    }

    startPolling() {
        if (this.url) {
            this.isPolling = true;
            this.delayRequest();
        }
    }

    stopPolling() {
        window.clearTimeout(this.timeoutId);
        this.isPolling = false;
    }

    getNumberOfRequests() {
        return this.requestsCount;
    }

    isLimitExceeded() {
        return this.options.limit > 0 && this.requestsCount >= this.options.limit;
    }

    onSuccess(data, status, xhr) {
        this.options.onSuccess(this, data, xhr);

        if (this.isPolling) {
            if (this.isLimitExceeded()) {
                this.stopPolling();
            } else {
                this.errorsCount = 0;
                this.delayRequest();
            }
        }
    }

    onError(error) {
        this.options.onError(this, error);

        if (this.isPolling) {
            if (this.errorsCount >= this.options.maxFailedRequests) {
                this.stopPolling();
            } else {
                this.errorsCount++;
                this.delayRequest();
            }
        }
    }
}
