export interface ProductOriginInfo {
  country: string;
  flag: string;
  region: string;
  harvestMethod: string;
  harvestSeason: string;
  transportMethod: string;
  funFacts: string[];
  climateInfo: string;
  gps: [number, number]; // [Latitude, Longitude]
  zoomLevel: number;
}

export const PRODUCT_ORIGINS: Record<string, ProductOriginInfo> = {
  // 1. Erdbeeren (Thurgau, Schweiz)
  'gefriergetrocknete-erdbeere': {
    country: 'Schweiz',
    flag: '🇨🇭',
    region: 'Ostschweiz / Thurgau',
    harvestMethod: 'Schonende Handernte bei voller Reife',
    harvestSeason: 'Mai bis Juli',
    transportMethod: 'Regionaler Kurzstrecken-Transport (< 80 km)',
    climateInfo: 'Sonnige Hanglagen und Bodensee-Mikroklima mit fruchtbaren Moränenböden.',
    gps: [47.5584, 9.0556],
    zoomLevel: 9,
    funFacts: [
      'Erdbeeren sind botanisch gesehen keine Beeren, sondern Sammelnussfrüchte mit über 200 winzigen gelben Nüsschen.',
      'Für 100g gefriergetrocknete Erdbeeren wird ca. 1.0 kg frische Beeren schonend im Vakuum verarbeitet.',
      'Reich an sekundären Pflanzenstoffen und wertvollem Vitamin C für das Immunsystem.',
    ],
  },

  // 2. Himbeeren (Voralpenland & Polen)
  'gefriergetrocknete-himbeeren': {
    country: 'Serbia',
    flag: '🇷🇸',
    region: 'Arilje',
    harvestMethod: 'Sorgfältige Handlese in den kühlen Morgenstunden',
    harvestSeason: 'Juli bis September',
    transportMethod: 'Klimaschonender Direkttransport zur Veredelung',
    climateInfo: 'Kühle Nächte und warme Sommertage fördern das unvergleichlich intensive Beerenaroma.',
    gps: [44.7872, 20.4573],
    zoomLevel: 3,
    funFacts: [
      'Himbeeren gehören zu den ballaststoffreichsten Früchten überhaupt (ca. 40g Ballaststoffe pro 100g Trockenware).',
      'Die zarten Beeren werden sofort nach dem Pflücken schockgefrostet, damit die filigrane Hohlform stabil bleibt.',
      'Enthalten natürliche Ellagsäure, ein kraftvolles Antioxidans zum Schutz der Zellen.',
    ],
  },

  // 3. Echte Heidelbeeren (Schweden, Lappland)
  'gefriergetrocknete-echte-heidelbeere': {
    country: 'Schweden',
    flag: '🇸🇪',
    region: 'Skandinavische Taiga (Lappland)',
    harvestMethod: 'Traditionelle Wildsammlung in unberührten Wäldern',
    harvestSeason: 'August bis September',
    transportMethod: 'Zertifizierter Schienen- & Strassentransport',
    climateInfo: 'Endlose Sommertage unter der Mitternachtssonne erzeugen höchste Konzentrationen an Anthocyanen.',
    gps: [65.5848, 22.1567],
    zoomLevel: 6,
    funFacts: [
      'Echte Waldheidelbeeren (Vaccinium myrtillus) sind durch und durch tiefblau gefärbt – nicht hell wie Zucht-Kulturheidelbeeren.',
      'Die Blaubeere gilt seit Jahrhunderten als natürliches Superfood zur Unterstützung der Sehkraft und Gefässgesundheit.',
      'Wild gewachsen ohne Pestizide oder künstliche Düngung in freier skandinavischer Natur.',
    ],
  },

  // 4. Sauerkirschen (Pannonische Tiefebene, Ungarn)
  'gefriergetrocknete-sauerkirsche': {
    country: 'Ungarn',
    flag: '🇭🇺',
    region: 'Pannonische Tiefebene',
    harvestMethod: 'Vollreif geerntet mit schonender Rüttel- & Fangtechnik',
    harvestSeason: 'Juni bis Juli',
    transportMethod: 'Direkter EU-Landtransport',
    climateInfo: 'Heiße, trockene Sommer lassen die Kirschen am Baum ihr charakteristisches, tiefes Rubinrot entfalten.',
    gps: [47.1625, 19.5033],
    zoomLevel: 7,
    funFacts: [
      'Sauerkirschen sind eine der seltenen natürlichen Pflanzenquellen für bioverfügbares Melatonin.',
      'Ihre feine Fruchtsäure harmoniert perfekt als Kontrast zu süssem Porridge, Müsli oder dunkler Schokolade.',
      'Reich an Anthocyanen, die von Ausdauersportlern gerne zur Regeneration genutzt werden.',
    ],
  },

  // 5. Brombeeren (Bodensee & Rheintal, Schweiz)
  'gefriergetrocknete-brombeere': {
    country: 'Schweiz',
    flag: '🇨🇭',
    region: 'Rheintal & Bodensee',
    harvestMethod: 'Selektive Handpflückung von dornenlosen Kultursorten',
    harvestSeason: 'August bis Oktober',
    transportMethod: 'Regionaler Schweizer Hoftransport',
    climateInfo: 'Mildes Föhnklima im Rheintal sorgt für maximale Süsse und Saftigkeit.',
    gps: [47.1667, 9.4667],
    zoomLevel: 9,
    funFacts: [
      'Brombeeren gehören zu den ältesten bekannten Heilfrüchten der Menschheit.',
      'Hoher natürlicher Gehalt an Provitamin A, Vitamin E sowie Spurenelementen wie Mangan.',
      'Jede einzelne Mini-Steinbeere bleibt beim Gefriertrocknen knusprig und behält ihren samtigen Glanz.',
    ],
  },

  // 6. Schwarze Johannisbeeren (Lublin, Polen)
  'gefriergetrocknete-schwarze-johannisbeere': {
    country: 'Polen',
    flag: '🇵🇱',
    region: 'Lublin & Karpatenvorland',
    harvestMethod: 'Punktgenaue Ernte bei tiefschwarzer Fruchtreife',
    harvestSeason: 'Juli',
    transportMethod: 'Gekühlter Landtransport',
    climateInfo: 'Kontinentalklima mit kalkreichen Böden für intensive ätherische Aromen.',
    gps: [51.2465, 22.5684],
    zoomLevel: 7,
    funFacts: [
      'Schwarze Johannisbeeren enthalten mehr als das Dreifache an Vitamin C im Vergleich zu Zitrusfrüchten.',
      'Der unverwechselbare herbe Duft stammt von ätherischen Drüsen an der Unterseite der Beerenhaut.',
      'Ein echter Geheimtipp für den morgendlichen Immun-Kick im Müsli oder Shake.',
    ],
  },

  // 7. Aprikosen (Wallis, Schweiz)
  'gefriergetrocknete-aprikose': {
    country: 'Schweiz (Wallis)',
    flag: '🇨🇭',
    region: 'Wallis / Sion & Martigny',
    harvestMethod: 'Sonnenreif von Hand gepflückt',
    harvestSeason: 'Juli bis August',
    transportMethod: 'Schweizer Regionaltransport über den Alpenpass',
    climateInfo: 'Über 300 Sonnentage im Walliser Hochtal verleihen den Früchten ihr unvergleichliches Bukett.',
    gps: [46.2331, 7.3606],
    zoomLevel: 9,
    funFacts: [
      'Echte Walliser Aprikosen sind berühmt für ihr ausgewogenes Verhältnis von feiner Säure und saftiger Süsse.',
      '100% ungeschwefelt: Die leuchtend orange Farbe bleibt durch das schonende Vakuum ganz ohne Konservierungsmittel erhalten.',
      'Hervorragender pflanzlicher Kalium- und Beta-Carotin-Lieferant.',
    ],
  },

  // 8. Zwetschgen (Baselbiet & Aargau, Schweiz)
  'gefriergetrocknete-zwetschgen': {
    country: 'Schweiz',
    flag: '🇨🇭',
    region: 'Baselbiet & Aargau',
    harvestMethod: 'Traditionelle Hochstamm-Ernte',
    harvestSeason: 'August bis September',
    transportMethod: 'Lokaler Nahverkehr der Schweizer Bauern',
    climateInfo: 'Sanfte Hügellandschaften mit warmen Spätsommertagen für optimale Fruchtreife.',
    gps: [47.4839, 7.7347],
    zoomLevel: 9,
    funFacts: [
      'Zwetschgen stammen aus traditionellen Schweizer Hochstamm-Obstgärten, die wertvollen Lebensraum für Vögel bieten.',
      'Beim Kauen entfaltet die knusprige Frucht ihr dichtes, tiefes Steinobst-Aroma.',
      'Reich an natürlichen Pektinen und Ballaststoffen für das Wohlbefinden.',
    ],
  },

  // 9. Apfel (Thurgau / Mostindien, Schweiz)
  'gefriergetrockneter-apfel': {
    country: 'Schweiz',
    flag: '🇨🇭',
    region: 'Thurgau (Mostindien)',
    harvestMethod: 'Selektive Handernte bester Tafeläpfel',
    harvestSeason: 'September bis Oktober',
    transportMethod: 'Kurzer Transportweg direkt vom Obsthof (< 40 km)',
    climateInfo: 'Feuchte Seewinde und milde Herbstsonne am Bodensee bilden das Schweizer Apfelparadies.',
    gps: [47.5550, 9.1500],
    zoomLevel: 9,
    funFacts: [
      'Gefriergetrocknete Schweizer Apfelwürfel oxidieren nicht braun, sondern bleiben hell, knusprig und luftig leicht.',
      'In der Schale und direkt darunter stecken die meisten wertvollen sekundären Pflanzenstoffe.',
      'Ein kalorienarmer, knuspriger Snack für Büro, Wandern und Schule.',
    ],
  },

  // 10. Mango (Piura, Peru)
  'gefriergetrocknete-mango': {
    country: 'Peru',
    flag: '🇵🇪',
    region: 'Piura-Tal (Pazifikküste)',
    harvestMethod: 'Vollreif von Kleinbauern-Kooperativen geerntet',
    harvestSeason: 'Dezember bis März',
    transportMethod: 'Klimakompensierter Seetransport & Schweizer Bahn',
    climateInfo: 'Tropisches Wüstenklima mit reiner Oasenbewässerung aus den Anden.',
    gps: [-5.1945, -80.6328],
    zoomLevel: 7,
    funFacts: [
      'Wir verwenden die Edel-Sorte "Kent", die für ihr zartes, absolut faserfreies Fruchtfleisch geschätzt wird.',
      'Die Früchte reifen vollständig am Baum aus – für einen unvergleichlich süssen Geschmack ohne jeglichen Zuckerzusatz.',
      'Liefert wertvolles Vitamin A und natürliche Enzyme.',
    ],
  },

  // 11. Ananas (San Carlos, Costa Rica)
  'gefriergetrocknete-ananas': {
    country: 'Costa Rica',
    flag: '🇨🇷',
    region: 'San Carlos',
    harvestMethod: 'Sonnengereifte Ernte der Sorte "Extra Sweet Gold"',
    harvestSeason: 'Ganzjährig',
    transportMethod: 'Zertifizierter Seetransport mit CO2-Ausgleich',
    climateInfo: 'Tropischer Regenwaldgürtel mit warmem, feuchtem Klima und fruchtbaren Vulkanböden.',
    gps: [10.4226, -84.4746],
    zoomLevel: 8,
    funFacts: [
      'Enthält das natürliche Enzym Bromelain, welches die körpereigene Eiweissverdauung unterstützt.',
      'Durch das schonende Gefriertrocknen bleibt das typische prickelnde, saftige Mundgefühl erhalten.',
      '100% naturbelassen, ohne Zuckerzusatz und ohne Schwefel.',
    ],
  },

  // 12. Maracuja (Anden, Ecuador)
  'gefriergetrocknete-maracuja': {
    country: 'Ecuador',
    flag: '🇪🇨',
    region: 'Anden-Vorgebirge',
    harvestMethod: 'Handverlesene reife Passionsfrüchte',
    harvestSeason: 'Ganzjährig sonnengereift',
    transportMethod: 'Klimaschonender Überseetransport',
    climateInfo: 'Äquatoriales Höhenklima mit optimaler Sonneneinstrahlung das ganze Jahr über.',
    gps: [-0.2298, -78.5249],
    zoomLevel: 8,
    funFacts: [
      'Maracuja besitzt eines der intensivsten und erfrischendsten Aromaprofile des gesamten Pflanzenreichs.',
      'Das knusprige Fruchtgranulat löst sich sofort in Joghurt, Quark oder Bowls auf.',
      'Reich an Vitamin C, Provitamin A und beruhigenden sekundären Pflanzenstoffen.',
    ],
  },

  // 13. Banane (Guayas, Ecuador)
  'gefriergetrocknete-banane': {
    country: 'Ecuador',
    flag: '🇪🇨',
    region: 'Guayas',
    harvestMethod: 'Traditioneller, nachhaltiger Kleinbauern-Anbau',
    harvestSeason: 'Ganzjährig',
    transportMethod: 'Kompensierter Seetransport nach Europa',
    climateInfo: 'Immerfeuchtes Tropenklima an der Küste Ecuadors mit mineralreichen Schwemmböden.',
    gps: [-2.1894, -79.8891],
    zoomLevel: 8,
    funFacts: [
      'Im Gegensatz zu herkömmlichen frittierten Bananenchips komplett fettfrei und ohne Palmöl hergestellt.',
      'Schmilzt förmlich auf der Zunge und schmeckt intensiv nach reifer, süsser Banane.',
      'Hervorragender natürlicher Kalium- und Energiespender für Sportler.',
    ],
  },

  // 14. Orange (Valencia, Spanien)
  'gefriergetrocknete-orange': {
    country: 'Spanien',
    flag: '🇪🇸',
    region: 'Valencia',
    harvestMethod: 'Baumreife Handernte mit feiner Fruchtschale',
    harvestSeason: 'November bis April',
    transportMethod: 'Direkter EU-Strassentransport',
    climateInfo: 'Mediterrane Sonne an der spanischen Mittelmeerküste für maximale Saftfülle.',
    gps: [39.4699, -0.3763],
    zoomLevel: 8,
    funFacts: [
      'Sowohl das saftige Fruchtfleisch als auch die hocharomatische Schale werden schonend verarbeitet.',
      'Verleiht Dressings, Backwaren oder Tee ein natürliches, intensives Orangenaroma.',
      '100% reine Zitruspower voller Vitamin C und Bioflavonoiden.',
    ],
  },

  // 15. Zitrone (Murcia, Spanien)
  'gefriergetrocknete-zitrone': {
    country: 'Spanien',
    flag: '🇪🇸',
    region: 'Murcia',
    harvestMethod: 'Sonnengereift von Hand geerntet',
    harvestSeason: 'Oktober bis Mai',
    transportMethod: 'Klimaschonender EU-Landtransport',
    climateInfo: 'Heiße Sommer und milde Winter bringen besonders ätherische Zitrusöle hervor.',
    gps: [37.9922, -1.1307],
    zoomLevel: 8,
    funFacts: [
      'Gefriergetrocknetes Zitronenpulver verklumpt nicht und löst sich sofort in heissem oder kaltem Wasser.',
      'Ideal für morgendliches Infused Water oder frische Salatsaucen ohne Auspressen.',
      'Rein basisch verstoffwechselt trotz spritzig-säuerlichem Geschmack.',
    ],
  },

  // 16. Erdbeere in Milchschokolade
  'erdbeere-in-milchschokolade': {
    country: 'Schweiz',
    flag: '🇨🇭',
    region: 'Thurgau (Früchte) & Schwyz (Chocolatier)',
    harvestMethod: 'Handverlesene Premiumfrüchte, dragiert im traditionellen Kupferkessel',
    harvestSeason: 'Früchte im Sommer, ganzjährig frisch confiert',
    transportMethod: '100% regionale Schweizer Wertschöpfungskette',
    climateInfo: 'Schweizer Bergmilch trifft auf sonnengereifte Erdbeeren.',
    gps: [47.0207, 8.6531],
    zoomLevel: 9,
    funFacts: [
      'Jede Erdbeere wird von Schweizer Meister-Chocolatiers mit edler Schweizer Vollmilchschokolade umhüllt.',
      'Der Kontrast aus knusprigem Fruchtkern und zartem Schmelz sorgt für ein unvergleichliches Geschmackserlebnis.',
      'Ohne Palmöl, hergestellt mit reiner Schweizer Kakaobutter und Milchpulver.',
    ],
  },

  // 17. Himbeere in Milchschokolade
  'himbeere-in-milchschokolade': {
    country: 'Schweiz',
    flag: '🇨🇭',
    region: 'Voralpen & Schweizer Chocolatier-Tradition',
    harvestMethod: 'Selektierte ganze Himbeeren, meisterhaft dragiert',
    harvestSeason: 'Ganzjährig frisch hergestellt',
    transportMethod: 'Regionaler Schweizer Manufaktur-Transport',
    climateInfo: 'Alpenklima für saftige Beeren und Schweizer Alpenmilch.',
    gps: [47.0207, 8.6531],
    zoomLevel: 9,
    funFacts: [
      'Die erfrischende Säure der gefriergetrockneten Himbeere balanciert die Süsse der Schokolade perfekt aus.',
      'Ein edles Schweizer Geschenk für Feinschmecker und Schokoladenliebhaber.',
      'Aromafrisch versiegelt in wiederverschliessbaren Frischebeuteln.',
    ],
  },

  // 18. Müslimix Frucht-Topping
  'mueslimix': {
    country: 'Schweiz',
    flag: '🇨🇭',
    region: 'Schweizer Manufaktur',
    harvestMethod: 'Sorgfältige Handmischung bester Schweizer Beeren',
    harvestSeason: 'Ganzjährig frisch komponiert',
    transportMethod: 'Schweizer Post klimaneutral',
    climateInfo: 'Abgestimmte Mischung aus Erdbeeren, Himbeeren und Waldbeeren.',
    gps: [47.3769, 8.5417],
    zoomLevel: 9,
    funFacts: [
      'Die ideale Kombination aus knusprigen Stücken und feinem Granulat für das perfekte Frühstückserlebnis.',
      'Gibt Milch, Joghurt oder pflanzlichen Drinks sofort eine natürliche pinke Fruchtfarbe.',
      '100% Früchte – null zugesetzter Zucker, null künstliche Farbstoffe.',
    ],
  },

  // 19. Mein Büro Snack
  'mein-buero-snack': {
    country: 'Schweiz',
    flag: '🇨🇭',
    region: 'Schweizer Manufaktur',
    harvestMethod: 'Handverlesene Knusperfrüchte, optimiert für den Arbeitsalltag',
    harvestSeason: 'Ganzjährig frisch verpackt',
    transportMethod: 'Schweizer Post A-Post & B-Post',
    climateInfo: 'Energiereiche Komposition aus sonnengereiften Früchten.',
    gps: [47.3769, 8.5417],
    zoomLevel: 9,
    funFacts: [
      'Keine klebrigen Tastaturen: Gefriertrocknung sorgt für vollkommen sauberen Snackgenuss.',
      'Liefert langanhaltende Konzentration durch natürliche Fruchtzucker und Mineralstoffe statt Heisshunger.',
      'Wiederverschliessbarer Aromabeutel schützt vor Feuchtigkeit am Schreibtisch.',
    ],
  },

  // 20. Probiersäckli Mix
  'probiersaeckli': {
    country: 'Schweiz',
    flag: '🇨🇭',
    region: 'Schweizer Manufaktur',
    harvestMethod: 'Bunter Querschnitt durch unsere beliebtesten Ernten',
    harvestSeason: 'Ganzjährig',
    transportMethod: 'Klimaneutral mit Schweizer Post',
    climateInfo: 'Beste Schweizer und europäische Früchte vereint.',
    gps: [47.3769, 8.5417],
    zoomLevel: 9,
    funFacts: [
      'Perfekt zum Entdecken der Vielfalt: Beeren, exotische Früchte und heimisches Kernobst.',
      'Jede Sorte wird separat schockgefrostet und im Vakuum veredelt.',
      'Beliebt als kleines Gastgeschenk oder zum Durchprobieren vor dem grossen Einkauf.',
    ],
  },

  // 21. Immun Booster
  'immun-booster': {
    country: 'Schweiz & Nordeuropa',
    flag: '🇨🇭',
    region: 'Alpine & nordische Wildsammlungen',
    harvestMethod: 'Reichhaltige Beerenlese mit maximalem Nährstoffprofil',
    harvestSeason: 'Spätsommer-Ernte',
    transportMethod: 'Zertifizierter Schweizer Transport',
    climateInfo: 'Harte Winter und intensive Sommer lassen Pflanzen extrem hohe Abwehrkräfte bilden.',
    gps: [47.1032, 8.8521],
    zoomLevel: 8,
    funFacts: [
      'Vereint Schwarze Johannisbeere, Heidelbeere und Zitrus für den höchsten Vitamin-C- und Antioxidantien-Gehalt.',
      'Löst sich blitzschnell im Morgen-Shake oder Porridge auf.',
      '100% Naturkraft ohne synthetische Ascorbinsäure oder künstliche Vitamine.',
    ],
  },

  // 22. Instant Müsli Mix
  'instant-muesli-mix': {
    country: 'Schweiz',
    flag: '🇨🇭',
    region: 'Ostschweiz',
    harvestMethod: 'Schonend vermahlene Früchte und Vollkornhafer',
    harvestSeason: 'Ganzjährig frisch gemahlen',
    transportMethod: 'Schweizer Nahlogistik',
    climateInfo: 'Frische Schweizer Früchte treffen auf beste Bio-Getreideflocken.',
    gps: [47.5550, 9.0556],
    zoomLevel: 9,
    funFacts: [
      'In nur 60 Sekunden genussfertig mit heissem oder kaltem Wasser / Milch.',
      'Die gefriergetrockneten Fruchtteilchen saugen Flüssigkeit sofort auf und schmecken wie frisch gepflückt.',
      'Ohne Zuckerzusatz, reich an Beta-Glucanen für ein langes Sättigungsgefühl.',
    ],
  },

  // 23. Kyras Detox Box
  'kyras-detox-box': {
    country: 'Schweiz',
    flag: '🇨🇭',
    region: 'Schweizer Manufaktur',
    harvestMethod: 'Exklusive Kuration rein pflanzlicher Vitalfrüchte',
    harvestSeason: 'Ganzjährig limitiert',
    transportMethod: 'Schweizer Post Priority',
    climateInfo: 'Sorgfältig zusammengestellt für eine natürliche Vitalitätskur.',
    gps: [47.3769, 8.5417],
    zoomLevel: 9,
    funFacts: [
      'Inspiriert von ganzheitlicher Ernährung: Fördert die tägliche Flüssigkeitsaufnahme mit natürlichen Vitaminen.',
      'Edle Geschenk- und Verwöhnbox mit ausführlicher Nährstoffbegleitung.',
      '100% rein, basisch und zuckerfrei.',
    ],
  },

  // 24. Geschenkbox Medium / Large
  'geschenkbox-medium': {
    country: 'Schweiz',
    flag: '🇨🇭',
    region: 'Schweizer Handmanufaktur',
    harvestMethod: 'Liebevoll von Hand gepackt in Zürich / Bern',
    harvestSeason: 'Ganzjährig',
    transportMethod: 'Schweizer Post versichert',
    climateInfo: 'Beste Schweizer Premiumqualität im edlen Geschenkkarton.',
    gps: [47.3769, 8.5417],
    zoomLevel: 9,
    funFacts: [
      'Inklusive edler Banderole und handverpacktem Seidenpapier.',
      'Enthält die beliebtesten Schweizer Beeren und schokoladierte Delikatessen.',
      'Klimaneutral versendet direkt an deine Wunschadresse mit persönlicher Grusskarte.',
    ],
  },
  'geschenkbox-large': {
    country: 'Schweiz',
    flag: '🇨🇭',
    region: 'Schweizer Handmanufaktur',
    harvestMethod: 'Exklusiv zusammengestellt mit unserem gesamten Edel-Sortiment',
    harvestSeason: 'Ganzjährig',
    transportMethod: 'Schweizer Post versichert',
    climateInfo: 'Höchste Schweizer Manufakturkunst für besondere Anlässe.',
    gps: [47.3769, 8.5417],
    zoomLevel: 9,
    funFacts: [
      'Das Flaggschiff unseres Hauses mit allen Bestsellern im Grossformat.',
      'Perfekt für Geburtstage, Firmenpräsente oder besondere Genussmomente.',
      'Wiederverwendbare Premium-Box aus nachhaltiger Schweizer Kartonage.',
    ],
  },
};

