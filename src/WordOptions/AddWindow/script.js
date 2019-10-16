const electron = require('electron')
const remote = electron.remote
const ipc = electron.ipcRenderer
//const glob = require('./../../global_vars.js')

function addword(){
    let promise = new Promise((resolve,reject) => {
        let word = {}
        word['id'] = $('#word_id').val()
        word['value'] = $('#word_value').val()
        if(valid(word)){
            resolve(word)
        }else
            reject(1)
    })
    promise.then((a) => {
        ipc.send('updateButtons',a)
        // let win = remote.getCurrentWindow()
        // win.close()
    }).catch((x) => {
        if(x == 1)
            alert('Please insert only valid characters')
    })
}

$(()=>{
    $('#sub_but').click(addword)
    $('#close').click(function(){
        let win = remote.getCurrentWindow()
        win.close()

    })
})


function valid(word)
{
    let re = new RegExp('^([a-zA-Z ])*$')
    for(i in word)
    {
        if(!re.test(word[i]))
            return false;
    }
    return true;
}
