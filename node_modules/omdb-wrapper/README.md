# Spotify Wrapper

[![Build Status](https://travis-ci.com/matheusroversi/spotify-wrapper.svg?branch=master)](https://travis-ci.com/matheusroversi/spotify-wrapper) [![Coverage Status](https://coveralls.io/repos/github/matheusroversi/spotify-wrapper/badge.svg?branch=master)](https://coveralls.io/github/matheusroversi/spotify-wrapper?branch=master)

A wrapper to work with the [OMDb Web API](http://www.omdbapi.com/).

## Browser Support

This library relies on [Fetch API](https://fetch.spec.whatwg.org/). And this API is supported in the following browsers.

![Chrome](https://cloud.githubusercontent.com/assets/398893/3528328/23bc7bc4-078e-11e4-8752-ba2809bf5cce.png) | ![Firefox](https://cloud.githubusercontent.com/assets/398893/3528329/26283ab0-078e-11e4-84d4-db2cf1009953.png) | ![Opera](https://cloud.githubusercontent.com/assets/398893/3528330/27ec9fa8-078e-11e4-95cb-709fd11dac16.png) | ![Safari](https://cloud.githubusercontent.com/assets/398893/3528331/29df8618-078e-11e4-8e3e-ed8ac738693f.png) | ![IE](https://cloud.githubusercontent.com/assets/398893/3528325/20373e76-078e-11e4-8e3a-1cb86cf506f0.png) |
--- | --- | --- | --- | --- |
39+ ✔ | 42+ ✔ | 29+ ✔ | 10.1+ ✔ | Nope ✘ |

## Dependencies

This library depends on [fetch](https://fetch.spec.whatwg.org/) to make requests to the OMDb Web API. For environments that don't support fetch, you'll need to provide a [polyfill](https://github.com/github/fetch) to browser or [polyfill](https://github.com/bitinn/node-fetch) to Node.

## Installation

```sh
$ npm install omdb-wrapper --save
```

## How to use

### ES6

```js
// to import a specific method
import OMDb from 'omdb-wrapper';


// using  method
OMDb.search.movies('harry+potter');
```

### CommonJS

```js
const omdbWrapper = require('omdb-wrapper').default;

const omdb = new omdbWrapper({
  apiKEY: 'YOUR_API_KEY_HERE'
});

```

### UMD in Browser

```html
<!-- to import non-minified version -->
<script src="omdb-wrapper.umd.js"></script>

<!-- to import minified version -->
<script src="omdb-wrapper.umd.min.js"></script>
```

After that the library will be available to the Global as `OmdbWrapper`. Follow an example:

```js

const omdb = new omdbWrapper({
  apiKEY: 'YOUR_API_KEY_HERE'
});

const movies = omdb.search.movies('choosen movie');
```

## Methods

> Follow the methods that the library provides.

### search.movies(query)

> Search for informations about Movies with provided query. Test in [OMDb Web](https://www.omdbapi.com/).

**Arguments**

| Argument | Type    | Options           |
|----------|---------|-------------------|
|`query`   |*string* | 'Any search query'|


**Example**

```js
omdb.search.movies('harry+potter')
  .then(data => {
    // do what you want with the data
  })
```

### movie.getMovie(id)

> Search for informations about a specific Movie with provided id. Test in [OMDb Web](https://www.omdbapi.com/).

**Arguments**

| Argument | Type    | Options           |
|----------|---------|-------------------|
|`id`   |*string* | 'Specific id'|


**Example**

```js
omdb.movie.getMovie('tt1201607')
  .then(data => {
    // do what you want with the data
  })
```


## Contributing

Please read [CONTRIBUTING.md](https://gist.github.com/PurpleBooth/b24679402957c63ec426) for details on our code of conduct, and the process for submitting pull requests to us.

## Versioning

We use [SemVer](http://semver.org/) for versioning. For the versions available, see the [tags on this repository](https://github.com/your/project/tags).

## Authors

| ![Matheus Roversi](https://avatars0.githubusercontent.com/u/28660799?s=400&u=019316acbead599a5010f42c1d5f1ad5297a154c&v=4)|
|:---------------------:|
|  [Matheus Roversi](https://github.com/matheusroversi/)   |

See also the list of [contributors](https://github.com/matheusroversi/omdb-wrapper/contributors) who participated in this project.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details
