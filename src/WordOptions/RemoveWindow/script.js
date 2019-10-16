const electron = require('electron')
const remote = electron.remote
const ipc = electron.ipcRenderer


function Del()
{
    let prom = new Promise((resolve, reject) => {
        let word = $('#word_id').val();
        if(/^([a-zA-Z])+$/.test(word))
        {
            resolve(word);
        }else {
            reject(word)
        }
    })

    prom.then((a) => {
        ipc.send('DelWord',a)
    }).catch((x) => {
        //ConditionsEtc
        alert(x + ' is not valid')
    })
}

$(()=>{
    $('#Delete').click(Del)
    $('#close').click(function(){
        let win = remote.getCurrentWindow()
        win.close();
    })
})
