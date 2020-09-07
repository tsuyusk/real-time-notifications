module.exports = {
  type: 'mongodb',
  host: 'localhost',
  database: process.env.DB_NAME,
  useUnifiedTopology: true,
  port: process.env.DB_PORT,
  entities: ['./src/schemas/*.ts'],
};
