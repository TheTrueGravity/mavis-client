const request = require('request')
const encrypt = require('./encryption/encrypt')
const decrypt = require('./encryption/decrypt')
const user_data = require('./user_data.json')

function get_new_key(friendly_name) {
    var encrypted_data = encrypt(user_data.client_info.key, {
        packet: "generate_new_key",
        data: {
            friendly_name: friendly_name
        }
    })
    const post_data = {
        client_name: user_data.client_info.friendly_name,
        data: encrypted_data
    }
    const req = request(`http://${user_data.server_info.hostname}:${user_data.server_info.communication_port}`, {
        method: 'POST',
        body: JSON.stringify(post_data)
    }, (err, res, body) => {
        var data = JSON.parse(decrypt(user_data.client_info.key, body))
        console.log(data)
    })
}

get_new_key("charlie-1")