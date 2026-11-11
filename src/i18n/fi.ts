import type { Category, VerificationMethod } from "@/lib/offer-schema";

export const fi = {
  meta: {
    title: "Opiskelijaedut – kaikki, mitä saat opiskelijana ilmaiseksi",
    description:
      "Avoin, yhteisön ylläpitämä lista ilmaisista palveluista ja parhaista alennuksista opiskelijoille Suomessa. Ei mainoksia, ei kirjautumista.",
  },
  nav: {
    offers: "Edut",
    contribute: "Lisää etu",
    github: "GitHub",
    theme: "Vaihda teema",
    language: "Kieli",
    skip: "Siirry sisältöön",
  },
  hero: {
    eyebrow: "Avoin lista opiskelijoille Suomessa",
    titleStart: "Kaikki, mitä saat opiskelijana",
    titleMark: "ilmaiseksi",
    lead: "Ohjelmistot, tekoäly, musiikki, matkat ja lounas. Yhdellä sivulla, ilman mainoksia ja kirjautumista. Lista elää GitHubissa, ja kuka tahansa voi lisätä siihen edun.",
    offers: "etua",
    free: "ilmaista",
    updated: "Tarkistettu",
  },
  catalogue: {
    searchPlaceholder: "Hae palvelua tai etua",
    searchLabel: "Hae eduista",
    clearSearch: "Tyhjennä haku",
    all: "Kaikki",
    freeOnly: "Vain ilmaiset",
    filters: "Suodata",
    filtersTitle: "Suodata etuja",
    filtersDescription: "Valitse kategoria ja rajaa ilmaisiin.",
    category: "Kategoria",
    showResults: (count: number) =>
      count === 1 ? "Näytä 1 etu" : `Näytä ${count} etua`,
    reset: "Tyhjennä",
    emptyTitle: "Ei osumia",
    emptyBody:
      "Kokeile toista hakusanaa tai kategoriaa. Jos etu puuttuu listalta, lisää se.",
    emptyAction: "Lisää puuttuva etu",
    results: (count: number) => (count === 1 ? "1 etu" : `${count} etua`),
  },
  categories: {
    ai: "Tekoäly",
    development: "Ohjelmointi",
    design: "Suunnittelu",
    productivity: "Työkalut",
    entertainment: "Viihde ja media",
    food: "Ruoka ja juoma",
    shopping: "Ostokset",
    wellbeing: "Terveys ja liikunta",
    transport: "Liikkuminen",
    finance: "Raha",
    everyday: "Arki",
  } satisfies Record<Category, string>,
  verification: {
    "school-email": "Oppilaitoksen sähköposti",
    sheerid: "SheerID",
    unidays: "UNiDAYS",
    "student-card": "Opiskelijakortti",
    document: "Opiskelutodistus",
    "provider-check": "Palvelun oma tarkistus",
    none: "Ei todentamista",
  } satisfies Record<VerificationMethod, string>,
  offer: {
    free: "Ilmainen",
    discount: "Alennus",
    perks: "Mitä saat",
    eligibility: "Kuka saa",
    steps: "Näin saat edun",
    verification: "Todentaminen",
    verified: "Tarkistettu",
    expires: "Voimassa",
    open: "Avaa tarjous",
    copyLink: "Kopioi linkki",
    copied: "Kopioitu",
    suggestEdit: "Ehdota korjausta",
    back: "Kaikki edut",
    more: "Samasta kategoriasta",
    close: "Sulje",
    disclaimer:
      "Ehdot voivat muuttua. Tarkista ajantasaiset tiedot aina palvelun omalta sivulta.",
  },
  contribute: {
    metaTitle: "Lisää etu",
    title: "Lisää etu listalle",
    lead: "Jokainen etu on yksi JSON-tiedosto. Lisää tiedosto, avaa pull request, ja etu näkyy sivulla heti kun muutos on hyväksytty.",
    stepsTitle: "Kolme vaihetta",
    steps: [
      {
        title: "Luo tiedosto",
        body: "Tee uusi tiedosto kansioon content/offers. Tiedoston nimestä tulee edun osoite, esimerkiksi palvelun-nimi.json.",
      },
      {
        title: "Täytä tiedot suomeksi ja englanniksi",
        body: "Käytä alla olevaa pohjaa. Kirjoita lyhyesti ja kerro vain se, minkä voit tarkistaa palvelun omalta sivulta.",
      },
      {
        title: "Avaa pull request",
        body: "Automaattinen tarkistus kertoo, jos jokin kenttä puuttuu tai on väärässä muodossa. Ylläpitäjä käy muutoksen läpi ja yhdistää sen.",
      },
    ],
    ai: {
      badge: "Helpoin tapa",
      title: "Anna tekoälyn kirjoittaa tiedosto",
      body: "Kopioi ohje, liitä se Claudelle, ChatGPT:lle tai Geminille ja lisää perään linkki tarjoukseen. Saat valmiin JSON-tiedoston, jonka voit lisätä pull requestilla.",
      copy: "Kopioi ohje",
      openIn: (name: string) => `Avaa: ${name}`,
      show: "Näytä ohje",
      check:
        "Tekoäly voi erehtyä. Tarkista hinnat ja ehdot tarjoajan sivulta ennen kuin avaat pull requestin.",
    },
    templateTitle: "Pohja",
    copy: "Kopioi",
    copied: "Kopioitu",
    openInGithub: "Luo tiedosto GitHubissa",
    noCode: "Ehdota ilman koodia",
    noCodeHint:
      "Etkö halua koskea JSONiin? Avaa issue ja kerro linkki, niin joku lisää edun puolestasi.",
    fieldsTitle: "Kentät",
    fields: [
      ["name", "Edun tai tuotteen nimi, enintään 60 merkkiä."],
      ["provider", "Edun tarjoava yritys tai organisaatio."],
      [
        "url",
        "Suora https-linkki tarjoajan omalle sivulle. Ei affiliate-linkkejä.",
      ],
      [
        "category",
        "ai, development, design, productivity, entertainment, food, shopping, wellbeing, transport, finance tai everyday.",
      ],
      [
        "region",
        "Valinnainen. Paikkakunta tai alue, jos etu on paikallinen, esimerkiksi Oulu.",
      ],
      ["type", "free, jos etu on opiskelijalle maksuton. Muuten discount."],
      [
        "value",
        "Lyhyt merkki, esimerkiksi ”Ilmainen”, ”12 kk ilmaiseksi” tai ”−50 %”.",
      ],
      ["summary", "Yksi virke, joka näkyy listassa. Enintään 140 merkkiä."],
      [
        "description",
        "Muutama virke siitä, mitä etu sisältää ja mitä sen jälkeen tapahtuu.",
      ],
      ["perks", "1–6 konkreettista asiaa, jotka opiskelija saa."],
      ["eligibility", "Kuka edun saa: ikä, opiskelumuoto, asuinpaikka."],
      ["steps", "1–6 vaihetta, joilla edun saa käyttöön."],
      [
        "verification",
        "school-email, sheerid, unidays, student-card, document, provider-check tai none.",
      ],
      ["lastVerified", "Päivä, jolloin tarkistit tiedot, muodossa VVVV-KK-PP."],
      ["expires", "Valinnainen. Päivä, jolloin tarjous päättyy."],
    ],
    rulesTitle: "Mitä listalle hyväksytään",
    rules: [
      "Etu on saatavilla Suomessa opiskelevalle.",
      "Etu on ilmainen tai alennus on selvästi merkittävä.",
      "Linkki vie tarjoajan omalle sivulle, ei välikäden kautta.",
      "Tiedot on tarkistettu tarjoajan sivulta samana päivänä.",
    ],
  },
  footer: {
    note: "Opiskelijaedut on riippumaton, avoimen lähdekoodin projekti. Emme ole yhteydessä listattuihin palveluihin emmekä saa niiltä korvausta.",
    starTitle: "Oliko listasta hyötyä?",
    starBody:
      "Anna projektille tähti GitHubissa. Se on ilmaista ja auttaa muita löytämään listan.",
    starAction: "Anna tähti GitHubissa",
    source: "Lähdekoodi",
    license: "MIT-lisenssi",
  },
  notFound: {
    title: "Sivua ei löytynyt",
    body: "Etu on ehkä poistettu tai osoite on väärin.",
    action: "Takaisin etuihin",
  },
};

export type Dictionary = typeof fi;
