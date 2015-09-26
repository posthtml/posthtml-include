/* jshint mocha: true, maxlen: false */
var plugin = require('..');
var posthtml = require('posthtml');
var expect = require('chai').expect;

var HTMLINCLUDE = '<html><head><title>Test</title></head><body><include src="./test/blocks/button/button.html"></body></html>',
    HTML = '<html><head><title>Test</title></head><body><div class="button"><div class="button__text">Text</div></div>\n</body></html>';

function test(input, output, options, done) {
    posthtml()
        .use(plugin(options))
        .process(input)
        .then(function(result) {
            expect(output).to.eql(result.html);
            done();
        }).catch(function(error) {
            done(error);
        });
}

describe('Simple test', function() {
    it('include html', function(done) {
        test(
            HTMLINCLUDE,
            HTML,
            { encoding: 'utf-8' },
            done
        );
    });
});
