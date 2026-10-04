export interface ProductOriginData {
  country: string;              // npr. "Schweiz", "Polen", "Costa Rica", "Serbien", "Ecuador", "Peru", "Spanien", "Schweden"
  countryCode: string;          // npr. "CH", "PL", "CR", "RS", "SE", "PE", "EC", "ES"
  flag: string;                 // npr. "🇨🇭", "🇷🇸", "🇸🇪", "🇵🇪", "🇪🇨", "🇪🇸", "🇨🇷"
  region: string;               // npr. "Thurgau", "Arilje", "Guayas & Los Ríos", "Piura", "Valencia"
  harvestTime: string;          // npr. "Juni – Juli", "Mai – Juni", "Ganzjährig"
  harvestSeason: string;        // Kompatibilität mit bestehenden UI-Komponenten
  harvestMethod: string;        // Methode der Lese / Ernte
  transportMethod: string;      // Logistik & Frischekette in die Schweiz
  climateInfo: string;          // Terroir & Mikroklima
  funFacts: string[];           // Schon gewusst? Fakten
  coordinates: [number, number]; // [lat, lng] polazne tačke berbe
  gps: [number, number];        // Kompatibilität
  zoomLevel: number;            // Zoom-Faktor
  description: string;          // Spezifische Herkunfts- & Terroir-Geschichte zum Anpassen
}

