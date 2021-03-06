const transformationGenerator = require('./transformation-generator')
const configGenerator = require('./config-generator')
const microservices_builder = require('../../../mapping-code-generator/microservices-builder')

updateMapping = async (req, res) => {
    const {microserviceMapping, requestedMicroserviceName} = req.body
    var transform = transformationGenerator(microserviceMapping)
    var config = configGenerator(microserviceMapping)

    const status = await microservices_builder.build_server(
        requestedMicroserviceName,
        transform,
        config
    )    
    if(status === 0) {
        console.log('Success')
        res.send('Microservice has been updated.')
    } else {
        console.log('Error')
        res.send('Error')
    }
    // microservices_builder.start_server(req.body.requestedMicroserviceName)
}

module.exports = updateMapping
