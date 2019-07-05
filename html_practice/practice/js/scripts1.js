var totalNumber = 45;
var result = [];
var selectedNumber = [];
function makeNumber(){
    for (i=1; i<=totalNumber; i++){
        result.push(i)
    }
}
function makeResult() {
    for(i=0;i<6;i++) {
        var index = Math.floor(Math.random() * result.length);
        var num = result[index];
        selectedNumber.push(num)

    }
}
makeNumber()
makeResult()
selectedNumber.sort(function (a,b) {
    return a-b;
})
for (i=0;i<6;i++){
    document.write('<span class="ball">'+selectedNumber[i]+'</span>');
}
