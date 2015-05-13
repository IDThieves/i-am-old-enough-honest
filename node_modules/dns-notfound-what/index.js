var dns = require('dns');
var debug = require('debug')('dns.lookup');

var pending_lookups = 0;
var lookup = dns.lookup;
dns.lookup = function() {
  var args = Array.prototype.slice.call(arguments);
  var domain = args[0];
  var callback = args.pop();

  debug('Lookup for: ' + domain + '. Pending lookups: ' + pending_lookups + '.');

  pending_lookups++;
  var new_callback = function (err) {
    pending_lookups--;

    debug('Lookup for: ' + domain + ' finished. Result: ' + (!err ? 'success' : 'failure') + '.');

    if (!err) {
      callback.apply(null, arguments);
      return;
    }

    err.message += '. Hostname: ' + domain;
    err.hostname = domain;

    callback(err);
  };
  args.push(new_callback);
  lookup.apply(null, args);
};