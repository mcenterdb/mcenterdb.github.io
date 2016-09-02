
/* Variaveis dos campos de Busca */
  var searchTxt = document.querySelector('#searchTxt');
  var searchTxtBottom = document.querySelector('#searchTxtBottom');
  var searchButton = document.querySelector('#searchButton');
  var searchButtonBottom = document.querySelector('#searchBottom');
  var searchResult = document.querySelector('#searchResult');
  var movies = document.querySelector('#movies');
/* FIM variaveis dos camposd e Busca */

/* Registro */
  var emailField = document.querySelector('#email');
  var imgEmailField = document.querySelector('#imgEmail');
  var EmailRegex = /\w+\@\w+\.\w+/;
  var NameRegex = /[A-Z]\w+/;
  var imgNameField = document.querySelector('#imgName');
  var nameField = document.querySelector('#inscricao');
  var enviarBtn = document.querySelector('#enviarBtn');
  var submitMsg = document.querySelector('#submitMsg');


  nameField.addEventListener('keyup', function(){
    if(NameRegex.test(nameField.value)){
      imgName.innerHTML = `<img src="img/valid.png">`;
    }else{
      imgName.innerHTML = `<p>Deve iniciar c/ letra maiuscula</p><img src="img/invalid.png">`;
      imgName.style.color = '#ff4d4d';
    }
  }, false);

  emailField.addEventListener('keyup', function(){
    if(EmailRegex.test(emailField.value)){
      imgEmailField.innerHTML = `<img src="img/valid.png">`;
    }else{
      imgEmailField.innerHTML = `<p>Formato invalido</p><img src="img/invalid.png">`;
      imgEmailField.style.color = '#ff4d4d';
    }
  }, false);

  enviarBtn.addEventListener('click', function(){
    if(EmailRegex.test(emailField.value) && NameRegex.test(nameField.value)){
      submitMsg.innerHTML = '<b>Parabens, inscricao feita!</b>';
      submitMsg.innerHTML += `<img src="img/valid.png">`;
      submitMsg.style.color = 'black';
      emailField.value = '';
      nameField.value = '';
      imgEmailField.innerHTML = ``;
      imgName.innerHTML = ``;
    }else{
      submitMsg.innerHTML = '<b>Oops, dados incorretos!</b>';
      submitMsg.innerHTML += `<img src="img/invalid.png">`;
      submitMsg.style.color = 'black';
    }
  }, false);

/* FIM Registro */


/* Variaveis do Feedback */
  var feedbackMsg = document.querySelector('#feedbackMsg');
  var feedbackTxt = document.querySelector('#feedbackTxt');
  var feedbackBtn = document.querySelector('#feedbackBtn');
  var feedbackCounter = document.querySelector('#feedbackCounter');
  var counter = 0;
/* FIM variaveis do Feedback */

/*Evento do Feedback*/
  feedbackBtn.addEventListener('click', function(){
    if(feedbackTxt.value.length >= 10){
      feedbackTxt.value = '';
      feedbackMsg.innerHTML = '<b>Obrigado, feedback enviado com sucesso!</b>';
      feedbackMsg.innerHTML += `<img src="img/valid.png">`;
      feedbackMsg.style.color = 'black';
    }else{
      feedbackMsg.innerHTML = 'Error, Digite no minimo 10 caracteres!';
      feedbackMsg.innerHTML += `<img src="img/invalid.png">`;
      feedbackMsg.style.color = '#ff4d4d';
    }
  }, false);

  feedbackTxt.addEventListener('keyup', function(){
    counter = feedbackTxt.value.length;
    feedbackCounter.innerHTML = counter;
    if(counter >= 10){
      feedbackCounter.style.color = '#80ffaa';
    }else{
      feedbackCounter.style.color = 'black';
    }
  }, false);
  /*FIM Eventos Feedback*/

/*Populando o meio do site com os Filmes mais Populares atualmente atraves da API*/
  popularMovies({
    url: 'http://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=5be7152e9f75d277b250a8b24c58dce1',
    successful: function(){
      let Dados = JSON.parse(xhr.responseText);
      popularMoviesBuild(Dados);
    }
  })

  function popularMoviesBuild(Dados){
    console.log(Dados);
    let urlImg = 'http://image.tmdb.org/t/p/w154/';
    for (let data in Dados.results){
    let overviews = Dados.results[data].overview.substring(0,100);
    movies.innerHTML += `<div class="col-lg-4 results animated animated bounceInRight">
                            <img src="${urlImg}${Dados.results[data].poster_path}">
                              <div class="titulo">
                                <h4>${Dados.results[data].title}</h4>
                                <p><h4>Sinopse</h4><i>${overviews} ...</i></p>
                              </div>
                         </div>`
    }
  }
 /*FIM da populacao dos filmes populares */


