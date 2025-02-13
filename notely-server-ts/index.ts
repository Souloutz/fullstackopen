import config from './src/utils/config';
import logger from './src/utils/logger';
import app from './src/app';

app.listen(config.PORT, () => {
    if (config.NODE_ENV === 'development')
        logger.info(`Server running at 'http://localhost:${config.PORT}'`);
    else
        logger.info(`Server running on port ${config.PORT}`);
});