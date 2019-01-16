const Datastore = require('nedb');
const db = new Datastore({ filename: 'quicklyConfigs', autoload: true });
const configService = {
  get(name){
    return new Promise((resolve, reject) => {
      db.findOne({ name: name }, function (err, docs) {
        if(err){
          reject(err);
        }
        resolve(docs);
      });
    });
  },
  findAll(){
    return new Promise((resolve, reject) => {
      db.find({ }, function (err, docs) {
        if(err){
          reject(err);
        }
        resolve(docs);
      });
    });
  },
  set(name,value){
    return new Promise((resolve, reject) => {
      db.find({ name: name }, function (err, docs) {
        if(err){
          reject(err);
        }
        if(docs && docs.length > 0){
          db.update({name},{value}, function (err, newDoc) {
            if(err){
              reject(err);
            }
            resolve(newDoc);
          });
        }else{
          db.insert({name,value}, function (err, newDoc) {
            if(err){
              reject(err);
            }
            resolve(newDoc);
          });
        }
      });
    });
  }
}
export default configService
