# position-in-file-async
![](https://travis-ci.org/arncet/position-in-file-async.svg?branch=master)

A [node.js](https://nodejs.org/en/) util to find asynchronously element position on a file of a folder.

`position-in-file-async` is the async version of [position-in-file](https://github.com/arncet/position-in-file).

## How to use :

Install `position-in-file-async` via npm :

```
npm install --save position-in-file-async
```

Use it : 

```javascript
const positionInFileAsync = require('position-in-file-async')

//positionInFileAsync(needle, haystack, options)

//Exemple :
positionInFileAsync('element-to-look-for', 'where-to-search', {deep: false, ...}).then(result => console.log(result))

//Result : 
[
	{file: 'finded-in-this-file.ext', lines: {2: [5]}}, //Line 2 column 5
	{file: 'finded-here.too.ext', lines: {1: [2, 19]}}, //Line 1 column 5, line 1 column 19
	...
]
```

If node doest display deep object you can use [util.inspect](https://nodejs.org/api/util.html#util_util_inspect_object_options) : 

```javascript
	const inspect = require('util').inspect
	
	positionInFileAsync('element-to-look-for', 'where-to-search').then(result => console.log(inspect(result, {showHidden: false, depth: null})))
```

## Parameters

* **`needle`** *(String || RegExp)* : The element to search, can be a *string* or a *regular expression*.
* **`haystack`** *(String)* : The path where the research will be executed, it can be a file or folder path. If *haystack* is not defined the research will be excecuted in the current folder.
* **`options`** *(Object)* : Some aditionnals options :
	* **`deep`** *(Boolean)* : If the research will be apply on deep folder. Default : ```true```.
	* **`ignore `** : *(Array)* An array to define the file/filter to ignore. Default : empty array.
	* **`fullPathRequired `** *(Boolean)* : If full path need to be specified on ```option.ignore``` or just the file name. Default : ```true```.
	* **`gitIgnore `** *(Boolean)* : If .gitIgnore's file/folder need to be ignored. Default : ```true```.
	
## License :

MIT
