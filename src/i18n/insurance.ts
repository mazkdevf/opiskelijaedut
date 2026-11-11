import type { Locale } from "@/i18n/config";
import type { PolicyId } from "@/lib/insurance-case";

const fi = {
  nav: "Vakuutukset",
  metaTitle: "Kilpailuta vakuutuksesi",
  metaDescription:
    "Yksi puhelu laski 20-vuotiaan auto- ja kotivakuutuksen hintaa lähes sata euroa vuodessa. Katso luvut ja pyydä itsellesi uudet tarjoukset.",
  eyebrow: "Vakuutukset",
  titleStart: "Pyydä vakuutuksistasi",
  titleMark: "uusi tarjous",
  lead: "Vakuutus uusiutuu joka vuosi itsestään, joten hinta jää helposti tarkistamatta. Alla ovat 20-vuotiaan auto- ja kotivakuutuksen hinnat ennen yhtä puhelua ja sen jälkeen. Tarjouksen voi pyytää kuka tahansa, jolla on vakuutus.",
  cta: "Näin pyydät tarjoukset",
  carCaption: "Esimerkkiauto: musta 3,2-litrainen sedan. Pyöritä vetämällä.",
  carLabel:
    "Kolmiulotteinen malli mustasta sedanista tummennetuilla ikkunoilla",
  caseTitle: "Hinnat ennen ja jälkeen",
  caseLead:
    "Kuljettaja, auto ja asunto pysyivät samoina, ja vain vakuutusyhtiö vaihtui.",
  profile: [
    "20-vuotias",
    "Asuu yksin vuokralla",
    "Liikennevakuutuksen bonus 70 %",
    "Osakasko",
  ],
  policies: {
    car: "Autovakuutus (liikenne + osakasko)",
    home: "Kotivakuutus",
  } satisfies Record<PolicyId, string>,
  before: "Ennen",
  after: "Jälkeen",
  perYear: "€/vuosi",
  saving: "Säästö",
  total: "Yhteensä",
  savedPerYear: "vähemmän vuodessa",
  tableCaption: "Vakuutusten vuosihinnat ennen kilpailutusta ja sen jälkeen",
  policy: "Vakuutus",
  caseNote:
    "Hinnat ovat yhden 20-vuotiaan saamia tarjouksia marraskuulta 2026: ennen LähiTapiola, jälkeen OP Pohjola. Vakuutuksen hinta on henkilökohtainen, ja sinulle halvin yhtiö voi olla jokin muu.",
  calcTitle: "Laske omilla luvuillasi",
  calcLead:
    "Syötä, paljon maksat vakuutuksistasi vuodessa. Laskuri näyttää, mitä sama suhteellinen säästö tarkoittaisi sinulle.",
  calcInput: "Vakuutukseni yhteensä, €/vuosi",
  calcShare: (percent: string) =>
    `Jos hinta laskisi ${percent} kuten esimerkissä`,
  years: (count: number) => (count === 1 ? "1 vuosi" : `${count} vuotta`),
  calcNote:
    "Luku on arvio. Oma hintasi voi laskea enemmän tai vähemmän tai pysyä ennallaan, ja sen näkee vasta tarjouksesta.",
  stepsTitle: "Näin pyydät tarjoukset",
  steps: [
    {
      title: "Kaiva esiin nykyiset vakuutuksesi",
      body: "Katso vakuutuskirjasta vuosihinta, omavastuu ja se, mitä vakuutus korvaa, koska näitä tarvitaan vertailussa.",
    },
    {
      title: "Pyydä tarjous kahdelta tai kolmelta yhtiöltä",
      body: "Tarjouksen saa verkosta tai puhelimessa, eikä se sido mihinkään. Kerro bonuksesi, ikäsi ja nykyinen hintasi.",
    },
    {
      title: "Vertaa samaa turvaa",
      body: "Halvin ei ole paras, jos omavastuu on isompi tai korvattavia asioita on vähemmän. Pyydä tarjous samalla omavastuulla ja samalla kaskotasolla.",
    },
    {
      title: "Kysy alennuksista",
      body: "Moni yhtiö antaa alennusta, kun keskität useamman vakuutuksen, kuulut liittoon tai olet pankin asiakas. Jos olet opiskelija, kysy myös opiskelija-alennusta. Alennuksia ei aina tarjota, ellei kysy.",
    },
    {
      title: "Kerro tarjous nykyiselle yhtiöllesi",
      body: "Nykyinen yhtiö voi vastata tarjoukseen. Jos vaihdat, uusi yhtiö hoitaa yleensä vanhan vakuutuksen irtisanomisen puolestasi.",
    },
  ],
  basicsTitle: "Mitä vakuutuksia yleensä tarvitaan",
  basics: [
    {
      title: "Kotivakuutus",
      body: "Moni vuokrasopimus edellyttää sitä. Se korvaa irtaimistosi, ja siihen kuuluu yleensä vastuuvakuutus, joka korvaa esimerkiksi asunnolle aiheuttamasi vesivahingon.",
    },
    {
      title: "Liikennevakuutus",
      body: "Liikennevakuutus on pakollinen jokaiselle liikenteessä käytettävälle autolle, ja se korvaa vahingot, jotka aiheutat muille. Bonus kertyy vahingottomista vuosista.",
    },
    {
      title: "Kasko",
      body: "Kasko on vapaaehtoinen. Osakasko korvaa tyypillisesti esimerkiksi varkauden, palon ja lasivahingot, ja täyskasko myös oman auton törmäysvahingot. Sisältö vaihtelee yhtiöittäin.",
    },
  ],
  disclaimer:
    "Opiskelijaedut ei myy eikä välitä vakuutuksia, ei saa yhtiöiltä tai edustajilta korvausta eikä anna vakuutusneuvontaa. Tarkista ehdot aina vakuutusyhtiöltä.",
  promo: "Yksi puhelu laski 20-vuotiaan vakuutuksia",
  promoUnit: "vuodessa",
  contactTitle: "Kokeile samaa edustajaa",
  contactBody:
    "Esimerkin tarjoukset laski OP Pohjolan vakuutusedustaja. Voit soittaa hänelle ja pyytää tarjouksen omista vakuutuksistasi. Tarjous ei sido mihinkään, ja se kannattaa silti verrata vähintään yhteen muuhun yhtiöön.",
  contactRole: "Vakuutusedustaja",
  contactCall: "Soita",
  contactNote:
    "Tämä on sivun tekijän oma suositus. Sivusto ei saa yhteydenotoista korvausta.",
  promoAction: "Katso luvut",
};

