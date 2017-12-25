## Modules

<dl>
<dt><a href="#module_posthtml-include">posthtml-include</a></dt>
<dd><p>Include Plugin</p>
</dd>
</dl>

## Members

<dl>
<dt><a href="#load">load</a> : <code>Object</code></dt>
<dd></dd>
</dl>

## Functions

<dl>
<dt><a href="#plugin">plugin(options)</a> ⇒ <code>function</code></dt>
<dd></dd>
<dt><a href="#include">include(tree)</a> ⇒ <code>Object</code></dt>
<dd></dd>
</dl>

<a name="module_posthtml-include"></a>

## posthtml-include
Include Plugin

**Requires**: <code>module:read-cache</code>, <code>module:posthtml-parser</code>  
**Version**: 2.0.0  
**Author**: Ivan Voischev <voischev.ivan@ya.ru>  
<a name="load"></a>

## load : <code>Object</code>
**Kind**: global variable  

* [load](#load) : <code>Object</code>
    * [.sync(src)](#load.sync) ⇒ <code>Object</code>
    * [.async(src)](#load.async) ⇒ <code>Promise</code>

<a name="load.sync"></a>

### load.sync(src) ⇒ <code>Object</code>
Sync Mode

**Kind**: static method of [<code>load</code>](#load)  
**Returns**: <code>Object</code> - PostHTML Tree  

| Param | Type | Description |
| --- | --- | --- |
| src | <code>String</code> | File |

<a name="load.async"></a>

### load.async(src) ⇒ <code>Promise</code>
Async Mode

**Kind**: static method of [<code>load</code>](#load)  
**Returns**: <code>Promise</code> - PostHTML Tree  

| Param | Type | Description |
| --- | --- | --- |
| src | <code>String</code> | File |

<a name="plugin"></a>

## plugin(options) ⇒ <code>function</code>
**Kind**: global function  
**Returns**: <code>function</code> - Include Plugin  

| Param | Type | Description |
| --- | --- | --- |
| options | <code>Object</code> | Options |

<a name="include"></a>

## include(tree) ⇒ <code>Object</code>
**Kind**: global function  
**Returns**: <code>Object</code> - tree  PostHTML Tree (Transformed)  

| Param | Type | Description |
| --- | --- | --- |
| tree | <code>Object</code> | PostHTML Tree |