// Podaci strogo mapirani na slug svakog konkretnog proizvoda:
export const PRODUCT_ORIGINS: Record<string, ProductOriginData> = {
  // =========================================================================
  // 1. HIMBEEREN (Serbien / Arilje)
  // =========================================================================
  'himbeeren-ganz': {
    country: 'Serbien',
    countryCode: 'RS',
    flag: '🇷🇸',
    region: 'Arilje (Zapadna Srbija)',
    harvestTime: 'Juni – Juli',
    harvestSeason: 'Juni – Juli',
    harvestMethod: 'Sorgfältige Handlese der Edelsorte Willamette in den kühlen Morgenstunden',
    transportMethod: 'Klimaschonender Frischetransport zur Veredelung in die Schweiz',
    climateInfo: 'Kühle Bergnächte und warme Sonnentage an den Hängen Westserbiens für intensives Fruchtaroma.',
    funFacts: [
      'Die Region Arilje in Westserbien gilt international als die Welthauptstadt des Edelfruchtanbaus.',
      'Schonende Gefriertrocknung bewahrt über 95% der Vitamine und die delikate Hohlform der Beere.',
      'Reich an natürlicher Ellagsäure und wertvollen sekundären Pflanzenstoffen.',
    ],
    coordinates: [43.7533, 20.0964],
    gps: [43.7533, 20.0964],
    zoomLevel: 5,
    description: 'Sonnengereift an den Hängen von Arilje, bekannt für das weltweit feinste Himbeeraroma der Edelsorte Willamette.',
  },

  'himbeergranulat': {
    country: 'Serbien',
    countryCode: 'RS',
    flag: '🇷🇸',
    region: 'Arilje (Zapadna Srbija)',
    harvestTime: 'Juni – Juli',
    harvestSeason: 'Juni – Juli',
    harvestMethod: 'Selektion vollreifer Beeren und behutsames Zerkleinern zu krossem Crunch',
    transportMethod: 'Direkter Frischetransport zur Schweizer Veredelung',
    climateInfo: 'Mineralstoffreiche Hangböden im westserbischen Mittelgebirge.',
    funFacts: [
      'Gibt Joghurt, Quark und Porridge sofort eine leuchtend pinke Naturfarbe und frischen Knusper-Biss.',
      '100% sortenreine Frucht ohne Zuckerzusatz oder Rieselhilfen.',
      'Perfekt gleichmässige Körnung für kreative Pâtisserie-Dekorationen.',
    ],
    coordinates: [43.7533, 20.0964],
    gps: [43.7533, 20.0964],
    zoomLevel: 5,
    description: 'Knuspriges Himbeergranulat aus sonnengereiften Früchten von den Hängen von Arilje – ideal für Bowls und Desserts.',
  },

  'himbeerpulver': {
    country: 'Serbien',
    countryCode: 'RS',
    flag: '🇷🇸',
    region: 'Arilje (Zapadna Srbija)',
    harvestTime: 'Juni – Juli',
    harvestSeason: 'Juni – Juli',
    harvestMethod: 'Schonende Feinvermahlung ganzer gefriergetrockneter Beeren ohne Trägerstoffe',
    transportMethod: 'Klimaschonender Frischetransport nach CH',
    climateInfo: 'Optimale Tag-Nacht-Temperaturwechsel für hochkonzentrierte Fruchtsäuren.',
    funFacts: [
      'Löst sich hervorragend in Shakes, Smoothies und Glasuren ohne Klumpenbildung.',
      'Intensivste natürliche Färbekraft und fruchtig-feine Säure.',
      'Enthält alle Ballaststoffe und Antioxidantien der vollen Frucht.',
    ],
    coordinates: [43.7533, 20.0964],
    gps: [43.7533, 20.0964],
    zoomLevel: 5,
    description: '100% reines, schonend vermahlenes Fruchtpulver aus vollreifen Beeren aus Arilje ohne jegliche Trägerstoffe.',
  },

  'himbeerpulver-gesiebt-1kg': {
    country: 'Serbien',
    countryCode: 'RS',
    flag: '🇷🇸',
    region: 'Arilje (Zapadna Srbija)',
    harvestTime: 'Juni – Juli',
    harvestSeason: 'Juni – Juli',
    harvestMethod: 'Speziell mikroskopisch feinst gesiebt für Gastronomie und Pâtisserie',
    transportMethod: 'Direktimport im versiegelten Aromagebinde in die Schweiz',
    climateInfo: 'Optimale Tag-Nacht-Temperaturwechsel für hochkonzentrierte Fruchtsäuren.',
    funFacts: [
      'Entwickelt für Confiserien und Spitzenköche: garantiert samtige Textur ohne Kerne.',
      'Grossgebinde mit optimalem Aromaschutzventil für maximale Haltbarkeit.',
      'Über 10 kg frische Arilje-Himbeeren stecken in einem einzigen Kilogramm dieses Edelpuders.',
    ],
    coordinates: [43.7533, 20.0964],
    gps: [43.7533, 20.0964],
    zoomLevel: 5,
    description: 'Gastro-Qualität: Meisterhaft feinst gesiebtes Himbeerpulver aus der Erzeugerregion Arilje ohne Kernrückstände.',
  },

  'family-bag-himbeere': {
    country: 'Serbien',
    countryCode: 'RS',
    flag: '🇷🇸',
    region: 'Arilje (Zapadna Srbija)',
    harvestTime: 'Juni – Juli',
    harvestSeason: 'Juni – Juli',
    harvestMethod: 'Schonende Handlese voll ausgereifter Sommerbeeren',
    transportMethod: 'Direkter Import und aromasichere Schweizer Vorratsverpackung',
    climateInfo: 'Berglagen von Arilje mit reichlich Sonnenstunden für höchste Fruchtsüsse.',
    funFacts: [
      'Vorratsbeutel mit Aromasiegel für langanhaltenden Knusperspass der ganzen Familie.',
      'Spart Verpackungsmaterial und hält die Beeren dauerhaft trocken und knackig.',
      'Ideal zum Nachfüllen der Design-Vorratsgläser.',
    ],
    coordinates: [43.7533, 20.0964],
    gps: [43.7533, 20.0964],
    zoomLevel: 5,
    description: 'Ganze knusprige Himbeeren aus Arilje im praktischen Grossbeutel zum Nachfüllen.',
  },

  'himbeere-in-milchschokolade-100g': {
    country: 'Schweiz',
    countryCode: 'CH',
    flag: '🇨🇭',
    region: 'Schweizer Manufaktur & Arilje',
    harvestTime: 'Juni – Juli (Beeren) / Ganzjährig veredelt',
    harvestSeason: 'Ganzjährig veredelt',
    harvestMethod: 'Handverlesene Beeren aus Arilje, meisterhaft dragiert in Schweizer Milchschokolade',
    transportMethod: 'Regionaler Schweizer Manufaktur-Transport',
    climateInfo: 'Feinste Schweizer Alpenmilch trifft auf aromatische Bergbauern-Himbeeren.',
    funFacts: [
      'Harmonische Balance aus knackig-frischer Schokolade und spritziger Beere.',
      'Confiserie-Tradition ohne Palmöl, Fremdfette oder Glanzmittel.',
      'Edler Schweizer Snack für anspruchsvolle Genussmomente.',
    ],
    coordinates: [47.3769, 8.5417],
    gps: [47.3769, 8.5417],
    zoomLevel: 7.5,
    description: 'Ganze gefriergetrocknete Himbeeren, umhüllt von zartschmelzender Schweizer Premium-Milchschokolade.',
  },

  // =========================================================================
  // 2. ERDBEEREN (Serbien / Arilje & Loznica)
  // =========================================================================
  'erdbeeren-ganz': {
    country: 'Serbien',
    countryCode: 'RS',
    flag: '🇷🇸',
    region: 'Arilje / Loznica',
    harvestTime: 'Mai – Juni',
    harvestSeason: 'Mai – Juni',
    harvestMethod: 'Schonende Handernte bei voller Reife und Hälftung vor der Gefriertrocknung',
    transportMethod: 'Klimaschonender Direkttransport zur Veredelung in der Schweiz',
    climateInfo: 'Sonnige Hanglagen und warmes Kontinentalklima für intensiv-aromatische Früchte.',
    funFacts: [
      'Erdbeeren sind botanisch Sammelnussfrüchte mit über 200 winzigen gelben Nüsschen.',
      'Für 100g gefriergetrocknete Erdbeeren wird ca. 1.0 kg frische Beeren schonend im Vakuum verarbeitet.',
      'Reich an sekundären Pflanzenstoffen und wertvollem Vitamin C für das Immunsystem.',
    ],
    coordinates: [44.5305, 19.2253],
    gps: [44.5305, 19.2253],
    zoomLevel: 5,
    description: 'Sorgfältig von Hand geerntete, vollaromatische Erdbeeren aus traditionellem Anbau Westserbiens.',
  },

  'erdbeergranulat': {
    country: 'Serbien',
    countryCode: 'RS',
    flag: '🇷🇸',
    region: 'Arilje / Loznica',
    harvestTime: 'Mai – Juni',
    harvestSeason: 'Mai – Juni',
    harvestMethod: 'Schonendes Granulieren vollreifer gefriergetrockneter Erdbeeren',
    transportMethod: 'Direkter Frischetransport zur Schweizer Veredelung',
    climateInfo: 'Sonnige Hänge und fruchtbare Böden Westserbiens.',
    funFacts: [
      'Der perfekte fruchtige Knusper-Crunch für Müslis, Porridge und Dessert-Toppings.',
      'Behält seine brillante rote Naturfarbe ganz ohne künstliche Farbstoffe.',
      'Kinder lieben den krossen Biss und die natürliche Fruchtnote.',
    ],
    coordinates: [44.5305, 19.2253],
    gps: [44.5305, 19.2253],
    zoomLevel: 5,
    description: 'Knuspriger Erdbeer-Crunch aus schonend gefriergetrockneten Früchten für Bowls und Müsli.',
  },

  'erdbeerpulver': {
    country: 'Serbien',
    countryCode: 'RS',
    flag: '🇷🇸',
    region: 'Arilje / Loznica',
    harvestTime: 'Mai – Juni',
    harvestSeason: 'Mai – Juni',
    harvestMethod: 'Feinstvermahlung vollreifer Früchte im Kaltverfahren ohne Zusätze',
    transportMethod: 'Klimaschonender Frischetransport nach CH',
    climateInfo: 'Optimale Sonnenstunden in den Flusstälern Westserbiens.',
    funFacts: [
      'Verleiht Shakes, Quark und Macarons eine unwiderstehlich fruchtige Erdbeernote.',
      'Löst sich cremig und rückstandsfrei in kalten und warmen Flüssigkeiten.',
      '100% reine Erdbeere ohne Zuckerzusatz oder Bindemittel.',
    ],
    coordinates: [44.5305, 19.2253],
    gps: [44.5305, 19.2253],
    zoomLevel: 5,
    description: '100% naturreines Fruchtpulver aus sonnengereiften Erdbeeren ohne Zuckerzusatz.',
  },

  'family-bag-erdbeere': {
    country: 'Serbien',
    countryCode: 'RS',
    flag: '🇷🇸',
    region: 'Arilje / Loznica',
    harvestTime: 'Mai – Juni',
    harvestSeason: 'Mai – Juni',
    harvestMethod: 'Handernte voll ausgereifter Sommererdbeeren',
    transportMethod: 'Direkter Transport und Schweizer Schutzgasverpackung',
    climateInfo: 'Warme Frühsommertage für optimalen Fruchtzuckergehalt.',
    funFacts: [
      'Vorratsbeutel voller gefriergetrockneter Erdbeerhälften für gesunden Dauerspass.',
      'Praktischer Zip-Verschluss für langanhaltende Frische und Knusprigkeit.',
      'Ideal für Familien, Sportler und Vielgeniesser.',
    ],
    coordinates: [44.5305, 19.2253],
    gps: [44.5305, 19.2253],
    zoomLevel: 5,
    description: 'Vorratsbeutel voller gefriergetrockneter Erdbeerhälften für gesunden Dauerspass.',
  },

  'erdbeere-in-milchschokolade': {
    country: 'Schweiz',
    countryCode: 'CH',
    flag: '🇨🇭',
    region: 'Schweizer Manufaktur & Loznica',
    harvestTime: 'Mai – Juni (Erdbeeren) / Ganzjährig veredelt',
    harvestSeason: 'Ganzjährig veredelt',
    harvestMethod: 'Handverlesene Erdbeeren, ummantelt mit Schweizer Schokolade',
    transportMethod: 'Regionaler Schweizer Manufaktur-Transport',
    climateInfo: 'Feinste Kakaobutter und Alpenmilch verbinden sich mit fruchtigem Sommeraroma.',
    funFacts: [
      'Veredelt nach Schweizer Confiserie-Tradition ohne Palmöl.',
      'Ein Traum-Duo aus cremigem Schmelz und knusprigem Fruchtkern.',
      'Ein luxuriöses Geschenk oder persönlicher Belohnungsmoment.',
    ],
    coordinates: [47.3769, 8.5417],
    gps: [47.3769, 8.5417],
    zoomLevel: 7.5,
    description: 'Ganze sonnengereifte Erdbeeren in zartschmelzender Schweizer Premium-Milchschokolade.',
  },

  // =========================================================================
  // 3. BANANEN (Ecuador / Guayas & Los Ríos)
  // =========================================================================
  'banane-scheiben': {
    country: 'Ecuador',
    countryCode: 'EC',
    flag: '🇪🇨',
    region: 'Guayas & Los Ríos',
    harvestTime: 'Ganzjährig sonnengereift',
    harvestSeason: 'Ganzjährig sonnengereift',
    harvestMethod: 'Nachhaltige Kleinbauern-Ernte von Hand bei goldgelber Vollreife',
    transportMethod: 'Zertifizierter, klimabewusster Seetransport zur Veredelung in die Schweiz',
    climateInfo: 'Mineralreiche vulkanische Schwemmlandböden und ganzjährig äquatoriales Tropenklima.',
    funFacts: [
      'Ecuadors Baby-Bananen zeichnen sich durch intensiven Honiggeschmack und natürliche Süsse aus.',
      'Im Gegensatz zu üblichen Bananenchips komplett unfrittiert, ohne Palmöl und ohne Zuckerzusatz.',
      'Ausgezeichnete natürliche Kalium-, Magnesium- und Vitamin-B6-Quelle.',
    ],
    coordinates: [-2.1894, -79.8891],
    gps: [-2.1894, -79.8891],
    zoomLevel: 6,
    description: 'Natursüsse Baby-Bananenscheiben aus nachhaltigem Kleinbauernanbau in Ecuador – unfrittiert, knusprig und ohne Palmöl.',
  },

  'banane-granulat': {
    country: 'Ecuador',
    countryCode: 'EC',
    flag: '🇪🇨',
    region: 'Guayas & Los Ríos',
    harvestTime: 'Ganzjährig sonnengereift',
    harvestSeason: 'Ganzjährig sonnengereift',
    harvestMethod: 'Schonendes Granulieren vollreifer getrockneter Bananen',
    transportMethod: 'Klimaschonender Überseetransport nach CH',
    climateInfo: 'Fruchtbare Böden der Pazifikküste Ecuadors unter tropischer Sonne.',
    funFacts: [
      'Bringt knusprigen Bananengeschmack direkt ins morgendliche Müsli oder Porridge.',
      'Verklumpt nicht und bleibt in trockenen Müslimischungen dauerhaft kross.',
      'Beliebt bei Kindern und Ausdauersportlern als natürlicher Energiespender.',
    ],
    coordinates: [-2.1894, -79.8891],
    gps: [-2.1894, -79.8891],
    zoomLevel: 6,
    description: 'Knuspriges Bananengranulat aus vollreifen ecuadorianischen Früchten für das morgendliche Müsli und Bowls.',
  },

  'banane-pulver': {
    country: 'Ecuador',
    countryCode: 'EC',
    flag: '🇪🇨',
    region: 'Guayas & Los Ríos',
    harvestTime: 'Ganzjährig sonnengereift',
    harvestSeason: 'Ganzjährig sonnengereift',
    harvestMethod: 'Feinste Kaltvermahlung getrockneter Bananen zu reinem Naturpulver',
    transportMethod: 'Klimaschonende Fracht und Schweizer Abfüllung',
    climateInfo: 'Tropisches Äquatorklima mit hoher Feuchte und ganzjähriger Wärme.',
    funFacts: [
      'Gibt Proteinshakes und Smoothies eine herrlich sämige Textur und natürliche Süsse.',
      'Perfekter natürlicher Süsskraft-Ersatz beim Backen von Pancakes und Bananenbrot.',
      'Vollgepackt mit bioverfügbaren Elektrolyten und Ballaststoffen.',
    ],
    coordinates: [-2.1894, -79.8891],
    gps: [-2.1894, -79.8891],
    zoomLevel: 6,
    description: 'Fein gemahlenes Bananenpulver aus Ecuador – der ideale natürliche Energiespender für Shakes und Teige.',
  },

  // =========================================================================
  // 4. MANGO (Peru / Piura & Lambayeque)
  // =========================================================================
  'mango-wuerfel': {
    country: 'Peru',
    countryCode: 'PE',
    flag: '🇵🇪',
    region: 'Piura & Lambayeque',
    harvestTime: 'Dezember – März',
    harvestSeason: 'Dezember – März',
    harvestMethod: 'Baumgereifte Selektivlese von Hand der Edelsorte Kent',
    transportMethod: 'Klimakompensierte Frischelogistik direkt aus der Erzeugerregion in die Schweiz',
    climateInfo: 'Tropisch-trockenes Küstenklima im Norden Perus mit intensiver Äquatorsonne für maximalen Fruchtgeschmack.',
    funFacts: [
      'Peruanische Kent-Mangos gelten weltweit als besonders aromatisch, saftig und faserarm.',
      'Durch die Gefriertrocknung im Ursprungsland bleibt das volle tropische Aroma ohne Zusatzstoffe erhalten.',
      'Reich an wertvollem Vitamin A, Vitamin C und natürlichen sekundären Pflanzenstoffen.',
    ],
    coordinates: [-5.1945, -80.6328],
    gps: [-5.1945, -80.6328],
    zoomLevel: 6,
    description: 'Saftig-süsse Mangowürfel der Edelsorte Kent aus sonnenverwöhnten Oasen im Norden Perus – purer Exotikgenuss.',
  },

  'mango-granulat': {
    country: 'Peru',
    countryCode: 'PE',
    flag: '🇵🇪',
    region: 'Piura & Lambayeque',
    harvestTime: 'Dezember – März',
    harvestSeason: 'Dezember – März',
    harvestMethod: 'Schonendes Körnen gefriergetrockneter peruanischer Mangos',
    transportMethod: 'Direkter Frischetransport zur Schweizer Veredelung',
    climateInfo: 'Wüstenoasen mit Schmelzwasserbewässerung unter kraftvoller Pazifiksonne.',
    funFacts: [
      'Leuchtend gelber Crunch mit intensiver Fruchtnote für Smoothie-Bowls und Dessertteller.',
      'Behält auch in Joghurt und Cremes eine angenehm knusprige Textur.',
      '100% rein ohne Konservierungsmittel oder Schwefelung.',
    ],
    coordinates: [-5.1945, -80.6328],
    gps: [-5.1945, -80.6328],
    zoomLevel: 6,
    description: 'Goldgelber Mangocrunch aus der peruanischen Region Piura – sonniger Tropengeschmack für jedes Frühstück.',
  },

  'mangopulver': {
    country: 'Peru',
    countryCode: 'PE',
    flag: '🇵🇪',
    region: 'Piura & Lambayeque',
    harvestTime: 'Dezember – März',
    harvestSeason: 'Dezember – März',
    harvestMethod: 'Feinste Kaltvermahlung baumgereifter Kent-Mangos',
    transportMethod: 'Klimaschonender Transport und Schweizer Schutzabfüllung',
    climateInfo: 'Optimale Reifebedingungen unter der peruanischen Äquatorsonne.',
    funFacts: [
      'Bringt exotischen Geschmack und warme Farbe in Cremes, Eis und Cocktails.',
      'Löst sich sofort und verleiht Smoothies eine samtige Konsistenz.',
      'Aus über 800g Frischmango pro 100g Pulver hochkonzentriert hergestellt.',
    ],
    coordinates: [-5.1945, -80.6328],
    gps: [-5.1945, -80.6328],
    zoomLevel: 6,
    description: '100% reines Mangopulver aus baumgereiften peruanischen Früchten – intensiv exotisch und vitaminreich.',
  },

  // =========================================================================
  // 5. ANANAS (Costa Rica / San Carlos & Alajuela)
  // =========================================================================
  'ananas-granulat': {
    country: 'Costa Rica',
    countryCode: 'CR',
    flag: '🇨🇷',
    region: 'San Carlos & Alajuela',
    harvestTime: 'Ganzjährig sonnengereift',
    harvestSeason: 'Ganzjährig sonnengereift',
    harvestMethod: 'Selektive Ernte von Hand bei goldgelber Vollreife der Sorte Golden Ripe',
    transportMethod: 'Klimazertifizierter Übersee-Frischetransport zur Schweizer Veredelung',
    climateInfo: 'Tropisches Klima mit mineralreichen Vulkanböden rund um den Vulkan Arenal.',
    funFacts: [
      'Costa-ricanische Ananas zeichnet sich durch feine Säure und maximale natürliche Fruchtsüsse aus.',
      'Enthält das natürliche Enzym Bromelain sowie wertvolle Vitalstoffe in bioaktiver Form.',
      'Knuspriges Granulat veredelt Porridge, Bowls und Desserts mit exotischer Frische.',
    ],
    coordinates: [10.4226, -84.4746],
    gps: [10.4226, -84.4746],
    zoomLevel: 6,
    description: 'Knuspriges Ananasgranulat aus sonnengereiften Früchten Costa Ricas – süss-säuerlich und herrlich erfrischend.',
  },

  // =========================================================================
  // 6. MARACUJA (Ecuador / Santo Domingo & Pichincha)
  // =========================================================================
  'maracuja-granulat': {
    country: 'Ecuador',
    countryCode: 'EC',
    flag: '🇪🇨',
    region: 'Santo Domingo & Pichincha',
    harvestTime: 'Ganzjährig',
    harvestSeason: 'Ganzjährig',
    harvestMethod: 'Ernte voll ausgereifter Passionsfrüchte und behutsame Vakuumveredelung',
    transportMethod: 'Zertifizierter Seetransport direkt in die Schweiz',
    climateInfo: 'Subtropische Andenhänge mit hoher Luftfeuchtigkeit und nährstoffreichen Vulkanböden.',
    funFacts: [
      'Die Passionsfrucht besitzt eines der intensivsten und erfrischendsten Aromaprofile der Pflanzenwelt.',
      'Sorgt für ein unvergleichliches Prickeln auf der Zunge mit knackigem Crunch.',
      'Reich an Vitamin A, Kalium und natürlichen sekundären Fruchtstoffen.',
    ],
    coordinates: [-0.2532, -79.1719],
    gps: [-0.2532, -79.1719],
    zoomLevel: 6,
    description: 'Exotisch-prickelndes Maracujagranulat aus Ecuador mit intensiver natürlicher Fruchtsäure und feinem Crunch.',
  },

  // =========================================================================
  // 7. ZITRUSFRÜCHTE (Spanien / Valencia & Murcia)
  // =========================================================================
  'orange-pulver': {
    country: 'Spanien',
    countryCode: 'ES',
    flag: '🇪🇸',
    region: 'Valencia',
    harvestTime: 'November – Mai',
    harvestSeason: 'November – Mai',
    harvestMethod: 'Traditionelle Handsammlung bei voller Fruchtreife im sonnigen Hain',
    transportMethod: 'Direkter europäischer Landtransport in die Schweiz',
    climateInfo: 'Mediterranes Sonnenklima mit über 300 Sonnentagen pro Jahr an der spanischen Mittelmeerküste.',
    funFacts: [
      'Die sonnigen Haine Valencias zählen zum traditionsreichsten Zitrusanbaugebiet Europas.',
      'Reich an ätherischen Ölen und natürlichem Vitamin C in Schale und Fruchtfleisch.',
      'Schonend vermahlen zu naturreinem Fruchtpulver für Dressings, Shakes und Backkreationen.',
    ],
    coordinates: [39.4699, -0.3763],
    gps: [39.4699, -0.3763],
    zoomLevel: 6,
    description: '100% naturreines Orangenpulver aus sonnigen Hainen in Valencia – voller Geschmack und natürliches Vitamin C.',
  },

  'zitrone-pulver': {
    country: 'Spanien',
    countryCode: 'ES',
    flag: '🇪🇸',
    region: 'Murcia & Valencia',
    harvestTime: 'Oktober – April',
    harvestSeason: 'Oktober – April',
    harvestMethod: 'Handernte sonnengereifter Zitronen bei optimalem Säuregehalt',
    transportMethod: 'Direkter Landtransport zur Schweizer Veredelung',
    climateInfo: 'Trockenes, sonnenintensives Mittelmeerklima in der Huerta de Murcia.',
    funFacts: [
      'Murcia gilt als der Obstgarten Europas mit den aromatischsten Zitronen des Kontinents.',
      'Bringt frischen Zitronenkick ohne Schäl- und Pressaufwand in jede Küche.',
      '100% reine Zitrone ohne Trennmittel, Rieselhilfen oder künstliche Säureregulatoren.',
    ],
    coordinates: [37.9922, -1.1307],
    gps: [37.9922, -1.1307],
    zoomLevel: 6,
    description: 'Intensiv aromatisches Zitronenpulver aus Murcia – natürliche Frische und prickelnde Säure für Küche und Pâtisserie.',
  },

  // =========================================================================
  // 8. ECHTE HEIDELBEEREN (Schweden / Norrland & Lappland)
  // =========================================================================
  'echte-heidelbeere-ganz': {
    country: 'Schweden',
    countryCode: 'SE',
    flag: '🇸🇪',
    region: 'Norrland / Lappland',
    harvestTime: 'Juli – August',
    harvestSeason: 'Juli – August',
    harvestMethod: 'Traditionelle Wildsammlung in unberührten Wäldern',
    transportMethod: 'Zertifizierter Schienen- & Strassentransport',
    climateInfo: 'Endlose Sommertage unter der Mitternachtssonne erzeugen höchste Konzentrationen an Anthocyanen.',
    funFacts: [
      'Echte Waldheidelbeeren (Vaccinium myrtillus) sind durch und durch tiefblau – im Gegensatz zu Zuchtheidelbeeren.',
      'Enthalten ein Vielfaches an schützenden Antioxidantien im Vergleich zu herkömmlichen Kulturbeeren.',
      'Handgepflückt in unberührten, zertifizierten Urwäldern Nordschwedens.',
    ],
    coordinates: [63.8258, 20.2630],
    gps: [63.8258, 20.2630],
    zoomLevel: 5,
    description: 'Wilde Waldheidelbeeren (Vaccinium myrtillus) aus unberührten skandinavischen Wäldern – durch und durch tiefblau.',
  },

  'echte-heidelbeere-pulver': {
    country: 'Schweden',
    countryCode: 'SE',
    flag: '🇸🇪',
    region: 'Norrland / Lappland',
    harvestTime: 'Juli – August',
    harvestSeason: 'Juli – August',
    harvestMethod: 'Schonende Mahlung wild gesammelter Taiga-Heidelbeeren',
    transportMethod: 'Direkter Transport zur Schweizer Veredelung',
    climateInfo: 'Polare Lichttage im kurzen nordischen Sommer für hochkonzentrierte Pflanzenfarbstoffe.',
    funFacts: [
      'Verleiht Smoothies, Porridge und Joghurt eine spektakuläre, tief violette Naturfarbe.',
      'Einer der potentesten natürlichen Radikalfänger überhaupt.',
      '100% wilde Frucht ohne Zusätze – reinster skandinavischer Waldgeschmack.',
    ],
    coordinates: [63.8258, 20.2630],
    gps: [63.8258, 20.2630],
    zoomLevel: 5,
    description: 'Tiefblaues Pulver aus echten schwedischen Waldheidelbeeren – reich an Anthocyanen und natürlicher Vitalität.',
  },

  // =========================================================================
  // 9. ÄPFEL (Schweiz / Thurgau)
  // =========================================================================
  'apfel-gewuerfelt': {
    country: 'Schweiz',
    countryCode: 'CH',
    flag: '🇨🇭',
    region: 'Thurgau (Bodensee)',
    harvestTime: 'September – Oktober',
    harvestSeason: 'September – Oktober',
    harvestMethod: 'Sorgfältige Handernte traditioneller Schweizer Apfelsorten',
    transportMethod: 'Regionaler Kurzstreckentransport (< 80 km) zur Manufaktur',
    climateInfo: 'Mildes Bodensee-Seeklima mit optimaler Feuchte und Föhnwinden.',
    funFacts: [
      'Der Thurgau wird wegen seiner Apfelblütenpracht liebevoll Mostindien genannt.',
      'Knackig gefriergetrocknet ohne Schwefelung, ohne Schalenverlust und ohne Zucker.',
      'Beliebter ballaststoffreicher Znüni für Schweizer Schüler und Wanderer.',
    ],
    coordinates: [47.5574, 9.1627],
    gps: [47.5574, 9.1627],
    zoomLevel: 8,
    description: 'Knusprige Schweizer Apfelwürfel aus dem Thurgau – herrlich fruchtig, natursüss und ohne jegliche Zusätze.',
  },

  'apfel-granulat': {
    country: 'Schweiz',
    countryCode: 'CH',
    flag: '🇨🇭',
    region: 'Thurgau (Bodensee)',
    harvestTime: 'September – Oktober',
    harvestSeason: 'September – Oktober',
    harvestMethod: 'Schonendes Zerkleinern Thurgauer Äpfel nach der Gefriertrocknung',
    transportMethod: 'Kurze regionale Wege im Schweizer Nahverkehr',
    climateInfo: 'Obstbaulagen des Schweizer Bodenseeraums.',
    funFacts: [
      'Perfekter knuspriger Topper für das originale Schweizer Bircher Müsli.',
      'Bringt milde Fruchtsüsse und angenehmen Crunch in jede Bowl.',
      '100% Schweizer Obstbau mit transparentem Herkunftsnachweis.',
    ],
    coordinates: [47.5574, 9.1627],
    gps: [47.5574, 9.1627],
    zoomLevel: 8,
    description: 'Feines Schweizer Apfelgranulat aus dem Thurgau – das knusprige Herzstück jedes traditionellen Müslis.',
  },

  'apfel-pulver': {
    country: 'Schweiz',
    countryCode: 'CH',
    flag: '🇨🇭',
    region: 'Thurgau (Bodensee)',
    harvestTime: 'September – Oktober',
    harvestSeason: 'September – Oktober',
    harvestMethod: 'Feinstvermahlung getrockneter Schweizer Äpfel',
    transportMethod: 'Schweizer Manufaktur-Direktweg',
    climateInfo: 'Milde Bodenseehänge mit tiefgründigen Lehm- und Moränenböden.',
    funFacts: [
      'Ideal zum natürlichen Verfeinern von Gebäck, Saucen, Porridge und Desserts.',
      'Enthält natürliche Pektine und wertvolle Apfelsäuren.',
      'Frei von Konservierungsstoffen und 100% vegan.',
    ],
    coordinates: [47.5574, 9.1627],
    gps: [47.5574, 9.1627],
    zoomLevel: 8,
    description: '100% reines Schweizer Apfelpulver aus Thurgauer Früchten – sanft süsslich und vielseitig verwendbar.',
  },

  // =========================================================================
  // 10. ZWETSCHGEN (Schweiz / Baselbiet & Aargau)
  // =========================================================================
  'zwetschgen-schnitze': {
    country: 'Schweiz',
    countryCode: 'CH',
    flag: '🇨🇭',
    region: 'Baselbiet & Aargau',
    harvestTime: 'August – September',
    harvestSeason: 'August – September',
    harvestMethod: 'Traditionelle Handernte bei dunkelblauer Vollreife',
    transportMethod: 'Regionaler Kurzstreckentransport in der Schweiz',
    climateInfo: 'Sonnig-warme Jura-Südhänge und Hügelland.',
    funFacts: [
      'Schweizer Zwetschgen besitzen ein unvergleichlich tiefes, samtiges Aroma.',
      'Schonend geschnitzt und im Hochvakuum getrocknet für federleichten Knuspergenuss.',
      'Hervorragende Ballaststoffquelle für eine gesunde Verdauung.',
    ],
    coordinates: [47.4814, 7.7336],
    gps: [47.4814, 7.7336],
    zoomLevel: 8,
    description: 'Knusprige Schweizer Zwetschgenschnitze aus dem Baselbiet – herbstlich-aromatisch mit feiner Fruchtsüsse.',
  },

  'zwetschgen-granulat': {
    country: 'Schweiz',
    countryCode: 'CH',
    flag: '🇨🇭',
    region: 'Baselbiet & Aargau',
    harvestTime: 'August – September',
    harvestSeason: 'August – September',
    harvestMethod: 'Zerkleinerung gefriergetrockneter Zwetschgen zu krossem Crunch',
    transportMethod: 'Regionaler Transport zur Schweizer Veredelung',
    climateInfo: 'Sonnige Schweizer Obstgärten im Jura-Vorland.',
    funFacts: [
      'Bringt herbstlichen Fruchtgenuss ganzjährig in Frühstück und Gebäck.',
      'Farbintensiv und reich an sekundären Pflanzenstoffen.',
      'Passt traumhaft zu Zimt, Nüssen und Haferflocken.',
    ],
    coordinates: [47.4814, 7.7336],
    gps: [47.4814, 7.7336],
    zoomLevel: 8,
    description: 'Knuspriges Zwetschgengranulat aus Schweizer Ernte – ideal für Quark, Porridge und herbstliche Desserts.',
  },

  'zwetschgen-pulver': {
    country: 'Schweiz',
    countryCode: 'CH',
    flag: '🇨🇭',
    region: 'Baselbiet & Aargau',
    harvestTime: 'August – September',
    harvestSeason: 'August – September',
    harvestMethod: 'Schonendes Mahlen getrockneter Schweizer Zwetschgen',
    transportMethod: 'Schweizer Manufaktur-Direktweg',
    climateInfo: 'Geschützte Schweizer Tallagen mit warmen Spätsommertagen.',
    funFacts: [
      'Verleiht Füllungen, Cremes und Smoothies ein tiefes Zwetschgenaroma.',
      'Keine künstlichen Aromen nötig – pure Naturpower.',
      '100% reine Schweizer Früchte ohne Zusätze.',
    ],
    coordinates: [47.4814, 7.7336],
    gps: [47.4814, 7.7336],
    zoomLevel: 8,
    description: 'Fein gemahlenes Schweizer Zwetschgenpulver – intensive Naturfarbe und volles Fruchtaroma.',
  },

  // =========================================================================
  // 11. APRIKOSEN (Schweiz / Wallis)
  // =========================================================================
  'aprikose-schnitze': {
    country: 'Schweiz',
    countryCode: 'CH',
    flag: '🇨🇭',
    region: 'Wallis (Valais)',
    harvestTime: 'Juli – August',
    harvestSeason: 'Juli – August',
    harvestMethod: 'Handlese sonnengereifter Walliser Aprikosen der Edelsorte Luizet',
    transportMethod: 'Regionaler Schweizer Alpentransport zur Manufaktur',
    climateInfo: 'Sonnenreichstes Tal der Schweiz mit trocken-heissem Steppenklima.',
    funFacts: [
      'Walliser Aprikosen gelten in der Schweiz als Goldstandard für Aroma und Süsse.',
      'Schonend entkernt und in Schnitze geschnitten vor der Gefriertrocknung.',
      'Reich an Beta-Carotin, Kalium und wertvollen Antioxidantien.',
    ],
    coordinates: [46.2331, 7.3606],
    gps: [46.2331, 7.3606],
    zoomLevel: 8,
    description: 'Sonnengereifte Walliser Aprikosenschnitze aus den Schweizer Alpen – intensiv aromatisch und herrlich knusprig.',
  },

  'aprikose-granulat': {
    country: 'Schweiz',
    countryCode: 'CH',
    flag: '🇨🇭',
    region: 'Wallis (Valais)',
    harvestTime: 'Juli – August',
    harvestSeason: 'Juli – August',
    harvestMethod: 'Körnung gefriergetrockneter Schweizer Aprikosen',
    transportMethod: 'Regionaler Schweizer Transport',
    climateInfo: 'Alpine Sonnenhänge im Rhonetal mit über 300 Sonnentagen.',
    funFacts: [
      'Sonnengelber Crunch für Ihr morgendliches Müsli oder Dessert.',
      'Natürlicher Fruchtester-Geschmack ohne Zuckerzusatz.',
      'Beliebt bei Spitzenköchen zur Tellerdekoration.',
    ],
    coordinates: [46.2331, 7.3606],
    gps: [46.2331, 7.3606],
    zoomLevel: 8,
    description: 'Knuspriges Aprikosengranulat aus sonnenverwöhnten Walliser Früchten für Bowls und feine Pâtisserie.',
  },

  'aprikose-pulver': {
    country: 'Schweiz',
    countryCode: 'CH',
    flag: '🇨🇭',
    region: 'Wallis (Valais)',
    harvestTime: 'Juli – August',
    harvestSeason: 'Juli – August',
    harvestMethod: 'Kaltvermahlung getrockneter Walliser Aprikosen',
    transportMethod: 'Schweizer Manufaktur-Direktweg',
    climateInfo: 'Walliser Sonnenplateaus mit starker Sonneneinstrahlung.',
    funFacts: [
      'Bringt strahlend gelbe Naturfarbe und sonnige Fruchtnote in Teige und Cremes.',
      'Sehr feine Mahlung für sofortige Löslichkeit ohne Rückstände.',
      '100% sortenrein aus der Schweiz ohne Trägerstoffe.',
    ],
    coordinates: [46.2331, 7.3606],
    gps: [46.2331, 7.3606],
    zoomLevel: 8,
    description: '100% reines Walliser Aprikosenpulver – sonnig-süss und ideal für Desserts, Eis und feine Backwaren.',
  },

  // =========================================================================
  // 12. SAUERKIRSCHEN (Schweiz & Serbien / Ostschweiz & Šumadija)
  // =========================================================================
  'sauerkirsche-ganz': {
    country: 'Schweiz',
    countryCode: 'CH',
    flag: '🇨🇭',
    region: 'Ostschweiz / Schweizer Manufaktur',
    harvestTime: 'Juni – Juli',
    harvestSeason: 'Juni – Juli',
    harvestMethod: 'Sorgfältige Handernte vollreifer Sauerkirschen und behutsames Entkernen',
    transportMethod: 'Gekühlter Frischetransport und Schweizer Vakuumentfeuchtung',
    climateInfo: 'Ausgewogenes mitteleuropäisches Klima mit mineralstoffreichen Böden.',
    funFacts: [
      'Sauerkirschen besitzen ein perfektes Gleichgewicht aus intensiver Fruchtsäure und Fruchtnote.',
      'Enthalten natürliches Melatonin und sekundäre Pflanzenfarbstoffe (Anthocyane).',
      'Die Früchte bleiben nach dem Kälte-Vakuum federleicht und vollkommen formstabil.',
    ],
    coordinates: [47.1662, 8.5155],
    gps: [47.1662, 8.5155],
    zoomLevel: 8,
    description: 'Entkernte, knusprige Sauerkirschen – der intensiv säuerlich-fruchtige Knabberspass für echte Fruchtfans.',
  },

  'sauerkirsche-granulat': {
    country: 'Schweiz',
    countryCode: 'CH',
    flag: '🇨🇭',
    region: 'Ostschweiz / Schweizer Manufaktur',
    harvestTime: 'Juni – Juli',
    harvestSeason: 'Juni – Juli',
    harvestMethod: 'Zerkleinern entkernter gefriergetrockneter Sauerkirschen',
    transportMethod: 'Schweizer Manufaktur-Transport',
    climateInfo: 'Gemässigtes Klima mit optimalen Niederschlägen für saftige Steinfrüchte.',
    funFacts: [
      'Setzt frische, säuerliche Akzente in schokoladigen oder süssen Desserts.',
      'Perfekt geeignet für Bircher Müsli, Porridge und Joghurt.',
      '100% rein ohne Zucker oder Konservierungsmittel.',
    ],
    coordinates: [47.1662, 8.5155],
    gps: [47.1662, 8.5155],
    zoomLevel: 8,
    description: 'Knuspriges Sauerkirschgranulat mit spritzig-herber Fruchtnote für Desserts und Müslis.',
  },

  'sauerkirsche-pulver': {
    country: 'Schweiz',
    countryCode: 'CH',
    flag: '🇨🇭',
    region: 'Ostschweiz / Schweizer Manufaktur',
    harvestTime: 'Juni – Juli',
    harvestSeason: 'Juni – Juli',
    harvestMethod: 'Feinste Mahlung vollreifer gefriergetrockneter Sauerkirschen',
    transportMethod: 'Schweizer Manufaktur-Direktweg',
    climateInfo: 'Hügelland der Schweizer Voralpen.',
    funFacts: [
      'Beliebt bei Sportlern für Regeneration und als natürlicher Fitmacher.',
      'Tiefrote Färbekraft für Macarons, Glasuren und Smoothies.',
      'Unverfälschtes Fruchtpulver ohne jegliche Trägerstoffe.',
    ],
    coordinates: [47.1662, 8.5155],
    gps: [47.1662, 8.5155],
    zoomLevel: 8,
    description: 'Reines Sauerkirschpulver – intensiv herb-fruchtig und ein kraftvoller natürlicher Farb- und Vitaminspender.',
  },

  // =========================================================================
  // 13. BROMBEEREN (Schweiz / Thurgau)
  // =========================================================================
  'brombeere-ganz': {
    country: 'Schweiz',
    countryCode: 'CH',
    flag: '🇨🇭',
    region: 'Thurgau & Ostschweiz',
    harvestTime: 'Juli – August',
    harvestSeason: 'Juli – August',
    harvestMethod: 'Sorgfältige Handlese vollreifer, tiefschwarzer Brombeeren',
    transportMethod: 'Klimaschonender Transport zur Schweizer Manufaktur',
    climateInfo: 'Feucht-warme Sommerbedingungen für pralle, saftige Wald- und Gartenbeeren.',
    funFacts: [
      'Brombeeren gehören zu den ballaststoffreichsten Beerenarten überhaupt.',
      'Dunkelviolette Pigmente (Anthocyane) schützen die Zellen vor freiem Radikalstress.',
      'Knusprig-luftiger Genuss ganz ohne harte Stiele.',
    ],
    coordinates: [47.5574, 9.1627],
    gps: [47.5574, 9.1627],
    zoomLevel: 8,
    description: 'Ganze gefriergetrocknete Brombeeren – tiefschwarz, herrlich knusprig und reich an wertvollen Vitalstoffen.',
  },

  'brombeere-granulat': {
    country: 'Schweiz',
    countryCode: 'CH',
    flag: '🇨🇭',
    region: 'Thurgau & Ostschweiz',
    harvestTime: 'Juli – August',
    harvestSeason: 'Juli – August',
    harvestMethod: 'Behutsames Granulieren gefriergetrockneter Brombeeren',
    transportMethod: 'Schweizer Direktvertrieb',
    climateInfo: 'Kontrollierter Schweizer Qualitätsstandard in Bio-Gärten.',
    funFacts: [
      'Knuspriger dunkelvioletter Topper für Smoothie-Bowls und Chia-Pudding.',
      'Hohe Konzentration an natürlichen Fruchtsäuren und Vitamin C.',
      '100% reine Frucht ohne jegliche künstliche Zusätze.',
    ],
    coordinates: [47.5574, 9.1627],
    gps: [47.5574, 9.1627],
    zoomLevel: 8,
    description: 'Knuspriges Brombeergranulat für das morgendliche Müsli und kreative Dessertkreationen.',
  },

  'brombeere-pulver': {
    country: 'Schweiz',
    countryCode: 'CH',
    flag: '🇨🇭',
    region: 'Thurgau & Ostschweiz',
    harvestTime: 'Juli – August',
    harvestSeason: 'Juli – August',
    harvestMethod: 'Kaltvermahlung ganzer gefriergetrockneter Brombeeren',
    transportMethod: 'Schweizer Manufaktur-Direktweg',
    climateInfo: 'Optimale Wachstumsbedingungen in geschützten Schweizer Obsthainen.',
    funFacts: [
      'Färbt Teige und Cremes in spektakuläres Dunkelviolett.',
      'Feines Mundgefühl ohne Kernrückstände in Getränken.',
      'Volle Antioxidantien-Power der ganzen Beere.',
    ],
    coordinates: [47.5574, 9.1627],
    gps: [47.5574, 9.1627],
    zoomLevel: 8,
    description: '100% reines Brombeerpulver – intensive Naturfarbe und edles Waldbeerenaroma.',
  },

  // =========================================================================
  // 14. SCHWARZE JOHANNISBEEREN (Schweiz & Polen / Thurgau & Niederschlesien)
  // =========================================================================
  'schwarze-johannisbeere-ganz': {
    country: 'Schweiz',
    countryCode: 'CH',
    flag: '🇨🇭',
    region: 'Thurgau / Schweizer Manufaktur',
    harvestTime: 'Juli – August',
    harvestSeason: 'Juli – August',
    harvestMethod: 'Traditionelle Handlese bei tiefschwarzer Reife',
    transportMethod: 'Frischetransport zur Schweizer Veredelung',
    climateInfo: 'Kühles, gemässigtes mitteleuropäisches Klima mit nährstoffreichen Böden.',
    funFacts: [
      'Schwarze Johannisbeeren enthalten mehr als das Dreifache an Vitamin C gegenüber Orangen.',
      'Markant-würziges Fruchtaroma, das Kenner besonders schätzen.',
      'Krosser Biss und samtiger Fruchtkern im Kälte-Vakuum.',
    ],
    coordinates: [47.5574, 9.1627],
    gps: [47.5574, 9.1627],
    zoomLevel: 8,
    description: 'Ganze gefriergetrocknete Schwarze Johannisbeeren – der herb-fruchtige Vitamin-C-Gigant für pure Energie.',
  },

  'schwarze-johannisbeere-pulver': {
    country: 'Schweiz',
    countryCode: 'CH',
    flag: '🇨🇭',
    region: 'Thurgau / Schweizer Manufaktur',
    harvestTime: 'Juli – August',
    harvestSeason: 'Juli – August',
    harvestMethod: 'Feinstvermahlung getrockneter Schwarzer Johannisbeeren',
    transportMethod: 'Schweizer Manufaktur-Transport',
    climateInfo: 'Mineralreiche Böden Mitteleuropas für konzentrierte sekundäre Pflanzenstoffe.',
    funFacts: [
      'Hochgeschätzt für Immunkuren und als herbe Zutat in Shakes.',
      'Intensive dunkle Naturfarbe und unverwechselbarer Cassis-Geschmack.',
      '100% naturrein ohne Trägerstoffe.',
    ],
    coordinates: [47.5574, 9.1627],
    gps: [47.5574, 9.1627],
    zoomLevel: 8,
    description: '100% reines Schwarzes Johannisbeerpulver (Cassis) – kraftvoller Vitamin-C-Booster mit herbem Spitzenaroma.',
  },

  // =========================================================================
  // 15. JOGHURTMISCHUNGEN (Schweizer Manufaktur)
  // =========================================================================
  'joghurtmischung-himbeere': {
    country: 'Schweiz',
    countryCode: 'CH',
    flag: '🇨🇭',
    region: 'Schweizer Manufaktur',
    harvestTime: 'Ganzjährig gemischt',
    harvestSeason: 'Ganzjährig',
    harvestMethod: 'Sorgfältige Manufaktur-Abmischung von knusprigem Himbeergranulat',
    transportMethod: 'Schweizer Manufaktur-Direktversand',
    climateInfo: 'Schweizer Qualitätsstandard mit transparenten Rohstoffquellen.',
    funFacts: [
      'Speziell komponiert für die sofortige Verbindung mit Naturjoghurt oder Magerquark.',
      'Zieht im Joghurt leicht Saft und färbt ihn in leuchtendes Pink.',
      '100% Frucht ohne zugesetzten Kristallzucker.',
    ],
    coordinates: [47.3769, 8.5417],
    gps: [47.3769, 8.5417],
    zoomLevel: 8,
    description: 'Aromatisches Himbeergranulat zur Veredelung von frischem Schweizer Naturjoghurt und Quark.',
  },

  'joghurtmischung-heidelbeere': {
    country: 'Schweiz',
    countryCode: 'CH',
    flag: '🇨🇭',
    region: 'Schweizer Manufaktur',
    harvestTime: 'Ganzjährig gemischt',
    harvestSeason: 'Ganzjährig',
    harvestMethod: 'Manufaktur-Mischung aus wilden Taiga-Heidelbeeren',
    transportMethod: 'Schweizer Manufaktur-Direktversand',
    climateInfo: 'Schweizer Veredelungstradition.',
    funFacts: [
      'Verwandelt einfachen Naturjoghurt in Sekundenschnelle in ein tiefblaues Superfood.',
      'Volle Dosis an natürlichen Anthocyanen und Antioxidantien.',
      'Knusprige Beerenstückchen für angenehmes Mundgefühl.',
    ],
    coordinates: [47.3769, 8.5417],
    gps: [47.3769, 8.5417],
    zoomLevel: 8,
    description: 'Echte Heidelbeeren in perfekter Körnung für den gesunden Joghurtgenuss am Morgen.',
  },

  'joghurtmischung-sauerkirschen': {
    country: 'Schweiz',
    countryCode: 'CH',
    flag: '🇨🇭',
    region: 'Schweizer Manufaktur',
    harvestTime: 'Ganzjährig gemischt',
    harvestSeason: 'Ganzjährig',
    harvestMethod: 'Schonendes Granulieren entkernter Sauerkirschen',
    transportMethod: 'Schweizer Manufaktur-Direktversand',
    climateInfo: 'Schweizer Veredelungskunst.',
    funFacts: [
      'Sorgt für erfrischende, pikant-fruchtige Säure im cremigen Joghurt.',
      'Enthält natürliches Melatonin für einen ausgeglichenen Start in den Tag.',
      'Beliebt als fettfreie Fruchtbasis für Protein-Bowls.',
    ],
    coordinates: [47.3769, 8.5417],
    gps: [47.3769, 8.5417],
    zoomLevel: 8,
    description: 'Herb-fruchtiger Sauerkirsch-Crunch, der cremigem Joghurt eine unvergleichliche Frische verleiht.',
  },

  'joghurtmischung-aprikosen': {
    country: 'Schweiz',
    countryCode: 'CH',
    flag: '🇨🇭',
    region: 'Schweizer Manufaktur',
    harvestTime: 'Ganzjährig gemischt',
    harvestSeason: 'Ganzjährig',
    harvestMethod: 'Sorgfältige Mischung sonnengereifter Aprikosenstückchen',
    transportMethod: 'Schweizer Manufaktur-Direktversand',
    climateInfo: 'Schweizer Veredelungskunst.',
    funFacts: [
      'Bringt die sonnige Süsse von Sommeraprikosen direkt in Ihre Schale.',
      'Angenehm weicher Biss bei Kontakt mit Joghurtkernen.',
      'Reich an pflanzlichem Provitamin A.',
    ],
    coordinates: [47.3769, 8.5417],
    gps: [47.3769, 8.5417],
    zoomLevel: 8,
    description: 'Sonniges Aprikosengranulat für einen fruchtigen Start in den Morgen mit feiner natürlicher Süsse.',
  },

  'joghurtmischung-zwetschgen': {
    country: 'Schweiz',
    countryCode: 'CH',
    flag: '🇨🇭',
    region: 'Schweizer Manufaktur',
    harvestTime: 'Ganzjährig gemischt',
    harvestSeason: 'Ganzjährig',
    harvestMethod: 'Kombination handverlesener Zwetschgenstückchen',
    transportMethod: 'Schweizer Manufaktur-Direktversand',
    climateInfo: 'Schweizer Veredelungskunst.',
    funFacts: [
      'Besonders ballaststoffreich und förderlich für eine gesunde Verdauung.',
      'Warme, herbstliche Geschmacksnote, die perfekt zu Joghurt passt.',
      '100% rein pflanzlich ohne Aromazusätze.',
    ],
    coordinates: [47.3769, 8.5417],
    gps: [47.3769, 8.5417],
    zoomLevel: 8,
    description: 'Knuspriges Zwetschgengranulat mit herbstlich-tiefem Fruchtaroma für Joghurt und Müsli.',
  },

  'joghurtmischung-erdbeere': {
    country: 'Schweiz',
    countryCode: 'CH',
    flag: '🇨🇭',
    region: 'Schweizer Manufaktur',
    harvestTime: 'Ganzjährig gemischt',
    harvestSeason: 'Ganzjährig',
    harvestMethod: 'Schonende Vermählung knusprigen Erdbeergranulats',
    transportMethod: 'Schweizer Manufaktur-Direktversand',
    climateInfo: 'Schweizer Veredelungskunst.',
    funFacts: [
      'Der unangefochtene Liebling bei Gross und Klein für echten Erdbeerjoghurt.',
      'Färbt Joghurt auf natürliche Weise appetitlich rot.',
      'Kein raffinierter Zucker – pure Fruchtextrakte im Vakuum bewahrt.',
    ],
    coordinates: [47.3769, 8.5417],
    gps: [47.3769, 8.5417],
    zoomLevel: 8,
    description: 'Feines Erdbeergranulat für den beliebtesten Fruchtjoghurt-Klassiker – 100% pure Frucht.',
  },

  // =========================================================================
  // 16. SNACKS, MÜSLIS & PROBIERSETS (Schweiz / Schweizer Manufaktur)
  // =========================================================================
  'mein-wander-snack': {
    country: 'Schweiz',
    countryCode: 'CH',
    flag: '🇨🇭',
    region: 'Schweizer Manufaktur',
    harvestTime: 'Ganzjährig komponiert',
    harvestSeason: 'Ganzjährig',
    harvestMethod: 'Exklusive Zusammenstellung energiereicher Früchte und Beeren',
    transportMethod: 'Schweizer Post versichert',
    climateInfo: 'Höchste Schweizer Manufakturqualität für Outdoor-Abenteuer.',
    funFacts: [
      'Federleicht im Rucksack: spart 90% des Gewichts im Vergleich zu Frischobst.',
      'Schmilzt nicht in der Sonne und bleibt immer knusprig frisch.',
      'Schnell verfügbarer natürlicher Fruchtzucker für steile Bergaufstiege.',
    ],
    coordinates: [47.3769, 8.5417],
    gps: [47.3769, 8.5417],
    zoomLevel: 8,
    description: 'Der federleichte, energiereiche Begleiter für Wanderungen in den Schweizer Bergen – knusprig und vitaminreich.',
  },

  'mein-buero-snack': {
    country: 'Schweiz',
    countryCode: 'CH',
    flag: '🇨🇭',
    region: 'Schweizer Manufaktur',
    harvestTime: 'Ganzjährig komponiert',
    harvestSeason: 'Ganzjährig',
    harvestMethod: 'Sorgfältige Mischung krosser Fruchtstücke für den Arbeitsalltag',
    transportMethod: 'Schweizer Post versichert',
    climateInfo: 'Schweizer Manufakturqualität.',
    funFacts: [
      'Keine klebrigen Hände an der Tastatur: sauberes, trockenes Snacken.',
      'Gesunde Alternative zu Schokoriegeln gegen das Nachmittagstief.',
      'Reich an Vitaminen zur Unterstützung der geistigen Konzentration.',
    ],
    coordinates: [47.3769, 8.5417],
    gps: [47.3769, 8.5417],
    zoomLevel: 8,
    description: 'Der gesunde, saubere Snack für Büro und Homeoffice (200g) – kein Kleckern, volle Vitaminkraft.',
  },

  'immun-booster': {
    country: 'Schweiz',
    countryCode: 'CH',
    flag: '🇨🇭',
    region: 'Schweizer Manufaktur',
    harvestTime: 'Ganzjährig komponiert',
    harvestSeason: 'Ganzjährig',
    harvestMethod: 'Selektion besonders vitamin-C- und antioxidantienreicher Früchte',
    transportMethod: 'Schweizer Post versichert',
    climateInfo: 'Geprüfter Schweizer Vitalstoff-Standard.',
    funFacts: [
      'Kombiniert Johannisbeeren, Heidelbeeren und Erdbeeren für ein maximales Nährstoffprofil.',
      'Unterstützt das Immunsystem auf natürliche Weise in der nasskalten Jahreszeit.',
      '100% naturbelassen ohne künstliche Vitaminstreuung.',
    ],
    coordinates: [47.3769, 8.5417],
    gps: [47.3769, 8.5417],
    zoomLevel: 8,
    description: 'Kraftvolle Mischung aus heimischen und wilden Beeren zur Stärkung der körpereigenen Abwehrkräfte.',
  },

  'probtersaeckli': {
    country: 'Schweiz',
    countryCode: 'CH',
    flag: '🇨🇭',
    region: 'Schweizer Manufaktur',
    harvestTime: 'Ganzjährig komponiert',
    harvestSeason: 'Ganzjährig',
    harvestMethod: 'Bunte Degustationsmischung unserer feinsten Sorten',
    transportMethod: 'Schweizer Post versichert',
    climateInfo: 'Schweizer Manufakturkunst.',
    funFacts: [
      'Die perfekte Gelegenheit, um die ganze Vielfalt von fruit-comestible zu entdecken.',
      'Enthält die beliebtesten Beeren- und Fruchtsorten zum Kennenlernen.',
      'Beliebtes kleines Mitbringsel für ernährungsbewusste Freunde.',
    ],
    coordinates: [47.3769, 8.5417],
    gps: [47.3769, 8.5417],
    zoomLevel: 8,
    description: 'Das beliebte Probiersäckli zum Kennenlernen unseres knusprigen Sortiments.',
  },

  'family-bag-probiersaeckli': {
    country: 'Schweiz',
    countryCode: 'CH',
    flag: '🇨🇭',
    region: 'Schweizer Manufaktur',
    harvestTime: 'Ganzjährig komponiert',
    harvestSeason: 'Ganzjährig',
    harvestMethod: 'Grosse Vorratsmischung für die ganze Familie',
    transportMethod: 'Schweizer Post versichert',
    climateInfo: 'Schweizer Manufakturkunst.',
    funFacts: [
      'Bietet allen Familienmitgliedern ihre persönliche Lieblingsfrucht im Vorratsformat.',
      'Ideal für die gesunde Znüni-Box von Schulkindern.',
      'Wiederverschliessbarer Aromabeutel für dauerhafte Knusprigkeit.',
    ],
    coordinates: [47.3769, 8.5417],
    gps: [47.3769, 8.5417],
    zoomLevel: 8,
    description: 'Family Bag Probiersäckli im grossen Vorratsbeutel zum Nachfüllen für die ganze Familie.',
  },

  'mueslimix': {
    country: 'Schweiz',
    countryCode: 'CH',
    flag: '🇨🇭',
    region: 'Schweizer Manufaktur',
    harvestTime: 'Ganzjährig gemischt',
    harvestSeason: 'Ganzjährig',
    harvestMethod: 'Ausgewogene Komposition von Beeren und Früchten für Müslis',
    transportMethod: 'Schweizer Post versichert',
    climateInfo: 'Schweizer Veredelungskunst.',
    funFacts: [
      'Macht jedes Frühstücksmüsli ohne künstliche Aromen zum fruchtigen Erlebnis.',
      'Gleichmässig verteilt für die perfekte Balance bei jedem Löffel.',
      'Reich an Ballaststoffen und natürlichen Mineralien.',
    ],
    coordinates: [47.3769, 8.5417],
    gps: [47.3769, 8.5417],
    zoomLevel: 8,
    description: 'Der ultimative Müslimix aus schonend gefriergetrockneten Früchten für Ihr tägliches Knuspermüsli.',
  },

  'instant-muesli-mix': {
    country: 'Schweiz',
    countryCode: 'CH',
    flag: '🇨🇭',
    region: 'Schweizer Manufaktur',
    harvestTime: 'Ganzjährig gemischt',
    harvestSeason: 'Ganzjährig',
    harvestMethod: 'Fein abgestimmter Sofort-Fruchtmix (200g)',
    transportMethod: 'Schweizer Post versichert',
    climateInfo: 'Schweizer Veredelungskunst.',
    funFacts: [
      'Einfach mit Milch oder Pflanzendrink übergiessen und sofort geniessen.',
      'Schnelllöslicher Fruchtanteil verleiht der Milch natürlichen Geschmack.',
      'Perfekt für die schnelle, gesunde Mahlzeit am Morgen.',
    ],
    coordinates: [47.3769, 8.5417],
    gps: [47.3769, 8.5417],
    zoomLevel: 8,
    description: 'Instant Müsli Mix (200g) mit vollem Fruchtgeschmack für das schnelle, unkomplizierte Power-Frühstück.',
  },

  'pure-frucht-muesli-topping': {
    country: 'Serbien',
    countryCode: 'RS',
    flag: '🇷🇸',
    region: 'Arilje / Loznica & CH Manufaktur',
    harvestTime: 'Mai – Juli',
    harvestSeason: 'Mai – Juli',
    harvestMethod: '100% sortenreine Fruchtstückchen von Hand komponiert',
    transportMethod: 'Klimaschonender Transport zur Schweizer Manufaktur',
    climateInfo: 'Sonnenreiche Berglagen Westserbiens für maximale Fruchtextrakte.',
    funFacts: [
      'Besteht ausschliesslich aus gefriergetrockneten Früchten ohne Getreidezusatz.',
      'Ideal für alle, die ihr eigenes Müsli individuell veredeln möchten.',
      'Knuspriger Genuss ganz ohne Zuckerzusätze.',
    ],
    coordinates: [44.5305, 19.2253],
    gps: [44.5305, 19.2253],
    zoomLevel: 5,
    description: 'Pure Frucht Müsli-Topping aus sonnengereiften Erdbeeren und Himbeeren – 100% Frucht ohne Haferzusatz.',
  },

  // =========================================================================
  // 17. GESCHENKBOXEN & SPECIAL EDITIONS (Schweiz / Schweizer Manufaktur)
  // =========================================================================
  'top-seller-1000g': {
    country: 'Schweiz',
    countryCode: 'CH',
    flag: '🇨🇭',
    region: 'Schweizer Manufaktur',
    harvestTime: 'Ganzjährig zusammengestellt',
    harvestSeason: 'Ganzjährig',
    harvestMethod: 'Handverlesene Auswahl unserer beliebtesten Bestseller-Früchte',
    transportMethod: 'Schweizer Post versichert',
    climateInfo: 'Höchste Schweizer Manufakturkunst für anspruchsvolle Fruchtgeniesser.',
    funFacts: [
      'Enthält volle 1.0 kg gefriergetrocknete Edelware – das entspricht rund 10 kg frischem Obst!',
      'Grosse Sortenvielfalt von Erdbeere über Himbeere bis hin zu exotischer Mango.',
      'Nachhaltig verpackt in robuster Schweizer Geschenkbox.',
    ],
    coordinates: [47.3769, 8.5417],
    gps: [47.3769, 8.5417],
    zoomLevel: 8,
    description: 'Top Seller Box (1000g!) mit unseren beliebtesten Premium-Früchten im vorteilhaften Grossformat.',
  },

  'geniesser-edition-1400g': {
    country: 'Schweiz',
    countryCode: 'CH',
    flag: '🇨🇭',
    region: 'Schweizer Manufaktur',
    harvestTime: 'Ganzjährig zusammengestellt',
    harvestSeason: 'Ganzjährig',
    harvestMethod: 'Meisterhafte Zusammenstellung für leidenschaftliche Feinschmecker',
    transportMethod: 'Schweizer Post versichert',
    climateInfo: 'Schweizer Manufakturkunst.',
    funFacts: [
      'Volle 1.4 kg feinste Früchte für monatelangen gesunden Knusperspass.',
      'Beinhaltet auch seltene Beerensorten wie echte schwedische Heidelbeeren.',
      'Das ideale Geschenk für Hochzeiten, Jubiläen oder Firmenfeiern.',
    ],
    coordinates: [47.3769, 8.5417],
    gps: [47.3769, 8.5417],
    zoomLevel: 8,
    description: 'Geniesser Edition (1.4kg!) – das ultimative Luxuspaket mit unserer gesamten Geschmacksvielfalt.',
  },

  'spar-edition-2200g': {
    country: 'Schweiz',
    countryCode: 'CH',
    flag: '🇨🇭',
    region: 'Schweizer Manufaktur',
    harvestTime: 'Ganzjährig zusammengestellt',
    harvestSeason: 'Ganzjährig',
    harvestMethod: 'Grosse Vorratsbox mit dem besten Preis-Leistungs-Verhältnis',
    transportMethod: 'Schweizer Post versichert',
    climateInfo: 'Schweizer Manufakturkunst.',
    funFacts: [
      'Riesige 2.2 kg Vorratspackung – entspricht mehr als 22 kg Frischobst!',
      'Maximaler Preisvorteil für Vielverwender, Familien und Gastronomiebetriebe.',
      'Lange Haltbarkeit dank luftdichter Einzelgebinde.',
    ],
    coordinates: [47.3769, 8.5417],
    gps: [47.3769, 8.5417],
    zoomLevel: 8,
    description: 'Spar Edition (2.2kg!) – unser grösstes Vorteilspaket für smarte Vorratskäufer und Familien.',
  },

  'einsteiger-box': {
    country: 'Schweiz',
    countryCode: 'CH',
    flag: '🇨🇭',
    region: 'Schweizer Manufaktur',
    harvestTime: 'Ganzjährig zusammengestellt',
    harvestSeason: 'Ganzjährig',
    harvestMethod: 'Feine Auswahl klassischer Früchte für Neukunden (500g)',
    transportMethod: 'Schweizer Post versichert',
    climateInfo: 'Schweizer Manufakturkunst.',
    funFacts: [
      'Enthält die drei beliebtesten Früchte: Erdbeere, Himbeere und Banane.',
      'Ideal zum Ausprobieren der Gefriertrocknungstechnologie.',
      'Hervorragendes Preis-Leistungs-Verhältnis für den Einstieg.',
    ],
    coordinates: [47.3769, 8.5417],
    gps: [47.3769, 8.5417],
    zoomLevel: 8,
    description: 'Einsteiger Box (500g!) – die perfekte Erstausstattung zum Kennenlernen unseres Sortiments.',
  },

  'gin-tonic-box': {
    country: 'Schweiz',
    countryCode: 'CH',
    flag: '🇨🇭',
    region: 'Schweizer Manufaktur',
    harvestTime: 'Ganzjährig zusammengestellt',
    harvestSeason: 'Ganzjährig',
    harvestMethod: 'Aromatische Botanicals und Beeren für exklusive Drinks (800g)',
    transportMethod: 'Schweizer Post versichert',
    climateInfo: 'Schweizer Manufakturkunst.',
    funFacts: [
      'Gefriertrocknung bewahrt ätherische Öle, die im Glas sofort aufblühen.',
      'Gibt Drinks nicht nur intensives Aroma, sondern auch fantastische Farben.',
      'Verwässert das Getränk im Gegensatz zu frischen Früchten oder Eis nicht.',
    ],
    coordinates: [47.3769, 8.5417],
    gps: [47.3769, 8.5417],
    zoomLevel: 8,
    description: 'Gin-Tonic Botanicals Box (800g!) mit getrockneten Beeren und Zitrusfrüchten für meisterhafte Cocktails.',
  },

  'smoothie-box': {
    country: 'Schweiz',
    countryCode: 'CH',
    flag: '🇨🇭',
    region: 'Schweizer Manufaktur',
    harvestTime: 'Ganzjährig zusammengestellt',
    harvestSeason: 'Ganzjährig',
    harvestMethod: 'Auswahl feinster Fruchtpulver für vitale Drinks (1.1kg)',
    transportMethod: 'Schweizer Post versichert',
    climateInfo: 'Schweizer Manufakturkunst.',
    funFacts: [
      'Enthält reine Fruchtpulver von Beeren, Mango und Banane ohne Zuckerzusatz.',
      'Löst sich blitzschnell im Mixer auf und sorgt für samtige Textur.',
      'Hochkonzentrierter Vitaminschub für jeden Tag.',
    ],
    coordinates: [47.3769, 8.5417],
    gps: [47.3769, 8.5417],
    zoomLevel: 8,
    description: 'Smoothie Box (1.1kg!) mit hochreinen Fruchtpulvern für bunte, gesunde Vitamin-Smoothies.',
  },

  'fruehstuecks-box': {
    country: 'Schweiz',
    countryCode: 'CH',
    flag: '🇨🇭',
    region: 'Schweizer Manufaktur',
    harvestTime: 'Ganzjährig zusammengestellt',
    harvestSeason: 'Ganzjährig',
    harvestMethod: 'Knusprige Granulate und Fruchtstücke für den Frühstückstisch (800g)',
    transportMethod: 'Schweizer Post versichert',
    climateInfo: 'Schweizer Manufakturkunst.',
    funFacts: [
      'Verwandelt jedes langweilige Frühstück in ein knuspriges Festmahl.',
      'Ideal für Müsli, Porridge, Pancakes oder Joghurt-Bowls.',
      'Beliebt bei Sportlern für komplexe Kohlenhydrate und Vitamine.',
    ],
    coordinates: [47.3769, 8.5417],
    gps: [47.3769, 8.5417],
    zoomLevel: 8,
    description: 'Frühstücks Box (800g!) mit bunten Granulaten für den energiereichen und knusprigen Start in den Tag.',
  },

  'glace-box': {
    country: 'Schweiz',
    countryCode: 'CH',
    flag: '🇨🇭',
    region: 'Schweizer Manufaktur',
    harvestTime: 'Ganzjährig zusammengestellt',
    harvestSeason: 'Ganzjährig',
    harvestMethod: 'Spezielle Toppings und Fruchtpuder für Eiskreationen (1.3kg)',
    transportMethod: 'Schweizer Post versichert',
    climateInfo: 'Schweizer Manufakturkunst.',
    funFacts: [
      'Gibt Glace, Softeis und Sorbets eine knusprige Aussenhülle und intensive Fruchtnote.',
      'Schmilzt nicht und bleibt auch auf eiskalten Speisen kross.',
      'Kreiert von Pâtissiers für aussergewöhnliche Eisbecher.',
    ],
    coordinates: [47.3769, 8.5417],
    gps: [47.3769, 8.5417],
    zoomLevel: 8,
    description: 'Glace-Box (1.3kg!) – knusprige Fruchttoppings für unwiderstehliche Eiskreationen und Sorbets.',
  },

  'kyras-detox-box': {
    country: 'Schweiz',
    countryCode: 'CH',
    flag: '🇨🇭',
    region: 'Schweizer Manufaktur',
    harvestTime: 'Ganzjährig zusammengestellt',
    harvestSeason: 'Ganzjährig',
    harvestMethod: 'Handverlesene Auswahl antioxidantienreicher Beeren für Kuren',
    transportMethod: 'Schweizer Post versichert',
    climateInfo: 'Schweizer Manufakturkunst.',
    funFacts: [
      'Spezielle Zusammenstellung nach ganzheitlichem Nährstoffansatz.',
      'Reich an sekundären Pflanzenfarbstoffen und Vitamin C.',
      'Unterstützt einen bewussten, vitalen Lebensstil.',
    ],
    coordinates: [47.3769, 8.5417],
    gps: [47.3769, 8.5417],
    zoomLevel: 8,
    description: 'Kyras Detox Box – handverlesene antioxidantienreiche Früchte zur natürlichen Unterstützung des Wohlbefindens.',
  },

  'geschenk-paket': {
    country: 'Schweiz',
    countryCode: 'CH',
    flag: '🇨🇭',
    region: 'Schweizer Manufaktur',
    harvestTime: 'Ganzjährig zusammengestellt',
    harvestSeason: 'Ganzjährig',
    harvestMethod: 'Liebevoll verpacktes Sortiment mit Grußbotschaft',
    transportMethod: 'Schweizer Post versichert',
    climateInfo: 'Schweizer Manufakturkunst.',
    funFacts: [
      'Ein gesundes und zugleich elegantes Präsent für Geburtstage oder Anlässe.',
      'Überrascht mit spektakulärer Knusprigkeit und Naturfarben.',
      'Mit edler Banderole und handverpackt in der Schweiz.',
    ],
    coordinates: [47.3769, 8.5417],
    gps: [47.3769, 8.5417],
    zoomLevel: 8,
    description: 'Liebevoll arrangiertes Geschenk-Paket mit erlesenen Früchten – die gesunde Überraschung für besondere Menschen.',
  },

  'love-box': {
    country: 'Schweiz',
    countryCode: 'CH',
    flag: '🇨🇭',
    region: 'Schweizer Manufaktur',
    harvestTime: 'Ganzjährig zusammengestellt',
    harvestSeason: 'Ganzjährig',
    harvestMethod: 'Romantische Komposition aus roten Beeren und schokolierten Früchten',
    transportMethod: 'Schweizer Post versichert',
    climateInfo: 'Schweizer Manufakturkunst.',
    funFacts: [
      'Die perfekte Geschenkidee zum Valentinstag, Jahrestag oder Muttertag.',
      'Fruchtige Verführung mit Erdbeeren, Himbeeren und Schokolade.',
      'Herzförmig arrangiertes Design für bleibende Freude.',
    ],
    coordinates: [47.3769, 8.5417],
    gps: [47.3769, 8.5417],
    zoomLevel: 8,
    description: 'Love Box – romantische Beerenkreationen und schokolierte Früchte für unvergessliche Momente zu zweit.',
  },

  'geschenkbox-medium': {
    country: 'Schweiz',
    countryCode: 'CH',
    flag: '🇨🇭',
    region: 'Schweizer Manufaktur',
    harvestTime: 'Ganzjährig zusammengestellt',
    harvestSeason: 'Ganzjährig',
    harvestMethod: 'Harmonisch abgestimmtes Fruchttrio im mittleren Geschenkkarton',
    transportMethod: 'Schweizer Post versichert',
    climateInfo: 'Schweizer Manufakturkunst.',
    funFacts: [
      'Kompaktes Geschenkset mit den beliebtesten Schweizer Manufakturfrüchten.',
      'Wiederverwendbare Premium-Box aus nachhaltiger Schweizer Kartonage.',
      'Ideal als Mitarbeitergeschenk oder Aufmerksamkeit für Freunde.',
    ],
    coordinates: [47.3769, 8.5417],
    gps: [47.3769, 8.5417],
    zoomLevel: 8,
    description: 'Geschenkbox Medium – hochwertige Geschenkauswahl für jeden Anlass in edler Verpackung.',
  },

  'geschenkbox-large': {
    country: 'Schweiz',
    countryCode: 'CH',
    flag: '🇨🇭',
    region: 'Schweizer Manufaktur',
    harvestTime: 'Ganzjährig zusammengestellt',
    harvestSeason: 'Ganzjährig',
    harvestMethod: 'Grosses Festtags-Sortiment mit allen Spezialitäten des Hauses',
    transportMethod: 'Schweizer Post versichert',
    climateInfo: 'Schweizer Manufakturkunst.',
    funFacts: [
      'Das Flaggschiff unseres Hauses mit allen Bestsellern im Grossformat.',
      'Perfekt für grosse Feiern, Firmenevents oder Familienfeste.',
      'Luxuriöse Box mit edler Prägung und vollständiger Transparenzkarte.',
    ],
    coordinates: [47.3769, 8.5417],
    gps: [47.3769, 8.5417],
    zoomLevel: 8,
    description: 'Geschenkbox Large – das repräsentative Meisterstück unseres Hauses mit allen Delikatessen im Grossformat.',
  },
};

