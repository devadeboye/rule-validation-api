module.exports = class Home {
    static getProfileDetails (req, res) {
        return res.status(200).json({
            message: "My Rule-Validation Api",
            status: "success",
            data: {
                name: "Adeboye Emmanuel Adedayo",
                github: "@devadeboye",
                email: "emmanueladeboye2017@gmail.com",
                mobile: "2347067396219"
            }
        })
    }
}