const headers = {
    'Authorization': 'Bearer ',
    'Accept': 'application/json'
}
const axios = require('axios');
const url = 'https://api.themoviedb.org/3/{endpoint}?language={lang}';
const IMAGE_URL = 'https://image.tmdb.org/t/p/original'

const fetch = (url) => new Promise((resolve, reject) => {

    axios.get(url, { headers }).then(res => {
        resolve(res.data)
    })
    .catch(err => {
        reject(err.response.data)
    })

})


class API {

    /**
     * Creates an object ready to recieve requests.
     * @param {string} apiKey 
     * @private // idk if it does something outside of typescript, but there it is
     */
    constructor (apiKey, language = 'en'){
        this.language = language;
        headers['Authorization'] = 'Bearer ' + apiKey;
        this._raw = {
            movies: [],
            tv: [],
            search: [],
            similar: [],
            providers: []
        }
    }

    /**
     * Searchs for movies of tvshows
     * @param {string} query 
     * @returns Results for the search
     */
     async search(query){
        try {
            this._raw.search.push(await fetch(url.replace('{lang}', this.language).replace('{endpoint}', '/search/multi') + `&query=${query}`));
            if (!this._raw.search[this._raw.search.length - 1].results.length > 0) throw new Error(`Did not find any results for [${query}]`);
            // Correct images path
            const res = this._raw.search[this._raw.search.length - 1].results;
            for (let i = 0; i < res.length; i++) {
                const item = res[i];
                this._raw.search[this._raw.search.length - 1].results[i]['backdrop_path']    = IMAGE_URL + item['backdrop_path']
                this._raw.search[this._raw.search.length - 1].results[i]['poster_path']      = IMAGE_URL + item['poster_path']
            }
        } catch (e) {
            // console.log(e)
            if (e.status_message) throw new Error(e.status_message);
            throw new Error(e.message);
        }
        return this._raw.search[this._raw.search.length - 1];
    }
    /**
     * Gets TV-Show info by ID
     * @param {string} query 
     * @returns Show details
     */
     async tv(query){
        try {
            this._raw.tv = await fetch(url.replace('{lang}', this.language).replace('{endpoint}', '/tv/' + query));
        } catch (e) {
            // console.log(e)
            if (e.status_message) throw new Error(e.status_message);
            throw new Error(e.message);
        }
        return this._raw.tv;
    }
    /**
     * Gets Movie info by ID
     * @param {string} query 
     * @returns Show details
     */
     async movie(query){
        try {
            this._raw.movies.push(await fetch(url.replace('{lang}', this.language).replace('{endpoint}', '/movie/' + query)));
        } catch (e) {
            // console.log(e)
            if (e.status_message) throw new Error(e.status_message);
            throw new Error(e.message);
        }
        return this._raw.movies[this._raw.movies.length - 1];
    }

    /**
     * Gets similar entries by tv/movie id
     * @param {string} type movie / tv
     * @param {string} id movie /tv id
     * @returns Similar entries
     */
     async similar(type, id){
        console.log(type)
        if (!(['movie', 'tv'].includes(type))) throw new Error('type can only be "movie" or "tv"');
        try {
            this._raw.similar.push(await fetch(url.replace('{lang}', this.language).replace('{endpoint}', `/${type}/${id}/similar`)));
        } catch (e) {
            // console.log(e)
            if (e.status_message) throw new Error(e.status_message);
            throw new Error(e.message);
        }
        return this._raw.similar[this._raw.similar.length - 1];
    }

    /**
     * Gets providers by tv/movie id
     * @param {string} type movie / tv
     * @param {string} id movie /tv id
     * @returns Providers
     */
     async providers(type, id){
        console.log(type)
        if (!(['movie', 'tv'].includes(type))) throw new Error('type can only be "movie" or "tv"');
        try {
            this._raw.providers.push(await fetch(url.replace('{lang}', this.language).replace('{endpoint}', `/${type}/${id}/watch/providers`)));
        } catch (e) {
            // console.log(e)
            if (e.status_message) throw new Error(e.status_message);
            throw new Error(e.message);
        }
        return this._raw.providers[this._raw.similar.length - 1];
    }


    

    get raw() { return this._raw; }
}

const GENRES = 
{
    '12': 'Adventure',
    '14': 'Fantasy',
    '16': 'Animation',
    '18': 'Drama',
    '27': 'Horror',
    '28': 'Action',
    '35': 'Comedy',
    '36': 'History',
    '37': 'Western',
    '53': 'Thriller',
    '80': 'Crime',
    '99': 'Documentary',
    '878': 'Science Fiction',
    '9648': 'Mystery',
    '10402': 'Music',
    '10749': 'Romance',
    '10751': 'Family',
    '10752': 'War',
    '10759': 'Action & Adventure',
    '10762': 'Kids',
    '10763': 'News',
    '10764': 'Reality',
    '10765': 'Sci-Fi & Fantasy',
    '10766': 'Soap',
    '10767': 'Talk',
    '10768': 'War & Politics',
    '10770': 'TV Movie'
}


module.exports = {
    API,
    GENRES,
    IMAGE_URL
}