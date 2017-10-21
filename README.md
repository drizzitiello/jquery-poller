## Polling with ES6, Javascript & jQuery
### Usage

#### 1. Start polling after 10 seconds

```
import Poller from 'poller';

const p = new Poller(url, {
    delay: 10000,
    onSuccess: (self, data, xhr) => {
        console.log(xhr.status);
        console.log(self.getNumberOfRequests());
    },
    onError: (self, error) => {
    }
});

p.startPolling();
```

#### 2. Limit the number of failed requests

```
var p = new Poller(url, {
    delay: 10000,
    maxFailed: 2
});

p.startPolling();
```

#### 3. Make an initial request and start polling after 10 seconds

```
var p = new Poller(url, {
    delay: 10000
});

p.makeRequest();
p.startPolling();
```
