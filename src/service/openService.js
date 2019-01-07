const electron = window.require("electron");
const { shell } = electron;

const openService = {
  open(data){
    switch(data.type){
      case '网址':
        shell.openExternal(data.value);
        break;
      case '程序':
        shell.openItem(data.value);
        break;
      case '路径':
        shell.openItem(data.value);
        break;
      default:
        break;
    }
    
  }
}
export default openService