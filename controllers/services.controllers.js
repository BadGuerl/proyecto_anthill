module.exports.offersList = (req, res, next) => {
    res.render ('services/offers');
}

module.exports.newOffer = (req, res, next) => {
    res.render ('services/new');
}

module.exports.listServices = (req, res, next) => {
    res.render ('otherProfile/list');
}