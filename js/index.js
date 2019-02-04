'use strict';

var nowagra = document.getElementById('button-nowagra');
var papier = document.getElementById('button-papier');
var kamien = document.getElementById('button-kamien');
var nozyce = document.getElementById('button-nozyce');
var output = document.getElementById('output');
var rezultat = document.getElementById('result');
var liczbarund = document.getElementById('liczba-rund');
var wynik;
var wygrana = 0;
var przegrana = 0;
var liczba;
var params = [];


// funkcja losująca 
var losowyNumer = function () {
  var losowyNumer = Math.round(Math.random() * 2 + 1);
  return losowyNumer;
};

// funkcja sprawdzająca liczbę wybór gracza z wyborem komputera
var sprawdzWynik = function (ruchGracza) {

  var ruchKomputera = losowyNumer();
  var tekst;

  if (
    (ruchGracza == 1 && ruchKomputera == 2) ||
    (ruchGracza == 2 && ruchKomputera == 3) ||
    (ruchGracza == 3 && ruchKomputera == 1)
  ) {
    tekst = 'Wygrana:';
    wygrana++;
  } else if (ruchGracza == ruchKomputera) {
    tekst = 'Remis:';
  } else {
    tekst = 'Przegrana:';
    przegrana++;
  }

  var infoGracz = numer(ruchGracza);
  var infoKomp = numer(ruchKomputera);
  wiadomosc(tekst, infoGracz, infoKomp);
  dodajWynik();
  koniec();
};

var numer = function (tekst) {
  var tablica = ['papier', 'kamień', 'nożyce'];
  return tablica[tekst - 1];
}

var wiadomosc = function (porownanie, infoGracz, infoKomp) {
  output.innerHTML = porownanie + ' wybrałeś: ' + infoGracz + ' - komputer wybrał ' + infoKomp;
  rezultat.innerHTML = '<br>' + ' Wygrane: ' + wygrana + ' Przegrane: ' + przegrana + '<br><br>';
}


  var moves = document.querySelectorAll('button');
  for (var i=0; i < moves.length; i++) {
    moves[i].addEventListener("click", function(event) {
      var move = event.target.getAttribute("data-move");
      sprawdzWynik(move);
    });
  }


nowagra.addEventListener('click', function () {
  liczba = prompt('podaj liczbę rund');
    if (isNaN(liczba) || !liczba) {
      liczbarund.innerHTML = '<br>' + ' Musisz podać liczbę większą od zera! ' + '<br><br>';
      blokadaPrzyciskow(true);    
      } else {
      liczbarund.innerHTML = '<br>' + ' Liczba rund: ' + liczba + '<br><br>';
      output.innerHTML = '<br>' + 'Rozpoczynasz nową gre...';
      rezultat.innerHTML = '<br>' + 'Wybierz swój ruch' + '<br><br>';
      blokadaPrzyciskow(false);
      reset();
    }
});

var koniec = function () {
    if (liczba == wygrana || liczba == przegrana) {
    rezultat.innerHTML = '<br>' + 'Wybierz przycisk Nowa Gra, aby rozpocząć gre ponownie' + '<br><br>';
    blokadaPrzyciskow(true);
  }
  if (liczba == wygrana) {
    output.innerHTML = '<br>' + 'Wygrywasz całą grę!';
    wynik = 'Wygrywasz całą gre!';
    wlaczModal();
  } else if (liczba == przegrana) {  
    output.innerHTML = '<br>' + 'Przegrywasz całą grę!'
    wynik = 'Przegrywasz całą gre!';
    wlaczModal();
  }
}

var reset = function () {
  wygrana = 0;
  przegrana = 0;
  remis = 0;
}

//Funkcja blokująca przyciski

var blokadaPrzyciskow = function(blokada) {
  papier.disabled = blokada;
  kamien.disabled = blokada;
  nozyce.disabled = blokada;
}

// MODAL

function dodajWynik() {
        params.push({
        rundy: (liczba),
        punktyGracza: (wygrana),
        punktyKomputera: (przegrana),
        wybor: (output.innerHTML),
    })
}

function wlaczModal() {

  var modal = document.getElementById('modal-one');
  document.querySelector('#modal-overlay').classList.add('show');
  document.getElementById('modal-one').classList.add('show');
 
  var title = document.querySelector('header');
  var titleHTML = wynik;
  title.innerHTML = titleHTML;
  
  var message = document.querySelector('p');
  var dodajHTML = '<table><thead><tr><th>Rundy</th><th>Przebieg rozgrywki</th><th>Rezultat w rundach</th></tr></thead><tbody>';
   for (i = 1; i < params.length; i++) {
            dodajHTML += '<tr><td>' +
            params[i].rundy + '</td><td>' +
            params[i].wybor + '</td><td>' +
            params[i].punktyGracza + ' : ' + params[i].punktyKomputera + '</td></tr>'
    }
    dodajHTML += '</tbody></table>';
    message.innerHTML = dodajHTML;
    console.log(message.innerHTML)
}

// Zamykanie modala

	var hideModal = function(event){
		event.preventDefault();
		document.querySelector('#modal-overlay').classList.remove('show');
    params = [];
   }

	var closeButtons = document.querySelectorAll('.modal .close');
	
	for(var i = 0; i < closeButtons.length; i++){
		closeButtons[i].addEventListener('click', hideModal);
	}
	
	document.querySelector('#modal-overlay').addEventListener('click', hideModal);
	
	var modals = document.querySelectorAll('.modal');
	
	for(var i = 0; i < modals.length; i++){
		modals[i].addEventListener('click', function(event){
			event.stopPropagation();
		});
	}