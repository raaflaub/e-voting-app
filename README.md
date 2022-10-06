# VOKKO E-Voting

Das Projekt wurde mit [Create React App](https://github.com/facebook/create-react-app) aufgesetzt.

## Installation

Source-Code-Repository auschecken:

`git clone https://github.com/raaflaub/e-voting-app.git`

## Start

Die React-App befindet sich im Unterverzeichnis **vokko-e-voting**. Start im Development Mode:

`cd e-voting-app/vokko-e-voting`

`npm ci`

`npm start`

Die App öffnet sich anschliessend mit der Landing Page, von der aus man sich als "Organisator" registrieren kann, um Events zu planen und durchzuführen.

Im Development Mode hat man von der Landing Page aus auch die Möglichkeit, sich als Voter zu registrieren und die Versammlung aus Sicht eines Teilnehmers zu verfolgen. In einem produktiven Szenario würde dieser Einstieg in die App normalerweise über einen Link in einem Einladungsmail erfolgen, im Development Mode gibt es eine Abkürzung von der Landing Page aus. 


Wenn man sich auf demselben Client gleichzeitig als Organizer und als Voter registrieren will, empfiehlt sich der Einsatz von zwei verschiedenen Browsern oder des Incognito-Modus. Eine Authentifizierung gibt es in beiden Fällen nicht, aber es werden Benutzerinformationen sowie ein neu generiertes Keypair im LocalStorage abgelegt.

## Deployment

* Die App ist unter **https://vokko.cloud** verfügbar.
* Die Backend-Services sind unter **https://api.vokko.cloud/jsonapi/v1** (REST-API) bzw. unter **https://api.vokko.cloud/ws/v1/event** (WebSockets) verfügbar.

## Dokumentation

Die Dokumentation befindet sich im Unterverzeichnis **Documentation**.

| Dokument                  | Beschreibung          |
|---------------------------|-----------------------|
| Projektdokumentation.docx | unser Projekt-Bericht |
| Vokko_BFH.pptx.pdf        | Präsentation als PDF  |
|                           |                       |

## Prototypes

Im Verzeichnis **Prototypes** sind die Figma-Prototypes für die Usability-Tests abgelegt.

## CSV-Tabellen-Vorlagen

In den Verzeichnissen **Abstimmungsvorlagen** und **Mailversand** befinden sich Vorlagen für den Upload von Traktandenlisten bzw. Teilnehmer-Einladungen. Die CSV-Dateien müssen in der Codierung Latin-1 vorliegen.
