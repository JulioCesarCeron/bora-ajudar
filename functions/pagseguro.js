const request = require('request-promise')
const parse = require('xml2js').parseString

//exemplo de dados
const email = 'contapagseguro@email.com'

// token de transação
const token = 'tonekpagseguro'

request({
    uri: 'https://ws.pagseguro.uol.com.br/v2/checkout',
    methodo: 'POST',
    form: {
        token: token,
        email: email,
        currency: 'BRL',
        itemId1: 'idCampanha',
        itemDescricao: 'Doação',
        itemQuantity: '1',
        itemAmount1: '2.00'
    },
    headers: {
        'Content-Type': 'application/x-ww-urlencoded; charset=UTF-8'
    }
})
.then( data => {
    console.log('data', data);
})


// https://pagseguro.uol.com.br/v2/checkout/payment.html?code=