# Module: Quotes
This is a module for [MagicMirror²](https://github.com/MichMich/MagicMirror).

The `MMM-quotes` module displays a random quote from the following online quote-services:
- `favqs`:  [FavQs](https://favqs.com/about)
- `forismatic_en`:  [Forismatic (en)](http://forismatic.com/)
- `forismatic_ru`:  [Forismatic (ru)](http://forismatic.com/ru/)
- ... please send PRs if you know others

## Using the module

To use this module, add it to the modules array in the `config/config.js` file:
````javascript
modules: [
	{
		module: 'MMM-quote',
		position: 'lower_third',
		config: {
			// The config property is optional.
			// See 'Configuration options' for more information.
		}
	}
]
````

## Configuration options

The following properties can be configured:

* `services`: array of service names (see above) to be used;
* `showAuthor`: set to `false` if you do not want the author of the quote to be displayed;
* `updateInterval`: interval between the quote updates; please note the free limits of the services used;
* `fadeSpeed`: the duration of the fade-out animation;
* `classes`: class list of the module; by default equals to `medium bright`;
* `authorClasses`: class list of the author node; by default equals to `small normal align-right`.
