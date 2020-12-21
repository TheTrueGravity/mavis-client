const request = require('request')
const encrypt = require('../encryption/encrypt')
const decrypt = require('../encryption/decrypt')

var send_data = function (packet, user_data, data_callback) {
    var encrypted_data = encrypt(user_data.client_info.key, packet)
    const post_data = {
        client_name: user_data.client_info.friendly_name,
        data: encrypted_data
    }
    const req = request(`http://${user_data.server_info.hostname}:${user_data.server_info.communication_port}`, {
        method: 'POST',
        body: JSON.stringify(post_data)
    }, (err, res, body) => {
        var data = JSON.parse(decrypt(user_data.client_info.key, body))
        data_callback(data)
    })
}

module.exports = send_data;