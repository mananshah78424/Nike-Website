function profileController() {
    return {
        profile(req, res) {
            res.render("profile")
        }
    }
}
module.exports = profileController