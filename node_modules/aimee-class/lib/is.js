exports.node = function(){
    return typeof global === 'object' && !!global.process && !!global.process.env
}

exports.browser = function(){
    return typeof window === 'object' && !!window.document
}
