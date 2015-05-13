require('../index');
var http = require('http');
var expect = require('chai').expect;

describe('dns-notfound-what', function () {
  it('should add the hostname to the message', function (done) {
    http.get('http://foaidosiaoidosajihdsiahidsa.com')
      .on('error', function (err) {
        expect(err.message).to.contain('foaidosiaoidosajihdsiahidsa.com');
        done();
      });
  });

  it('should add the hostname as a property', function (done) {
    http.get('http://foaidosiaoidosajihdsiahidsa.com')
      .on('error', function (err) {
        expect(err.hostname).to.equal('foaidosiaoidosajihdsiahidsa.com');
        done();
      });
  });

});