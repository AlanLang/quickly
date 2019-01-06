const Datastore = require('nedb');
const db = new Datastore({ filename: 'quicklyPaths', autoload: true });
const paths = {
  find(key){
    return new Promise((resolve, reject) => {
      db.find({ title: key }, function (err, docs) {
        if(err){
          reject(err);
        }
        resolve(docs);
      });
    });
  },
  insert({title,value,type,code}){
    return new Promise((resolve, reject) => {
      db.insert({title,value,type,code}, function (err, newDoc) {
        if(err){
          reject(err);
        }
        resolve(newDoc);
      });
    });
  }
}
export default paths