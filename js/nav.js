var jsonData = {};
var cadastraVendedor = "";
var criaVenda = "";
var formVendedor = "";
var botaoCadastraVendedor = "";
var objVendedor = {};

$.get("https://raw.githubusercontent.com/dojiDoMal/DFMacedo/master/templates/navbar.template.html", function(data){
    $("#nav-placeholder").html(data);
    cadastraVendedor = $("#cadastrarVendedor");
    cadastraVendedor.click(mostraFormVendedor);
    criaVenda = $("#venda");
    criaVenda.click(mostraFormVenda);
});

function mostraFormVendedor(){
    $.get("https://raw.githubusercontent.com/dojiDoMal/DFMacedo/master/templates/form.vendedor.html", function(data){
        $("#template-placeholder").html(data);
        formVendedor = $("#formVendedor");
        formataFormVendedor();
        botaoCadastraVendedor = $("#btn_cadastrar");
        botaoCadastraVendedor.click(function(e){
            e.preventDefault();
            $(document).ready(function() {    
                var formData = $(formVendedor).serializeArray();
                $.each(formData, function() {
                    if (jsonData[this.name]) {
                        if (!jsonData[this.name].push) {
                        jsonData[this.name] = [jsonData[this.name]];
                    }
                    jsonData[this.name].push(this.value || '');
                    } else {
                        jsonData[this.name] = this.value || '';
                    }
                })

                console.log(jsonData);
                
                localStorage.setItem('data.vendedor', JSON.stringify(jsonData));
                var jd = JSON.stringify(jsonData);

                // $.ajax({
                //     url: "vendedor.php",
                //     method: "post",
                //     data: { data: jd }
                // });

                //download(jd, 'json.txt', 'text/plain'); 
            });            
        });
    });
} 

function mostraFormVenda(){
    $.get("https://raw.githubusercontent.com/dojiDoMal/DFMacedo/master/templates/form.venda.html", function(data){
        $("#template-placeholder").html(data);  
        var dadosVendedores = localStorage.getItem("data.vendedor");
        objVendedor = JSON.parse(dadosVendedores);

        var dropdown = $('#vendedor');
        dropdown.empty();
        dropdown.append('<option selected="true" disabled>Escolha o vendedor</option>');
        dropdown.prop('selectedIndex', 0);

        $.each(objVendedor.vendedorNome, function () {
            dropdown.append($('<option></option>').attr('value', objVendedor.vendedorNome).text(objVendedor.vendedorNome));
        })
    });
}

function formataFormVendedor(){
    $(document).ready(function(){
        $('input[name="vendedorCpf"]').mask('000.000.000-00',  {reverse: true});
        $('input[name="vendedorEndCep"]').mask('00000-000');
        $('input[name="vendedorTelefone"]').mask('(00) 00000-0000');
    })
}

// function download(content, fileName, contentType) {
//     var a = document.createElement("a");
//     var file = new Blob([content], {type: contentType});
//     a.href = URL.createObjectURL(file);
//     a.download = fileName;
//     a.click();
// }