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
  insert({title,value,type,code}){
    return new Promise((resolve, reject) => {
      db.insert({title,value,type,code}, function (err, newDoc) {
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
  }
}
export default pathService