// Aliases for legacy DB slugs and alternative URL formats
PRODUCT_ORIGINS['gefriergetrocknete-erdbeere'] = PRODUCT_ORIGINS['erdbeeren-ganz'];
PRODUCT_ORIGINS['gefriergetrocknete-himbeeren'] = PRODUCT_ORIGINS['himbeeren-ganz'];
PRODUCT_ORIGINS['gefriergetrocknete-echte-heidelbeere'] = PRODUCT_ORIGINS['echte-heidelbeere-ganz'];
PRODUCT_ORIGINS['gefriergetrocknete-sauerkirsche'] = PRODUCT_ORIGINS['sauerkirsche-ganz'];
PRODUCT_ORIGINS['gefriergetrocknete-brombeere'] = PRODUCT_ORIGINS['brombeere-ganz'];
PRODUCT_ORIGINS['gefriergetrocknete-schwarze-johannisbeere'] = PRODUCT_ORIGINS['schwarze-johannisbeere-ganz'];
PRODUCT_ORIGINS['gefriergetrockneter-apfel'] = PRODUCT_ORIGINS['apfel-gewuerfelt'];
PRODUCT_ORIGINS['gefriergetrocknete-zwetschgen'] = PRODUCT_ORIGINS['zwetschgen-schnitze'];
PRODUCT_ORIGINS['gefriergetrocknete-aprikose'] = PRODUCT_ORIGINS['aprikose-schnitze'];
PRODUCT_ORIGINS['gefriergetrocknete-mango'] = PRODUCT_ORIGINS['mango-wuerfel'];
PRODUCT_ORIGINS['gefriergetrocknete-banane'] = PRODUCT_ORIGINS['banane-scheiben'];
PRODUCT_ORIGINS['gefriergetrocknete-maracuja'] = PRODUCT_ORIGINS['maracuja-granulat'];
PRODUCT_ORIGINS['gefriergetrocknete-ananas'] = PRODUCT_ORIGINS['ananas-granulat'];
PRODUCT_ORIGINS['gefriergetrocknete-orange'] = PRODUCT_ORIGINS['orange-pulver'];
PRODUCT_ORIGINS['gefriergetrocknete-zitrone'] = PRODUCT_ORIGINS['zitrone-pulver'];

