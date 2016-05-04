/* jshint mocha: true, maxlen: false */
var plugin = require('..');
var posthtml = require('posthtml');
var expect = require('chai').expect;

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
    it('default include html', function(done) {
        test(
            '<html><head><title>Test</title></head><body><include src="./test/blocks/button/button.html"></body></html>',
            '<html><head><title>Test</title></head><body><div class="button"><div class="button__text">Text</div></div>\n</body></html>',
            { encoding: 'utf-8' },
            done
        );
    });

    it('root options', function(done) {
        test(
            '<include src="./button/button.html">',
            '<div class="button"><div class="button__text">Text</div></div>\n',
            { root: './test/blocks/' },
            done
        );
    });

    it('addDependencyTo option', function(done) {
        var includePath = require('path').resolve('./test/blocks/button/button.html');

        function test(filePath) {
            try {
                expect(filePath).to.eql(includePath);
                done();
            } catch(err) {
                done(err);
            }
        }

        posthtml()
            .use(plugin({ addDependencyTo: { addDependency: test }}))
            .process('<include src="./test/blocks/button/button.html">');
    });
});
