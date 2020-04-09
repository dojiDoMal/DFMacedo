var jsonData = {};
var cadastraVendedor = "";
var criaVenda = "";
var formVendedor = "";
var botaoCadastraVendedor = "";

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
            });
            download(jsonData, 'json.txt', 'text/plain');            
        });
    });
} 

function mostraFormVenda(){
    $.get("https://raw.githubusercontent.com/dojiDoMal/DFMacedo/master/templates/form.venda.html", function(data){
        $("#template-placeholder").html(data);   
        $('.datepicker').datepicker();

    });
}

function formataFormVendedor(){
    $(document).ready(function(){
        $('input[name="vendedor.cpf"]').mask('000.000.000-00',  {reverse: true});
        $('input[name="vendedor.endereco.cep"]').mask('00000-000');
        $('input[name="vendedor.telefone"]').mask('(00) 00000-0000');
    })
}

function download(content, fileName, contentType) {
    var content = JSON.stringify(content);
    var a = document.createElement("a");
    var file = new Blob([content], {type: contentType});
    a.href = URL.createObjectURL(file);
    a.download = fileName;
    a.click();
}