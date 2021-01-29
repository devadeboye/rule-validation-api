const router = require('express')();
const homeController = require("../controllers/home");
const validatorController = require("../controllers/validator");

router.get("/", homeController.getProfileDetails);

router.post(
    "/validate-rule",
    validatorController.validate
);

module.exports = router;