export const countryCoords: Record<string, { lat: number; lng: number; code: string; label: string }> = {
  'Schweiz': { lat: 46.8182, lng: 8.2275, code: 'CH', label: 'Schweiz' },
  'Peru': { lat: -9.19, lng: -75.0152, code: 'PE', label: 'Peru' },
  'Ecuador': { lat: -1.8312, lng: -78.1834, code: 'EC', label: 'Ecuador' },
  'Spanien': { lat: 40.4637, lng: -3.7492, code: 'ES', label: 'Spanien' },
  'Costa Rica': { lat: 9.7489, lng: -83.7534, code: 'CR', label: 'Costa Rica' },
};

export interface CountryProfileData {
  lat: number;
  lng: number;
  code: string;
  label: string;
  flag: string;
  zoomLevel: number;
  region: string;
  harvestMethod: string;
  harvestSeason: string;
  transportMethod: string;
  climateInfo: string;
  funFacts: string[];
}

export const COUNTRY_PROFILES: Record<string, CountryProfileData> = {
  'Schweiz': {
    lat: 46.8182,
    lng: 8.2275,
    code: 'CH',
    label: 'Schweiz',
    flag: '🇨🇭',
    zoomLevel: 8,
    region: 'Ostschweiz / Thurgau & Wallis',
    harvestMethod: 'Schonende Handernte bei voller Reife',
    harvestSeason: 'Mai bis Oktober',
    transportMethod: 'Regionaler Schweizer Kurzstrecken-Transport (< 100 km)',
    climateInfo: 'Sonnige Schweizer Hanglagen und alpines Mikroklima mit fruchtbaren Moränenböden.',
    funFacts: [
      '100% naturbelassene Schweizer Früchte aus kontrolliertem regionalem Anbau.',
      'Innerhalb kürzester Zeit nach der Ernte schonend schockgefrostet und im Hochvakuum veredelt.',
      'Frei von jeglichem raffinierten Zucker, Schwefelung oder künstlichen Zusatzstoffen.',
    ],
  },
  'Peru': {
    lat: -9.19,
    lng: -75.0152,
    code: 'PE',
    label: 'Peru',
    flag: '🇵🇪',
    zoomLevel: 6,
    region: 'Piura & Lambayeque',
    harvestMethod: 'Baumgereifte Selektivlese von Hand',
    harvestSeason: 'Dezember bis März',
    transportMethod: 'Klimakompensierte Frischelogistik direkt aus der Erzeugerregion',
    climateInfo: 'Tropisch-trockenes Küstenklima im Norden Perus mit intensiver Äquatorsonne für maximalen Fruchtgeschmack.',
    funFacts: [
      'Peruanische Mangos gelten weltweit als besonders aromatisch, saftig und faserarm.',
      'Durch die Gefriertrocknung im Ursprungsland bleibt das volle tropische Aroma ohne Zusatzstoffe erhalten.',
      'Reich an wertvollem Vitamin A, Vitamin C und natürlichen sekundären Pflanzenstoffen.',
    ],
  },
  'Ecuador': {
    lat: -1.8312,
    lng: -78.1834,
    code: 'EC',
    label: 'Ecuador',
    flag: '🇪🇨',
    zoomLevel: 7,
    region: 'Guayas & Los Ríos',
    harvestMethod: 'Nachhaltige Kleinbauern-Ernte von Hand',
    harvestSeason: 'Ganzjährig sonnengereift',
    transportMethod: 'Zertifizierter, klimabewusster Seetransport',
    climateInfo: 'Mineralreiche vulkanische Schwemmlandböden und ganzjährig äquatoriales Tropenklima.',
    funFacts: [
      'Ecuador ist weltberühmt für aromatischste Baby-Bananen und Passionsfrüchte mit natürlicher Süsse.',
      '100% sortenrein gefriertrocknet ohne Frittieren, ohne Palmöl und ohne jegliche Konservierungsstoffe.',
      'Hervorragender natürlicher Lieferant für Kalium, Magnesium und Vitamin B6.',
    ],
  },
  'Spanien': {
    lat: 40.4637,
    lng: -3.7492,
    code: 'ES',
    label: 'Spanien',
    flag: '🇪🇸',
    zoomLevel: 6,
    region: 'Valencia & Murcia',
    harvestMethod: 'Traditionelle Handsammlung bei voller Fruchtreife',
    harvestSeason: 'November bis Mai',
    transportMethod: 'Direkter europäischer Landtransport',
    climateInfo: 'Mediterranes Sonnenklima mit über 300 Sonnentagen pro Jahr an der spanischen Mittelmeerküste.',
    funFacts: [
      'Die sonnigen Haine Valencias zählen zum traditionsreichsten Zitrusanbaugebiet Europas.',
      'Reich an ätherischen Ölen und natürlichem Vitamin C in Schale und Fruchtfleisch.',
      'Schonend vermahlen zu naturreinem Fruchtpulver für Dressings, Shakes und Backkreationen.',
    ],
  },
  'Costa Rica': {
    lat: 9.7489,
    lng: -83.7534,
    code: 'CR',
    label: 'Costa Rica',
    flag: '🇨🇷',
    zoomLevel: 7,
    region: 'San Carlos & Alajuela',
    harvestMethod: 'Selektive Ernte von Hand bei goldgelber Vollreife',
    harvestSeason: 'Ganzjährig',
    transportMethod: 'Klimazertifizierter Übersee-Frischetransport',
    climateInfo: 'Tropisches Klima mit mineralreichen Vulkanböden rund um den Arenal.',
    funFacts: [
      'Costa-ricanische Ananas zeichnet sich durch feine Säure und maximale natürliche Fruchtsüsse aus.',
      'Enthält das natürliche Enzym Bromelain sowie wertvolle Vitalstoffe.',
      'Knuspriges Granulat veredelt Porridge, Bowls und Desserts mit exotischer Frische.',
    ],
  },
};

