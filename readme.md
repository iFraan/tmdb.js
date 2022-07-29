<div align="center">
	<h1>tmdb.js</h1>
   <a href="https://www.codefactor.io/repository/github/ifraan/tmdb.js"><img src="https://www.codefactor.io/repository/github/ifraan/tmdb.js/badge" alt="CodeFactor"/></a>
   <a href="https://www.npmjs.com/package/@ifraan_/tmdb.js"><img src="https://badgen.net/npm/v/@ifraan_/tmdb.js?color=blue" alt="NPM-Version"/></a>
   <a href="https://www.npmjs.com/package/@ifraan_/tmdb.js"><img src="https://badgen.net/npm/dt/@ifraan_/tmdb.js?color=blue" alt="NPM-Downloads"/></a>
   <a href="https://github.com/iFraan/tmdb.js"><img src="https://badgen.net/github/stars/iFraan/tmdb.js?color=yellow" alt="Github Stars"/></a>
   <a href="https://github.com/iFraan/tmdb.js/issues"><img src="https://badgen.net/github/issues/iFraan/tmdb.js?color=green" alt="Issues"/></a>
   <h2>This a wrapper of TheMovieDB Public API</h2>
</div>

## Instalattion
You gotta request a Free API key on [TMDB](https://developers.themoviedb.org/3/getting-started/introduction)
### Dependencies
``
axios
``

To install use:
```shell
npm i @ifraan_/tmdb.js
```
To use this wrapper you first need to initialize the class API
```js
const { API } = require('@ifraan_/tmdb.js')
const key = 'your-key-from-tmdb';
const lang = 'es' // OPTIONAL -> Pass a ISO 639-1 value (en for deafult)
const api = new API(key, lang)
```

| Methods | Description |
| - | - |
| search | Search for Movies and TV-Shows | 
| tv | Details for TV Shows |
| movie | Details for Movies |
| similar | Similar entries for movies/tv |
| providers | Details for Movies |
| raw | Returns every response got so far, so you can re-use the existing data |

Example code:
```js
const { API } = require('@ifraan_/tmdb.js');
const api = new API('your-key', 'es')
	try {
		const search = await api.search('from the Loop')
		const r = search.results[0]
		console.log('First Result: ', r)
		/*
		First Result:  {
			backdrop_path: 'https://image.tmdb.org/t/p/original/6LmHxVcp5dgGyHG8kTVcrQxbaHq.jpg',
			first_air_date: '2020-04-03',
			genre_ids: [ 18, 9648, 10765 ],
			id: 93784,
			media_type: 'tv',
			name: 'Historias del bucle',
			origin_country: [ 'US' ],
			original_language: 'en',
			original_name: 'Tales from the Loop',
			overview: 'Tales from the Loop explora la fantástica y misteriosa ciudad y las personas que viven por encima de ‘The Loop’, una máquina construida para desbloquear y explorar los misterios del universo, haciendo posible cosas que anteriormente solo estaban relegadas a la ciencia ficción. Basada en la obra de Simon Stålenhag.',
			popularity: 12.117,
			poster_path: 'https://image.tmdb.org/t/p/original/56D0QFyLhrRp1ZTBz8Gw10qtZas.jpg',
			vote_average: 7,
			vote_count: 251
		}
		*/
		const details = await api[r.media_type](r.id)
		console.log('Details: ', details)
		/* 
		Details:  {
			adult: false,
			backdrop_path: '/6LmHxVcp5dgGyHG8kTVcrQxbaHq.jpg',
			created_by: [
			    {
			      id: 1710710,
			      credit_id: '5e8943ef6c74b900159683df',
			      name: 'Nathaniel Halpern',
			      gender: 2,
			      profile_path: null
			    }
			],
			episode_run_time: [ 50 ],
			first_air_date: '2020-04-03',
			genres: [
			    { id: 18, name: 'Drama' },
			    { id: 9648, name: 'Misterio' },
			    { id: 10765, name: 'Sci-Fi & Fantasy' }
			],
			homepage: 'https://www.amazon.com/dp/B084NW4C2K',
			id: 93784,
			in_production: false,
			languages: [ 'en' ],
			last_air_date: '2020-04-03',
			last_episode_to_air: {
				air_date: '2020-04-03',
				episode_number: 8,
				id: 2200694,
				name: 'Hogar',
				overview: 'Un niño busca a su hermano perdido en un intento por recuperar 			pasado.',
				production_code: '',
				runtime: 50,
				season_number: 1,
				still_path: '/h9ruc4rXCJEbgFxHAou7PtMG8iX.jpg',
				vote_average: 8.1,
				vote_count: 8
			},
			name: 'Historias del bucle',
			next_episode_to_air: null,
			networks: [
			    {
			      id: 1024,
			      name: 'Amazon',
			      logo_path: '/ifhbNuuVnlwYy5oXA5VIb2YR8AZ.png',
			      origin_country: ''
			    }
			],
			number_of_episodes: 8,
			number_of_seasons: 1,
			origin_country: [ 'US' ],
			original_language: 'en',
			original_name: 'Tales from the Loop',
			overview: 'Tales from the Loop explora la fantástica y misteriosa ciudad y personas que viven por encima de ‘The Loop’, una máquina construida para desbloquear y explorar los 	misterios del universo, haciendo posible cosas anteriormente solo estaban relegadas a la ciencia ficción. Basada en la obra de Simon Stålenhag.',
			popularity: 12.117,
			poster_path: '/56D0QFyLhrRp1ZTBz8Gw10qtZas.jpg',
			production_companies: [
			    {
			      id: 101405,
			      logo_path: null,
			      name: '6th & Idaho',
			      origin_country: 'US'
			    },
			    ...
			],
			production_countries: [ { iso_3166_1: 'US', name: 'United States of America' } ],
			seasons: [
			    {
			      air_date: '2020-03-11',
			      episode_count: 1,
			      id: 180625,
			      name: 'Especiales',
			      overview: '',
			      poster_path: null,
			      season_number: 0
			    },
			    {
			      air_date: '2020-04-03',
			      episode_count: 8,
			      id: 132915,
			      name: 'Temporada 1',
			      overview: '',
			      poster_path: '/moNfJvC7Ivr5I8eqSYrSLcs9Ukx.jpg',
			      season_number: 1
			    }
			],
			spoken_languages: [ { english_name: 'English', iso_639_1: 'en', name: 'English' } ],
			status: 'Ended',
			tagline: '',
			type: 'Scripted',
			vote_average: 7,
			vote_count: 251
		}
		*/
		const similar = await api.similar(r.media_type, r.id)
        console.log('Similar: ', similar.results[0])
		/* 
		Similar:  {
			adult: false,
			backdrop_path: '/tY6ZweSX4Mg8AYNSia9vyH1su8k.jpg',
			genre_ids: [ 16, 10765 ],
			id: 1095,
			name: 'Ghost in the Shell: Stand Alone Complex',
			origin_country: [ 'JP' ],
			original_language: 'ja',
			original_name: '攻殻機動隊 STAND ALONE COMPLEX',
			overview: "En un futuro no muy lejano, el mundo se encuentra totalmente computerizado. Seres humanos con interfaces y cerebros artificiales se funden con máquinas alcanzando un nuevo nivel de existencia entre el mundo			físico y la red digital. Para combatir los crímenes relacionados con las nuevas tecnologías ha sido creada una fuerza de choque antiterrorista con individuos 'mejorados' capaces de perseguir toda clase de criminales tanto			en el mundo real como en el virtual. La Teniente cyborg Motoko Kusanagi y sus compañeros de la Sección 9 deben resolver una delicada crisis de rehenes, detener un tanque de asalto de última generación fuera de control y			determinar la causa de los misteriosos suicidios de una serie de robots obsoletos. Todo ello antes de afrontar el desafío sin precedentes del esquivo pirata informático conocido como el 'Hombre que ríe'.",
			popularity: 24.517,
			poster_path: '/1Ix4kRPwWjM9wcrvWA25lXi781J.jpg',
			first_air_date: '2002-10-01',
			vote_average: 8.229,
			vote_count: 264
		}
		*/
        const providers = await api.providers(r.media_type, r.id)
        console.log('Providers: ', providers.results['US']) // Country Code
		/* 
		Providers:  {
			link: 'https://www.themoviedb.org/tv/1411-person-of-interest/watch?locale=US',
			flatrate: [
			  {
			    display_priority: 8,
			    logo_path: '/Ajqyt5aNxNGjmF9uOfxArGrdf3X.jpg',
			    provider_id: 384,
			    provider_name: 'HBO Max'
			  }
			],
			buy: [
			  {
			    display_priority: 2,
			    logo_path: '/peURlLlr8jggOwK53fJ5wdQl05y.jpg',
			    provider_id: 2,
			    provider_name: 'Apple iTunes'
			  },
			  ...
			]
		}
		*/
	} catch (e) {
		console.log(e) 
		/* Did not find any results for [from the Loopsss] */
	}
```



## Disclaimer
This project is fully for educational purposes.