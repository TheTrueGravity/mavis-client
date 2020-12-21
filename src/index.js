const send_data = require('./send_data');
const mavis_utils = require('mavis-utils')
const user_data = require('./user_data.json');
const { exit } = require('process');
const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
})

readline.question('Data to ask mavis:  ', (answer) =>  {
    send_data({
        packet: 'get_command',
        data: {
            speech: answer
        }
    }, user_data, (data) => {
        console.log(data)
        exit()
    })
})
