
function dbConnections (config,mongoose) {

  mongoose.connect(config.db.mongo.connectionString);
  const db = mongoose.connection;
  mongoose.Promise = global.Promise;
  db.on('error', console.error.bind(console,'Error in Connection :: Cannot Connect to ' +config.db.name));
  db.once('open',function () {
    console.log('Successfully Connected to Mongo Database ',config.db.name);
  });
  return db;
}

module.exports = dbConnections;