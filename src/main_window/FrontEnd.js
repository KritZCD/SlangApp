//import glob from './../global_vars.js'
//const glob = require('./../global_vars.js')
function SearchWord(){

    let x = $('#SearchBar').val();
    let prom = new Promise((resolve,reject) => {
        if(_arr.Data[x] === undefined){
            reject(1);
        }else{
            resolve(x);
        }
    });
    prom.then((a) => {

        $('#textbox').val(_arr.Data[a].value);
        let str = '#' + a;
        let el = document.getElementById(a);
        let dist = el.offsetTop;
        $('#lower').animate({
                    scrollTop: dist
                }, 1000);
        $(str).focus();
    });
}





$(function(){
    $('#lower').hide();
    $('#lower').slideToggle(2000);
    $('#SearchBar').submit(SearchWord);
    $('#SearchBar').keyup(function(e){
        if(e.keyCode == 13)
        {
            $(this).trigger("submit");
        }
    });
});