// Helper to look up product origin strictly by slug, with robust fallback
export function getProductOrigin(slug: string, fallbackCountry?: string | null): ProductOriginData {
  if (PRODUCT_ORIGINS[slug]) {
    return PRODUCT_ORIGINS[slug];
  }

  // Check prefix or partial match
  const clean = slug.toLowerCase();
  for (const [key, val] of Object.entries(PRODUCT_ORIGINS)) {
    if (clean.includes(key) || key.includes(clean)) {
      return val;
    }
  }

  // Default Swiss fallback
  return {
    country: fallbackCountry || 'Schweiz',
    countryCode: 'CH',
    flag: '🇨🇭',
    region: 'Schweizer Manufaktur',
    harvestTime: 'Ganzjährig',
    harvestSeason: 'Ganzjährig',
    harvestMethod: 'Sorgfältige Handverlese bei voller Reife',
    transportMethod: 'Regionaler Schweizer Kurzstrecken-Transport',
    climateInfo: 'Schweizer Qualitätsstandard mit transparentem Herkunftsnachweis.',
    coordinates: [46.8182, 8.2275],
    gps: [46.8182, 8.2275],
    zoomLevel: 7.5,
    description: '100% naturbelassene Früchte aus transparenter Schweizer Herkunft.',
    funFacts: [
      'Gefriertrocknung bewahrt über 95% aller natürlichen Vitamine und Nährstoffe.',
      'Frei von künstlichen Aromen, Konservierungsstoffen oder zugesetztem Zucker.',
    ],
  };
}

