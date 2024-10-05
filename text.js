function getTimeString(time){
    const hour = parseInt(time / 3600);
    let rSecond = parseInt(time % 3600);
    const minute = parseInt(rSecond / 60);
    rSecond = rSecond % 60;
    return `${hour} hour ${minute} minute ${rSecond} second ago `
}

console.log(getTimeString(7865));