/**
 * Resolves any raw country string or ISO code (CH, PE, EC, ES, CR)
 * to a canonical countryCoords key. Falls back to 'Schweiz'.
 */
export function resolveCountryKey(rawCountry?: string | null): string {
  if (!rawCountry || !rawCountry.trim()) {
    return 'Schweiz';
  }
  const clean = rawCountry.trim();
  if (countryCoords[clean]) {
    return clean;
  }
  const upper = clean.toUpperCase();
  if (upper === 'CH') return 'Schweiz';
  if (upper === 'PE') return 'Peru';
  if (upper === 'EC') return 'Ecuador';
  if (upper === 'ES') return 'Spanien';
  if (upper === 'CR') return 'Costa Rica';

  const lower = clean.toLowerCase();
  if (lower.includes('schweiz') || lower.includes('swiss') || lower.includes('switzerland')) {
    return 'Schweiz';
  }
  if (lower.includes('peru')) {
    return 'Peru';
  }
  if (lower.includes('ecuador')) {
    return 'Ecuador';
  }
  if (lower.includes('spanien') || lower.includes('spain')) {
    return 'Spanien';
  }
  if (lower.includes('costa rica')) {
    return 'Costa Rica';
  }

  // Default fallback is always Schweiz
  return 'Schweiz';
}

