
const list = async (signal) => {
    try {
        let response = await fetch('/api/charities/', {
            method: 'GET',
            signal: signal,


        },

    )
        return response.json()
    } catch(err) {
        console.log(err)
    }
}

export {
    list
}