export function getProductDisplayOrigin(product: {
  slug: string;
  name_de?: string;
  origin_country?: string | null;
}): { country: string; flag: string } {
  const origin = PRODUCT_ORIGINS[product.slug] || getProductOrigin(product.slug, product.origin_country);
  return {
    country: origin.country,
    flag: origin.flag || (origin.countryCode === 'RS' ? '🇷🇸' : origin.countryCode === 'CH' ? '🇨🇭' : origin.countryCode === 'SE' ? '🇸🇪' : origin.countryCode === 'PE' ? '🇵🇪' : origin.countryCode === 'EC' ? '🇪🇨' : origin.countryCode === 'ES' ? '🇪🇸' : origin.countryCode === 'CR' ? '🇨🇷' : '🇨🇭'),
  };
}

export type ProductOriginInfo = ProductOriginData;

export const countryCoords: Record<string, { lat: number; lng: number; code: string; label: string }> = {
  'Schweiz': { lat: 46.8182, lng: 8.2275, code: 'CH', label: 'Schweiz' },
  'Serbien': { lat: 44.5305, lng: 19.2253, code: 'RS', label: 'Serbien' },
  'Serbia': { lat: 44.5305, lng: 19.2253, code: 'RS', label: 'Serbien' },
  'Schweden': { lat: 63.8258, lng: 20.2630, code: 'SE', label: 'Schweden' },
  'Sweden': { lat: 63.8258, lng: 20.2630, code: 'SE', label: 'Schweden' },
  'Polen': { lat: 51.4026, lng: 16.1963, code: 'PL', label: 'Polen' },
  'Peru': { lat: -9.19, lng: -75.0152, code: 'PE', label: 'Peru' },
  'Ecuador': { lat: -1.8312, lng: -78.1834, code: 'EC', label: 'Ecuador' },
  'Spanien': { lat: 40.4637, lng: -3.7492, code: 'ES', label: 'Spanien' },
  'Costa Rica': { lat: 9.7489, lng: -83.7534, code: 'CR', label: 'Costa Rica' },
};

