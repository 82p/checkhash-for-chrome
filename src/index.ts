import {Sumchecker,HashAlgorithm} from './module/checksum'


function renderStatus(statusText:string) {
  let status = document.getElementById('status');
  if(status){
      status.textContent = statusText;
  }else{
      throw Error("Document id status is not found");
  }
}

document.addEventListener('DOMContentLoaded', function() {
    chrome.downloads.search({}, items => {
      if(items){
        const last = items[0];
        console.log(last);
        const filename = last.filename;
        const sha256sum = new Sumchecker(HashAlgorithm.SHA256);
        sha256sum.checkfile(filename).then(value => {
            renderStatus('checksum url =  ' + value );
        });
      }
    });
});
