# Frontend Applications #

## ⚙️ Getting started: Installation ##
Om de applicatie te laten functioneren dienen er een paar stappen uitgevoerd te worden.

### ⛓️ Git
Installeer Git door de volgende commands uit te voeren in de terminal: 
```
brew install git
```
Om te controleren of het gelukt is voer je de volgende command in de terminal uit: 
```
git --version
```
Voorbeeld output: 
```
git version 2.39.1
```

### 👨🏼‍💼 NPM
Installeer NPM door de volgende command uit te voeren in de terminal: 
```
npm install
``` 
Check of het gelukt is door de volgende command: 
```
npm -v
```
Voorbeeld output: 
```
9.3.1 
```

Kopieer deze repo door de volgende command in je terminal uit te voeren: 
```
git clone https://github.com/DeefDeMeef/frontend-applications.git
```

Om de applicatie te starten voer je de volgende comments in de terminal (Bash), zorg ervoor dat je in de root folder zit van de zojuist gekloonde repo : 
```
npm install
npm start
```
Vervolgens krijg je een link vanuit de terminal waar de applicatie op te vinden is, ook opent deze automatisch: 
```js
Compiled successfully!

You can now view spotify-player in the browser.

  http://localhost:3000/

Note that the development build is not optimized.
To create a production build, use npm run build.

```

### 🏁 Einde installatie
Yes! Het is je hopelijk gelukt. Wanneer je nu de command `npm start` uitvoerd in de terminal en vervolgens naar de link gaat die de terminal geeft zie je het dashbard verschijnen in je browser.

## 👨🏼‍🍳 Gekozen API
Ik heb gekozen voor de Spotify API, dit omdat ik iets met muziek en een API wilde gaan doen. Toen ben ik gaan kijken naar wat de meeste mensen in Nederland gebruiken als streaming service. Dit bleek uiteraard Spotify te zijn.

Het is in eerste instantie een vrij complexe API omdat er veel data opgehaald kan worden en die data die je opvraagd komt weer terug met heel veel andere chunks van data. Maar om te beginnen leg ik het concept van de API uit aan de hand van de volgende afbeelding.

![Imgur](https://i.imgur.com/dq01lEi.png)

My App is in mijn geval de applicatie die je in deze repo ziet. Vanaf de app kan je requests doen naar de Spotify servers, vervolgens geeft Spotify een response terug met de door jou opgevraagde gegevens. Spotify maakt gebruik van authentication. Je moet dus een access token hebben om een request te kunnen doen. Om deze token te krijgen moeten we eerst de user laten inloggen op onze applicatie. Indien een user inlogd krijgen we een access token terug in de vorm van een callback in de url. Vervolgens heb ik een functie geschreven die deze url parameters uit elkaar kan halen zodat we ze als variables in de applicatie kunnen gebruiken (de functie is te vinden in hash.js). Bij elke request die we doen moeten we deze token meegeven als bearer token. 

Een super simpel voorbeeld om bijvoorbeeld de gegevens van een gebruiker op te vragen is het volgende (dit is een voorbeeld uit een class, vandaar de functie syntax):
```js
async getMyData(token) {
    let response = await fetch("https://api.spotify.com/v1/me", {
      method: "get",
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    });
    if (response.ok) return response.json();
    else return null;
}
```
Dit is nu de response die je terug krijgt van Spotify, deze zou je vervolgens kunnen gebruiken in je applicatie:

```js
{
  country: 'NL',
  display_name: 'Davey Zaal',
  email: 'daveyzaal@hotmail.nl',
  explicit_content: { filter_enabled: false, filter_locked: false },
  external_urls: { spotify: 'https://open.spotify.com/user/1183532737' },
  followers: { href: null, total: 11 },
  href: 'https://api.spotify.com/v1/users/1183532737',
  id: '1183532737',
  images: [
    {
      height: null,
      url: 'https://i.scdn.co/image/ab6775700000ee850007173dea898ee1d4b09d40',
      width: null
    }
  ],
  product: 'premium',
  type: 'user',
  uri: 'spotify:user:1183532737'
}
```
Stel je wilt alleen de gebruiker zijn naam en id hebben om een ander stukje code uit te kunnen voeren, dat kan met het volgende:
```js
let user_name = user.body.display_name;
let user_id = user.body.id;

console.log("De naam van de ingelogde gebruiker is: " + user_name + ", en zijn/haar unieke id is: " + user_id);
```
De output in de terminal is nu:
```
De naam van de ingelogde gebruiker is: Davey Zaal, en zijn/haar unieke id is: 1183532737
```

## Conslusie
Het is een gigantisch gave api waar je erg veel mee kan doen en ook toegang heb tot veel data. Eigenlijk kan je alles wel opvragen en vervolgens je eigen Spotify clone bouwen. Maar deze api is wel lastig om te beheersen dit heb ik vooral geleerd met trial & error. Ik hoop dat u iets meer te weten bent gekomen over deze api en de werking van mijn applicatie door het lezen van deze readme :)

#### Disclaimer: de code hierboven is deels zelf geschreven maar ook veel komt uit de [Spotify Web Api documentatie](https://developer.spotify.com/documentation/). Dit is dan ook de voornaamste bron gebruikt voor het schrijven van deze pagina, de afbeeldingen komen ook van de documentatie.

## 📦 Packages
- Swiper Js
  - Ik heb de package van swiperJS gebruikt om een simpele slider te maken om de track in te stoppen.

## 🪪 Licence 
MIT

