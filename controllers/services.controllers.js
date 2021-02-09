module.exports.offersList = (req, res, next) => {
    res.render ('services/offers');
}

module.exports.newOffer = (req, res, next) => {
    res.render ('services/new');
}