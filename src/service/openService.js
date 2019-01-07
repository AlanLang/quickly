const electron = window.require("electron");
const { shell } = electron;

const openService = {
  open(data){
    if(data.value.startsWith('http://') || data.value.startsWith('https://')){
      shell.openExternal(data.value);
    }else{
      shell.openItem(data.value);
    }
  }
}
export default openService