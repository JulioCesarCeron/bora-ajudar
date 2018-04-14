const functions = require('firebase-functions')
const admin = require('firebase-admin')

const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const app = express()

app.use(cors())
admin.initializeApp(functions.config().firegase)
// admin.initializeApp()


const request = require('request-promise')
const parse = require('xml2js').parseString


//exemplo de dados
const email = 'contapagseguro@email.com'
// token de transação
const token = 'tonekpagseguro'
const checkoutUrl = 'https://pagseguro.uol.com.br/v2/checkout/payment.html?code='

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

app.get('/', (req, res) => {
    res.send('BoraAjudar Server')
})

app.post('/donate', (req, res) => {
    request({
        uri: 'https://ws.pagseguro.uol.com.br/v2/checkout',
        methodo: 'POST',
        form: {
            token: token,
            email: email,
            currency: 'BRL',
            itemId1: req.body.campanha,
            itemDescricao: 'Doação',
            itemQuantity: '1',
            itemAmount1: req.body.valor
        },
        headers: {
            'Content-Type': 'application/x-ww-urlencoded; charset=UTF-8'
        }
    })
    .then( data => {
        parse(data, (err, json) => {
            res.send({
                url: checkoutUrl + json.checkout.code[0]
            })
        })
    })
})

app.post('/webhook', (req, res) => {
    // adicionar codigo da notificação
    const notificationCode = req.body.notificationCode
    const consultaNotificacao = 'https://ws.pagseguro.uol.com.br/v3/transactions/notifications'
    request (consultaNotificacao+notificationCode+'?token='+token+'&email='+email)
    .then( notificationXML => {
        parse(notificationXML, (err, transaction) => {
            const transactionValue = transaction.transaction
            const status = transaction.status[0]
            const amount = transaction.grossAmount[0]
            const campanha = transaction.items[0].item[0].id[0]

            // atualizando a campanha
            admin
                .database()      
                .ref('/transactions/'+campanha)
                .once('value')
                .then(value => {
                    const campanhaAtual = value.val()
                    const doado = parseFloat(campanhaAtual.doado + parseFloat(amount))
                    campanhaAtual.doado = doado.toFixed(2)
                    admin
                        .database()
                        .ref('/transactions/'+campanha)
                        .set(campanhaAtual)
                        .then(() => {
                            res.send('ok')
                        })
                    })
                
            // salvando a transação
            admin
                .database()
                .ref('/transactions/'+transactionValue.code[0])
                .set(transactionValue)
                .then(() => {
                })

            
            res.send('ok')
        })
    })
})

exports.api = functions.https.onRequest(app)
