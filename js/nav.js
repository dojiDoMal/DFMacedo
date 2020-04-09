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
    formVendedor = $("#formVendedor");
    botaoCadastraVendedor = $("#btn-cadastrar");
    botaoCadastraVendedor.click(formVendedor);
});

function mostraFormVendedor(){
    $.get("https://raw.githubusercontent.com/dojiDoMal/DFMacedo/master/templates/form.vendedor.html", 
          function(data){
        $("#template-placeholder").html(data);
    });
}

function mostraFormVenda(){
    $.get("https://raw.githubusercontent.com/dojiDoMal/DFMacedo/master/templates/form.venda.html", function(data){
        $("#template-placeholder").html(data);
    });
}

function registraFormVendedor(form){
    $(document).ready(function() {
        $("#btn").click(function(e){
            var formData = $(form).serializeArray();
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
        })
    });
    console.log(jsonData); 
} 