/* Eventos do Search de cima */
  searchButton.addEventListener('click', function(){
    theMovieDb.search.getMulti({"query": searchTxt.value }, function(Resultado){
      console.log('Foi');
     Resultado = JSON.parse(Resultado);
      responseBuild(Resultado);
      document.querySelector("#searchResult").scrollIntoView(true);
    }, function(){
      console.log('Nao Foi');
    });
  }, false);

  searchTxt.addEventListener('keyup',function(event){
    if(event.keyCode == 13){
      loadMovie(searchTxt.value);
    }
  }, false);
/* FIM Eventos SEARCH de cima */

//Funcao de consumir os dados dos filmes
  var loadMovie = function(queryString){
    theMovieDb.search.getMulti({"query": queryString }, function(Resultado){
      console.log('Foi');
     Resultado = JSON.parse(Resultado);
      responseBuild(Resultado);
      document.querySelector("#searchResult").scrollIntoView(true);
    }, function(){
      console.log('Nao Foi');
    });
  };
//FIM Funcao de consumir dados dos filmes

/* Eventos do Search de baixo */
  searchButtonBottom.addEventListener('click',function(){
    loadMovie(searchTxtBottom.value);
  }, false);

  searchTxtBottom.addEventListener('keyup',function(event){
    if(event.keyCode == 13){
      loadMovie(searchTxtBottom.value);
    }
  }, false);
/* FIM Eventos do SEARCH de baixo */

//Animacoes
  $('#mytitle').addClass('animated flip');
  $('#movandser').addClass('animated bounce');
  $('#movandser2').addClass('animated bounce');
  $('#logoanimate').addClass('animated bounceInLeft');
  $('#panimate').addClass('animated bounceInLeft');
//FIM Animacoes
/* Criando o campo de retorno do SEARCH dinamicamente */
  var overviews;
  function responseBuild(Resultado){
    let urlImg = 'http://image.tmdb.org/t/p/w154/';
    searchResult.innerHTML = '';
    for (let data in Resultado.results){
      //Testar receber imagem fora para verificar se é null
          if(Resultado.results[data].poster_path == null){
            ResulImg = "img/ohnao.png";
          }else {
            ResulImg = urlImg + Resultado.results[data].poster_path;
          }
      //Fim verificação
      if(Resultado.results[data].title == undefined){
        overviews = Resultado.results[data].overview.substring(0,100);
         searchResult.innerHTML += `<div class ="col-lg-6 results animated bounceInLeft" ><img src="${ResulImg}">
         <div class="innerdiv animated lightSpeedIn" data-name="${Resultado.results[data].overview}">
           <p><h4>${Resultado.results[data].name}</h4><i>${overviews} ...</i></p>
         </div>
         <div class="innerdiv2 animated bounce">
           <h5> <p>${Resultado.results[data].media_type}</p> <b>Tipo de Midia</b></h5>
         </div>
         </div>`
      }else {
        overviews = Resultado.results[data].overview.substring(0,100);
        searchResult.innerHTML += `<div class ="col-lg-6 results animated bounceInLeft" ><img src="${ResulImg}">
        <div class="innerdiv animated lightSpeedIn" data-name="${Resultado.results[data].overview}">
        <p><h4>${Resultado.results[data].title}</h4><i>${overviews} ...</i></p>
        </div>
        <div class="innerdiv2 animated bounce">
        <h5> <p>${Resultado.results[data].media_type}</p> <b>Tipo de Midia</b> </h5>
        </div>
        </div>`
      }
      ResulImg = "";
    }
  }
/* FIM Criacao do retorno do campo SEARCH */

//Funcao para consumir os filmes mais Populares
  function popularMovies({
    method = 'get',
    url = '',
    data = null,
    successful = null
  }){
    xhr = new XMLHttpRequest();
    xhr.onload = successful;
    xhr.open(method, url, true);
    xhr.send();
  }
