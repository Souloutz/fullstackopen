const app = require('./app');
const config = require('./utils/config');
const logger = require('./utils/logger');

app.listen(config.PORT, () => {
    if (config.NODE_ENV === 'development')
        logger.info(`Server running at 'http://localhost:${config.PORT}'`);
    else
        console.log(`Server running on port ${config.PORT}`);
});