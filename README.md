# DT210G - Moment 3

Målet med uppgiften är att skapa en Single Page Application (SPA) med React och TypeScript. 

Applikationen heter PinCollect körs lokalt. Den består av en startsida som innehåller alla bilder som laddas upp av autnetiserade användare 
och en inloggningssida för användare. 

Som inloggad har användaren tillgång till min sida där användaren kan ladda upp bild, ta bort bilder och ändra bildinformation på uppladdade bilder.

Applikationen uppfyller kraven på CRUD och autentisering.

Applikationen ska kommunicera med databasen MongoDB och backendramverket Hapi tillsammans.

## Komponenter
Applikationen består av flera olika komponenter som tillsammans renderas ut i olika pages.

### States
States används för att uppdatera innehåll/data dynamiskt i formuläret, hämtning av bilder och vid felhantering/errors.
States används även för att öppna modaler i komponenter.

### Datahämtning
Data hämtas med GET fetch anrop och renderas mha UseEffect hook.

### Styling
CSS styling implementeras i separat stilmall och som inline-css där det är lämpligt.
