const router = require('express')();
const v1Routes = require('./v1/v1Routes')

router.use('/', v1Routes);

module.exports = router;