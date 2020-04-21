var jsonData = [{}];
var cadastraVendedor = "";
var criaVenda = "";
var formVendedor = "",
    formVenda = "";
var botaoCadastraVendedor = "",
    botaoCadastraVenda = "";
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
            saveData(formVendedor, 'data.vendedor')
        });
        // botaoCadastraVendedor.click(function(e){
        //     e.preventDefault();
        //     $(document).ready(function() {    
        //         var formData = $(formVendedor).serializeArray();
        //         $.each(formData, function() {
        //             if (jsonData[this.name]) {
        //                 if (!jsonData[this.name].push) {
        //                 jsonData[this.name] = [jsonData[this.name]];
        //             }
        //             jsonData[this.name].push(this.value || '');
        //             } else {
        //                 jsonData[this.name] = this.value || '';
        //             }
        //         })
        //         //console.log(jsonData);
        //         localStorage.setItem('data.vendedor', JSON.stringify(jsonData));
        //     });            
        // });
    });
} 

function mostraFormVenda(){
    $.get("https://raw.githubusercontent.com/dojiDoMal/DFMacedo/master/templates/form.venda.html", function(data){
        $("#template-placeholder").html(data);  
        formVenda = $("#formVenda");
        formataFormVenda();
        botaoCadastraVenda = $("#btnRealizarVenda");
        botaoCadastraVenda.click(function(e){
            e.preventDefault();
            saveData(formVenda, 'data.venda');
        });
        objVendedor = JSON.parse(localStorage.getItem("data.vendedor"));
        var dropdown = $('#vendedor');
        dropdown.empty();
        dropdown.append('<option selected="true" disabled>Escolha o vendedor</option>');
        dropdown.prop('selectedIndex', 0);
        for(var i = 0; i < objVendedor.vendedorNome.length; i++){
            dropdown.append($('<option></option>').attr('value', objVendedor.vendedorNome[i]).text(objVendedor.vendedorNome[i]));
        }
    });
}

function formataFormVendedor(){
    $(document).ready(function(){
        $('input[name="vendedorCpf"]').mask('000.000.000-00',  {reverse: true});
        $('input[name="vendedorEndCep"]').mask('00000-000');
        $('input[name="vendedorTelefone"]').mask('(00) 00000-0000');
    })
}

function formataFormVenda(){
    $(document).ready(function(){
        $('input[name="vendaData"]').mask('00/00/0000');
        $('input[name="vendaCmv"]').mask("#.##0,00", {reverse: true});
        $('input[name="vendaCmvTotal"]').mask("#.##0,00", {reverse: true});
        $('input[name="vendaPrecoUn"]').mask("#.##0,00", {reverse: true});
        $('input[name="vendaTotal"]').mask("#.##0,00", {reverse: true});
        $('input[name="vendaComissaoAdmCartaoPer"]').mask('##0,00%', {reverse: true});
        $('input[name="vendaComissaoUnVendedor"]').mask("#.##0,00", {reverse: true});
        $('input[name="vendaComissaoTotalVendedor"]').mask("#.##0,00", {reverse: true});
        $('input[name="vendaComissaoAdmCartao"]').mask("#.##0,00", {reverse: true});
    })
}

function saveData(form, formName){
    $(document).ready(function() {    
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
        //console.log(jsonData);
        var old = localStorage.getItem(formName);
        if(old === null) old = "";
        localStorage.setItem(formName, old + JSON.stringify(jsonData));
    });            
}