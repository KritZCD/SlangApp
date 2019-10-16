const remote = require('electron').remote
const ipcRend = require('electron').ipcRenderer
const fs = require('fs');
ipcRend.on('updateWords', (event,args) =>{
	let pr = new Promise((resolve,reject) => {
		if(Object.keys(_arr.Data).includes(args.id))
			reject(args.id);
		else {
			_arr.append(args.id,args.value);
			AddButton(_arr.Data)
			if(_arr.Data[args.id] === undefined){
				reject(10);
			}else{
				resolve('works')
			}
		}

	})

	pr.then((x) => {
		console.log(x);
	}).catch((x) => {
        alert(x + ' already exists')
    })
})


ipcRend.on('saveApp',(event,args)=>{
	let arr = {};
	for(i in _arr.Data)
		arr[i] = {"id":i,"value":_arr.Data[i].value};
	console.log(arr)
	fs.writeFileSync("src\\main_window\\SW.json", JSON.stringify(arr), (err) =>{
		if(err) {
        console.log(err);
    }
	})
})

ipcRend.on('DelWord',(event,args) => {
	let pr = new Promise((resolve,reject) => {
		if(!(Object.keys(_arr.Data).includes(args)))
			reject(args)
		else{
			delete _arr.Data[args]
			let str = '#'+ args
			$(str).remove();
			let d1 = $('#0').children().length
			let d2 = $('#1').children().length
			if(Math.abs(d1- d2) == 2)
			{
				if(d1 > d2){
					let x = $('#0').children().last()
					let Idx = x.attr('id')
					_arr.Data[Idx].used = false;
					x.remove();
				}else {
					let x = $('#1').children().last()
					let Idx = x.attr('id')
					_arr.Data[Idx].used = false;
					x.remove();
				}
				resolve(1);
			}else {
				resolve(2);
			}
		}
	})

	pr.then((x)=>{
		if(x == 1)
			AddButton(_arr.Data);
	}).catch((x) => {
        alert(x + ' does not exist')
    })
})
