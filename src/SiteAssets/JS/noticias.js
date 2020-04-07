


function GetItems($scope, $sce, listName, parametro) {

    //URL Site Superior
     var URL = _spPageContextInfo.webAbsoluteUrl;
     
     //URL Subsite
     var URLSubsite = _spPageContextInfo.siteServerRelativeURL;
       

    var optionDate = { year: "numeric", month: "long", day: "numeric" };

    $.ajax({

        //URL REST e API
        url: URL + "/_api/web/lists/getbytitle('" + listName + "')/items" + parametro,
        //Operação GET
        method: "GET",
        //Tipo de retorno JSON
        headers: { "Accept": "application/json;odata=verbose" },
        //sincrona
        async: false,
        //Preenchimento de scopes
        success: function (data) {
            $scope.noticias = data.d.results,
                $scope.formatarData = function (dataPublicacao) {

                    var data = new Date(dataPublicacao).toLocaleDateString("pt-BR", optionDate);
                    return data;
                }

            $scope.noticias.forEach(function (a) {

                a.descricao = $sce.trustAsHtml(a.descricao);

            });

            $scope.tidoDeNoticia = function (tipo) {

                if (tipo != "Todas") {
                    $scope.noticias = data.d.results;

                    var noticiasTipo = [];

                    $scope.noticias.filter(function (a) {

                        if (a.tipodenoticia == tipo) {
                            noticiasTipo.push(a);

                        }

                        if (noticiasTipo.length > 0) {
                            $scope.noticias = [];
                            $scope.noticias = noticiasTipo;

                        }

                    })
                }
                else { $scope.noticias = data.d.results; }

            }




        },

        
        error: function (err) {
            alert("Ocorreu um erro" + JSON.stringify(err));
        }


    });
}

function AddItem($scope, listName) {

    $scope.inserirLocalidade = function (localidade) {

        $.ajax({
            url: "/sites/curso/_api/web/lists/getbytitle('" + listName + "')/items",
            type: "POST",
            data: JSON.stringify({
                '__metadata': { 'type': 'SP.Data.' + listName + 'ListItem' },
                'Title': localidade


            }),

            headers: {
                "Accept": "application/json;odata=verbose",
                "content-type": "application/json;odata=verbose",
                "X-RequestDigest": $("#__REQUESTDIGEST").val()
            },

            success: function (data) {
                alert("Localidade adicionada com sucesso !");
            },

            error: function (err) {
                alert("Ocorreu um erro" + JSON.stringify(err));
            }


        })


    }

}


function UpdateItem($scope, listName) {

    $scope.atualizarLocalidade = function (novaLocalidade, IDLocalidade) {

        $.ajax({
            url: "/sites/curso/_api/web/lists/getbytitle('" + listName + "')/items("+IDLocalidade+")",
            type: "POST",
            data: JSON.stringify({
                '__metadata': { 'type': 'SP.Data.' + listName + 'ListItem' },
                'Title': novaLocalidade


            }),

            headers: {
                "Accept": "application/json;odata=verbose",
                "content-type": "application/json;odata=verbose",
                "X-RequestDigest": $("#__REQUESTDIGEST").val(),
                "X-HTTP-Method": "MERGE",
                "If-Match": "*"

            },

            success: function (data) {
                alert("Localidade atualizada com sucesso !");
            },

            error: function (err) {
                alert("Ocorreu um erro" + JSON.stringify(err));
            }


        })


    }



}

function DeleteItem($scope, listName){

    $scope.deletarLocalidade = function (IDLocalidade) {

        $.ajax({
            url: "/sites/curso/_api/web/lists/getbytitle('" + listName + "')/items("+IDLocalidade+")",
            type: "POST",
            

            headers: {
                "Accept": "application/json;odata=verbose",
                "content-type": "application/json;odata=verbose",
                "X-RequestDigest": $("#__REQUESTDIGEST").val(),
                "X-HTTP-Method": "DELETE",
                "If-Match": "*"

            },

            success: function (data) {
                alert("Localidade deletada com sucesso !");
            },

            error: function (err) {
                alert("Ocorreu um erro" + JSON.stringify(err));
            }


        })


    }



}