//const $ = require('jquery')

function getDiv(){
    let d1 = $('#0').children().length
    let d2 = $('#1').children().length
    if(d1 > d2)
        return '#1'
    else
        return '#0'
}

function AddButton(mem){
        $('#lower').ready(function(){
            let str;
            for(let j in mem){
                let i = mem[j];
                if(mem[j].used)
                    continue;
                mem[j].used = true;
                str = $('<button></button>').html(i.id);
                //_arr.connectButton(i.id,counter);
                str.addClass('options');
                str.attr('id', i.id);
                str.on('click', function(){
                    $("#textbox").val(i.value);
                    let textArea = document.createElement("textarea");
                    textArea.style.position = 'fixed';
                    textArea.style.top = 0;
                    textArea.style.left = 0;
                    textArea.value = i.id;
                    document.body.appendChild(textArea);
                    textArea.focus();
                    textArea.select();
                    let succ = document.execCommand('copy');

                    document.body.removeChild(textArea);
                });
                let _nDiv = getDiv();
                $(_nDiv).append(str);
            }
        })
}

module.exports = AddButton