const en: typeof fi = {
  nav: "Insurance",
  metaTitle: "Get new quotes for your insurance",
  metaDescription:
    "One phone call cut a 20-year-old's car and home insurance by almost a hundred euros a year. See the numbers and ask for your own quotes.",
  eyebrow: "Insurance",
  titleStart: "Ask your insurer for",
  titleMark: "a new quote",
  lead: "Insurance renews by itself every year, so the price easily goes unchecked. Below are a 20-year-old's car and home insurance prices before and after one phone call. Anyone with insurance can ask for a quote.",
  cta: "How to ask for quotes",
  carCaption: "Example car: a black 3.2-litre saloon. Drag to rotate.",
  carLabel: "Three-dimensional model of a black saloon with tinted windows",
  caseTitle: "Prices before and after",
  caseLead:
    "The driver, the car and the flat stayed the same, and only the insurance company changed.",
  profile: [
    "20 years old",
    "Lives alone in a rental",
    "70% motor liability bonus",
    "Partial comprehensive cover",
  ],
  policies: {
    car: "Car insurance (liability + partial comprehensive)",
    home: "Home insurance",
  },
  before: "Before",
  after: "After",
  perYear: "€/year",
  saving: "Saving",
  total: "Total",
  savedPerYear: "less per year",
  tableCaption: "Yearly insurance prices before and after getting new quotes",
  policy: "Policy",
  caseNote:
    "These are quotes one 20-year-old received in November 2026: LähiTapiola before, OP Pohjola after. Insurance pricing is personal, and the cheapest company for you may be a different one.",
  calcTitle: "Try it with your own numbers",
  calcLead:
    "Enter what you pay for insurance per year. The calculator shows what the same relative saving would mean for you.",
  calcInput: "My insurance in total, €/year",
  calcShare: (percent) => `If the price dropped ${percent}, as in the example`,
  years: (count) => (count === 1 ? "1 year" : `${count} years`),
  calcNote:
    "The figure is an estimate. Your price may drop by more or less, or stay where it is, and you only find out from a quote.",
  stepsTitle: "How to ask for quotes",
  steps: [
    {
      title: "Dig out your current policies",
      body: "Check the yearly price, the deductible and what the policy covers, because you need these to compare.",
    },
    {
      title: "Ask two or three companies for a quote",
      body: "You can get a quote online or by phone, and it commits you to nothing. Mention your bonus, your age and your current price.",
    },
    {
      title: "Compare like with like",
      body: "The cheapest is not the best if the deductible is higher or less is covered. Ask for the same deductible and the same level of cover.",
    },
    {
      title: "Ask about discounts",
      body: "Many companies give a discount when you bundle several policies, belong to a union or bank with them. If you are a student, ask about a student discount too. Discounts are not always offered unless you ask.",
    },
    {
      title: "Tell your current company",
      body: "Your current insurer may match the quote. If you switch, the new company usually handles cancelling the old policy for you.",
    },
  ],
  basicsTitle: "Which policies people usually need",
  basics: [
    {
      title: "Home insurance",
      body: "Many rental contracts require it. It covers your belongings and usually includes liability insurance, which pays for things like water damage you cause to the flat.",
    },
    {
      title: "Motor liability insurance",
      body: "Motor liability insurance is compulsory for every car used on the road, and it covers damage you cause to others. Your bonus grows with claim-free years.",
    },
    {
      title: "Comprehensive cover",
      body: "Comprehensive cover is voluntary. Partial cover typically includes theft, fire and glass damage, and full cover also includes collision damage to your own car. The contents vary by company.",
    },
  ],
  disclaimer:
    "Opiskelijaedut does not sell or broker insurance, receives nothing from insurers or their agents and does not give insurance advice. Always check the terms with the insurance company.",
  promo: "One phone call cut a 20-year-old's insurance by",
  promoUnit: "a year",
  contactTitle: "Try the same agent",
  contactBody:
    "The quotes in the example came from an insurance agent at OP Pohjola. You can call him and ask for a quote on your own policies. A quote commits you to nothing, and it is still worth comparing with at least one other company.",
  contactRole: "Insurance agent",
  contactCall: "Call",
  contactNote:
    "This is the site author's own recommendation. The site receives nothing for referrals.",
  promoAction: "See the numbers",
};

const dictionaries: Record<Locale, typeof fi> = { fi, en };

export function getInsuranceDictionary(locale: Locale) {
  return dictionaries[locale];
}
