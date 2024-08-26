var table_body = document.getElementsByTagName("tbody")[0];

function buildTable(data){
    var indexes = Object.keys(data);
    indexes = indexes.sort(function(a, b){ return 0.5 - Math.random() });

    for(var i = 0; i < indexes.length; i++){
        var index = indexes[i];
        var data_row = data[index];
        var row = ` <tr>
                        <td>${data_row.superhero_name}</td>
                        <td>${data_row.real_name}</td>
                    </tr>`;
        table_body.innerHTML += row;
    }
}
