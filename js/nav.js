$.get("https://raw.githubusercontent.com/dojiDoMal/Desenvolvimento_WEB/master/HTML/navbar.template.html", function(data){
    $("#nav-placeholder").html(data);
    var a = $("#cadastrarVendedor");
    a.click(formVendedor);
});

function formVendedor(){
    $.get("https://raw.githubusercontent.com/dojiDoMal/Desenvolvimento_WEB/master/HTML/form.vendedor.html", function(data){
        $("#template-placeholder").html(data);
    });
}