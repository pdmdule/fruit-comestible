export interface ProductOriginData {
  country: string;              // npr. "Schweiz", "Costa Rica", "Serbien", "Guatemala", "Ecuador", "Peru", "Türkei"
  countryCode: string;          // npr. "CH", "CR", "RS", "GT", "PE", "EC", "TR"
  flag: string;                 // npr. "🇨🇭", "🇷🇸", "🇬🇹", "🇵🇪", "🇪🇨", "🇹🇷", "🇨🇷"
  region: string;               // npr. "Fruchtbare Anbauregionen Serbiens", "Guatemala", "Guayas & Los Ríos", "Piura", "Türkische Mittelmeerküste"
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
  sectionTitle?: string;        // Optionaler Abschnittstitel / Badge für die Herkunftssektion
}

// Podaci strogo mapirani na slug svakog konkretnog proizvoda:
export const PRODUCT_ORIGINS: Record<string, ProductOriginData> = {
  // =========================================================================
  // 1. HIMBEEREN (Serbien – Weltbekannte Beerenqualität)
  // =========================================================================
  'himbeeren-ganz': {
    country: 'Serbien',
    countryCode: 'RS',
    flag: '🇷🇸',
    region: 'Traditionelle Beerenregionen in Serbien',
    sectionTitle: 'Herkunft: Serbien – Weltbekannte Beerenqualität',
    harvestTime: 'Juni – Juli',
    harvestSeason: 'Juni – Juli',
    harvestMethod: 'Bei voller Reife besonders schonend von Hand verlesen und direkt nach der Ernte verarbeitet',
    transportMethod: 'Klimaschonender Direkttransport aus Serbien in die Schweiz',
    climateInfo: 'Ideales Mikroklima mit sonnigen Tagen, kühlen Nächten und fruchtbaren Böden',
    funFacts: [
      'Region: Ausgewählte Höhenlagen und traditionelle Beerenregionen in Serbien',
      'Klima & Boden: Ideales Mikroklima mit sonnigen Tagen, kühlen Nächten und fruchtbaren Böden',
      'Ernte: Bei voller Reife besonders schonend von Hand verlesen und direkt nach der Ernte verarbeitet',
      'Qualität: 100 % naturbelassen, aromatisch, formschön und reich an natürlichen Ballaststoffen & Antioxidantien',
    ],
    coordinates: [44.0165, 21.0059],
    gps: [44.0165, 21.0059],
    zoomLevel: 6,
    description:
      'Unsere Himbeeren stammen aus den traditionsreichen und hügeligen Obstbauregionen Serbiens, das weltweit für seine herausragende Himbeerqualität bekannt ist. Das Zusammenspiel aus mineralstoffreichen Böden, klaren Gebirgsbächen, warmen Sonnentagen und kühlen Nächten schafft ideale Bedingungen für ein langsames, natürliches Heranreifen der Beeren. Dadurch entwickeln die Früchte ihre leuchtend tiefrote Farbe und das unvergleichlich intensive, fein-säuerliche bis süsse Himbeeraroma. Zum Zeitpunkt der perfekten Vollreife werden die empfindlichen Beeren behutsam von Hand gepflückt und direkt vor Ort schonend gefriergetrocknet – für 100 % reinen, knusprigen Fruchtgenuss voller natürlicher Vitamine.',
  },

  'himbeergranulat': {
    country: 'Serbien',
    countryCode: 'RS',
    flag: '🇷🇸',
    region: 'Traditionelle Beerenregionen in Serbien',
    sectionTitle: 'Herkunft: Serbien – Weltbekannte Beerenqualität',
    harvestTime: 'Juni – Juli',
    harvestSeason: 'Juni – Juli',
    harvestMethod: 'Bei voller Reife besonders schonend von Hand verlesen und direkt nach der Ernte verarbeitet',
    transportMethod: 'Klimaschonender Direkttransport aus Serbien in die Schweiz',
    climateInfo: 'Ideales Mikroklima mit sonnigen Tagen, kühlen Nächten und fruchtbaren Böden',
    funFacts: [
      'Region: Ausgewählte Höhenlagen und traditionelle Beerenregionen in Serbien',
      'Klima & Boden: Ideales Mikroklima mit sonnigen Tagen, kühlen Nächten und fruchtbaren Böden',
      'Ernte: Bei voller Reife besonders schonend von Hand verlesen und direkt nach der Ernte verarbeitet',
      'Qualität: 100 % naturbelassen, aromatisch, formschön und reich an natürlichen Ballaststoffen & Antioxidantien',
    ],
    coordinates: [44.0165, 21.0059],
    gps: [44.0165, 21.0059],
    zoomLevel: 6,
    description:
      'Unsere Himbeeren stammen aus den traditionsreichen und hügeligen Obstbauregionen Serbiens, das weltweit für seine herausragende Himbeerqualität bekannt ist. Das Zusammenspiel aus mineralstoffreichen Böden, klaren Gebirgsbächen, warmen Sonnentagen und kühlen Nächten schafft ideale Bedingungen für ein langsames, natürliches Heranreifen der Beeren. Dadurch entwickeln die Früchte ihre leuchtend tiefrote Farbe und das unvergleichlich intensive, fein-säuerliche bis süsse Himbeeraroma. Zum Zeitpunkt der perfekten Vollreife werden die empfindlichen Beeren behutsam von Hand gepflückt und direkt vor Ort schonend gefriergetrocknet – für 100 % reinen, knusprigen Fruchtgenuss voller natürlicher Vitamine.',
  },

  'himbeerpulver': {
    country: 'Serbien',
    countryCode: 'RS',
    flag: '🇷🇸',
    region: 'Traditionelle Beerenregionen in Serbien',
    sectionTitle: 'Herkunft: Serbien – Weltbekannte Beerenqualität',
    harvestTime: 'Juni – Juli',
    harvestSeason: 'Juni – Juli',
    harvestMethod: 'Bei voller Reife besonders schonend von Hand verlesen und direkt nach der Ernte verarbeitet',
    transportMethod: 'Klimaschonender Direkttransport aus Serbien in die Schweiz',
    climateInfo: 'Ideales Mikroklima mit sonnigen Tagen, kühlen Nächten und fruchtbaren Böden',
    funFacts: [
      'Region: Ausgewählte Höhenlagen und traditionelle Beerenregionen in Serbien',
      'Klima & Boden: Ideales Mikroklima mit sonnigen Tagen, kühlen Nächten und fruchtbaren Böden',
      'Ernte: Bei voller Reife besonders schonend von Hand verlesen und direkt nach der Ernte verarbeitet',
      'Qualität: 100 % naturbelassen, aromatisch, formschön und reich an natürlichen Ballaststoffen & Antioxidantien',
    ],
    coordinates: [44.0165, 21.0059],
    gps: [44.0165, 21.0059],
    zoomLevel: 6,
    description:
      'Unsere Himbeeren stammen aus den traditionsreichen und hügeligen Obstbauregionen Serbiens, das weltweit für seine herausragende Himbeerqualität bekannt ist. Das Zusammenspiel aus mineralstoffreichen Böden, klaren Gebirgsbächen, warmen Sonnentagen und kühlen Nächten schafft ideale Bedingungen für ein langsames, natürliches Heranreifen der Beeren. Dadurch entwickeln die Früchte ihre leuchtend tiefrote Farbe und das unvergleichlich intensive, fein-säuerliche bis süsse Himbeeraroma. Zum Zeitpunkt der perfekten Vollreife werden die empfindlichen Beeren behutsam von Hand gepflückt und direkt vor Ort schonend gefriergetrocknet – für 100 % reinen, knusprigen Fruchtgenuss voller natürlicher Vitamine.',
  },

  'himbeerpulver-gesiebt-1kg': {
    country: 'Serbien',
    countryCode: 'RS',
    flag: '🇷🇸',
    region: 'Traditionelle Beerenregionen in Serbien',
    sectionTitle: 'Herkunft: Serbien – Weltbekannte Beerenqualität',
    harvestTime: 'Juni – Juli',
    harvestSeason: 'Juni – Juli',
    harvestMethod: 'Bei voller Reife besonders schonend von Hand verlesen und direkt nach der Ernte verarbeitet',
    transportMethod: 'Klimaschonender Direkttransport aus Serbien in die Schweiz',
    climateInfo: 'Ideales Mikroklima mit sonnigen Tagen, kühlen Nächten und fruchtbaren Böden',
    funFacts: [
      'Region: Ausgewählte Höhenlagen und traditionelle Beerenregionen in Serbien',
      'Klima & Boden: Ideales Mikroklima mit sonnigen Tagen, kühlen Nächten und fruchtbaren Böden',
      'Ernte: Bei voller Reife besonders schonend von Hand verlesen und direkt nach der Ernte verarbeitet',
      'Qualität: 100 % naturbelassen, aromatisch, formschön und reich an natürlichen Ballaststoffen & Antioxidantien',
    ],
    coordinates: [44.0165, 21.0059],
    gps: [44.0165, 21.0059],
    zoomLevel: 6,
    description:
      'Unsere Himbeeren stammen aus den traditionsreichen und hügeligen Obstbauregionen Serbiens, das weltweit für seine herausragende Himbeerqualität bekannt ist. Das Zusammenspiel aus mineralstoffreichen Böden, klaren Gebirgsbächen, warmen Sonnentagen und kühlen Nächten schafft ideale Bedingungen für ein langsames, natürliches Heranreifen der Beeren. Dadurch entwickeln die Früchte ihre leuchtend tiefrote Farbe und das unvergleichlich intensive, fein-säuerliche bis süsse Himbeeraroma. Zum Zeitpunkt der perfekten Vollreife werden die empfindlichen Beeren behutsam von Hand gepflückt und direkt vor Ort schonend gefriergetrocknet – für 100 % reinen, knusprigen Fruchtgenuss voller natürlicher Vitamine.',
  },

  'family-bag-himbeere': {
    country: 'Serbien',
    countryCode: 'RS',
    flag: '🇷🇸',
    region: 'Traditionelle Beerenregionen in Serbien',
    sectionTitle: 'Herkunft: Serbien – Weltbekannte Beerenqualität',
    harvestTime: 'Juni – Juli',
    harvestSeason: 'Juni – Juli',
    harvestMethod: 'Bei voller Reife besonders schonend von Hand verlesen und direkt nach der Ernte verarbeitet',
    transportMethod: 'Klimaschonender Direkttransport aus Serbien in die Schweiz',
    climateInfo: 'Ideales Mikroklima mit sonnigen Tagen, kühlen Nächten und fruchtbaren Böden',
    funFacts: [
      'Region: Ausgewählte Höhenlagen und traditionelle Beerenregionen in Serbien',
      'Klima & Boden: Ideales Mikroklima mit sonnigen Tagen, kühlen Nächten und fruchtbaren Böden',
      'Ernte: Bei voller Reife besonders schonend von Hand verlesen und direkt nach der Ernte verarbeitet',
      'Qualität: 100 % naturbelassen, aromatisch, formschön und reich an natürlichen Ballaststoffen & Antioxidantien',
    ],
    coordinates: [44.0165, 21.0059],
    gps: [44.0165, 21.0059],
    zoomLevel: 6,
    description:
      'Unsere Himbeeren stammen aus den traditionsreichen und hügeligen Obstbauregionen Serbiens, das weltweit für seine herausragende Himbeerqualität bekannt ist. Das Zusammenspiel aus mineralstoffreichen Böden, klaren Gebirgsbächen, warmen Sonnentagen und kühlen Nächten schafft ideale Bedingungen für ein langsames, natürliches Heranreifen der Beeren. Dadurch entwickeln die Früchte ihre leuchtend tiefrote Farbe und das unvergleichlich intensive, fein-säuerliche bis süsse Himbeeraroma. Zum Zeitpunkt der perfekten Vollreife werden die empfindlichen Beeren behutsam von Hand gepflückt und direkt vor Ort schonend gefriergetrocknet – für 100 % reinen, knusprigen Fruchtgenuss voller natürlicher Vitamine.',
  },

  'himbeere-in-milchschokolade-100g': {
    country: 'Schweiz',
    countryCode: 'CH',
    flag: '🇨🇭',
    region: 'Schweizer Manufaktur & Serbien',
    harvestTime: 'Juni – Juli (Beeren) / Ganzjährig veredelt',
    harvestSeason: 'Ganzjährig veredelt',
    harvestMethod: 'Handverlesene Beeren aus Serbien, meisterhaft dragiert in Schweizer Milchschokolade',
    transportMethod: 'Regionaler Schweizer Manufaktur-Transport',
    climateInfo: 'Feinste Schweizer Alpenmilch trifft auf aromatische Himbeeren aus Serbien.',
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
  // 2. ERDBEEREN (Serbien – Sonnengereifte Beerenqualität)
  // =========================================================================
  'erdbeeren-ganz': {
    country: 'Serbien',
    countryCode: 'RS',
    flag: '🇷🇸',
    region: 'Fruchtbare Anbauregionen Serbiens',
    sectionTitle: 'Herkunft: Serbien – Sonnengereifte Beerenqualität',
    harvestTime: 'Mai – Juni',
    harvestSeason: 'Mai – Juni',
    harvestMethod: 'Handgepflückt bei perfekter Vollreife und unmittelbar nach der Ernte schonend verarbeitet',
    transportMethod: 'Klimaschonender Direkttransport aus Serbien in die Schweiz',
    climateInfo: 'Ideales Mikroklima mit vielen Sonnenstunden und fruchtbaren Böden für volle natürliche Süsse',
    funFacts: [
      'Region: Ausgewählte, sonnenverwöhnte Beerenfelder in Serbien',
      'Klima & Boden: Ideales Mikroklima mit vielen Sonnenstunden und fruchtbaren Böden für volle natürliche Süsse',
      'Ernte: Handgepflückt bei perfekter Vollreife und unmittelbar nach der Ernte schonend verarbeitet',
      'Qualität: 100 % naturbelassen, leuchtend rot und besonders intensiv im Geschmack',
    ],
    coordinates: [44.0165, 21.0059],
    gps: [44.0165, 21.0059],
    zoomLevel: 6,
    description:
      'Unsere Erdbeeren stammen aus den traditionsreichen und fruchtbaren Obstbauregionen Serbiens. Dank des milden, sonnenreichen Klimas mit warmen Frühlingstagen und nährstoffreichen Böden reifen die Früchte auf den Feldern langsam und gleichmässig heran. Dadurch entwickeln sie ihre leuchtend rote Farbe, ihre feine natürliche Süsse und das unverwechselbar intensive Erdbeeraroma. Jede Beere wird zum Zeitpunkt der optimalen Vollreife sorgfältig von Hand geerntet und direkt vor Ort schonend gefriergetrocknet – für 100 % reinen, knusprigen Fruchtgenuss wie frisch vom Feld.',
  },

  'erdbeergranulat': {
    country: 'Serbien',
    countryCode: 'RS',
    flag: '🇷🇸',
    region: 'Fruchtbare Anbauregionen Serbiens',
    sectionTitle: 'Herkunft: Serbien – Sonnengereifte Beerenqualität',
    harvestTime: 'Mai – Juni',
    harvestSeason: 'Mai – Juni',
    harvestMethod: 'Handgepflückt bei perfekter Vollreife und unmittelbar nach der Ernte schonend verarbeitet',
    transportMethod: 'Klimaschonender Direkttransport aus Serbien in die Schweiz',
    climateInfo: 'Ideales Mikroklima mit vielen Sonnenstunden und fruchtbaren Böden für volle natürliche Süsse',
    funFacts: [
      'Region: Ausgewählte, sonnenverwöhnte Beerenfelder in Serbien',
      'Klima & Boden: Ideales Mikroklima mit vielen Sonnenstunden und fruchtbaren Böden für volle natürliche Süsse',
      'Ernte: Handgepflückt bei perfekter Vollreife und unmittelbar nach der Ernte schonend verarbeitet',
      'Qualität: 100 % naturbelassen, leuchtend rot und besonders intensiv im Geschmack',
    ],
    coordinates: [44.0165, 21.0059],
    gps: [44.0165, 21.0059],
    zoomLevel: 6,
    description:
      'Unsere Erdbeeren stammen aus den traditionsreichen und fruchtbaren Obstbauregionen Serbiens. Dank des milden, sonnenreichen Klimas mit warmen Frühlingstagen und nährstoffreichen Böden reifen die Früchte auf den Feldern langsam und gleichmässig heran. Dadurch entwickeln sie ihre leuchtend rote Farbe, ihre feine natürliche Süsse und das unverwechselbar intensive Erdbeeraroma. Jede Beere wird zum Zeitpunkt der optimalen Vollreife sorgfältig von Hand geerntet und direkt vor Ort schonend gefriergetrocknet – für 100 % reinen, knusprigen Fruchtgenuss wie frisch vom Feld.',
  },

  'erdbeerpulver': {
    country: 'Serbien',
    countryCode: 'RS',
    flag: '🇷🇸',
    region: 'Fruchtbare Anbauregionen Serbiens',
    sectionTitle: 'Herkunft: Serbien – Sonnengereifte Beerenqualität',
    harvestTime: 'Mai – Juni',
    harvestSeason: 'Mai – Juni',
    harvestMethod: 'Handgepflückt bei perfekter Vollreife und unmittelbar nach der Ernte schonend verarbeitet',
    transportMethod: 'Klimaschonender Direkttransport aus Serbien in die Schweiz',
    climateInfo: 'Ideales Mikroklima mit vielen Sonnenstunden und fruchtbaren Böden für volle natürliche Süsse',
    funFacts: [
      'Region: Ausgewählte, sonnenverwöhnte Beerenfelder in Serbien',
      'Klima & Boden: Ideales Mikroklima mit vielen Sonnenstunden und fruchtbaren Böden für volle natürliche Süsse',
      'Ernte: Handgepflückt bei perfekter Vollreife und unmittelbar nach der Ernte schonend verarbeitet',
      'Qualität: 100 % naturbelassen, leuchtend rot und besonders intensiv im Geschmack',
    ],
    coordinates: [44.0165, 21.0059],
    gps: [44.0165, 21.0059],
    zoomLevel: 6,
    description:
      'Unsere Erdbeeren stammen aus den traditionsreichen und fruchtbaren Obstbauregionen Serbiens. Dank des milden, sonnenreichen Klimas mit warmen Frühlingstagen und nährstoffreichen Böden reifen die Früchte auf den Feldern langsam und gleichmässig heran. Dadurch entwickeln sie ihre leuchtend rote Farbe, ihre feine natürliche Süsse und das unverwechselbar intensive Erdbeeraroma. Jede Beere wird zum Zeitpunkt der optimalen Vollreife sorgfältig von Hand geerntet und direkt vor Ort schonend gefriergetrocknet – für 100 % reinen, knusprigen Fruchtgenuss wie frisch vom Feld.',
  },

  'family-bag-erdbeere': {
    country: 'Serbien',
    countryCode: 'RS',
    flag: '🇷🇸',
    region: 'Fruchtbare Anbauregionen Serbiens',
    sectionTitle: 'Herkunft: Serbien – Sonnengereifte Beerenqualität',
    harvestTime: 'Mai – Juni',
    harvestSeason: 'Mai – Juni',
    harvestMethod: 'Handgepflückt bei perfekter Vollreife und unmittelbar nach der Ernte schonend verarbeitet',
    transportMethod: 'Klimaschonender Direkttransport aus Serbien in die Schweiz',
    climateInfo: 'Ideales Mikroklima mit vielen Sonnenstunden und fruchtbaren Böden für volle natürliche Süsse',
    funFacts: [
      'Region: Ausgewählte, sonnenverwöhnte Beerenfelder in Serbien',
      'Klima & Boden: Ideales Mikroklima mit vielen Sonnenstunden und fruchtbaren Böden für volle natürliche Süsse',
      'Ernte: Handgepflückt bei perfekter Vollreife und unmittelbar nach der Ernte schonend verarbeitet',
      'Qualität: 100 % naturbelassen, leuchtend rot und besonders intensiv im Geschmack',
    ],
    coordinates: [44.0165, 21.0059],
    gps: [44.0165, 21.0059],
    zoomLevel: 6,
    description:
      'Unsere Erdbeeren stammen aus den traditionsreichen und fruchtbaren Obstbauregionen Serbiens. Dank des milden, sonnenreichen Klimas mit warmen Frühlingstagen und nährstoffreichen Böden reifen die Früchte auf den Feldern langsam und gleichmässig heran. Dadurch entwickeln sie ihre leuchtend rote Farbe, ihre feine natürliche Süsse und das unverwechselbar intensive Erdbeeraroma. Jede Beere wird zum Zeitpunkt der optimalen Vollreife sorgfältig von Hand geerntet und direkt vor Ort schonend gefriergetrocknet – für 100 % reinen, knusprigen Fruchtgenuss wie frisch vom Feld.',
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
  // 3. BANANEN (Guatemala – Tropische Reife auf fruchtbaren Vulkanböden)
  // =========================================================================
  'banane-scheiben': {
    country: 'Guatemala',
    countryCode: 'GT',
    flag: '🇬🇹',
    region: 'Tropische Tiefland- und Küstenregionen',
    sectionTitle: 'Herkunft: Guatemala – Tropische Reife auf fruchtbaren Vulkanböden',
    harvestTime: 'Ganzjährig sonnengereift',
    harvestSeason: 'Ganzjährig sonnengereift',
    harvestMethod: 'Sonnengereift geerntet bei optimalem Zuckergehalt für ein intensives, süsses Aroma',
    transportMethod: 'Klimaschonender Direkttransport aus Guatemala in die Schweiz',
    climateInfo: 'Mineralstoffreiche Vulkanböden und ganzjährig warmes, tropisches Klima',
    funFacts: [
      'Region: Tropische Tiefland- und Küstenregionen Guatemalas',
      'Boden & Klima: Mineralstoffreiche Vulkanböden und ganzjährig warmes, tropisches Klima',
      'Ernte: Sonnengereift geerntet bei optimalem Zuckergehalt für ein intensives, süsses Aroma',
      'Qualität: 100 % naturbelassen, knusprig gefriergetrocknet und reich an natürlicher Energie',
    ],
    coordinates: [15.7835, -90.2308],
    gps: [15.7835, -90.2308],
    zoomLevel: 6,
    description:
      'Unsere Bananen stammen aus den tropischen Anbauregionen Guatemalas. Dank des ganzjährig warmen Klimas, reichlich tropischer Sonne und der besonders mineralstoffreichen, vulkanischen Böden finden die Bananenstauden dort perfekte Wachstumsbedingungen. Die Früchte reifen langsam unter der Sonne Mittelamerikas heran, bis sie ihre volle natürliche Süsse und ihr charakteristisches, cremig-vollmundiges Aroma erreicht haben. Unmittelbar nach der Ernte werden die reifen Bananen geschält, geschnitten und schonend gefriergetrocknet – so entsteht ein unwiderstehlich knuspriger Fruchtsnack ganz ohne Zuckerzusatz.',
  },

  'banane-granulat': {
    country: 'Guatemala',
    countryCode: 'GT',
    flag: '🇬🇹',
    region: 'Tropische Tiefland- und Küstenregionen',
    sectionTitle: 'Herkunft: Guatemala – Tropische Reife auf fruchtbaren Vulkanböden',
    harvestTime: 'Ganzjährig sonnengereift',
    harvestSeason: 'Ganzjährig sonnengereift',
    harvestMethod: 'Sonnengereift geerntet bei optimalem Zuckergehalt für ein intensives, süsses Aroma',
    transportMethod: 'Klimaschonender Direkttransport aus Guatemala in die Schweiz',
    climateInfo: 'Mineralstoffreiche Vulkanböden und ganzjährig warmes, tropisches Klima',
    funFacts: [
      'Region: Tropische Tiefland- und Küstenregionen Guatemalas',
      'Boden & Klima: Mineralstoffreiche Vulkanböden und ganzjährig warmes, tropisches Klima',
      'Ernte: Sonnengereift geerntet bei optimalem Zuckergehalt für ein intensives, süsses Aroma',
      'Qualität: 100 % naturbelassen, knusprig gefriergetrocknet und reich an natürlicher Energie',
    ],
    coordinates: [15.7835, -90.2308],
    gps: [15.7835, -90.2308],
    zoomLevel: 6,
    description:
      'Unsere Bananen stammen aus den tropischen Anbauregionen Guatemalas. Dank des ganzjährig warmen Klimas, reichlich tropischer Sonne und der besonders mineralstoffreichen, vulkanischen Böden finden die Bananenstauden dort perfekte Wachstumsbedingungen. Die Früchte reifen langsam unter der Sonne Mittelamerikas heran, bis sie ihre volle natürliche Süsse und ihr charakteristisches, cremig-vollmundiges Aroma erreicht haben. Unmittelbar nach der Ernte werden die reifen Bananen geschält, geschnitten und schonend gefriergetrocknet – so entsteht ein unwiderstehlich knuspriger Fruchtsnack ganz ohne Zuckerzusatz.',
  },

  'banane-pulver': {
    country: 'Guatemala',
    countryCode: 'GT',
    flag: '🇬🇹',
    region: 'Tropische Tiefland- und Küstenregionen',
    sectionTitle: 'Herkunft: Guatemala – Tropische Reife auf fruchtbaren Vulkanböden',
    harvestTime: 'Ganzjährig sonnengereift',
    harvestSeason: 'Ganzjährig sonnengereift',
    harvestMethod: 'Sonnengereift geerntet bei optimalem Zuckergehalt für ein intensives, süsses Aroma',
    transportMethod: 'Klimaschonender Direkttransport aus Guatemala in die Schweiz',
    climateInfo: 'Mineralstoffreiche Vulkanböden und ganzjährig warmes, tropisches Klima',
    funFacts: [
      'Region: Tropische Tiefland- und Küstenregionen Guatemalas',
      'Boden & Klima: Mineralstoffreiche Vulkanböden und ganzjährig warmes, tropisches Klima',
      'Ernte: Sonnengereift geerntet bei optimalem Zuckergehalt für ein intensives, süsses Aroma',
      'Qualität: 100 % naturbelassen, knusprig gefriergetrocknet und reich an natürlicher Energie',
    ],
    coordinates: [15.7835, -90.2308],
    gps: [15.7835, -90.2308],
    zoomLevel: 6,
    description:
      'Unsere Bananen stammen aus den tropischen Anbauregionen Guatemalas. Dank des ganzjährig warmen Klimas, reichlich tropischer Sonne und der besonders mineralstoffreichen, vulkanischen Böden finden die Bananenstauden dort perfekte Wachstumsbedingungen. Die Früchte reifen langsam unter der Sonne Mittelamerikas heran, bis sie ihre volle natürliche Süsse und ihr charakteristisches, cremig-vollmundiges Aroma erreicht haben. Unmittelbar nach der Ernte werden die reifen Bananen geschält, geschnitten und schonend gefriergetrocknet – so entsteht ein unwiderstehlich knuspriger Fruchtsnack ganz ohne Zuckerzusatz.',
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
  // 7. ZITRUSFRÜCHTE (Türkei – Sonnenverwöhnte Mittelmeerküste)
  // =========================================================================
  'orange-pulver': {
    country: 'Türkei',
    countryCode: 'TR',
    flag: '🇹🇷',
    region: 'Türkische Mittelmeer- & Ägäisküste',
    sectionTitle: 'Herkunft: Türkei – Sonnenverwöhnte Mittelmeerküste',
    harvestTime: 'November – Mai',
    harvestSeason: 'November – Mai',
    harvestMethod: 'Baumgereift, handverlesen und direkt nach der Ernte schonend gefriergetrocknet',
    transportMethod: 'Klimaschonender Direkttransport aus der Türkei in die Schweiz',
    climateInfo: 'Bis zu 300 Sonnentage pro Jahr für ein intensives, vollmundiges Zitrusaroma',
    funFacts: [
      'Region: Türkische Mittelmeer- & Ägäisküste (traditionelle Zitrusgärten)',
      'Klima: Bis zu 300 Sonnentage pro Jahr für ein intensives, vollmundiges Zitrusaroma',
      'Ernte: Baumgereift, handverlesen und direkt nach der Ernte schonend gefriergetrocknet',
      'Qualität: 100 % naturbelassen, aromatisch und reich an natürlichem Vitamin C',
    ],
    coordinates: [36.8969, 30.7133],
    gps: [36.8969, 30.7133],
    zoomLevel: 6,
    description:
      'Unsere Orangen stammen aus den sonnenverwöhnten Zitrusgärten entlang der türkischen Mittelmeer- und Ägäisküste. Mit bis zu 300 Sonnentagen im Jahr, milden Meeresbrisen und fruchtbaren Böden bietet diese Region ideale Bedingungen für den traditionellen Zitrusanbau. Die Früchte reifen langsam am Baum heran, wodurch sie ihr unvergleichlich intensives, fruchtig-süsses Aroma und ihre leuchtende Farbe entwickeln. Direkt nach der Ernte zum Zeitpunkt der perfekten Reife werden die Orangen schonend gefriergetrocknet – für 100 % natürlichen Fruchtgenuss voller Vitamine.',
  },

  'zitrone-pulver': {
    country: 'Türkei',
    countryCode: 'TR',
    flag: '🇹🇷',
    region: 'Türkische Mittelmeerküste',
    sectionTitle: 'Herkunft: Türkei – Sonnenverwöhnte Mittelmeerküste',
    harvestTime: 'Oktober – April',
    harvestSeason: 'Oktober – April',
    harvestMethod: 'Baumgereift, handverlesen und direkt nach der Ernte schonend gefriergetrocknet',
    transportMethod: 'Klimaschonender Direkttransport aus der Türkei in die Schweiz',
    climateInfo: 'Bis zu 300 Sonnentage pro Jahr für ein intensives, vollmundiges Zitrusaroma',
    funFacts: [
      'Region: Türkische Mittelmeer- & Ägäisküste (traditionelle Zitrusgärten)',
      'Klima: Bis zu 300 Sonnentage pro Jahr für ein intensives, vollmundiges Zitrusaroma',
      'Ernte: Baumgereift, handverlesen und direkt nach der Ernte schonend gefriergetrocknet',
      'Qualität: 100 % naturbelassen, aromatisch und reich an natürlichem Vitamin C',
    ],
    coordinates: [36.8969, 30.7133],
    gps: [36.8969, 30.7133],
    zoomLevel: 6,
    description:
      'Unsere Zitronen wachsen in den traditionsreichen Zitrusregionen an der türkischen Mittelmeerküste. Das subtropische Mittelmeerklima mit warmen, sonnigen Tagen und kühlen Nächten verleiht den Zitronen ihre charakteristische, erfrischende Säure sowie einen besonders hohen Gehalt an natürlichen ätherischen Ölen in der Schale. Handverlesen bei optimaler Reife und unmittelbar danach schonend gefriergetrocknet, bleiben das spritzige Zitrusaroma und die wertvollen Inhaltsstoffe vollständig erhalten.',
  },

  // =========================================================================
  // 8. ECHTE HEIDELBEEREN (Serbien – Unberührte Bergnatur & Tradition)
  // =========================================================================
  'echte-heidelbeere-ganz': {
    country: 'Serbien',
    countryCode: 'RS',
    flag: '🇷🇸',
    region: 'Höhenlagen & Gebirgsregionen',
    sectionTitle: 'Herkunft: Serbien – Unberührte Bergnatur & Tradition',
    harvestTime: 'Juli – August',
    harvestSeason: 'Juli – August',
    harvestMethod: 'Bei perfekter Vollreife sorgfältig verlesen und direkt vor Ort schonend verarbeitet',
    transportMethod: 'Klimaschonender Direkttransport aus Serbien in die Schweiz',
    climateInfo: 'Mineralstoffreiche Waldböden, viel Sonne und frische Bergluft für ein intensives Aroma',
    funFacts: [
      'Region: Höhenlagen und naturbelassene Gebirgsregionen Serbiens',
      'Boden & Klima: Mineralstoffreiche Waldböden, viel Sonne und frische Bergluft für ein intensives Aroma',
      'Ernte: Bei perfekter Vollreife sorgfältig verlesen und direkt vor Ort schonend verarbeitet',
      'Qualität: 100 % naturbelassen, durchgehend tiefblaues Fruchtfleisch und reich an natürlichen Antioxidantien',
    ],
    coordinates: [44.0165, 21.0059],
    gps: [44.0165, 21.0059],
    zoomLevel: 6,
    description:
      'Unsere echten Heidelbeeren stammen aus den naturbelassenen Höhenlagen und fruchtbaren Bergregionen Serbiens. In den klaren, sonnenreichen Gebirgslandschaften mit sauberen Böden und kühlen Nächten finden die Beeren ideale Bedingungen, um langsam heranzureifen. Dadurch entwickeln sie ihr unverwechselbar tiefblaues Fruchtfleisch, einen hohen Gehalt an natürlichen Antioxidantien (Anthocyanen) und ihr intensiv-aromatisches, leicht herbes Waldbeeren-Aroma. Zum Zeitpunkt der vollen Reife sorgfältig von Hand geerntet und unmittelbar danach schonend gefriergetrocknet, bleiben Geschmack, Farbe und wertvolle Nährstoffe in höchster Qualität erhalten.',
  },

  'echte-heidelbeere-pulver': {
    country: 'Serbien',
    countryCode: 'RS',
    flag: '🇷🇸',
    region: 'Höhenlagen & Gebirgsregionen',
    sectionTitle: 'Herkunft: Serbien – Unberührte Bergnatur & Tradition',
    harvestTime: 'Juli – August',
    harvestSeason: 'Juli – August',
    harvestMethod: 'Bei perfekter Vollreife sorgfältig verlesen und direkt vor Ort schonend verarbeitet',
    transportMethod: 'Klimaschonender Direkttransport aus Serbien in die Schweiz',
    climateInfo: 'Mineralstoffreiche Waldböden, viel Sonne und frische Bergluft für ein intensives Aroma',
    funFacts: [
      'Region: Höhenlagen und naturbelassene Gebirgsregionen Serbiens',
      'Boden & Klima: Mineralstoffreiche Waldböden, viel Sonne und frische Bergluft für ein intensives Aroma',
      'Ernte: Bei perfekter Vollreife sorgfältig verlesen und direkt vor Ort schonend verarbeitet',
      'Qualität: 100 % naturbelassen, durchgehend tiefblaues Fruchtfleisch und reich an natürlichen Antioxidantien',
    ],
    coordinates: [44.0165, 21.0059],
    gps: [44.0165, 21.0059],
    zoomLevel: 6,
    description:
      'Unsere echten Heidelbeeren stammen aus den naturbelassenen Höhenlagen und fruchtbaren Bergregionen Serbiens. In den klaren, sonnenreichen Gebirgslandschaften mit sauberen Böden und kühlen Nächten finden die Beeren ideale Bedingungen, um langsam heranzureifen. Dadurch entwickeln sie ihr unverwechselbar tiefblaues Fruchtfleisch, einen hohen Gehalt an natürlichen Antioxidantien (Anthocyanen) und ihr intensiv-aromatisches, leicht herbes Waldbeeren-Aroma. Zum Zeitpunkt der vollen Reife sorgfältig von Hand geerntet und unmittelbar danach schonend gefriergetrocknet, bleiben Geschmack, Farbe und wertvolle Nährstoffe in höchster Qualität erhalten.',
  },

  // =========================================================================
  // 9. ÄPFEL (Serbien – Traditioneller Obstbau)
  // =========================================================================
  'apfel-gewuerfelt': {
    country: 'Serbien',
    countryCode: 'RS',
    flag: '🇷🇸',
    region: 'Traditionelle Obstbauregionen',
    sectionTitle: 'Herkunft: Serbien – Traditioneller Obstbau',
    harvestTime: 'September – Oktober',
    harvestSeason: 'September – Oktober',
    harvestMethod: 'Handverlesen bei voller Reife und direkt vor Ort schonend verarbeitet',
    transportMethod: 'Klimaschonender Direkttransport aus Serbien in die Schweiz',
    climateInfo: 'Über 2.000 Sonnenstunden pro Jahr und nährstoffreiche Böden für ein intensives Fruchtaroma',
    funFacts: [
      'Region: Ausgewählte Obstgärten in Serbien (traditionelle Obstbauregionen mit idealem Mikroklima)',
      'Klima & Boden: Über 2.000 Sonnenstunden pro Jahr und nährstoffreiche Böden für ein intensives Fruchtaroma',
      'Ernte: Handverlesen bei voller Reife und direkt vor Ort schonend verarbeitet',
      'Qualität: 100 % naturbelassen, ohne Zuckerzusatz und ohne Konservierungsstoffe',
    ],
    coordinates: [44.0165, 21.0059],
    gps: [44.0165, 21.0059],
    zoomLevel: 6,
    description:
      'Unsere Äpfel stammen aus den fruchtbaren Obstbauregionen Serbiens – einem Land mit jahrhundertealter Tradition im Obstbau. Durch das ideale kontinentale Klima mit vielen Sonnenstunden und warmen Sommertagen sowie kühlen Nächten entwickeln die Äpfel dort ein besonders intensives, ausgewogenes Verhältnis von natürlicher Süsse und feiner Säure. Geerntet zum Zeitpunkt der perfekten Vollreife in ausgewählten serbischen Obstgärten, werden die Früchte direkt nach der Ernte schonend gefriergetrocknet, sodass das volle Aroma, die natürliche Farbe und die wertvollen Nährstoffe optimal erhalten bleiben.',
  },

  'apfel-granulat': {
    country: 'Serbien',
    countryCode: 'RS',
    flag: '🇷🇸',
    region: 'Traditionelle Obstbauregionen',
    sectionTitle: 'Herkunft: Serbien – Traditioneller Obstbau',
    harvestTime: 'September – Oktober',
    harvestSeason: 'September – Oktober',
    harvestMethod: 'Handverlesen bei voller Reife und direkt vor Ort schonend verarbeitet',
    transportMethod: 'Klimaschonender Direkttransport aus Serbien in die Schweiz',
    climateInfo: 'Über 2.000 Sonnenstunden pro Jahr und nährstoffreiche Böden für ein intensives Fruchtaroma',
    funFacts: [
      'Region: Ausgewählte Obstgärten in Serbien (traditionelle Obstbauregionen mit idealem Mikroklima)',
      'Klima & Boden: Über 2.000 Sonnenstunden pro Jahr und nährstoffreiche Böden für ein intensives Fruchtaroma',
      'Ernte: Handverlesen bei voller Reife und direkt vor Ort schonend verarbeitet',
      'Qualität: 100 % naturbelassen, ohne Zuckerzusatz und ohne Konservierungsstoffe',
    ],
    coordinates: [44.0165, 21.0059],
    gps: [44.0165, 21.0059],
    zoomLevel: 6,
    description:
      'Unsere Äpfel stammen aus den fruchtbaren Obstbauregionen Serbiens – einem Land mit jahrhundertealter Tradition im Obstbau. Durch das ideale kontinentale Klima mit vielen Sonnenstunden und warmen Sommertagen sowie kühlen Nächten entwickeln die Äpfel dort ein besonders intensives, ausgewogenes Verhältnis von natürlicher Süsse und feiner Säure. Geerntet zum Zeitpunkt der perfekten Vollreife in ausgewählten serbischen Obstgärten, werden die Früchte direkt nach der Ernte schonend gefriergetrocknet, sodass das volle Aroma, die natürliche Farbe und die wertvollen Nährstoffe optimal erhalten bleiben.',
  },

  'apfel-pulver': {
    country: 'Serbien',
    countryCode: 'RS',
    flag: '🇷🇸',
    region: 'Traditionelle Obstbauregionen',
    sectionTitle: 'Herkunft: Serbien – Traditioneller Obstbau',
    harvestTime: 'September – Oktober',
    harvestSeason: 'September – Oktober',
    harvestMethod: 'Handverlesen bei voller Reife und direkt vor Ort schonend verarbeitet',
    transportMethod: 'Klimaschonender Direkttransport aus Serbien in die Schweiz',
    climateInfo: 'Über 2.000 Sonnenstunden pro Jahr und nährstoffreiche Böden für ein intensives Fruchtaroma',
    funFacts: [
      'Region: Ausgewählte Obstgärten in Serbien (traditionelle Obstbauregionen mit idealem Mikroklima)',
      'Klima & Boden: Über 2.000 Sonnenstunden pro Jahr und nährstoffreiche Böden für ein intensives Fruchtaroma',
      'Ernte: Handverlesen bei voller Reife und direkt vor Ort schonend verarbeitet',
      'Qualität: 100 % naturbelassen, ohne Zuckerzusatz und ohne Konservierungsstoffe',
    ],
    coordinates: [44.0165, 21.0059],
    gps: [44.0165, 21.0059],
    zoomLevel: 6,
    description:
      'Unsere Äpfel stammen aus den fruchtbaren Obstbauregionen Serbiens – einem Land mit jahrhundertealter Tradition im Obstbau. Durch das ideale kontinentale Klima mit vielen Sonnenstunden und warmen Sommertagen sowie kühlen Nächten entwickeln die Äpfel dort ein besonders intensives, ausgewogenes Verhältnis von natürlicher Süsse und feiner Säure. Geerntet zum Zeitpunkt der perfekten Vollreife in ausgewählten serbischen Obstgärten, werden die Früchte direkt nach der Ernte schonend gefriergetrocknet, sodass das volle Aroma, die natürliche Farbe und die wertvollen Nährstoffe optimal erhalten bleiben.',
  },

  // =========================================================================
  // 10. ZWETSCHGEN (Serbien – Das Herzstück serbischer Obstbautradition)
  // =========================================================================
  'zwetschgen-schnitze': {
    country: 'Serbien',
    countryCode: 'RS',
    flag: '🇷🇸',
    region: 'Traditionelle Zwetschgen-Anbauregionen',
    sectionTitle: 'Herkunft: Serbien – Das Herzstück serbischer Obstbautradition',
    harvestTime: 'August – September',
    harvestSeason: 'August – September',
    harvestMethod: 'Vollreif geerntet, schonend entsteint und unmittelbar nach der Ernte gefriergetrocknet',
    transportMethod: 'Klimaschonender Direkttransport aus Serbien in die Schweiz',
    climateInfo: 'Ideales Spätsommerklima für höchste natürliche Süsse und volles Aroma',
    funFacts: [
      'Region: Weltbekannte, traditionelle Zwetschgen-Anbauregionen in Serbien',
      'Klima & Boden: Ideales Spätsommerklima für höchste natürliche Süsse und volles Aroma',
      'Ernte: Vollreif geerntet, schonend entsteint und unmittelbar nach der Ernte gefriergetrocknet',
      'Qualität: 100 % naturbelassen, intensiv-fruchtig und reich an natürlichen Ballaststoffen',
    ],
    coordinates: [44.0165, 21.0059],
    gps: [44.0165, 21.0059],
    zoomLevel: 6,
    description:
      'Unsere Zwetschgen stammen aus den traditionsreichsten Obstbauregionen Serbiens – einem Land, in dem der Anbau von Zwetschgen seit Jahrhunderten tief in der Kultur verwurzelt ist. Auf fruchtbaren Böden und unter der warmen Spätsommersonne reifen die Früchte langsam am Baum heran, bis sie ihre tiefviolette Farbe, ihren hohen natürlichen Zuckergehalt und ihr unverwechselbar würzig-süsses Aroma erreicht haben. Direkt nach der Ernte entsteint und schonend gefriergetrocknet, bieten sie ein unvergleichlich knuspriges, intensives Geschmackserlebnis.',
  },

  'zwetschgen-granulat': {
    country: 'Serbien',
    countryCode: 'RS',
    flag: '🇷🇸',
    region: 'Traditionelle Zwetschgen-Anbauregionen',
    sectionTitle: 'Herkunft: Serbien – Das Herzstück serbischer Obstbautradition',
    harvestTime: 'August – September',
    harvestSeason: 'August – September',
    harvestMethod: 'Vollreif geerntet, schonend entsteint und unmittelbar nach der Ernte gefriergetrocknet',
    transportMethod: 'Klimaschonender Direkttransport aus Serbien in die Schweiz',
    climateInfo: 'Ideales Spätsommerklima für höchste natürliche Süsse und volles Aroma',
    funFacts: [
      'Region: Weltbekannte, traditionelle Zwetschgen-Anbauregionen in Serbien',
      'Klima & Boden: Ideales Spätsommerklima für höchste natürliche Süsse und volles Aroma',
      'Ernte: Vollreif geerntet, schonend entsteint und unmittelbar nach der Ernte gefriergetrocknet',
      'Qualität: 100 % naturbelassen, intensiv-fruchtig und reich an natürlichen Ballaststoffen',
    ],
    coordinates: [44.0165, 21.0059],
    gps: [44.0165, 21.0059],
    zoomLevel: 6,
    description:
      'Unsere Zwetschgen stammen aus den traditionsreichsten Obstbauregionen Serbiens – einem Land, in dem der Anbau von Zwetschgen seit Jahrhunderten tief in der Kultur verwurzelt ist. Auf fruchtbaren Böden und unter der warmen Spätsommersonne reifen die Früchte langsam am Baum heran, bis sie ihre tiefviolette Farbe, ihren hohen natürlichen Zuckergehalt und ihr unverwechselbar würzig-süsses Aroma erreicht haben. Direkt nach der Ernte entsteint und schonend gefriergetrocknet, bieten sie ein unvergleichlich knuspriges, intensives Geschmackserlebnis.',
  },

  'zwetschgen-pulver': {
    country: 'Serbien',
    countryCode: 'RS',
    flag: '🇷🇸',
    region: 'Traditionelle Zwetschgen-Anbauregionen',
    sectionTitle: 'Herkunft: Serbien – Das Herzstück serbischer Obstbautradition',
    harvestTime: 'August – September',
    harvestSeason: 'August – September',
    harvestMethod: 'Vollreif geerntet, schonend entsteint und unmittelbar nach der Ernte gefriergetrocknet',
    transportMethod: 'Klimaschonender Direkttransport aus Serbien in die Schweiz',
    climateInfo: 'Ideales Spätsommerklima für höchste natürliche Süsse und volles Aroma',
    funFacts: [
      'Region: Weltbekannte, traditionelle Zwetschgen-Anbauregionen in Serbien',
      'Klima & Boden: Ideales Spätsommerklima für höchste natürliche Süsse und volles Aroma',
      'Ernte: Vollreif geerntet, schonend entsteint und unmittelbar nach der Ernte gefriergetrocknet',
      'Qualität: 100 % naturbelassen, intensiv-fruchtig und reich an natürlichen Ballaststoffen',
    ],
    coordinates: [44.0165, 21.0059],
    gps: [44.0165, 21.0059],
    zoomLevel: 6,
    description:
      'Unsere Zwetschgen stammen aus den traditionsreichsten Obstbauregionen Serbiens – einem Land, in dem der Anbau von Zwetschgen seit Jahrhunderten tief in der Kultur verwurzelt ist. Auf fruchtbaren Böden und unter der warmen Spätsommersonne reifen die Früchte langsam am Baum heran, bis sie ihre tiefviolette Farbe, ihren hohen natürlichen Zuckergehalt und ihr unverwechselbar würzig-süsses Aroma erreicht haben. Direkt nach der Ernte entsteint und schonend gefriergetrocknet, bieten sie ein unvergleichlich knuspriges, intensives Geschmackserlebnis.',
  },

  // =========================================================================
  // 11. APRIKOSEN (Serbien – Sonnengereifte Aprikosen aus traditionellem Obstbau)
  // =========================================================================
  'aprikose-schnitze': {
    country: 'Serbien',
    countryCode: 'RS',
    flag: '🇷🇸',
    region: 'Traditionsreiche Anbaugebiete Serbiens',
    sectionTitle: 'Herkunft: Serbien – Sonnengereifte Aprikosen aus traditionellem Obstbau',
    harvestTime: 'Juli – August',
    harvestSeason: 'Juli – August',
    harvestMethod: 'Baumgereift von Hand geerntet, sorgfältig entsteint und direkt verarbeitet',
    transportMethod: 'Klimaschonender Direkttransport aus Serbien in die Schweiz',
    climateInfo: 'Warme Sommertage und mineralstoffreiche Böden für ein vollmundiges Steinobst-Aroma',
    funFacts: [
      'Region: Sonnige Obstgärten in den traditionsreichen Anbaugebieten Serbiens',
      'Klima & Boden: Warme Sommertage und mineralstoffreiche Böden für ein vollmundiges Steinobst-Aroma',
      'Ernte: Baumgereift von Hand geerntet, sorgfältig entsteint und direkt verarbeitet',
      'Qualität: 100 % naturbelassen, aromatisch-süss und reich an natürlichem Beta-Carotin',
    ],
    coordinates: [44.0165, 21.0059],
    gps: [44.0165, 21.0059],
    zoomLevel: 6,
    description:
      'Unsere Aprikosen stammen aus den sonnenverwöhnten, sanft hügeligen Obstbauregionen Serbiens. Durch das kontinentale Klima mit warmen, trockenen Sommern und vielen Sonnenstunden entwickeln die Früchte am Baum ihre leuchtend gold-orange Farbe und ein wunderbar ausgewogenes Verhältnis aus intensiver, honigartiger Süsse und feiner Fruchtsäure. Zum Zeitpunkt der vollen Reife von Hand geerntet, entsteint und direkt vor Ort schonend gefriergetrocknet, bleiben das samtige Aroma und die wertvollen Nährstoffe optimal erhalten.',
  },

  'aprikose-granulat': {
    country: 'Serbien',
    countryCode: 'RS',
    flag: '🇷🇸',
    region: 'Traditionsreiche Anbaugebiete Serbiens',
    sectionTitle: 'Herkunft: Serbien – Sonnengereifte Aprikosen aus traditionellem Obstbau',
    harvestTime: 'Juli – August',
    harvestSeason: 'Juli – August',
    harvestMethod: 'Baumgereift von Hand geerntet, sorgfältig entsteint und direkt verarbeitet',
    transportMethod: 'Klimaschonender Direkttransport aus Serbien in die Schweiz',
    climateInfo: 'Warme Sommertage und mineralstoffreiche Böden für ein vollmundiges Steinobst-Aroma',
    funFacts: [
      'Region: Sonnige Obstgärten in den traditionsreichen Anbaugebieten Serbiens',
      'Klima & Boden: Warme Sommertage und mineralstoffreiche Böden für ein vollmundiges Steinobst-Aroma',
      'Ernte: Baumgereift von Hand geerntet, sorgfältig entsteint und direkt verarbeitet',
      'Qualität: 100 % naturbelassen, aromatisch-süss und reich an natürlichem Beta-Carotin',
    ],
    coordinates: [44.0165, 21.0059],
    gps: [44.0165, 21.0059],
    zoomLevel: 6,
    description:
      'Unsere Aprikosen stammen aus den sonnenverwöhnten, sanft hügeligen Obstbauregionen Serbiens. Durch das kontinentale Klima mit warmen, trockenen Sommern und vielen Sonnenstunden entwickeln die Früchte am Baum ihre leuchtend gold-orange Farbe und ein wunderbar ausgewogenes Verhältnis aus intensiver, honigartiger Süsse und feiner Fruchtsäure. Zum Zeitpunkt der vollen Reife von Hand geerntet, entsteint und direkt vor Ort schonend gefriergetrocknet, bleiben das samtige Aroma und die wertvollen Nährstoffe optimal erhalten.',
  },

  'aprikose-pulver': {
    country: 'Serbien',
    countryCode: 'RS',
    flag: '🇷🇸',
    region: 'Traditionsreiche Anbaugebiete Serbiens',
    sectionTitle: 'Herkunft: Serbien – Sonnengereifte Aprikosen aus traditionellem Obstbau',
    harvestTime: 'Juli – August',
    harvestSeason: 'Juli – August',
    harvestMethod: 'Baumgereift von Hand geerntet, sorgfältig entsteint und direkt verarbeitet',
    transportMethod: 'Klimaschonender Direkttransport aus Serbien in die Schweiz',
    climateInfo: 'Warme Sommertage und mineralstoffreiche Böden für ein vollmundiges Steinobst-Aroma',
    funFacts: [
      'Region: Sonnige Obstgärten in den traditionsreichen Anbaugebieten Serbiens',
      'Klima & Boden: Warme Sommertage und mineralstoffreiche Böden für ein vollmundiges Steinobst-Aroma',
      'Ernte: Baumgereift von Hand geerntet, sorgfältig entsteint und direkt verarbeitet',
      'Qualität: 100 % naturbelassen, aromatisch-süss und reich an natürlichem Beta-Carotin',
    ],
    coordinates: [44.0165, 21.0059],
    gps: [44.0165, 21.0059],
    zoomLevel: 6,
    description:
      'Unsere Aprikosen stammen aus den sonnenverwöhnten, sanft hügeligen Obstbauregionen Serbiens. Durch das kontinentale Klima mit warmen, trockenen Sommern und vielen Sonnenstunden entwickeln die Früchte am Baum ihre leuchtend gold-orange Farbe und ein wunderbar ausgewogenes Verhältnis aus intensiver, honigartiger Süsse und feiner Fruchtsäure. Zum Zeitpunkt der vollen Reife von Hand geerntet, entsteint und direkt vor Ort schonend gefriergetrocknet, bleiben das samtige Aroma und die wertvollen Nährstoffe optimal erhalten.',
  },

  // =========================================================================
  // 12. SAUERKIRSCHEN (Serbien – Aromatische Sauerkirschen von höchster Qualität)
  // =========================================================================
  'sauerkirsche-ganz': {
    country: 'Serbien',
    countryCode: 'RS',
    flag: '🇷🇸',
    region: 'Obstbauregionen Serbiens',
    sectionTitle: 'Herkunft: Serbien – Aromatische Sauerkirschen von höchster Qualität',
    harvestTime: 'Juni – Juli',
    harvestSeason: 'Juni – Juli',
    harvestMethod: 'Bei voller Reife geerntet, entsteint und direkt vor Ort schonend gefriergetrocknet',
    transportMethod: 'Klimaschonender Direkttransport aus Serbien in die Schweiz',
    climateInfo: 'Optimale klimatische Bedingungen für das perfekte Spiel aus Fruchtsüsse und erfrischender Säure',
    funFacts: [
      'Region: Spezialisierte Kirschen-Obstgärten in den besten Lagen Serbiens',
      'Klima & Boden: Optimale klimatische Bedingungen für das perfekte Spiel aus Fruchtsüsse und erfrischender Säure',
      'Ernte: Bei voller Reife geerntet, entsteint und direkt vor Ort schonend gefriergetrocknet',
      'Qualität: 100 % naturbelassen, intensiv dunkelrot und voller natürlicher Antioxidantien',
    ],
    coordinates: [44.0165, 21.0059],
    gps: [44.0165, 21.0059],
    zoomLevel: 6,
    description:
      'Unsere Sauerkirschen wachsen in den fruchtbaren, sonnenreichen Obstbauregionen Serbiens, die europaweit für ihre erstklassigen, hocharomatischen Sauerkirschsorten geschätzt werden. Das Zusammenspiel aus viel Sonne, kühlen Nächten und nährstoffreichen Böden verleiht den Kirschen ihre tiefdunkelrote Farbe sowie das charakteristische, erfrischend säuerlich-fruchtige Aroma. Bei optimaler Reife geerntet, sorgfältig entsteint und sofort schonend gefriergetrocknet, bleibt der volle, spritzige Geschmack wie frisch vom Baum erhalten.',
  },

  'sauerkirsche-granulat': {
    country: 'Serbien',
    countryCode: 'RS',
    flag: '🇷🇸',
    region: 'Obstbauregionen Serbiens',
    sectionTitle: 'Herkunft: Serbien – Aromatische Sauerkirschen von höchster Qualität',
    harvestTime: 'Juni – Juli',
    harvestSeason: 'Juni – Juli',
    harvestMethod: 'Bei voller Reife geerntet, entsteint und direkt vor Ort schonend gefriergetrocknet',
    transportMethod: 'Klimaschonender Direkttransport aus Serbien in die Schweiz',
    climateInfo: 'Optimale klimatische Bedingungen für das perfekte Spiel aus Fruchtsüsse und erfrischender Säure',
    funFacts: [
      'Region: Spezialisierte Kirschen-Obstgärten in den besten Lagen Serbiens',
      'Klima & Boden: Optimale klimatische Bedingungen für das perfekte Spiel aus Fruchtsüsse und erfrischender Säure',
      'Ernte: Bei voller Reife geerntet, entsteint und direkt vor Ort schonend gefriergetrocknet',
      'Qualität: 100 % naturbelassen, intensiv dunkelrot und voller natürlicher Antioxidantien',
    ],
    coordinates: [44.0165, 21.0059],
    gps: [44.0165, 21.0059],
    zoomLevel: 6,
    description:
      'Unsere Sauerkirschen wachsen in den fruchtbaren, sonnenreichen Obstbauregionen Serbiens, die europaweit für ihre erstklassigen, hocharomatischen Sauerkirschsorten geschätzt werden. Das Zusammenspiel aus viel Sonne, kühlen Nächten und nährstoffreichen Böden verleiht den Kirschen ihre tiefdunkelrote Farbe sowie das charakteristische, erfrischend säuerlich-fruchtige Aroma. Bei optimaler Reife geerntet, sorgfältig entsteint und sofort schonend gefriergetrocknet, bleibt der volle, spritzige Geschmack wie frisch vom Baum erhalten.',
  },

  'sauerkirsche-pulver': {
    country: 'Serbien',
    countryCode: 'RS',
    flag: '🇷🇸',
    region: 'Obstbauregionen Serbiens',
    sectionTitle: 'Herkunft: Serbien – Aromatische Sauerkirschen von höchster Qualität',
    harvestTime: 'Juni – Juli',
    harvestSeason: 'Juni – Juli',
    harvestMethod: 'Bei voller Reife geerntet, entsteint und direkt vor Ort schonend gefriergetrocknet',
    transportMethod: 'Klimaschonender Direkttransport aus Serbien in die Schweiz',
    climateInfo: 'Optimale klimatische Bedingungen für das perfekte Spiel aus Fruchtsüsse und erfrischender Säure',
    funFacts: [
      'Region: Spezialisierte Kirschen-Obstgärten in den besten Lagen Serbiens',
      'Klima & Boden: Optimale klimatische Bedingungen für das perfekte Spiel aus Fruchtsüsse und erfrischender Säure',
      'Ernte: Bei voller Reife geerntet, entsteint und direkt vor Ort schonend gefriergetrocknet',
      'Qualität: 100 % naturbelassen, intensiv dunkelrot und voller natürlicher Antioxidantien',
    ],
    coordinates: [44.0165, 21.0059],
    gps: [44.0165, 21.0059],
    zoomLevel: 6,
    description:
      'Unsere Sauerkirschen wachsen in den fruchtbaren, sonnenreichen Obstbauregionen Serbiens, die europaweit für ihre erstklassigen, hocharomatischen Sauerkirschsorten geschätzt werden. Das Zusammenspiel aus viel Sonne, kühlen Nächten und nährstoffreichen Böden verleiht den Kirschen ihre tiefdunkelrote Farbe sowie das charakteristische, erfrischend säuerlich-fruchtige Aroma. Bei optimaler Reife geerntet, sorgfältig entsteint und sofort schonend gefriergetrocknet, bleibt der volle, spritzige Geschmack wie frisch vom Baum erhalten.',
  },

  // =========================================================================
  // 13. BROMBEEREN (Serbien – Sonnengereifte Beeren aus unberührter Natur)
  // =========================================================================
  'brombeere-ganz': {
    country: 'Serbien',
    countryCode: 'RS',
    flag: '🇷🇸',
    region: 'Hügellandschaften Serbiens',
    sectionTitle: 'Herkunft: Serbien – Sonnengereifte Beeren aus unberührter Natur',
    harvestTime: 'Juli – August',
    harvestSeason: 'Juli – August',
    harvestMethod: 'Behutsam von Hand verlesen bei voller Reife und direkt vor Ort verarbeitet',
    transportMethod: 'Klimaschonender Direkttransport aus Serbien in die Schweiz',
    climateInfo: 'Nährstoffreiche Böden und viele Sonnenstunden für tiefdunkle, süss-aromatische Früchte',
    funFacts: [
      'Region: Sonnige Hügellagen und traditionelle Beerenfelder in Serbien',
      'Klima & Boden: Nährstoffreiche Böden und viele Sonnenstunden für tiefdunkle, süss-aromatische Früchte',
      'Ernte: Behutsam von Hand verlesen bei voller Reife und direkt vor Ort verarbeitet',
      'Qualität: 100 % naturbelassen, reich an Vitaminen, Mineralstoffen und natürlichen Anthocyanen',
    ],
    coordinates: [44.0165, 21.0059],
    gps: [44.0165, 21.0059],
    zoomLevel: 6,
    description:
      'Unsere Brombeeren stammen aus den sonnigen, naturbelassenen Hügellandschaften Serbiens. In den warmen Sommermonaten reifen die Beeren an den Sträuchern langsam heran, bis sie ihre glänzend tiefschwarze Farbe und ihr vollmundiges, süss-herbes Waldbeeren-Aroma vollständig entwickelt haben. Da Brombeeren besonders empfindlich sind, werden sie zum Zeitpunkt der perfekten Vollreife behutsam von Hand gepflückt und unmittelbar nach der Ernte schonend gefriergetrocknet – für 100 % natürlichen, knusprigen Beerengenuss.',
  },

  'brombeere-granulat': {
    country: 'Serbien',
    countryCode: 'RS',
    flag: '🇷🇸',
    region: 'Hügellandschaften Serbiens',
    sectionTitle: 'Herkunft: Serbien – Sonnengereifte Beeren aus unberührter Natur',
    harvestTime: 'Juli – August',
    harvestSeason: 'Juli – August',
    harvestMethod: 'Behutsam von Hand verlesen bei voller Reife und direkt vor Ort verarbeitet',
    transportMethod: 'Klimaschonender Direkttransport aus Serbien in die Schweiz',
    climateInfo: 'Nährstoffreiche Böden und viele Sonnenstunden für tiefdunkle, süss-aromatische Früchte',
    funFacts: [
      'Region: Sonnige Hügellagen und traditionelle Beerenfelder in Serbien',
      'Klima & Boden: Nährstoffreiche Böden und viele Sonnenstunden für tiefdunkle, süss-aromatische Früchte',
      'Ernte: Behutsam von Hand verlesen bei voller Reife und direkt vor Ort verarbeitet',
      'Qualität: 100 % naturbelassen, reich an Vitaminen, Mineralstoffen und natürlichen Anthocyanen',
    ],
    coordinates: [44.0165, 21.0059],
    gps: [44.0165, 21.0059],
    zoomLevel: 6,
    description:
      'Unsere Brombeeren stammen aus den sonnigen, naturbelassenen Hügellandschaften Serbiens. In den warmen Sommermonaten reifen die Beeren an den Sträuchern langsam heran, bis sie ihre glänzend tiefschwarze Farbe und ihr vollmundiges, süss-herbes Waldbeeren-Aroma vollständig entwickelt haben. Da Brombeeren besonders empfindlich sind, werden sie zum Zeitpunkt der perfekten Vollreife behutsam von Hand gepflückt und unmittelbar nach der Ernte schonend gefriergetrocknet – für 100 % natürlichen, knusprigen Beerengenuss.',
  },

  'brombeere-pulver': {
    country: 'Serbien',
    countryCode: 'RS',
    flag: '🇷🇸',
    region: 'Hügellandschaften Serbiens',
    sectionTitle: 'Herkunft: Serbien – Sonnengereifte Beeren aus unberührter Natur',
    harvestTime: 'Juli – August',
    harvestSeason: 'Juli – August',
    harvestMethod: 'Behutsam von Hand verlesen bei voller Reife und direkt vor Ort verarbeitet',
    transportMethod: 'Klimaschonender Direkttransport aus Serbien in die Schweiz',
    climateInfo: 'Nährstoffreiche Böden und viele Sonnenstunden für tiefdunkle, süss-aromatische Früchte',
    funFacts: [
      'Region: Sonnige Hügellagen und traditionelle Beerenfelder in Serbien',
      'Klima & Boden: Nährstoffreiche Böden und viele Sonnenstunden für tiefdunkle, süss-aromatische Früchte',
      'Ernte: Behutsam von Hand verlesen bei voller Reife und direkt vor Ort verarbeitet',
      'Qualität: 100 % naturbelassen, reich an Vitaminen, Mineralstoffen und natürlichen Anthocyanen',
    ],
    coordinates: [44.0165, 21.0059],
    gps: [44.0165, 21.0059],
    zoomLevel: 6,
    description:
      'Unsere Brombeeren stammen aus den sonnigen, naturbelassenen Hügellandschaften Serbiens. In den warmen Sommermonaten reifen die Beeren an den Sträuchern langsam heran, bis sie ihre glänzend tiefschwarze Farbe und ihr vollmundiges, süss-herbes Waldbeeren-Aroma vollständig entwickelt haben. Da Brombeeren besonders empfindlich sind, werden sie zum Zeitpunkt der perfekten Vollreife behutsam von Hand gepflückt und unmittelbar nach der Ernte schonend gefriergetrocknet – für 100 % natürlichen, knusprigen Beerengenuss.',
  },

  // =========================================================================
  // 14. SCHWARZE JOHANNISBEEREN (Serbien – Kraftvolle Beeren voller natürlicher Vitamine)
  // =========================================================================
  'schwarze-johannisbeere-ganz': {
    country: 'Serbien',
    countryCode: 'RS',
    flag: '🇷🇸',
    region: 'Fruchtbare Höhen- und Hügellagen Serbiens',
    sectionTitle: 'Herkunft: Serbien – Kraftvolle Beeren voller natürlicher Vitamine',
    harvestTime: 'Juli – August',
    harvestSeason: 'Juli – August',
    harvestMethod: 'Zum Zeitpunkt der höchsten Aromadichte geerntet und sofort schonend gefriergetrocknet',
    transportMethod: 'Klimaschonender Direkttransport aus Serbien in die Schweiz',
    climateInfo: 'Ideales Mikroklima für einen besonders hohen Gehalt an natürlichen Nährstoffen',
    funFacts: [
      'Region: Ausgewählte Beerenkulturen in den fruchtbaren Regionen Serbiens',
      'Klima & Boden: Ideales Mikroklima für einen besonders hohen Gehalt an natürlichen Nährstoffen',
      'Ernte: Zum Zeitpunkt der höchsten Aromadichte geerntet und sofort schonend gefriergetrocknet',
      'Qualität: 100 % naturbelassen, kräftig-aromatisch und eine natürliche Vitamin-C-Quelle',
    ],
    coordinates: [44.0165, 21.0059],
    gps: [44.0165, 21.0059],
    zoomLevel: 6,
    description:
      'Unsere schwarzen Johannisbeeren wachsen in den klaren, fruchtbaren Höhen- und Hügellagen Serbiens. Das ausgeglichene Klima mit warmen Sonnentagen und frischen Nächten sorgt dafür, dass die Beeren ihr charakteristisches, intensiv-herbes und zugleich fruchtig-erfrischendes Aroma sowie einen aussergewöhnlich hohen Gehalt an natürlichem Vitamin C entwickeln. Vollreif geerntet und direkt vor Ort schonend gefriergetrocknet, bleiben sämtliche wertvollen Inhaltsstoffe und die tiefdunkle Farbe bestmöglich bewahrt.',
  },

  'schwarze-johannisbeere-pulver': {
    country: 'Serbien',
    countryCode: 'RS',
    flag: '🇷🇸',
    region: 'Fruchtbare Höhen- und Hügellagen Serbiens',
    sectionTitle: 'Herkunft: Serbien – Kraftvolle Beeren voller natürlicher Vitamine',
    harvestTime: 'Juli – August',
    harvestSeason: 'Juli – August',
    harvestMethod: 'Zum Zeitpunkt der höchsten Aromadichte geerntet und sofort schonend gefriergetrocknet',
    transportMethod: 'Klimaschonender Direkttransport aus Serbien in die Schweiz',
    climateInfo: 'Ideales Mikroklima für einen besonders hohen Gehalt an natürlichen Nährstoffen',
    funFacts: [
      'Region: Ausgewählte Beerenkulturen in den fruchtbaren Regionen Serbiens',
      'Klima & Boden: Ideales Mikroklima für einen besonders hohen Gehalt an natürlichen Nährstoffen',
      'Ernte: Zum Zeitpunkt der höchsten Aromadichte geerntet und sofort schonend gefriergetrocknet',
      'Qualität: 100 % naturbelassen, kräftig-aromatisch und eine natürliche Vitamin-C-Quelle',
    ],
    coordinates: [44.0165, 21.0059],
    gps: [44.0165, 21.0059],
    zoomLevel: 6,
    description:
      'Unsere schwarzen Johannisbeeren wachsen in den klaren, fruchtbaren Höhen- und Hügellagen Serbiens. Das ausgeglichene Klima mit warmen Sonnentagen und frischen Nächten sorgt dafür, dass die Beeren ihr charakteristisches, intensiv-herbes und zugleich fruchtig-erfrischendes Aroma sowie einen aussergewöhnlich hohen Gehalt an natürlichem Vitamin C entwickeln. Vollreif geerntet und direkt vor Ort schonend gefriergetrocknet, bleiben sämtliche wertvollen Inhaltsstoffe und die tiefdunkle Farbe bestmöglich bewahrt.',
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
      '100% Frucht ohne zugesetzen Kristallzucker.',
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
    harvestMethod: 'Manufaktur-Mischung aus echten Waldheidelbeeren',
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
    description: 'Knuspriges Zwetschgengranulat mit herbstlich-tiefem Fruchtaroma für Joghurt und Müesli.',
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
  // 16. SNACKS, MüesliS & PROBIERSETS (Schweiz / Schweizer Manufaktur)
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
      'Die perfekte Gelegenheit, um die ganze Vielfalt vonfruit-comestible zu entdecken.',
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
    harvestMethod: 'Ausgewogene Komposition von Beeren und Früchten für Müeslis',
    transportMethod: 'Schweizer Post versichert',
    climateInfo: 'Schweizer Veredelungskunst.',
    funFacts: [
      'Macht jedes FrühstücksMüesli ohne künstliche Aromen zum fruchtigen Erlebnis.',
      'Gleichmässig verteilt für die perfekte Balance bei jedem Löffel.',
      'Reich an Ballaststoffen und natürlichen Mineralien.',
    ],
    coordinates: [47.3769, 8.5417],
    gps: [47.3769, 8.5417],
    zoomLevel: 8,
    description: 'Der ultimative Müeslimix aus schonend gefriergetrockneten Früchten für Ihr tägliches KnusperMüesli.',
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
    description: 'Instant Müesli Mix (200g) mit vollem Fruchtgeschmack für das schnelle, unkomplizierte Power-Frühstück.',
  },

  'pure-frucht-muesli-topping': {
    country: 'Serbien',
    countryCode: 'RS',
    flag: '🇷🇸',
    region: 'Fruchtbare Anbauregionen Serbiens & CH Manufaktur',
    harvestTime: 'Mai – Juli',
    harvestSeason: 'Mai – Juli',
    harvestMethod: '100% sortenreine Fruchtstückchen von Hand komponiert',
    transportMethod: 'Klimaschonender Transport zur Schweizer Manufaktur',
    climateInfo: 'Sonnenreiche Berglagen Westserbiens für maximale Fruchtextrakte.',
    funFacts: [
      'Besteht ausschliesslich aus gefriergetrockneten Früchten ohne Getreidezusatz.',
      'Ideal für alle, die ihr eigenes Müesli individuell veredeln möchten.',
      'Knuspriger Genuss ganz ohne Zuckerzusätze.',
    ],
    coordinates: [44.5305, 19.2253],
    gps: [44.5305, 19.2253],
    zoomLevel: 5,
    description: 'Pure Frucht Müesli-Topping aus sonnengereiften Erdbeeren und Himbeeren – 100% Frucht ohne Haferzusatz.',
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
      'Beinhaltet auch seltene Beerensorten wie echte Waldheidelbeeren aus Serbien.',
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
      'Ideal für Müesli, Porridge, Pancakes oder Joghurt-Bowls.',
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
PRODUCT_ORIGINS['erdbeere-ganz'] = PRODUCT_ORIGINS['erdbeeren-ganz'];
PRODUCT_ORIGINS['erdbeere-granulat'] = PRODUCT_ORIGINS['erdbeergranulat'];
PRODUCT_ORIGINS['erdbeeren-granulat'] = PRODUCT_ORIGINS['erdbeergranulat'];
PRODUCT_ORIGINS['erdbeere-pulver'] = PRODUCT_ORIGINS['erdbeerpulver'];
PRODUCT_ORIGINS['erdbeeren-pulver'] = PRODUCT_ORIGINS['erdbeerpulver'];
PRODUCT_ORIGINS['erdbeere-scheiben'] = PRODUCT_ORIGINS['erdbeeren-ganz'];
PRODUCT_ORIGINS['erdbeere-stuecke'] = PRODUCT_ORIGINS['erdbeeren-ganz'];
PRODUCT_ORIGINS['gefriergetrocknete-himbeeren'] = PRODUCT_ORIGINS['himbeeren-ganz'];
PRODUCT_ORIGINS['himbeere-ganz'] = PRODUCT_ORIGINS['himbeeren-ganz'];
PRODUCT_ORIGINS['himbeer-granulat'] = PRODUCT_ORIGINS['himbeergranulat'];
PRODUCT_ORIGINS['himbeeren-granulat'] = PRODUCT_ORIGINS['himbeergranulat'];
PRODUCT_ORIGINS['himbeer-pulver'] = PRODUCT_ORIGINS['himbeerpulver'];
PRODUCT_ORIGINS['himbeeren-pulver'] = PRODUCT_ORIGINS['himbeerpulver'];
PRODUCT_ORIGINS['himbeere-pulver'] = PRODUCT_ORIGINS['himbeerpulver'];
PRODUCT_ORIGINS['himbeergriess'] = PRODUCT_ORIGINS['himbeergranulat'];
PRODUCT_ORIGINS['himbeer-griess'] = PRODUCT_ORIGINS['himbeergranulat'];
PRODUCT_ORIGINS['himbeeren-stuecke'] = PRODUCT_ORIGINS['himbeeren-ganz'];
PRODUCT_ORIGINS['himbeere-stuecke'] = PRODUCT_ORIGINS['himbeeren-ganz'];
PRODUCT_ORIGINS['gefriergetrocknete-echte-heidelbeere'] = PRODUCT_ORIGINS['echte-heidelbeere-ganz'];
PRODUCT_ORIGINS['echte-heidelbeere-granulat'] = PRODUCT_ORIGINS['echte-heidelbeere-ganz'];
PRODUCT_ORIGINS['heidelbeeren-ganz'] = PRODUCT_ORIGINS['echte-heidelbeere-ganz'];
PRODUCT_ORIGINS['heidelbeere-ganz'] = PRODUCT_ORIGINS['echte-heidelbeere-ganz'];
PRODUCT_ORIGINS['heidelbeerpulver'] = PRODUCT_ORIGINS['echte-heidelbeere-pulver'];
PRODUCT_ORIGINS['heidelbeeren-pulver'] = PRODUCT_ORIGINS['echte-heidelbeere-pulver'];
PRODUCT_ORIGINS['heidelbeergranulat'] = PRODUCT_ORIGINS['echte-heidelbeere-ganz'];
PRODUCT_ORIGINS['blaubeere-ganz'] = PRODUCT_ORIGINS['echte-heidelbeere-ganz'];
PRODUCT_ORIGINS['blaubeeren-ganz'] = PRODUCT_ORIGINS['echte-heidelbeere-ganz'];
PRODUCT_ORIGINS['wildheidelbeeren'] = PRODUCT_ORIGINS['echte-heidelbeere-ganz'];
PRODUCT_ORIGINS['gefriergetrocknete-sauerkirsche'] = PRODUCT_ORIGINS['sauerkirsche-ganz'];
PRODUCT_ORIGINS['sauerkirsche-haelften'] = PRODUCT_ORIGINS['sauerkirsche-ganz'];
PRODUCT_ORIGINS['sauerkirschen-ganz'] = PRODUCT_ORIGINS['sauerkirsche-ganz'];
PRODUCT_ORIGINS['sauerkirschgranulat'] = PRODUCT_ORIGINS['sauerkirsche-granulat'];
PRODUCT_ORIGINS['sauerkirschen-granulat'] = PRODUCT_ORIGINS['sauerkirsche-granulat'];
PRODUCT_ORIGINS['sauerkirschpulver'] = PRODUCT_ORIGINS['sauerkirsche-pulver'];
PRODUCT_ORIGINS['sauerkirschen-pulver'] = PRODUCT_ORIGINS['sauerkirsche-pulver'];
PRODUCT_ORIGINS['gefriergetrocknete-brombeere'] = PRODUCT_ORIGINS['brombeere-ganz'];
PRODUCT_ORIGINS['brombeeren-ganz'] = PRODUCT_ORIGINS['brombeere-ganz'];
PRODUCT_ORIGINS['brombeere-stuecke'] = PRODUCT_ORIGINS['brombeere-ganz'];
PRODUCT_ORIGINS['brombeergranulat'] = PRODUCT_ORIGINS['brombeere-granulat'];
PRODUCT_ORIGINS['brombeeren-granulat'] = PRODUCT_ORIGINS['brombeere-granulat'];
PRODUCT_ORIGINS['brombeerpulver'] = PRODUCT_ORIGINS['brombeere-pulver'];
PRODUCT_ORIGINS['brombeeren-pulver'] = PRODUCT_ORIGINS['brombeere-pulver'];
PRODUCT_ORIGINS['gefriergetrocknete-schwarze-johannisbeere'] = PRODUCT_ORIGINS['schwarze-johannisbeere-ganz'];
PRODUCT_ORIGINS['schwarze-johannisbeere-granulat'] = PRODUCT_ORIGINS['schwarze-johannisbeere-ganz'];
PRODUCT_ORIGINS['johannisbeere-ganz'] = PRODUCT_ORIGINS['schwarze-johannisbeere-ganz'];
PRODUCT_ORIGINS['johannisbeeren-ganz'] = PRODUCT_ORIGINS['schwarze-johannisbeere-ganz'];
PRODUCT_ORIGINS['johannisbeerpulver'] = PRODUCT_ORIGINS['schwarze-johannisbeere-pulver'];
PRODUCT_ORIGINS['cassis-pulver'] = PRODUCT_ORIGINS['schwarze-johannisbeere-pulver'];
PRODUCT_ORIGINS['gefriergetrockneter-apfel'] = PRODUCT_ORIGINS['apfel-gewuerfelt'];
PRODUCT_ORIGINS['apfel-gewurfelt'] = PRODUCT_ORIGINS['apfel-gewuerfelt'];
PRODUCT_ORIGINS['apfel-Gewurfelt'] = PRODUCT_ORIGINS['apfel-gewuerfelt'];
PRODUCT_ORIGINS['apfel-ganz'] = PRODUCT_ORIGINS['apfel-gewuerfelt'];
PRODUCT_ORIGINS['apfelscheiben-ganz'] = PRODUCT_ORIGINS['apfel-gewuerfelt'];
PRODUCT_ORIGINS['apfel-scheiben'] = PRODUCT_ORIGINS['apfel-gewuerfelt'];
PRODUCT_ORIGINS['apfel-schnitze'] = PRODUCT_ORIGINS['apfel-gewuerfelt'];
PRODUCT_ORIGINS['apfel-stuecke'] = PRODUCT_ORIGINS['apfel-gewuerfelt'];
PRODUCT_ORIGINS['apfelgranulat'] = PRODUCT_ORIGINS['apfel-granulat'];
PRODUCT_ORIGINS['apfelpulver'] = PRODUCT_ORIGINS['apfel-pulver'];
PRODUCT_ORIGINS['gefriergetrocknete-zwetschgen'] = PRODUCT_ORIGINS['zwetschgen-schnitze'];
PRODUCT_ORIGINS['zwetschge-schnitze'] = PRODUCT_ORIGINS['zwetschgen-schnitze'];
PRODUCT_ORIGINS['zwetschgen-ganz'] = PRODUCT_ORIGINS['zwetschgen-schnitze'];
PRODUCT_ORIGINS['zwetschge-ganz'] = PRODUCT_ORIGINS['zwetschgen-schnitze'];
PRODUCT_ORIGINS['zwetschge-granulat'] = PRODUCT_ORIGINS['zwetschgen-granulat'];
PRODUCT_ORIGINS['zwetschgengranulat'] = PRODUCT_ORIGINS['zwetschgen-granulat'];
PRODUCT_ORIGINS['zwetschge-pulver'] = PRODUCT_ORIGINS['zwetschgen-pulver'];
PRODUCT_ORIGINS['zwetschgenpulver'] = PRODUCT_ORIGINS['zwetschgen-pulver'];
PRODUCT_ORIGINS['pflaume-schnitze'] = PRODUCT_ORIGINS['zwetschgen-schnitze'];
PRODUCT_ORIGINS['gefriergetrocknete-aprikose'] = PRODUCT_ORIGINS['aprikose-schnitze'];
PRODUCT_ORIGINS['aprikosen-ganz'] = PRODUCT_ORIGINS['aprikose-schnitze'];
PRODUCT_ORIGINS['aprikose-ganz'] = PRODUCT_ORIGINS['aprikose-schnitze'];
PRODUCT_ORIGINS['aprikose-haelften'] = PRODUCT_ORIGINS['aprikose-schnitze'];
PRODUCT_ORIGINS['aprikose-stuecke'] = PRODUCT_ORIGINS['aprikose-schnitze'];
PRODUCT_ORIGINS['aprikosengranulat'] = PRODUCT_ORIGINS['aprikose-granulat'];
PRODUCT_ORIGINS['aprikosen-granulat'] = PRODUCT_ORIGINS['aprikose-granulat'];
PRODUCT_ORIGINS['aprikosenpulver'] = PRODUCT_ORIGINS['aprikose-pulver'];
PRODUCT_ORIGINS['aprikosen-pulver'] = PRODUCT_ORIGINS['aprikose-pulver'];
PRODUCT_ORIGINS['gefriergetrocknete-mango'] = PRODUCT_ORIGINS['mango-wuerfel'];
PRODUCT_ORIGINS['gefriergetrocknete-banane'] = PRODUCT_ORIGINS['banane-scheiben'];
PRODUCT_ORIGINS['bananen-ganz'] = PRODUCT_ORIGINS['banane-scheiben'];
PRODUCT_ORIGINS['banane-ganz'] = PRODUCT_ORIGINS['banane-scheiben'];
PRODUCT_ORIGINS['banane-stuecke'] = PRODUCT_ORIGINS['banane-scheiben'];
PRODUCT_ORIGINS['bananenpulver'] = PRODUCT_ORIGINS['banane-pulver'];
PRODUCT_ORIGINS['bananen-pulver'] = PRODUCT_ORIGINS['banane-pulver'];
PRODUCT_ORIGINS['bananengranulat'] = PRODUCT_ORIGINS['banane-granulat'];
PRODUCT_ORIGINS['gefriergetrocknete-maracuja'] = PRODUCT_ORIGINS['maracuja-granulat'];
PRODUCT_ORIGINS['gefriergetrocknete-ananas'] = PRODUCT_ORIGINS['ananas-granulat'];
PRODUCT_ORIGINS['gefriergetrocknete-orange'] = PRODUCT_ORIGINS['orange-pulver'];
PRODUCT_ORIGINS['orange-scheiben'] = PRODUCT_ORIGINS['orange-pulver'];
PRODUCT_ORIGINS['orange-stuecke'] = PRODUCT_ORIGINS['orange-pulver'];
PRODUCT_ORIGINS['orange-granulat'] = PRODUCT_ORIGINS['orange-pulver'];
PRODUCT_ORIGINS['orangenpulver'] = PRODUCT_ORIGINS['orange-pulver'];
PRODUCT_ORIGINS['gefriergetrocknete-zitrone'] = PRODUCT_ORIGINS['zitrone-pulver'];
PRODUCT_ORIGINS['zitrone-scheiben'] = PRODUCT_ORIGINS['zitrone-pulver'];
PRODUCT_ORIGINS['zitrone-stuecke'] = PRODUCT_ORIGINS['zitrone-pulver'];
PRODUCT_ORIGINS['zitrone-granulat'] = PRODUCT_ORIGINS['zitrone-pulver'];
PRODUCT_ORIGINS['zitronenpulver'] = PRODUCT_ORIGINS['zitrone-pulver'];

// Helper to look up product origin strictly by slug, with robust fallback
export function getProductOrigin(slug: string, fallbackCountry?: string | null): ProductOriginData {
  if (PRODUCT_ORIGINS[slug]) {
    return PRODUCT_ORIGINS[slug];
  }

  const clean = slug.toLowerCase();
  if (PRODUCT_ORIGINS[clean]) {
    return PRODUCT_ORIGINS[clean];
  }

  // Dedicated match for any apple variant/slug (Scheiben, Schnitze, Stücke, Granulat, Pulver)
  if (clean.includes('apfel') || clean.includes('äpfel')) {
    if (clean.includes('granulat')) return PRODUCT_ORIGINS['apfel-granulat'];
    if (clean.includes('pulver')) return PRODUCT_ORIGINS['apfel-pulver'];
    return PRODUCT_ORIGINS['apfel-gewuerfelt'];
  }

  // Dedicated match for stone fruits & Serbian berries (Aprikose, Zwetschge, Sauerkirsche, Brombeere, Johannisbeere)
  if (clean.includes('aprikos')) {
    if (clean.includes('granulat')) return PRODUCT_ORIGINS['aprikose-granulat'];
    if (clean.includes('pulver')) return PRODUCT_ORIGINS['aprikose-pulver'];
    return PRODUCT_ORIGINS['aprikose-schnitze'];
  }
  if (clean.includes('zwetschg') || clean.includes('pflaum')) {
    if (clean.includes('granulat')) return PRODUCT_ORIGINS['zwetschgen-granulat'];
    if (clean.includes('pulver')) return PRODUCT_ORIGINS['zwetschgen-pulver'];
    return PRODUCT_ORIGINS['zwetschgen-schnitze'];
  }
  if (clean.includes('sauerkirsch') || clean.includes('kirsch')) {
    if (clean.includes('granulat')) return PRODUCT_ORIGINS['sauerkirsche-granulat'];
    if (clean.includes('pulver')) return PRODUCT_ORIGINS['sauerkirsche-pulver'];
    return PRODUCT_ORIGINS['sauerkirsche-ganz'];
  }
  if (clean.includes('brombeer')) {
    if (clean.includes('granulat')) return PRODUCT_ORIGINS['brombeere-granulat'];
    if (clean.includes('pulver')) return PRODUCT_ORIGINS['brombeere-pulver'];
    return PRODUCT_ORIGINS['brombeere-ganz'];
  }
  if (clean.includes('johannisbeer')) {
    if (clean.includes('pulver')) return PRODUCT_ORIGINS['schwarze-johannisbeere-pulver'];
    return PRODUCT_ORIGINS['schwarze-johannisbeere-ganz'];
  }

  // Dedicated match for any raspberry variant/slug (non-chocolate)
  if (
    clean.includes('himbeer') &&
    !clean.includes('schoko') &&
    !clean.includes('cokolad')
  ) {
    if (clean.includes('granulat') || clean.includes('griess')) {
      return PRODUCT_ORIGINS['himbeergranulat'];
    }
    if (clean.includes('pulver')) {
      return PRODUCT_ORIGINS['himbeerpulver'];
    }
    return PRODUCT_ORIGINS['himbeeren-ganz'];
  }
  // Dedicated match for any strawberry variant/slug (non-chocolate)
  if (
    clean.includes('erdbeer') &&
    !clean.includes('schoko') &&
    !clean.includes('cokolad')
  ) {
    if (clean.includes('granulat')) return PRODUCT_ORIGINS['erdbeergranulat'];
    if (clean.includes('pulver')) return PRODUCT_ORIGINS['erdbeerpulver'];
    return PRODUCT_ORIGINS['erdbeeren-ganz'];
  }
  // Dedicated match for any orange, lemon, banana, or blueberry variant/slug
  if (clean.includes('heidelbeer') || clean.includes('blaubeer')) {
    if (clean.includes('pulver')) return PRODUCT_ORIGINS['echte-heidelbeere-pulver'];
    return PRODUCT_ORIGINS['echte-heidelbeere-ganz'];
  }
  if (clean.includes('banan')) {
    if (clean.includes('granulat')) return PRODUCT_ORIGINS['banane-granulat'];
    if (clean.includes('pulver')) return PRODUCT_ORIGINS['banane-pulver'];
    return PRODUCT_ORIGINS['banane-scheiben'];
  }
  if (clean.includes('orange')) {
    return PRODUCT_ORIGINS['orange-pulver'];
  }
  if (clean.includes('zitrone')) {
    return PRODUCT_ORIGINS['zitrone-pulver'];
  }

  // Check prefix or partial match
  for (const [key, val] of Object.entries(PRODUCT_ORIGINS)) {
    if (clean.includes(key.toLowerCase()) || key.toLowerCase().includes(clean)) {
      return val;
    }
  }

  // Fallback by country profile when fallbackCountry is specified
  if (fallbackCountry) {
    const resolvedKey = resolveCountryKey(fallbackCountry);
    const profile = COUNTRY_PROFILES[resolvedKey];
    if (profile && resolvedKey !== 'Schweiz') {
      return {
        country: profile.label,
        countryCode: profile.code,
        flag: profile.flag,
        region: profile.region,
        harvestTime: profile.harvestSeason,
        harvestSeason: profile.harvestSeason,
        harvestMethod: profile.harvestMethod,
        transportMethod: profile.transportMethod,
        climateInfo: profile.climateInfo,
        coordinates: [profile.lat, profile.lng],
        gps: [profile.lat, profile.lng],
        zoomLevel: profile.zoomLevel,
        description: `100% naturbelassene Früchte aus ${profile.label}.`,
        funFacts: profile.funFacts,
      };
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
      'Frei von künstlichen Aromen, Konservierungsstoffen oder zugesetzem Zucker.',
    ],
  };
}

export function getProductDisplayOrigin(product: {
  slug: string;
  name_de?: string;
  origin_country?: string | null;
}): { country: string; flag: string } {
  const lowerName = (product.name_de || '').toLowerCase();
  const origin =
    PRODUCT_ORIGINS[product.slug] ||
    PRODUCT_ORIGINS[product.slug.toLowerCase()] ||
    (lowerName.includes('himbeer') &&
    !lowerName.includes('schoko') &&
    !lowerName.includes('cokolad')
      ? (product.slug.toLowerCase().includes('granulat') ||
        product.slug.toLowerCase().includes('griess')
          ? PRODUCT_ORIGINS['himbeergranulat']
          : product.slug.toLowerCase().includes('pulver')
          ? PRODUCT_ORIGINS['himbeerpulver']
          : PRODUCT_ORIGINS['himbeeren-ganz'])
      : lowerName.includes('erdbeer') &&
    !lowerName.includes('schoko') &&
    !lowerName.includes('cokolad')
      ? (product.slug.toLowerCase().includes('granulat')
          ? PRODUCT_ORIGINS['erdbeergranulat']
          : product.slug.toLowerCase().includes('pulver')
          ? PRODUCT_ORIGINS['erdbeerpulver']
          : PRODUCT_ORIGINS['erdbeeren-ganz'])
      : lowerName.includes('aprikos')
      ? PRODUCT_ORIGINS['aprikose-schnitze']
      : lowerName.includes('zwetschg') || lowerName.includes('pflaum')
      ? PRODUCT_ORIGINS['zwetschgen-schnitze']
      : lowerName.includes('sauerkirsch') || lowerName.includes('kirsch')
      ? PRODUCT_ORIGINS['sauerkirsche-ganz']
      : lowerName.includes('brombeer')
      ? PRODUCT_ORIGINS['brombeere-ganz']
      : lowerName.includes('johannisbeer')
      ? PRODUCT_ORIGINS['schwarze-johannisbeere-ganz']
      : lowerName.includes('heidelbeer') || lowerName.includes('blaubeer')
      ? (product.slug.toLowerCase().includes('pulver')
          ? PRODUCT_ORIGINS['echte-heidelbeere-pulver']
          : PRODUCT_ORIGINS['echte-heidelbeere-ganz'])
      : lowerName.includes('apfel') || lowerName.includes('äpfel')
      ? PRODUCT_ORIGINS['apfel-gewuerfelt']
      : lowerName.includes('banan')
      ? PRODUCT_ORIGINS['banane-scheiben']
      : lowerName.includes('orange')
      ? PRODUCT_ORIGINS['orange-pulver']
      : lowerName.includes('zitrone')
      ? PRODUCT_ORIGINS['zitrone-pulver']
      : getProductOrigin(product.slug, product.origin_country));
  return {
    country: origin.country,
    flag: origin.flag || (origin.countryCode === 'RS' ? '🇷🇸' : origin.countryCode === 'CH' ? '🇨🇭' : origin.countryCode === 'GT' ? '🇬🇹' : origin.countryCode === 'PE' ? '🇵🇪' : origin.countryCode === 'EC' ? '🇪🇨' : origin.countryCode === 'TR' ? '🇹🇷' : origin.countryCode === 'CR' ? '🇨🇷' : '🇨🇭'),
  };
}

export type ProductOriginInfo = ProductOriginData;

export const countryCoords: Record<string, { lat: number; lng: number; code: string; label: string }> = {
  'Schweiz': { lat: 46.8182, lng: 8.2275, code: 'CH', label: 'Schweiz' },
  'Serbien': { lat: 44.0165, lng: 21.0059, code: 'RS', label: 'Serbien' },
  'Serbia': { lat: 44.0165, lng: 21.0059, code: 'RS', label: 'Serbien' },
  'Peru': { lat: -9.19, lng: -75.0152, code: 'PE', label: 'Peru' },
  'Ecuador': { lat: -1.8312, lng: -78.1834, code: 'EC', label: 'Ecuador' },
  'Guatemala': { lat: 15.7835, lng: -90.2308, code: 'GT', label: 'Guatemala' },
  'Türkei': { lat: 36.8969, lng: 30.7133, code: 'TR', label: 'Türkei' },
  'Turkey': { lat: 36.8969, lng: 30.7133, code: 'TR', label: 'Türkei' },
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
  if (upper === 'PE') return 'Peru';
  if (upper === 'EC') return 'Ecuador';
  if (upper === 'GT') return 'Guatemala';
  if (upper === 'TR') return 'Türkei';
  if (upper === 'CR') return 'Costa Rica';

  const lower = clean.toLowerCase();
  if (lower.includes('schweiz') || lower.includes('swiss') || lower.includes('switzerland')) {
    return 'Schweiz';
  }
  if (lower.includes('serb')) {
    return 'Serbien';
  }
  if (lower.includes('peru')) {
    return 'Peru';
  }
  if (lower.includes('ecuador')) {
    return 'Ecuador';
  }
  if (lower.includes('guatemal')) {
    return 'Guatemala';
  }
  if (lower.includes('türkei') || lower.includes('tuerkei') || lower.includes('turk')) {
    return 'Türkei';
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
    lat: 44.0165,
    lng: 21.0059,
    code: 'RS',
    label: 'Serbien',
    flag: '🇷🇸',
    zoomLevel: 6,
    region: 'Fruchtbare Anbauregionen Serbiens',
    harvestMethod: 'Sorgfältige Handernte bei voller Reife',
    harvestSeason: 'Mai bis Juli',
    transportMethod: 'Klimaschonender Direkttransport aus Serbien in die Schweiz',
    climateInfo: 'Sonnige Hanglagen und warmes Kontinentalklima für intensiv-aromatische Früchte.',
    funFacts: [
      'Serbien gilt international als traditionsreiche Hochburg für hocharomatische Erdbeeren, Himbeeren und Waldbeeren.',
      'Schonende Gefriertrocknung bewahrt über 95% der Vitamine und das volle natürliche Aroma.',
    ],
  },
  'Serbia': {
    lat: 44.0165,
    lng: 21.0059,
    code: 'RS',
    label: 'Serbien',
    flag: '🇷🇸',
    zoomLevel: 6,
    region: 'Fruchtbare Anbauregionen Serbiens',
    harvestMethod: 'Sorgfältige Handernte bei voller Reife',
    harvestSeason: 'Mai bis Juli',
    transportMethod: 'Klimaschonender Direkttransport aus Serbien in die Schweiz',
    climateInfo: 'Sonnige Hanglagen und warmes Kontinentalklima für intensiv-aromatische Früchte.',
    funFacts: [
      'Serbien gilt international als traditionsreiche Hochburg für hocharomatische Erdbeeren, Himbeeren und Waldbeeren.',
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
      'Ecuador ist weltberühmt für aromatischste Passionsfrüchte mit feiner Säure.',
      '100% sortenrein gefriergetrocknet ohne jegliche Konservierungsstoffe.',
      'Hervorragender natürlicher Lieferant für Vitamin A, Kalium und Pflanzenstoffe.',
    ],
  },
  'Guatemala': {
    lat: 15.7835,
    lng: -90.2308,
    code: 'GT',
    label: 'Guatemala',
    flag: '🇬🇹',
    zoomLevel: 6,
    region: 'Tropische Tiefland- und Küstenregionen',
    harvestMethod: 'Sonnengereift geerntet bei optimalem Zuckergehalt für ein intensives, süsses Aroma',
    harvestSeason: 'Ganzjährig sonnengereift',
    transportMethod: 'Klimaschonender Direkttransport aus Guatemala in die Schweiz',
    climateInfo: 'Mineralstoffreiche Vulkanböden und ganzjährig warmes, tropisches Klima',
    funFacts: [
      'Region: Tropische Tiefland- und Küstenregionen Guatemalas',
      'Boden & Klima: Mineralstoffreiche Vulkanböden und ganzjährig warmes, tropisches Klima',
      'Ernte: Sonnengereift geerntet bei optimalem Zuckergehalt für ein intensives, süsses Aroma',
      'Qualität: 100 % naturbelassen, knusprig gefriergetrocknet und reich an natürlicher Energie',
    ],
  },
  'Türkei': {
    lat: 36.8969,
    lng: 30.7133,
    code: 'TR',
    label: 'Türkei',
    flag: '🇹🇷',
    zoomLevel: 6,
    region: 'Türkische Mittelmeer- & Ägäisküste',
    harvestMethod: 'Baumgereift, handverlesen und direkt nach der Ernte schonend gefriergetrocknet',
    harvestSeason: 'Oktober bis Mai',
    transportMethod: 'Klimaschonender Direkttransport aus der Türkei in die Schweiz',
    climateInfo: 'Bis zu 300 Sonnentage pro Jahr für ein intensives, vollmundiges Zitrusaroma',
    funFacts: [
      'Region: Türkische Mittelmeer- & Ägäisküste (traditionelle Zitrusgärten)',
      'Klima: Bis zu 300 Sonnentage pro Jahr für ein intensives, vollmundiges Zitrusaroma',
      'Ernte: Baumgereift, handverlesen und direkt nach der Ernte schonend gefriergetrocknet',
      'Qualität: 100 % naturbelassen, aromatisch und reich an natürlichem Vitamin C',
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
