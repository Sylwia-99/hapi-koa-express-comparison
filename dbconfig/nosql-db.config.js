module.exports = {
    HOST:  'localhost',
    USER: 'root',
    PASSWORD: 'admin',
    DB:'test',
    PORT: 27017,
    dialect: 'nosql', 
    pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
    }
};

// Max - maximum number of connections that are permissible in a pool
// Min - minimum number of connections that are permissible in a pool
// Idle - maximum time in milliseconds that can be held idle before the release
// Acquire - maximum time in milliseconds which the pool seeks for making the connection, just before an error message pops up