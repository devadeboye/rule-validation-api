const app = require('./app');
const awsServerlessExpress = require("aws-serverless-express");
const server = awsServerlessExpress.createServer(app);

const port = process.env.PORT || 3331;

app.listen(port, () => {
    console.log(`listen to ${port}`);
});

exports.handler = (event, context) => {
    return awsServerlessExpress.proxy(server, event, context);
};