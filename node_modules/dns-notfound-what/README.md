Add the domain name to the dns ENOTFOUND error in node 0.10 and earlier versions.

[This issue has been resolved since node 0.11.8.](https://github.com/joyent/node/blob/v0.11.8-release/lib/dns.js#L49).

If your node.js process crash with an error like this:

```
events.js:72
        throw er; // Unhandled 'error' event
              ^
Error: getaddrinfo ENOTFOUND
    at errnoException (dns.js:37:11)
    at Object.onanswer [as oncomplete] (dns.js:124:16)
```

This is because somewhere you are doing a request without handling the "error" event.

But the node.js error doesn't say what's the domain it can't resolve.

This module adds the domain:

```
events.js:72
        throw er; // Unhandled 'error' event
              ^
Error: getaddrinfo ENOTFOUND. Domain: blabla-yogurt-blabliblu-blo.com
    at errnoException (dns.js:37:11)
    at Object.onanswer [as oncomplete] (dns.js:124:16)
```

The new error also has a "hostname" property with the hostname as in 0.11.


## Install

```
npm i dns-notfound-what --save
```

## Usage

Put this at the beginning of your application:

```
require('dns-notfound-what');
```

## Debug

Optionally you can enable debug logs:

```
DEBUG=dns.lookup node server.js
```

## License

MIT 2014 - José F. Romaniello