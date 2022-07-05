const key = 'your-key'

const { API } = require('./index');
const api = new API(key, 'es')

m = (async () => {

    try {
        const search = await api.search('Person of Interest')
        const r = search.results[0]
        console.log('First Result: ', r)

        const details = await api[r.media_type](r.id)
        console.log('Details: ', details)

        const similar = await api.similar(r.media_type, r.id)
        console.log('Similar: ', similar.results[0])
        
        const providers = await api.providers(r.media_type, r.id)
        console.log('Providers: ', providers.results['US']) // Country Code
    } catch (e) {
        console.log(e) 
        /* Did not find any results for [from the Loopsss] */
    }

})

m()