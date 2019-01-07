const Datastore = require('nedb');
const db = new Datastore({ filename: 'quicklyPaths', autoload: true });
// type: 程序/网址/路径
const pathService = {
  find(key){
    var searcharr = key.split('');
    var search = new RegExp(searcharr.join('*'));
    console.log('%csearch: ','color: MidnightBlue; background: Aquamarine;',search);
    return new Promise((resolve, reject) => {
      db.find({ code: search }, function (err, docs) {
        if(err){
          reject(err);
        }
        resolve(docs);
      });
    });
  },
  insert({title,value,code}){
    return new Promise((resolve, reject) => {
      db.insert({title,value,code}, function (err, newDoc) {
        if(err){
          reject(err);
        }
        resolve(newDoc);
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
  hasNoOne(key){
    return new Promise((resolve, reject) => {
      db.find({ code: key }, function (err, docs) {
        if(err || docs.length > 0){
          reject(err);
        }
        resolve(docs);
      });
    });
  },
  remove(id){
    return new Promise((resolve,reject) => {
      db.remove({ _id: id }, {}, function (err, numRemoved) {
        if(err){
          reject(err);
        }
        resolve(numRemoved);
      });
    })
  }
}
export default pathService