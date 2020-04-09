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
    criaVenda.click(mostraFormVenda());
});

function mostraFormVendedor(){
    $.get("https://raw.githubusercontent.com/dojiDoMal/DFMacedo/master/templates/form.vendedor.html", function(data){
        $("#template-placeholder").html(data);
        formVendedor = $("#formVendedor");
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
    });
}

function download(content, fileName, contentType) {
    var a = document.createElement("a");
    var file = new Blob([content], {type: contentType});
    a.href = URL.createObjectURL(file);
    a.download = fileName;
    a.click();
}