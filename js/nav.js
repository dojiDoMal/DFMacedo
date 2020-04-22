var jsonData = {}; 
var cadastraVendedor = "",
    criaVenda = "",
    excluiVendedor = "";
var tbVendedores = "",
    dropdown = "";
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
    excluiVendedor = $("#excluirVendedor");
    excluiVendedor.click(mostraTableVendedor);
});

function mostraTableVendedor(){
    $.get("../DFMacedo/templates/table.vendedor.html", function(data){
        $("#template-placeholder").html(data);
        preencheTableVendedores();
    });
}

function mostraFormVendedor(){
    $.get("../DFMacedo/templates/form.vendedor.html", function(data){
        //loadData('data.vendedor');
        $("#template-placeholder").html(data);
        formVendedor = $("#formVendedor");
        formataFormVendedor();
        botaoCadastraVendedor = $("#btn_cadastrar");
        botaoCadastraVendedor.click(function(e){
            e.preventDefault();
            saveData(formVendedor, 'data.vendedor', 8)
        });
    });
} 

function mostraFormVenda(){
    $.get("../DFMacedo/templates/form.venda.html", function(data){
        //loadData('data.venda');
        $("#template-placeholder").html(data);  
        formVenda = $("#formVenda");
        formataFormVenda();
        botaoCadastraVenda = $("#btnRealizarVenda");
        botaoCadastraVenda.click(function(e){
            e.preventDefault();
            saveData(formVenda, 'data.venda', 12);
        });
        preencheSelectVendedores();
    });
}

function preencheTableVendedores(){
    objVendedor = JSON.parse(localStorage.getItem("data.vendedor"));
    tbVendedores = $("#tbodyVendedores");
    tbVendedores.empty();
    if(Array.isArray(objVendedor.vendedorNome)){
        for(var i = 0; i < objVendedor.vendedorNome.length; i++){
            tbVendedores.append($('<tr></tr>')
                .append($('<td></td>').text(objVendedor.vendedorNome[i]).attr('class', 'col-6'),
                        $('<td></td>').text(objVendedor.vendedorCpf[i]).attr('class', 'col-3'),
                        $('<td></td>').text(objVendedor.vendedorTelefone[i]).attr('class', 'col-3'),
                )
            )
        }
    } else {
        tbVendedores.append($('<tr></tr>')
            .append($('<td></td>').text(objVendedor.vendedorNome).attr('class', 'col-6'),
                    $('<td></td>').text(objVendedor.vendedorCpf).attr('class', 'col-3'),
                    $('<td></td>').text(objVendedor.vendedorTelefone).attr('class', 'col-3'),
            )
        )
    }
}

function preencheSelectVendedores(){
    objVendedor = JSON.parse(localStorage.getItem("data.vendedor"));
    dropdown = $('#vendedor');
    dropdown.empty();
    dropdown.append('<option selected="true" disabled>Escolha o vendedor</option>');
    dropdown.prop('selectedIndex', 0);
    if(Array.isArray(objVendedor.vendedorNome)){
        for(var i = 0; i < objVendedor.vendedorNome.length; i++){
            dropdown.append($('<option></option>').attr('value', objVendedor.vendedorNome[i]).text(objVendedor.vendedorNome[i]));
        }
    } else {
        dropdown.append($('<option></option>').attr('value', objVendedor.vendedorNome).text(objVendedor.vendedorNome));
    }
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

function saveData(form, formName, matchSize){
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
        var old = localStorage.getItem(formName);
        console.log(old);
        console.log(jsonData);
        if(old === null) old = "";
        var newData = Object.assign(jsonData, old);
        for(var i = 0; Object.keys(newData).length > matchSize; i++){
            delete newData[i];
        }
        localStorage.setItem(formName, JSON.stringify(newData));
    });            
}

function loadData(data){
    $(document).ready(function() {    
        jsonData = localStorage.getItem(data);
        console.log(jsonData);
    });            
}