/* jshint mocha: true, maxlen: false */
var plugin = require('..');
var path = require('path');
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
            '<include src="./button/button.html"></include>',
            '<div class="button"><div class="button__text">Text</div></div>\n',
            { root: './test/blocks/' },
            done
        );
    });

    it('file not exists', function(done) {
        test(
            '<include src="./button/button-not-exists.html"></include>',
            '<include src="./button/button-not-exists.html"></include>',
            {},
            done
        );
    });

    it('addDependencyTo option', function(done) {
        var includePath = path.resolve('./test/blocks/button/button.html');

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

    it('parse option', function(done) {
        posthtml([
            plugin({
                parse: {
                    parser: require('posthtml-parser'),
                    filter: function(filePath) { return /button\.html/.test(filePath); }
                }
            }),
            function(tree) {
                tree.match({ attrs: { 'class': 'button' }}, function(node) {
                    node.tag = 'button';
                    return node;
                });
            }
        ]).process('<include src="./test/blocks/button/button.html">').then(function(result) {
            expect(result.html).to.eql('<button class="button"><div class="button__text">Text</div></button>\n');
            done();
        }).catch(function(error) {
            done(error);
        });
    });

    it('parse default options', function(done) {
        posthtml([
            plugin(),
            function(tree) {
                tree.match({ tag: 'div' }, function() { done(); });
            }
        ]).process('<include src="./test/blocks/button/button.html">');
    });

    it('parse filter option', function(done) {
        posthtml([
            plugin({
                parse: {
                    parser: require('posthtml-parser'),
                    filter: function(filePath) {
                        try {
                            expect(filePath).to.contain('button.html');
                            done();
                        } catch(err) {
                            done(err);
                        }
                    }
                }
            })
        ]).process('<include src="./test/blocks/button/button.html">');
    });
});
