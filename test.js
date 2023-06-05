const key = 'your-key'

const { API } = require('./index');
const api = new API(key, 'es')

const test = (async () => {

    try {
        const search = await api.search('Person of Interest')
        const [first_result] = search.results;
        console.log('First Result: ', first_result)

        const details = await api[first_result.media_type](first_result.id)
        console.log('Details: ', details)

        const similar = await api.similar(first_result.media_type, first_result.id)
        console.log('Similar: ', similar.results[0])

        const providers = await api.providers(first_result.media_type, first_result.id)
        console.log('Providers: ', providers.results['US']) // Country Code
    } catch (e) {
        console.log(e)
        /* Did not find any results for [from the Loopsss] */
    }

})

test()