$.get("https://raw.githubusercontent.com/dojiDoMal/DFMacedo/master/templates/navbar.template.html", function(data){
    $("#nav-placeholder").html(data);
    var cadastraVendedor = $("#cadastrarVendedor");
    cadastraVendedor.click(mostraFormVendedor);
    var criaVenda = $("#venda");
    criaVenda.click(mostraFormVenda);
    var formVendedor = $("#formVendedor");
    formVendedor.click(registraFormVendedor(this));
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
            var jsonData = {};
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