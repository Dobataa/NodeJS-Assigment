const url = 'http://api.exchangeratesapi.io/v1/latest?access_key=339ee2e5ada4e38a19f5867c837136d6';

async function getRates(){
    try {
        const responce = await fetch(url);

        if(responce.ok != true){
            const error = await responce.json();
            throw new Error(error.message || 'Error fetching exchange rates')
        }

        return responce.json();

    } catch (error) {
        console.log(error.message);
        throw error;
    }
}

module.exports = getRates;