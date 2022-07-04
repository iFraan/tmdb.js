const key = 'your-key'

const { API } = require('./index');
const client = new API(key, 'es')

m = (async () => {

    try {
        const search = await client.search('from the Loop')
        const r = search.results[0]
        console.log('First Result: ', r)
        const details = await client[r.media_type](r.id)
        console.log('Details: ', details)
    } catch (e) {
        console.log(e) 
        /* Did not find any results for [from the Loopsss] */
    }

})

m()