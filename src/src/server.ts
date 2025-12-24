import app from './app';
import logger from './utils/logger';

const PORT = process.env.PORT || 3000;

const server = app.listen(PORT, () => {
  logger.info(`🚀 MoneyShyft API server running on port ${PORT}`);
  logger.info(`📊 Environment: ${process.env.NODE_ENV || 'development'}`);
  logger.info(`🔗 Database: ${process.env.DATABASE_URL?.split('@')[1] || 'not configured'}`);
});

// Graceful shutdown
process.on('SIGTERM', () => {
  logger.info('SIGTERM signal received: closing HTTP server');
  server.close(() => {
    logger.info('HTTP server closed');
    process.exit(0);
  });
});

process.on('SIGINT', () => {
  logger.info('SIGINT signal received: closing HTTP server');
  server.close(() => {
    logger.info('HTTP server closed');
    process.exit(0);
  });
});

export default server;
