# Seminaarityö: Next.js-yhteydenottopalvelu

## Johdanto
Tämän seminaarityön tavoitteena oli toteuttaa pieni mutta teknisesti selkeä fullstack-kokonaisuus Next.js:n avulla. Ratkaisuna rakennettiin yhteydenottolomake, joka lähettää käyttäjän syötteet serverless-rajapinnalle, validoi datan palvelinpuolella ja tallentaa viestit JSON-tiedostoon. Projekti on rajattu tarkoituksella yksinkertaiseksi, mutta se sisältää riittävästi syvyyttä (frontend–backend–tiedostotallennus), jotta työn tavoitteet ja oppiminen on helppo osoittaa.

## Tavoitteet
- Ymmärtää Next.js App Router -arkkitehtuuria sekä client–server -rajapintaa.  
- Toteuttaa lomake, joka sisältää client-validaation, tilahallinnan ja virheilmoitukset.  
- Rakentaa serverless-API, joka validoi ja käsittelee datan luotettavasti.  
- Tallentaa saapuvat viestit JSON-muodossa ilman ulkoista tietokantaa.  
- Käsitellä onnistuneet lähetykset, validointivirheet ja virhetilanteet järkevästi.

## Teknologiat
- Next.js 16 / App Router  
- TypeScript  
- Tailwind CSS  
- Node.js fs API  

## Projektin rakenne
app/
  page.tsx
  contact/page.tsx
  api/contact/route.ts
components/
  ContactForm.tsx
data/
  contact-messages.json

## Toteutus

### Lomake
ContactForm.tsx hallinnoi syötekenttiä, client-validointia ja palautteen näyttämistä. Lähetyksen aikana painike lukittuu ja onnistumisen jälkeen lomake tyhjennetään.

### API route
app/api/contact/route.ts:
- hyväksyy vain POST  
- validoi kentät  
- estää honeypot-botit  
- lisää id + createdAt  
- tallentaa JSON-tiedostoon  

### JSON-tallennus
Viestit tallennetaan data/contact-messages.json -tiedostoon. Jos tiedosto puuttuu, luodaan tyhjä taulukko.

## Validointi ja anti-spam
- Kaikki kentät pakollisia  
- accepted-kentän oltava true  
- company-kenttä toimii honeypotina  

## Kuvankaappaukset
![Lomakenäkymä](public/lomakekuva.png)
![Onnistunut lähetys](public/onnistunulomake.png)
![JSON-tallennus](public/jsonlomake.png)

## Video
TODO

## Oppimiskokemukset
- Next.js App Routerin serverless-reittien ja client-komponenttien yhteispeli selkeytyi.
- Tiedostopohjainen tallennus pakotti huomioimaan virheidenkäsittelyn ja tietoturvan.
- Tailwindin utility-lähestymistapa nopeutti tyylittelyä, mutta vaati kurinalaista komponenttijakoa.
- Formien validointi ja anti-spam -tekniikat konkretisoituivat käytännön toteutuksen kautta.

## Jatkokehitysideoita
- sähköposti-ilmoitukset  
- admin-näkymä  
- captcha  
- tietokanta  
- validointikirjastot  

## Lähteet
Next.js Dokumentaatio – https://nextjs.org/docs  
Node.js File System (fs) – https://nodejs.org/api/fs.html  
Tailwind CSS Dokumentaatio – https://tailwindcss.com/docs
