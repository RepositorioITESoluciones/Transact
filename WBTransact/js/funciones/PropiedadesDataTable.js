
function sumheader(NombreDT, Columna) {

    $('#' + NombreDT).DataTable({
        drawCallback: function () {
            var api = this.api();
            $(api.table().footer()).html(
              api.column(4, { page: 'current' }).data().sum()
            );
        }
    });
}


function sumarDT(NombreDT,Columna) {

    var table = $('#TablaDetalle').DataTable();
    var suma = table.column(4).data().sum();
    return suma;

}