## Polling with ES6 Javascript & jQuery
              
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

## Options

| Property  | Type     | Default                        | Description |                           
|-----------|----------|--------------------------------------|-----------------------------------------------|
| delay     | Integer  | 30000                                | The number of milliseconds to delay execution of the next |
| maxFailed | Integer  | 3                                  | The maximum number of failed requests before giving up  |
| limit     | Integer  | -1                                   | The maximum number of requests an instance can process, or -1 to remove limit |
| cache     | Boolean  | false                              | If set to false, it will force requested pages not to be cached by the browser |
| timeout   | Integer  | 10000                                | Set a timeout (in milliseconds) for the request |
| onSuccess | Function | (data, textStatus, xhr) => {}        | A function to be called if the request succeeds |
| onError   | Function | (xhr, textStatus, errorThrown) => {} | A function to be called if the request fails |  