// Fallback helper for any slug & country
export function getProductOrigin(slug: string, fallbackCountry?: string | null): ProductOriginInfo {
  const countryKey = resolveCountryKey(fallbackCountry);
  const countryProfile = COUNTRY_PROFILES[countryKey] || COUNTRY_PROFILES['Schweiz'];

  // Check if we have an explicit match in PRODUCT_ORIGINS
  if (PRODUCT_ORIGINS[slug]) {
    const direct = PRODUCT_ORIGINS[slug];
    const directCountryKey = resolveCountryKey(direct.country);
    // If the direct entry matches the product's origin country, use its specific regional coordinates
    if (!fallbackCountry || directCountryKey === countryKey) {
      return direct;
    }
  }

  // Check related base slug for Swiss berries and fruits
  if (countryKey === 'Schweiz') {
    for (const [key, info] of Object.entries(PRODUCT_ORIGINS)) {
      const baseName = key.replace('gefriergetrocknete-', '').replace('gefriergetrockneter-', '');
      if (slug.includes(baseName) || baseName.includes(slug)) {
        if (resolveCountryKey(info.country) === 'Schweiz') {
          return info;
        }
      }
    }
  }

  // Return the targeted country profile with accurate countryCoords
  const coords = countryCoords[countryKey] || countryCoords['Schweiz'];
  return {
    country: coords.label,
    flag: countryProfile.flag,
    region: countryProfile.region,
    harvestMethod: countryProfile.harvestMethod,
    harvestSeason: countryProfile.harvestSeason,
    transportMethod: countryProfile.transportMethod,
    climateInfo: countryProfile.climateInfo,
    gps: [coords.lat, coords.lng],
    zoomLevel: countryProfile.zoomLevel,
    funFacts: countryProfile.funFacts,
  };
}

