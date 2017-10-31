/**
 * Created by kaxa on 3/10/17.
 */
function createTable(div,data,callback){
    var random=Math.floor((Math.random() * 10000) + 1);


    div.append('<table id="DataTable'+random+'" class="table table-hover table-dynamic">' +
        '<thead>' +
        '<tr id="head'+random+'"></tr>' +
        '</thead>' +
        '<tbody id="DataTableBody'+random+'"></tbody>' +
        '</table>')
    var head=$("#head"+random);
    for(var key in data){
        var item = data[key];
        head.append("<th>"+item.name+"</th>")
    }
    callback($("#DataTableBody"+random))
}