export function resolveCountryKey(rawCountry?: string | null): string {
  if (!rawCountry || !rawCountry.trim()) {
    return 'Schweiz';
  }
  const clean = rawCountry.trim();
  if (countryCoords[clean]) {
    return countryCoords[clean].label;
  }
  const upper = clean.toUpperCase();
  if (upper === 'CH') return 'Schweiz';
  if (upper === 'RS') return 'Serbien';
  if (upper === 'SE') return 'Schweden';
  if (upper === 'PL') return 'Polen';
  if (upper === 'PE') return 'Peru';
  if (upper === 'EC') return 'Ecuador';
  if (upper === 'ES') return 'Spanien';
  if (upper === 'CR') return 'Costa Rica';

  const lower = clean.toLowerCase();
  if (lower.includes('schweiz') || lower.includes('swiss') || lower.includes('switzerland')) {
    return 'Schweiz';
  }
  if (lower.includes('serb')) {
    return 'Serbien';
  }
  if (lower.includes('schwed') || lower.includes('swed')) {
    return 'Schweden';
  }
  if (lower.includes('pol')) {
    return 'Polen';
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

  return 'Schweiz';
}

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
  'Serbien': {
    lat: 44.5305,
    lng: 19.2253,
    code: 'RS',
    label: 'Serbien',
    flag: '🇷🇸',
    zoomLevel: 5,
    region: 'Arilje / Loznica',
    harvestMethod: 'Sorgfältige Handernte bei voller Reife',
    harvestSeason: 'Mai bis Juli',
    transportMethod: 'Klimaschonender Frischetransport zur Veredelung in der Schweiz',
    climateInfo: 'Sonnige Hanglagen und warmes Kontinentalklima für intensiv-aromatische Früchte.',
    funFacts: [
      'Die Region Arilje in Westserbien gilt international als weltweite Hochburg für edelste Himbeeren und Beeren.',
      'Schonende Gefriertrocknung bewahrt über 95% der Vitamine und das volle natürliche Aroma.',
    ],
  },
  'Serbia': {
    lat: 44.5305,
    lng: 19.2253,
    code: 'RS',
    label: 'Serbien',
    flag: '🇷🇸',
    zoomLevel: 5,
    region: 'Arilje / Loznica',
    harvestMethod: 'Sorgfältige Handernte bei voller Reife',
    harvestSeason: 'Mai bis Juli',
    transportMethod: 'Klimaschonender Frischetransport zur Veredelung in der Schweiz',
    climateInfo: 'Sonnige Hanglagen und warmes Kontinentalklima für intensiv-aromatische Früchte.',
    funFacts: [
      'Die Region Arilje in Westserbien gilt international als weltweite Hochburg für edelste Himbeeren und Beeren.',
      'Schonende Gefriertrocknung bewahrt über 95% der Vitamine und das volle natürliche Aroma.',
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
