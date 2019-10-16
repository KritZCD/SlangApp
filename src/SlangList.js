class SlangList{

    constructor(){
        this.Data = {};
    }

    append(x, y){
        this.Data[x] = {id: x,value:y,used:false};
    }

    readfromArray(arr){
        for(let i of arr){
            let x = i.split('-');
            this.Data[x[0]] = {id:x[0],value: x[1]};
        }
    }
    //
    // debugOutput(){
    //     console.table(this.Data);
    // }

    returnRandomEntry(){
        let f = Object.keys(this.Data);
        f = f[floor(random(0,f.length))];
        let x = this.Data[f];
        return x;
    }


}
