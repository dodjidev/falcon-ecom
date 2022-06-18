
require('dotenv').config();
const configs = {
    APP_PORT: +process.env.APP_PORT,
    MONGOOSE_USER: process.env.MONGOOSE_USER,
    MONGOOSE_PASSWORD: process.env.MONGOOSE_PASSWORD,
    MONGOOSE_URI: process.env.MONGOOSE_URI,
}

module.exports = configs