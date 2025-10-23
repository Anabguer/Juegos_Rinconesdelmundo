// ===== CONFIGURACIÓN DEL JUEGO =====
const GAME_CONFIG = {
    name: 'rincones_del_mundo',
    title: 'Rincones del Mundo',
    version: '1.0.0',
    totalWorlds: 21,
    levelsPerWorld: 15,
    gridSizes: {
        1: 3, // Mundos 1-3: 3x3
        2: 3,
        3: 3,
        4: 4, // Mundos 4-7: 4x4
        5: 4,
        6: 4,
        7: 4,
        8: 5, // Mundos 8-10: 5x5
        9: 5,
        10: 5,
        11: 3, // Mundos 11-13: 3x3
        12: 3,
        13: 3,
        14: 4, // Mundos 14-16: 4x4
        15: 4,
        16: 4,
        17: 5, // Mundos 17-19: 5x5
        18: 5,
        19: 5,
        20: 3, // Mundos 20-21: 3x3
        21: 3
    },
    // Configuración de AdMob
    admob: {
        bannerId: 'ca-app-pub-3940256099942544/6300978111', // ID de prueba
        interstitialId: 'ca-app-pub-3940256099942544/1033173712', // ID de prueba
        rewardedId: 'ca-app-pub-3940256099942544/5224354917', // ID de prueba
        enabled: true
    }
};

// ===== DATOS DE LOS MUNDOS =====
const WORLDS_DATA = {
    1: {
        name: 'Sereno',
        emoji: '🌍',
        color: 'world-1',
        description: 'Lugares de paz y tranquilidad',
        places: [
            { name: 'Templo Daigo-ji, Japón', curiosity: 'Fundado en 874, su jardín cambia de color cinco veces al año.' },
            { name: 'Fiordo de Geiranger, Noruega', curiosity: 'Uno de los fiordos más profundos de Europa.' },
            { name: 'Playa de Navagio, Grecia', curiosity: 'Famosa por su barco encallado y aguas turquesa.' },
            { name: 'Lago Moraine, Canadá', curiosity: 'Su color azul viene del polvo glaciar suspendido.' },
            { name: 'Jardines de Kioto, Japón', curiosity: 'Inspirados en la meditación Zen.' },
            { name: 'Montañas Dolomitas, Italia', curiosity: 'Patrimonio natural de la UNESCO.' },
            { name: 'Costa Amalfitana, Italia', curiosity: 'Casas de colores colgadas sobre el mar.' },
            { name: 'Lago Bled, Eslovenia', curiosity: 'Su isla alberga una iglesia del siglo XV.' },
            { name: 'Cataratas de Plitvice, Croacia', curiosity: 'Dieciséis lagos conectados por cascadas.' },
            { name: 'Valle de Lauterbrunnen, Suiza', curiosity: 'Inspiró los paisajes de El Señor de los Anillos.' },
            { name: 'Cabo de Formentor, España', curiosity: 'El faro más fotografiado de Mallorca.' },
            { name: 'Lago Louise, Canadá', curiosity: 'El reflejo perfecto de las Montañas Rocosas.' },
            { name: 'Isla de Skye, Escocia', curiosity: 'Sus colinas parecen esculpidas por el viento.' },
            { name: 'Río Li, China', curiosity: 'Escenario de paisajes en billetes chinos.' },
            { name: 'Monte Fuji, Japón', curiosity: 'Visible desde Tokio en días despejados.' }
        ]
    },
    2: {
        name: 'Bruma',
        emoji: '🌫️',
        color: 'world-2',
        description: 'Misterios envueltos en niebla',
        places: [
            { name: 'Bosque de Hallerbos, Bélgica', curiosity: 'Cada primavera se cubre de campanillas azules.' },
            { name: 'Lago Baikal, Rusia', curiosity: 'El lago más profundo del mundo.' },
            { name: 'Montañas Huangshan, China', curiosity: 'Su niebla inspiró pinturas antiguas.' },
            { name: 'Selva Valdiviana, Chile', curiosity: 'Hogar de especies prehistóricas.' },
            { name: 'Fiordo Doubtful Sound, Nueva Zelanda', curiosity: 'El sonido más silencioso del planeta.' },
            { name: 'Isla de Skellig Michael, Irlanda', curiosity: 'Antiguo monasterio sobre el Atlántico.' },
            { name: 'Caminito del Rey, España', curiosity: 'Antiguamente, uno de los senderos más peligrosos.' },
            { name: 'Lago Bohinj, Eslovenia', curiosity: 'Envuelto en bruma la mayor parte del año.' },
            { name: 'Bosque de Redwood, EE. UU.', curiosity: 'Árboles que superan los 100 metros.' },
            { name: 'Lago di Como, Italia', curiosity: 'Refugio de artistas y poetas.' },
            { name: 'Rila Lakes, Bulgaria', curiosity: 'Siete lagos glaciares, cada uno con su leyenda.' },
            { name: 'Fiordo Milford Sound, Nueva Zelanda', curiosity: 'Descrito por Kipling como la octava maravilla.' },
            { name: 'Bosques del Cáucaso, Georgia', curiosity: 'Entre Asia y Europa, casi mágicos.' },
            { name: 'Parque Torres del Paine, Chile', curiosity: 'Famoso por sus cuernos de granito.' },
            { name: 'Lago Misurina, Italia', curiosity: 'Su aire ayuda a tratar el asma.' }
        ]
    },
    3: {
        name: 'Luz',
        emoji: '☀️',
        color: 'world-3',
        description: 'Lugares bañados por la luz dorada',
        places: [
            { name: 'Campos de Lavanda, Provenza (Francia)', curiosity: 'Durante julio, el aire huele a miel y romero.' },
            { name: 'Islas Maldivas', curiosity: 'Las playas parecen flotar, y la arena no quema por su origen coralino.' },
            { name: 'Desierto del Sahara, Marruecos', curiosity: 'Las dunas cambian de forma cada noche por el viento.' },
            { name: 'Santorini, Grecia', curiosity: 'Las casas se encalan cada primavera para reflejar el sol.' },
            { name: 'Campos de Girasoles, Castilla (España)', curiosity: 'Los girasoles giran siguiendo la luz del sol.' },
            { name: 'Isla de Holbox, México', curiosity: 'El mar brilla por la bioluminiscencia de pequeños organismos.' },
            { name: 'Monte Table, Sudáfrica', curiosity: 'Una nube plana llamada "mantel" cubre su cima al atardecer.' },
            { name: 'Campos de Té, Sri Lanka', curiosity: 'Cada hoja se recoge a mano antes de la salida del sol.' },
            { name: 'Costa de Amalfi, Italia', curiosity: 'Los limoneros crecen entre las casas junto al mar.' },
            { name: 'Parque Nacional de Yellowstone, EE. UU.', curiosity: 'Los géiseres laten con el corazón de la Tierra.' },
            { name: 'Campos de Trigo, Ucrania', curiosity: 'Los colores de su bandera vienen del cielo y del trigo.' },
            { name: 'Gran Barrera de Coral, Australia', curiosity: 'Visible desde el espacio, hogar de miles de especies marinas.' },
            { name: 'Lago Titicaca, Perú-Bolivia', curiosity: 'Es el lago navegable más alto del mundo.' },
            { name: 'Machu Picchu, Perú', curiosity: 'Durante siglos, estuvo escondido bajo la selva.' },
            { name: 'Cabo de Gata, España', curiosity: 'La zona más soleada de Europa, con playas volcánicas.' }
        ]
    },
    4: {
        name: 'Recuerdo',
        emoji: '🌾',
        color: 'world-4',
        description: 'Ciudades con historia milenaria',
        places: [
            { name: 'Toledo, España', curiosity: 'Sus calles siguen el trazado romano original.' },
            { name: 'Fez, Marruecos', curiosity: 'Su medina tiene más de 9.000 callejones.' },
            { name: 'Venecia, Italia', curiosity: 'Las casas se hunden lentamente en la laguna.' },
            { name: 'Oia, Santorini (Grecia)', curiosity: 'Algunos tejados aún conservan tejas del siglo XIX.' },
            { name: 'Dubrovnik, Croacia', curiosity: 'Su muralla ha resistido más de 20 guerras.' },
            { name: 'Praga, República Checa', curiosity: 'Su reloj astronómico lleva marcando el tiempo desde 1410.' },
            { name: 'Florencia, Italia', curiosity: 'El Duomo tardó casi 150 años en completarse.' },
            { name: 'Cartagena de Indias, Colombia', curiosity: 'Las fachadas coloridas datan de la época colonial.' },
            { name: 'Petra, Jordania', curiosity: 'Tallada en roca rosa hace más de 2.000 años.' },
            { name: 'Kyoto, Japón', curiosity: 'En primavera, los templos se llenan de cerezos centenarios.' },
            { name: 'Cusco, Perú', curiosity: 'Su trazado urbano aún sigue el diseño inca original.' },
            { name: 'Sevilla, España', curiosity: 'La Giralda fue primero un minarete.' },
            { name: 'Estambul, Turquía', curiosity: 'Une dos continentes, Asia y Europa.' },
            { name: 'Lisboa, Portugal', curiosity: 'Sus tranvías aún recorren rutas centenarias.' },
            { name: 'Marrakech, Marruecos', curiosity: 'En la plaza Jemaa el-Fna, las historias se cuentan desde hace siglos.' }
        ]
    },
    5: {
        name: 'Río',
        emoji: '🌊',
        color: 'world-5',
        description: 'Aguas que dan vida',
        places: [
            { name: 'Río Amazonas, Brasil', curiosity: 'Contiene una quinta parte del agua dulce del planeta.' },
            { name: 'Lago Inle, Myanmar', curiosity: 'Los pescadores reman con una pierna para mantener el equilibrio.' },
            { name: 'Cataratas del Iguazú, Argentina-Brasil', curiosity: 'Tienen más de 250 saltos de agua.' },
            { name: 'Delta del Okavango, Botsuana', curiosity: 'Un río que desaparece en el desierto.' },
            { name: 'Lago Ba Be, Vietnam', curiosity: 'El mayor lago natural del norte del país.' },
            { name: 'Río Nilo, Egipto', curiosity: 'Su crecida anual daba vida al antiguo Egipto.' },
            { name: 'Lago Titisee, Alemania', curiosity: 'Rodeado de bosques negros que inspiran leyendas.' },
            { name: 'Río Mekong, Laos', curiosity: 'Alimenta a millones de personas en su recorrido.' },
            { name: 'Lago Malawi, África', curiosity: 'Tiene más especies de peces que cualquier otro lago.' },
            { name: 'Río Zambeze, Zambia', curiosity: 'Hogar de hipopótamos y cocodrilos.' },
            { name: 'Lago Titicaca, Perú-Bolivia', curiosity: 'Sus islas flotantes están hechas de totora.' },
            { name: 'Río Ganges, India', curiosity: 'Considerado sagrado por millones de personas.' },
            { name: 'Lago Tanganyika, África', curiosity: 'Uno de los lagos más profundos del mundo.' },
            { name: 'Río Hudson, EE. UU.', curiosity: 'Inspiró a la escuela artística del siglo XIX.' },
            { name: 'Lago Baikal, Rusia', curiosity: 'En invierno, su hielo canta al romperse.' }
        ]
    },
    6: {
        name: 'Ceniza',
        emoji: '🌋',
        color: 'world-6',
        description: 'Fuerza de la naturaleza',
        places: [
            { name: 'Monte Etna, Italia', curiosity: 'Uno de los volcanes más activos del mundo, pero su suelo es fértil.' },
            { name: 'Desierto de Atacama, Chile', curiosity: 'El lugar más seco del planeta; algunos telescopios observan desde allí el universo.' },
            { name: 'Monte Bromo, Indonesia', curiosity: 'Los lugareños ofrecen flores y arroz a los dioses del volcán.' },
            { name: 'Isla de Lanzarote, España', curiosity: 'Su paisaje lunar proviene de erupciones del siglo XVIII.' },
            { name: 'Desierto del Namib, Namibia', curiosity: 'Las dunas más antiguas del mundo, algunas superan los 300 metros.' },
            { name: 'Monte Vesubio, Italia', curiosity: 'La erupción que destruyó Pompeya en el año 79 d.C.' },
            { name: 'Isla de Hawai\'i, EE. UU.', curiosity: 'La lava del Kilauea ha creado nueva tierra en el océano.' },
            { name: 'Desierto de Wadi Rum, Jordania', curiosity: 'Escenario de películas por su paisaje marciano.' },
            { name: 'Monte Fuji, Japón', curiosity: 'Su forma perfecta lo convierte en símbolo de serenidad.' },
            { name: 'Volcán Arenal, Costa Rica', curiosity: 'Dormido desde 2010, su silueta domina la selva.' },
            { name: 'Desierto Negro, Egipto', curiosity: 'Lleno de montículos de basalto formados por antiguos volcanes.' },
            { name: 'Monte Stromboli, Italia', curiosity: 'Erupciona con pequeñas explosiones cada 20 minutos.' },
            { name: 'Islas Canarias, España', curiosity: 'Cada isla es el resultado de una erupción distinta.' },
            { name: 'Parque Nacional de Yellowstone, EE. UU.', curiosity: 'Es un supervolcán en reposo.' },
            { name: 'Monte Kilimanjaro, Tanzania', curiosity: 'Su cima nevada contrasta con las llanuras africanas.' }
        ]
    },
    7: {
        name: 'Eco',
        emoji: '🌿',
        color: 'world-7',
        description: 'Naturaleza en su esplendor',
        places: [
            { name: 'Selva Amazónica, Brasil', curiosity: 'Produce el 20% del oxígeno del planeta.' },
            { name: 'Bosque de Yakushima, Japón', curiosity: 'Inspiró el escenario de "La princesa Mononoke".' },
            { name: 'Parque Nacional Kruger, Sudáfrica', curiosity: 'Hogar de los "cinco grandes" de África.' },
            { name: 'Monteverde, Costa Rica', curiosity: 'Sus bosques nublados albergan más de 400 especies de orquídeas.' },
            { name: 'Delta del Okavango, Botsuana', curiosity: 'Uno de los pocos ríos que muere en el desierto.' },
            { name: 'Bosque Negro, Alemania', curiosity: 'Su nombre viene de la densidad de sus abetos.' },
            { name: 'Islas Galápagos, Ecuador', curiosity: 'Las iguanas marinas solo existen aquí.' },
            { name: 'Pantanal, Brasil', curiosity: 'La zona húmeda más grande del mundo.' },
            { name: 'Bosque de Bialowieza, Polonia', curiosity: 'Refugio del último bisonte europeo.' },
            { name: 'Parque Nacional de Banff, Canadá', curiosity: 'Sus lagos glaciares cambian de color según la luz.' },
            { name: 'Selva Valdiviana, Chile', curiosity: 'Uno de los ecosistemas más antiguos de la Tierra.' },
            { name: 'Lago Nakuru, Kenia', curiosity: 'Santuario de flamencos rosados.' },
            { name: 'Bosques del Cáucaso, Georgia', curiosity: 'Entre Europa y Asia, mezcla de especies únicas.' },
            { name: 'Selva de Daintree, Australia', curiosity: 'El bosque tropical más antiguo del planeta.' },
            { name: 'Isla de Borneo, Malasia', curiosity: 'Hogar de los orangutanes y flores gigantes.' }
        ]
    },
    8: {
        name: 'Silencio',
        emoji: '❄️',
        color: 'world-8',
        description: 'Paz y tranquilidad helada',
        places: [
            { name: 'Laponia, Finlandia', curiosity: 'Durante el invierno, el sol apenas se asoma dos horas al día.' },
            { name: 'Antártida', curiosity: 'Es el continente más ventoso y seco del planeta.' },
            { name: 'Lago Baikal, Rusia', curiosity: 'Su hielo es tan claro que se ve a 40 metros de profundidad.' },
            { name: 'Montañas Rocosas, Canadá', curiosity: 'Al amanecer, el silencio se rompe solo con el crujido del hielo.' },
            { name: 'Fiordos Noruegos, Noruega', curiosity: 'El eco viaja durante segundos entre las montañas nevadas.' },
            { name: 'Glaciar Perito Moreno, Argentina', curiosity: 'Cada día avanza dos metros sin que se note.' },
            { name: 'Valle de Yosemite, EE. UU.', curiosity: 'En invierno, las cascadas se convierten en columnas de hielo.' },
            { name: 'Islandia', curiosity: 'El agua termal contrasta con el hielo de alrededor.' },
            { name: 'Lago Louise, Canadá', curiosity: 'Su superficie helada se usa como pista de patinaje natural.' },
            { name: 'Monte Cook, Nueva Zelanda', curiosity: 'Las leyendas maoríes lo llaman Aoraki, "el que perfora las nubes".' },
            { name: 'Tromsø, Noruega', curiosity: 'El mejor lugar para ver auroras en silencio absoluto.' },
            { name: 'Campo de Hielo Patagónico, Chile', curiosity: 'Uno de los mayores reservorios de agua dulce del mundo.' },
            { name: 'Monte Everest, Nepal/Tíbet', curiosity: 'El punto más alto del planeta, donde el aire casi no vibra.' },
            { name: 'Svalbard, Noruega', curiosity: 'Los osos polares son más numerosos que las personas.' },
            { name: 'Alpes Suizos, Suiza', curiosity: 'En algunas aldeas aún no hay coches, solo trineos.' }
        ]
    },
    9: {
        name: 'Horizonte',
        emoji: '🌇',
        color: 'world-9',
        description: 'Donde la tierra se encuentra con el cielo',
        places: [
            { name: 'Gran Cañón, EE. UU.', curiosity: 'Cada amanecer pinta nuevas sombras sobre sus paredes.' },
            { name: 'Salar de Uyuni, Bolivia', curiosity: 'Cuando llueve, se convierte en el espejo más grande del mundo.' },
            { name: 'Desierto del Sáhara, Marruecos', curiosity: 'Al caer el sol, la arena se enfría en minutos.' },
            { name: 'Monte Uluru, Australia', curiosity: 'Cambia de color según la hora del día.' },
            { name: 'Playa de Copacabana, Brasil', curiosity: 'Sus curvas siguen el ritmo de las olas.' },
            { name: 'Cabo de Buena Esperanza, Sudáfrica', curiosity: 'Donde se cruzan dos océanos.' },
            { name: 'Desierto de Wadi Rum, Jordania', curiosity: 'El cielo nocturno parece sin fin.' },
            { name: 'Islas Fiyi', curiosity: 'El mar adquiere reflejos dorados al atardecer.' },
            { name: 'Monument Valley, EE. UU.', curiosity: 'Escenario de incontables películas del oeste.' },
            { name: 'Lago Titicaca, Perú', curiosity: 'Las puestas de sol tiñen el agua de cobre.' },
            { name: 'Mont Saint-Michel, Francia', curiosity: 'Durante la marea alta parece flotar sobre el mar.' },
            { name: 'Río Nilo, Egipto', curiosity: 'La vida sigue su ritmo desde hace milenios.' },
            { name: 'Torres del Paine, Chile', curiosity: 'Las montañas se encienden en rojo con la primera luz.' },
            { name: 'Gran Muralla, China', curiosity: 'Se extiende como una línea hacia el horizonte.' },
            { name: 'Santorini, Grecia', curiosity: 'El sol se despide cada día entre cúpulas azules.' }
        ]
    },
    10: {
        name: 'Aurora',
        emoji: '🌌',
        color: 'world-10',
        description: 'Luces mágicas del cielo',
        places: [
            { name: 'Tromsø, Noruega', curiosity: 'El cielo baila cuando el viento solar acaricia la Tierra.' },
            { name: 'Reikiavik, Islandia', curiosity: 'Las luces del norte se reflejan sobre el mar helado.' },
            { name: 'Lofoten, Noruega', curiosity: 'Las montañas parecen flotar bajo la aurora.' },
            { name: 'Fairbanks, Alaska', curiosity: 'Se pueden ver luces incluso a -30 °C.' },
            { name: 'Abisko, Suecia', curiosity: 'Su cielo despejado es ideal para observaciones astronómicas.' },
            { name: 'Laponia, Finlandia', curiosity: 'Los renos pastan bajo el resplandor verde.' },
            { name: 'Groenlandia', curiosity: 'Las auroras pueden durar horas enteras.' },
            { name: 'Lago Inari, Finlandia', curiosity: 'El hielo refleja los colores del cielo.' },
            { name: 'Yukón, Canadá', curiosity: 'Los pueblos indígenas las llaman "las voces de los antepasados".' },
            { name: 'Estación Espacial Internacional', curiosity: 'Los astronautas ven las auroras desde arriba.' },
            { name: 'Península de Kola, Rusia', curiosity: 'Se ve tanto aurora como estrellas fugaces.' },
            { name: 'Kiruna, Suecia', curiosity: 'Las minas iluminan el horizonte mientras baila la aurora.' },
            { name: 'Yellowknife, Canadá', curiosity: 'Considerado uno de los mejores lugares del mundo para verla.' },
            { name: 'Reykjavik, Islandia', curiosity: 'A veces la aurora se mezcla con luces de ciudad.' },
            { name: 'Cabo Norte, Noruega', curiosity: 'Fin del continente, donde el cielo nunca duerme.' }
        ]
    },
    11: {
        name: 'Vida',
        emoji: '🌴',
        color: 'world-11',
        description: 'Naturaleza en su máximo esplendor',
        places: [
            { name: 'Selva Lacandona, México', curiosity: 'En sus profundidades aún viven comunidades mayas.' },
            { name: 'Cataratas Kaieteur, Guayana', curiosity: 'Cinco veces más altas que el Niágara.' },
            { name: 'Parque Nacional Corcovado, Costa Rica', curiosity: 'Alberga el 2,5% de la biodiversidad mundial.' },
            { name: 'Monte Roraima, Venezuela', curiosity: 'Inspiró el paisaje de la película Up.' },
            { name: 'Bosque Nuboso de Mindo, Ecuador', curiosity: 'Famoso por sus colibríes de colores brillantes.' },
            { name: 'Parque Nacional Khao Sok, Tailandia', curiosity: 'Cuenta con una selva más antigua que el Amazonas.' },
            { name: 'Delta del Okavango, Botsuana', curiosity: 'El único delta interior que no desemboca en el mar.' },
            { name: 'Isla de Borneo, Malasia', curiosity: 'Aquí habita el orangután en libertad.' },
            { name: 'Selva del Congo, África Central', curiosity: 'La segunda selva más grande del planeta.' },
            { name: 'Monte Kilimanjaro, Tanzania', curiosity: 'Su cima nevada destaca entre la sabana africana.' },
            { name: 'Parque Nacional Manu, Perú', curiosity: 'Considerado el lugar más biodiverso del mundo.' },
            { name: 'Jardines de Kirstenbosch, Sudáfrica', curiosity: 'Creados al pie de la Montaña de la Mesa.' },
            { name: 'Parque Nacional de Komodo, Indonesia', curiosity: 'Hogar del mayor lagarto del mundo.' },
            { name: 'Isla de Madagascar', curiosity: 'Más del 80% de sus especies no existen en otro lugar.' },
            { name: 'Parque Nacional de Canaima, Venezuela', curiosity: 'Sus tepuyes albergan cascadas de más de 900 metros.' }
        ]
    },
    12: {
        name: 'Iconos',
        emoji: '🏙️',
        color: 'world-12',
        description: 'Monumentos que definen culturas',
        places: [
            { name: 'Torre Eiffel, Francia', curiosity: 'Construida para la Exposición Universal de 1889.' },
            { name: 'Taj Mahal, India', curiosity: 'Erigido como símbolo de amor eterno.' },
            { name: 'Coliseo Romano, Italia', curiosity: 'Podía albergar a más de 50.000 espectadores.' },
            { name: 'Machu Picchu, Perú', curiosity: 'Redescubierto en 1911 por Hiram Bingham.' },
            { name: 'Gran Muralla China, China', curiosity: 'Se extiende más de 21.000 kilómetros.' },
            { name: 'Cristo Redentor, Brasil', curiosity: 'Fue inaugurado en 1931 en la cima del Corcovado.' },
            { name: 'Sagrada Familia, España', curiosity: 'Su construcción comenzó en 1882 y aún continúa.' },
            { name: 'Stonehenge, Reino Unido', curiosity: 'Tiene más de 4.000 años de antigüedad.' },
            { name: 'Petra, Jordania', curiosity: 'Tallada en roca rosa hace más de dos milenios.' },
            { name: 'Monte Rushmore, EE. UU.', curiosity: 'Sus rostros fueron esculpidos entre 1927 y 1941.' },
            { name: 'Ópera de Sídney, Australia', curiosity: 'Inspirada en conchas marinas y velas.' },
            { name: 'Pirámides de Giza, Egipto', curiosity: 'Las únicas maravillas antiguas aún en pie.' },
            { name: 'Torre de Pisa, Italia', curiosity: 'Su inclinación alcanza más de 4 metros.' },
            { name: 'Big Ben, Reino Unido', curiosity: 'Su campana pesa más de 13 toneladas.' },
            { name: 'Monte Saint-Michel, Francia', curiosity: 'Durante la marea alta parece flotar sobre el mar.' }
        ]
    },
    13: {
        name: 'Profundo',
        emoji: '🌊',
        color: 'world-13',
        description: 'Misterios del océano',
        places: [
            { name: 'Gran Barrera de Coral, Australia', curiosity: 'El mayor sistema de arrecifes del planeta.' },
            { name: 'Mar Muerto, Israel-Jordania', curiosity: 'Su salinidad es diez veces superior a la del océano.' },
            { name: 'Islas Galápagos, Ecuador', curiosity: 'Inspiraron la teoría de la evolución de Darwin.' },
            { name: 'Bahía de Ha Long, Vietnam', curiosity: 'Famosa por sus miles de islotes de piedra caliza.' },
            { name: 'Océano Ártico', curiosity: 'El más pequeño y frío del planeta.' },
            { name: 'Mar Rojo, Egipto', curiosity: 'Sus corales destacan por sus tonos brillantes.' },
            { name: 'Isla de Cozumel, México', curiosity: 'Uno de los mejores lugares del mundo para bucear.' },
            { name: 'Cueva Azul, Italia', curiosity: 'Su luz interior proviene de una abertura submarina.' },
            { name: 'Islas Maldivas', curiosity: 'Formadas por más de 1.000 atolones de coral.' },
            { name: 'Mar Caribe', curiosity: 'Sus aguas albergan restos de antiguos galeones.' },
            { name: 'Isla de Pascua, Chile', curiosity: 'Sus moáis miran hacia el interior de la isla.' },
            { name: 'Océano Índico', curiosity: 'Baña las costas de África, Asia y Oceanía.' },
            { name: 'Mar de Andamán, Tailandia', curiosity: 'Sus playas aparecen en numerosas películas.' },
            { name: 'Golfo de México', curiosity: 'Importante por su biodiversidad marina.' },
            { name: 'Fosa de las Marianas, Pacífico', curiosity: 'El punto más profundo de los océanos.' }
        ]
    },
    14: {
        name: 'Horizonte de Arena',
        emoji: '🏜️',
        color: 'world-14',
        description: 'Desiertos que inspiran',
        places: [
            { name: 'Desierto Blanco, Egipto', curiosity: 'Sus formaciones parecen esculturas de otro planeta.' },
            { name: 'Wadi Rum, Jordania', curiosity: 'Conocido como el Valle de la Luna.' },
            { name: 'Antelope Canyon, EE. UU.', curiosity: 'Formado por siglos de erosión del agua.' },
            { name: 'Desierto del Gobi, Mongolia', curiosity: 'Sus temperaturas varían más de 60 °C entre estaciones.' },
            { name: 'Valle de la Luna, Chile', curiosity: 'Sus colores cambian con la luz del día.' },
            { name: 'Oasis de Siwa, Egipto', curiosity: 'Habitan palmeras y manantiales cristalinos.' },
            { name: 'Desierto de Sonora, México', curiosity: 'Aquí florecen los cactus saguaro gigantes.' },
            { name: 'Cañón del Colorado, EE. UU.', curiosity: 'Tallado por el río durante millones de años.' },
            { name: 'Desierto de Danakil, Etiopía', curiosity: 'Uno de los lugares más calientes del mundo.' },
            { name: 'Sossusvlei, Namibia', curiosity: 'Sus dunas pueden superar los 300 metros.' },
            { name: 'Desierto de Thar, India', curiosity: 'Llamado el Gran Desierto Indio.' },
            { name: 'Cabo de Buena Esperanza, Sudáfrica', curiosity: 'Donde el Atlántico se encuentra con el Índico.' },
            { name: 'Montes Simien, Etiopía', curiosity: 'Patrimonio natural de la humanidad.' },
            { name: 'Isla Socotra, Yemen', curiosity: 'Famosa por sus árboles de forma extraña.' },
            { name: 'Desierto de Pinnacles, Australia', curiosity: 'Cubierto de columnas de piedra caliza.' }
        ]
    },
    15: {
        name: 'Sueño',
        emoji: '🌌',
        color: 'world-15',
        description: 'Lugares que parecen irreales',
        places: [
            { name: 'Templos de Bagan, Myanmar', curiosity: 'Más de dos mil templos sobreviven entre la niebla.' },
            { name: 'Lago Natron, Tanzania', curiosity: 'Sus aguas rojas cristalizan al secarse.' },
            { name: 'Salar de Atacama, Chile', curiosity: 'De noche se reflejan miles de estrellas.' },
            { name: 'Islas Feroe, Dinamarca', curiosity: 'Sus acantilados caen directo al océano.' },
            { name: 'Cueva de Waitomo, Nueva Zelanda', curiosity: 'Brilla con luces naturales de gusanos luminosos.' },
            { name: 'Montañas Tianzi, China', curiosity: 'Inspiraron los paisajes de la película Avatar.' },
            { name: 'Lago Hillier, Australia', curiosity: 'Famoso por su color rosa intenso.' },
            { name: 'Templo de Angkor Wat, Camboya', curiosity: 'El monumento religioso más grande del mundo.' },
            { name: 'Isla de Capri, Italia', curiosity: 'Su gruta azul parece iluminada desde el fondo del mar.' },
            { name: 'Monte Cook, Nueva Zelanda', curiosity: 'Su cumbre se alinea con la Vía Láctea.' },
            { name: 'Lago Tekapo, Nueva Zelanda', curiosity: 'Reconocido por sus cielos estrellados sin contaminación.' },
            { name: 'Templos de Abu Simbel, Egipto', curiosity: 'Tallados en roca hace más de 3.000 años.' },
            { name: 'Monte Fitz Roy, Argentina', curiosity: 'Su forma afilada atrae a escaladores de todo el mundo.' },
            { name: 'Isla de Santorini, Grecia', curiosity: 'Sus casas blancas brillan incluso de noche.' },
            { name: 'Desierto de Atacama, Chile', curiosity: 'El cielo más limpio del planeta para observar estrellas.' }
        ]
    },
    16: {
        name: 'Costas',
        emoji: '🌊',
        color: 'world-16',
        description: 'Donde la tierra besa el mar',
        places: [
            { name: 'Cliffs of Moher, Irlanda', curiosity: 'Sus acantilados se elevan sobre el Atlántico con colonias de aves marinas.' },
            { name: 'Étretat, Francia', curiosity: 'Arcos y agujas de tiza modelados por el mar.' },
            { name: 'Big Sur, EE. UU.', curiosity: 'La carretera serpentea entre montañas y océano.' },
            { name: 'Neist Point (Isla de Skye), Escocia', curiosity: 'Un faro vigila un laberinto de acantilados basálticos.' },
            { name: 'Cinque Terre, Italia', curiosity: 'Pueblos de colores colgando sobre el mar Ligur.' },
            { name: 'Cabo de Roca, Portugal', curiosity: 'El punto más occidental de la Europa continental.' },
            { name: 'Twelve Apostles, Australia', curiosity: 'Agujas de piedra caliza frente a la Gran Ruta Oceánica.' },
            { name: 'Acantilados de Moher, Irlanda', curiosity: 'Murallas de piedra se alzan sobre un mar inquieto y un cielo gris atlántico.' },
            { name: 'Algarve – Ponta da Piedade, Portugal', curiosity: 'Grutas doradas talladas por el Atlántico.' },
            { name: 'Cabo de Gata, España', curiosity: 'Paisaje volcánico y calas de agua transparente.' },
            { name: 'Bahía de San Sebastián, España', curiosity: 'La Concha dibuja un arco perfecto.' },
            { name: 'Isla de Jeju, Corea del Sur', curiosity: 'Conos volcánicos y costas negras en un mismo lugar.' },
            { name: 'Capri – Faraglioni, Italia', curiosity: 'Tres rocas emblemáticas emergen del Tirreno.' },
            { name: 'Costa Esmeralda, Cerdeña (Italia)', curiosity: 'Famosa por sus aguas de color esmeralda.' },
            { name: 'Kaikōura, Nueva Zelanda', curiosity: 'Montañas nevadas se asoman junto al océano.' }
        ]
    },
    17: {
        name: 'Puentes',
        emoji: '🌉',
        color: 'world-17',
        description: 'Conectando mundos',
        places: [
            { name: 'Golden Gate, EE. UU.', curiosity: 'Puente colgante símbolo de San Francisco.' },
            { name: 'Puente de la Torre, Reino Unido', curiosity: 'Sus torres neogóticas dominan el Támesis.' },
            { name: 'Puente de Carlos, Praga (Chequia)', curiosity: 'Flanqueado por estatuas barrocas.' },
            { name: 'Ponte Vecchio, Florencia (Italia)', curiosity: 'Un puente cubierto de pequeñas joyerías.' },
            { name: 'Acueducto de Segovia, España', curiosity: 'Obra romana de sillares sin mortero.' },
            { name: 'Puente del Bósforo, Estambul (Turquía)', curiosity: 'Une Europa y Asia en un mismo cruce.' },
            { name: 'Rakotzbrücke, Alemania', curiosity: 'Su reflejo forma un círculo perfecto.' },
            { name: 'Puente de Brooklyn, EE. UU.', curiosity: 'Uno de los primeros grandes puentes colgantes de acero.' },
            { name: 'Viaducto de Landwasser, Suiza', curiosity: 'Un tren cruza columnas sobre un barranco.' },
            { name: 'Pont Alexandre III, París (Francia)', curiosity: 'Decorado con esculturas doradas y ninfas.' },
            { name: 'Puente de U Bein, Myanmar', curiosity: 'Construido en madera de teca sobre un lago poco profundo.' },
            { name: 'Puente de Rialto, Venecia (Italia)', curiosity: 'El más famoso sobre el Gran Canal.' },
            { name: 'Puente Kintai, Japón', curiosity: 'Cinco arcos de madera sobre el río Nishiki.' },
            { name: 'Gateshead Millennium, Reino Unido', curiosity: 'Se inclina para dejar pasar barcos.' },
            { name: 'Puente de la Bahía de Sídney, Australia', curiosity: 'Apodado «la percha» por su forma.' }
        ]
    },
    18: {
        name: 'Jardines',
        emoji: '🌿',
        color: 'world-18',
        description: 'Paraísos creados por el hombre',
        places: [
            { name: 'Jardines de Keukenhof, Países Bajos', curiosity: 'Cada primavera florecen millones de tulipanes.' },
            { name: 'Jardines de Butchart, Canadá', curiosity: 'Una cantera convertida en jardín espectacular.' },
            { name: 'Versalles, Francia', curiosity: 'Diseño de Le Nôtre con fuentes y geometría perfecta.' },
            { name: 'Kenroku-en, Japón', curiosity: 'Uno de los tres grandes jardines del Japón.' },
            { name: 'Kew Gardens, Reino Unido', curiosity: 'Invernaderos históricos de hierro y cristal.' },
            { name: 'Jardines Majorelle, Marruecos', curiosity: 'Famosos por su azul intenso y cactus exóticos.' },
            { name: 'Villa d\'Este, Italia', curiosity: 'Conocida por sus terrazas llenas de fuentes.' },
            { name: 'Jardín Botánico de Singapur', curiosity: 'Incluye un gran jardín de orquídeas.' },
            { name: 'Palacio de Peterhof, Rusia', curiosity: 'Apodado la «Versalles del Báltico».' },
            { name: 'Jardines de Luxemburgo, Francia', curiosity: 'Un oasis clásico en el corazón de París.' },
            { name: 'Parque Güell, España', curiosity: 'Gaudí mezcló mosaicos y formas orgánicas.' },
            { name: 'Shalimar Bagh, India', curiosity: 'Jardín mogol escalonado frente a la montaña.' },
            { name: 'Monet en Giverny, Francia', curiosity: 'El estanque de nenúfares inspiró sus lienzos.' },
            { name: 'Longwood Gardens, EE. UU.', curiosity: 'Invernaderos y espectáculos de fuentes.' },
            { name: 'Jardín de Suzhou, China', curiosity: 'Patios, estanques y rocas talladas con precisión.' }
        ]
    },
    19: {
        name: 'Ciudades de Agua',
        emoji: '🚤',
        color: 'world-19',
        description: 'Donde el agua es la calle',
        places: [
            { name: 'Ámsterdam, Países Bajos', curiosity: 'Sus anillos de canales son Patrimonio de la Humanidad.' },
            { name: 'Brujas, Bélgica', curiosity: 'Los canales medievales rodean el casco antiguo.' },
            { name: 'Annecy, Francia', curiosity: 'Apodada la «Venecia de los Alpes».' },
            { name: 'Udaipur, India', curiosity: 'Sus palacios flotan sobre el lago Pichola.' },
            { name: 'San Petersburgo, Rusia', curiosity: 'Atraviesan la ciudad más de cien canales y ríos.' },
            { name: 'Estocolmo, Suecia', curiosity: 'La ciudad se reparte sobre un archipiélago.' },
            { name: 'Copenhague – Nyhavn, Dinamarca', curiosity: 'Fachadas de colores junto a antiguos barcos.' },
            { name: 'Hamburgo – Speicherstadt, Alemania', curiosity: 'Barrio de almacenes de ladrillo sobre canales.' },
            { name: 'Suzhou, China', curiosity: 'Canales y jardines clásicos conviven en la ciudad vieja.' },
            { name: 'Giethoorn, Países Bajos', curiosity: 'Pueblo sin carreteras, solo canales y senderos.' },
            { name: 'Hoi An, Vietnam', curiosity: 'Linternas y casas antiguas junto al río Thu Bon.' },
            { name: 'Aveiro, Portugal', curiosity: 'Sus «moliceiros» surcan canales salinos.' },
            { name: 'Bangkok – Khlongs, Tailandia', curiosity: 'Los canales tradicionales aún laten en algunos barrios.' },
            { name: 'Xochimilco, México', curiosity: 'Trajineras de colores navegan entre chinampas.' },
            { name: 'Alappuzha – Backwaters, India', curiosity: 'Una red de lagunas y canales conecta aldeas y arrozales.' }
        ]
    },
    20: {
        name: 'Miradores',
        emoji: '🗺️',
        color: 'world-20',
        description: 'Vistas que quitan el aliento',
        places: [
            { name: 'Preikestolen, Noruega', curiosity: 'Un balcón natural sobre el fiordo Lyse.' },
            { name: 'Mesa Arch, EE. UU.', curiosity: 'Al amanecer el arco enmarca un valle rojo.' },
            { name: 'Pico do Arieiro, Madeira (Portugal)', curiosity: 'Senderos aéreos entre mares de nubes.' },
            { name: 'Trolltunga, Noruega', curiosity: 'Una lengua de roca suspendida sobre el vacío.' },
            { name: 'Cerro Campanario, Argentina', curiosity: 'Vista panorámica de lagos y bosques patagónicos.' },
            { name: 'Table Mountain – Lion\'s Head, Sudáfrica', curiosity: 'Dos cumbres vigilan Ciudad del Cabo.' },
            { name: 'Acrópolis – Areópago, Grecia', curiosity: 'Colina de piedra frente al Partenón.' },
            { name: 'Huangshan – Pasarelas, China', curiosity: 'Escaleras talladas se aferran a la roca.' },
            { name: 'Pico de Adam, Sri Lanka', curiosity: 'Peregrinos suben de noche para ver el amanecer.' },
            { name: 'Montjuïc, España', curiosity: 'Mirador clásico sobre Barcelona y su puerto.' },
            { name: 'Glacier Point, EE. UU.', curiosity: 'Domina el valle de Yosemite desde lo alto.' },
            { name: 'Hallstatt Skywalk, Austria', curiosity: 'Un balcón metálico sobre un lago alpino.' },
            { name: 'Río Verde – Mirador de la Axarquía, España', curiosity: 'Barrancos verdes y río claro en profundidad.' },
            { name: 'Pico Duarte, República Dominicana', curiosity: 'El techo de las Antillas al amanecer.' },
            { name: 'Cruz de Ferro, Camino de Santiago (España)', curiosity: 'Un hito de peregrinos con montones de piedras.' }
        ]
    },
    21: {
        name: 'Reinos Animales',
        emoji: '🦓',
        color: 'world-21',
        description: 'Hogares de la vida salvaje',
        places: [
            { name: 'Serengeti, Tanzania', curiosity: 'Millones de ñus migran en busca de pastos cada año.' },
            { name: 'Islas Galápagos, Ecuador', curiosity: 'Inspiraron la teoría de la evolución de Darwin.' },
            { name: 'Gran Barrera de Coral, Australia', curiosity: 'El mayor ecosistema de arrecifes del planeta.' },
            { name: 'Bosque de Borneo, Malasia', curiosity: 'Hogar del orangután, símbolo de la selva tropical.' },
            { name: 'Pantanal, Brasil', curiosity: 'El humedal más extenso del mundo, santuario del jaguar.' },
            { name: 'Antártida', curiosity: 'Los pingüinos emperador crían sobre el hielo más inhóspito.' },
            { name: 'Masái Mara, Kenia', curiosity: 'Leones, cebras y jirafas comparten las sabanas doradas.' },
            { name: 'Amazonas, Perú', curiosity: 'Ríos serpenteantes esconden delfines rosados y guacamayos.' },
            { name: 'Yellowstone, EE. UU.', curiosity: 'Primer parque nacional del mundo, con bisontes y géiseres.' },
            { name: 'Isla Canguro, Australia', curiosity: 'Refugio natural para koalas y canguros salvajes.' },
            { name: 'Sabana de Etosha, Namibia', curiosity: 'Los elefantes recorren antiguos lechos salinos.' },
            { name: 'Selva Negra, Alemania', curiosity: 'Bosques densos donde aún viven ciervos y zorros rojos.' },
            { name: 'Costa de California, EE. UU.', curiosity: 'Las ballenas grises migran miles de kilómetros cada año.' },
            { name: 'Madagascar', curiosity: 'Los lémures solo existen en esta isla única del Índico.' },
            { name: 'Parque Kruger, Sudáfrica', curiosity: 'Uno de los mejores lugares del mundo para ver los «Cinco Grandes».' }
        ]
    }
};

// ===== ESTADO DEL JUEGO =====
class GameState {
    constructor() {
        this.playerName = '';
        this.currentWorld = 1;
        this.currentLevel = 1;
        this.completedLevels = new Set();
        this.totalTime = 0;
        this.puzzleStartTime = 0;
        this.puzzleTime = 0;
        this.isLoggedIn = false;
        this.userInfo = null;
        this.showLoginModal = false;
        this.audioEnabled = true; // Audio habilitado por defecto
        this.showRegisterModal = false;
        this.mode = 'login'; // 'login', 'register', 'verify'
        this.email = '';
        this.password = '';
        this.confirmPassword = '';
        this.verificationCode = '';
        this.registeredEmail = '';
        this.registeredPassword = '';
    }

    // Guardar progreso localmente
    saveProgress() {
        const isLoggedIn = this.isLoggedIn || (window.game && window.game.isLoggedIn);
        console.log('💾 saveProgress() llamado - isLoggedIn:', isLoggedIn, 'this.isLoggedIn:', this.isLoggedIn, 'window.game.isLoggedIn:', window.game?.isLoggedIn);
        
        const progress = {
            playerName: this.playerName,
            currentWorld: this.currentWorld,
            currentLevel: this.currentLevel,
            completedLevels: Array.from(this.completedLevels),
            totalTime: this.totalTime,
            audioEnabled: this.audioEnabled,
            timestamp: Date.now()
        };
        localStorage.setItem(`${GAME_CONFIG.name}_progress`, JSON.stringify(progress));
        console.log('💾 Progreso guardado localmente:', progress);
        
        // Sincronizar con Firebase si está logueado
        // Verificar tanto this.isLoggedIn como window.game.isLoggedIn
        if (isLoggedIn && typeof Android !== 'undefined' && Android.saveGameProgress) {
            try {
                const firebaseProgress = {
                    completedLevels: JSON.stringify(Array.from(this.completedLevels)),
                    totalTime: this.totalTime,
                    audioEnabled: this.audioEnabled,
                    currentWorld: this.currentWorld,
                    currentLevel: this.currentLevel
                };
                console.log('💾 Guardando progreso en Firebase:', firebaseProgress);
                const result = Android.saveGameProgress(JSON.stringify(firebaseProgress));
                console.log('💾 Resultado de saveGameProgress:', result);
            } catch (error) {
                console.error('❌ Error guardando progreso en Firebase:', error);
            }
        } else {
            console.log('⚠️ No se puede guardar en Firebase - isLoggedIn:', isLoggedIn, 'this.isLoggedIn:', this.isLoggedIn, 'window.game.isLoggedIn:', window.game?.isLoggedIn, 'Android:', typeof Android, 'saveGameProgress:', typeof Android?.saveGameProgress);
        }
    }

    // Cargar progreso localmente
    loadProgress() {
        const saved = localStorage.getItem(`${GAME_CONFIG.name}_progress`);
        if (saved) {
            try {
                const progress = JSON.parse(saved);
                this.playerName = progress.playerName || '';
                this.currentWorld = progress.currentWorld || 1;
                this.currentLevel = progress.currentLevel || 1;
                this.completedLevels = new Set(progress.completedLevels || []);
                this.totalTime = progress.totalTime || 0;
                this.audioEnabled = progress.audioEnabled !== undefined ? progress.audioEnabled : true;
            } catch (e) {
                console.error('Error cargando progreso:', e);
            }
        }
    }

    // Obtener progreso local
    getLocalProgress() {
        return {
            currentWorld: this.currentWorld,
            currentLevel: this.currentLevel,
            completedLevels: Array.from(this.completedLevels),
            totalTime: this.totalTime,
            audioEnabled: this.audioEnabled
        };
    }

    // Marcar nivel como completado
    completeLevel(world, level) {
        const levelKey = `${world}-${level}`;
        this.completedLevels.add(levelKey);
        
        // NO avanzar automáticamente al siguiente nivel
        // El usuario decidirá si quiere ir al siguiente o no
        
        this.saveProgress();
        
        // La sincronización con Firebase se maneja en firebase-integration.js
    }

    // Marcar nivel como no completado (para poder jugarlo de nuevo)
    markLevelIncomplete(world, level) {
        const levelKey = `${world}-${level}`;
        this.completedLevels.delete(levelKey);
        this.saveProgress();
    }

    // Verificar si un nivel está completado
    isLevelCompleted(world, level) {
        return this.completedLevels.has(`${world}-${level}`);
    }

    // Verificar si un nivel está desbloqueado
    isLevelUnlocked(world, level) {
        // Modo relax - todos los niveles están desbloqueados
        return true;
    }

    // Obtener progreso de un mundo
    getWorldProgress(world) {
        let completed = 0;
        for (let level = 1; level <= GAME_CONFIG.levelsPerWorld; level++) {
            if (this.isLevelCompleted(world, level)) {
                completed++;
            }
        }
        return completed;
    }

    // Obtener nivel aleatorio pendiente
    getRandomPendingLevel() {
        const pendingLevels = [];
        for (let world = 1; world <= GAME_CONFIG.totalWorlds; world++) {
            for (let level = 1; level <= GAME_CONFIG.levelsPerWorld; level++) {
                if (this.isLevelUnlocked(world, level) && !this.isLevelCompleted(world, level)) {
                    pendingLevels.push({ world, level });
                }
            }
        }
        
        if (pendingLevels.length === 0) return null;
        return pendingLevels[Math.floor(Math.random() * pendingLevels.length)];
    }

    // Obtener el primer nivel disponible
    getFirstAvailableLevel() {
        for (let world = 1; world <= GAME_CONFIG.totalWorlds; world++) {
            for (let level = 1; level <= GAME_CONFIG.levelsPerWorld; level++) {
                if (this.isLevelUnlocked(world, level) && !this.isLevelCompleted(world, level)) {
                    return { world, level };
                }
            }
        }
        return null;
    }
}

// ===== CLASE PRINCIPAL DEL JUEGO =====
class RinconesDelMundo {
    constructor() {
        this.state = new GameState();
        this.currentScreen = 'loading';
        this.puzzle = null;
        this.timerInterval = null;
        this.puzzlesConfig = null;
        this.worldsData = null;
        this.isNavigating = false; // Flag para prevenir navegación múltiple
        this.audioActivated = false; // Flag para controlar si el audio ha sido activado por el usuario
        this.audio = {
            background: null,
            move: null,
            complete: null
        };
        
        this.init();
        
        // Timeout de seguridad para ocultar loading si algo falla
        setTimeout(() => {
            const loadingScreen = document.getElementById('loading-screen');
            if (loadingScreen && loadingScreen.style.display !== 'none') {
                console.log('Timeout de carga - forzando inicio');
                this.hideLoadingScreen();
                this.showIntroScreen();
            }
        }, 10000); // 10 segundos
    }

    async init() {
        console.log('Inicializando Rincones del Mundo...');
        
        try {
            // Cargar configuración de puzzles
            console.log('Cargando configuración de puzzles...');
            await this.loadPuzzlesConfig();
            console.log('Configuración de puzzles cargada');
            
            // Cargar progreso
            console.log('Cargando progreso guardado...');
            this.state.loadProgress();
            console.log('Progreso cargado');
            
            // Inicializar audio
            console.log('Inicializando audio...');
            this.initAudio();
            console.log('Audio inicializado');
            
            // Inicializar AdMob
            console.log('Inicializando AdMob...');
            window.adMobManager.init().catch(console.error);
            console.log('AdMob inicializado');
            
            // Verificar autenticación
            console.log('Verificando autenticación...');
            this.checkAuth().catch(console.error);
            console.log('Autenticación verificada');
            
    // Verificar estado del usuario (Android) - con delay para asegurar que los callbacks estén configurados
    console.log('Verificando estado del usuario...');
    setTimeout(() => {
        this.checkUserStatus().catch(console.error);
        console.log('Estado del usuario verificado');
        
        // Si no hay usuario logueado, mostrar "Invitado"
        setTimeout(() => {
            this.showGuestUser();
        }, 500);
    }, 100);
            
            // Configurar barra de menú
            console.log('Configurando barra de menú...');
            this.setupTopMenuBar();
            console.log('Barra de menú configurada');
            
            // ACTIVAR BOTONES FLOTANTES INMEDIATAMENTE
            console.log('Configurando botones flotantes...');
            this.setupFloatingButtons();
            console.log('Botones flotantes configurados');
            
            // Lógica de inicio
            console.log('Manejando inicio de aplicación...');
            this.handleStartup();
            console.log('Inicio de aplicación completado');
            
            // Ocultar pantalla de carga y mostrar pantalla de inicio
            this.hideLoadingScreen();
            this.showHomeScreen();
            
        } catch (error) {
            console.error('Error inicializando juego:', error);
            this.hideLoadingScreen();
            this.showHomeScreen();
        }
    }

    // ===== PANTALLA DE CARGA =====
    hideLoadingScreen() {
        const loadingScreen = document.getElementById('loading-screen');
        if (loadingScreen) {
            loadingScreen.style.opacity = '0';
            setTimeout(() => {
                loadingScreen.style.display = 'none';
            }, 500);
        }
    }

    // ===== PANTALLA DE INICIO =====
    showHomeScreen() {
        this.showScreen('home');
        // Ocultar barra de menú en página de inicio
        const topMenuBar = document.getElementById('top-menu-bar');
        if (topMenuBar) {
            topMenuBar.style.display = 'none';
        }
        // Agregar clase al body para ocultar botones flotantes
        document.body.classList.add('home-screen-active');
    }

    // ===== APLICAR COLORES DEL MUNDO =====
    applyWorldColors(worldId) {
        if (!this.puzzlesConfig || !this.puzzlesConfig[worldId]) {
            return;
        }

        const world = this.puzzlesConfig[worldId];
        const colors = world.colorPalette;

        if (colors) {
            // Crear colores más fuertes y distintivos
            const worldHue = (worldId - 1) * 16.36; // 360/22 mundos = 16.36 grados por mundo
            const saturation = 70; // Saturación más alta
            const lightness = 85; // Luminosidad más alta
            
            // Colores más intensos para las páginas
            const fondoColor = `linear-gradient(135deg, hsla(${worldHue}, ${saturation}%, ${lightness}%, 0.6) 0%, hsla(${worldHue}, ${saturation}%, ${lightness + 10}%, 0.4) 100%)`;
            const bordeColor = `hsla(${worldHue}, ${saturation}%, ${lightness - 20}%, 0.9)`;
            const botonesColor = `hsla(${worldHue}, ${saturation}%, ${lightness - 30}%, 0.8)`;
            const botonesBorderColor = `hsla(${worldHue}, ${saturation}%, ${lightness - 25}%, 0.9)`;
            
            // Aplicar colores más intensos a las variables CSS
            document.documentElement.style.setProperty('--world-fondo', fondoColor);
            document.documentElement.style.setProperty('--world-borde', bordeColor);
            document.documentElement.style.setProperty('--world-botones', botonesColor);
            document.documentElement.style.setProperty('--world-botones-border', botonesBorderColor);
        }
    }

    hideHomeScreen() {
        const homeScreen = document.getElementById('home-screen');
        if (homeScreen) {
            homeScreen.style.display = 'none';
        }
        // Mostrar barra de menú cuando salgamos de la página de inicio
        const topMenuBar = document.getElementById('top-menu-bar');
        if (topMenuBar) {
            topMenuBar.style.display = 'flex';
        }
        // Quitar clase del body para mostrar botones flotantes
        document.body.classList.remove('home-screen-active');
    }

    // ===== CONFIGURACIÓN =====
    async loadPuzzlesConfig() {
        try {
            console.log('Intentando cargar puzzles_config.json...');
            
            // En Android WebView, usar la interfaz Java para cargar archivos
            if (window.Android && window.Android.loadAsset) {
                console.log('Usando interfaz Android para cargar JSON...');
                const jsonContent = window.Android.loadAsset('puzzles_config.json');
                if (jsonContent) {
                    this.puzzlesConfig = JSON.parse(jsonContent);
                    console.log('JSON cargado desde Android:', this.puzzlesConfig);
                } else {
                    throw new Error('No se pudo cargar el JSON desde Android');
                }
            } else {
                // Fallback para web normal
                console.log('Interfaz Android no disponible, cargando desde servidor web...');
                const response = await fetch('puzzles_config.json');
                if (!response.ok) {
                    throw new Error(`Error al cargar JSON: ${response.status}`);
                }
                this.puzzlesConfig = await response.json();
                console.log('JSON cargado desde servidor web:', this.puzzlesConfig);
            }
            
            // Convertir datos del JSON al formato esperado
            this.worldsData = {};
            let worldIndex = 1;
            console.log('Procesando mundos del JSON:', Object.keys(this.puzzlesConfig.worlds));
            for (const [worldId, worldData] of Object.entries(this.puzzlesConfig.worlds)) {
                this.worldsData[worldIndex] = {
                    name: worldData.name,
                    emoji: worldData.emoji,
                    color: `world-${worldIndex}`,
                    colorPalette: worldData.colorPalette,
                    description: 'Descubre los secretos de este mundo',
                    puzzles: worldData.puzzles.map(puzzle => ({
                        name: puzzle.name,
                        country: puzzle.country,
                        curiosity: puzzle.curiosity,
                        pieces: puzzle.pieces,
                        gridSize: puzzle.gridSize,
                        magnetStrength: puzzle.magnetStrength
                    }))
                };
                worldIndex++;
            }
            
            console.log('Configuración de puzzles cargada:', this.worldsData);
            console.log('Total de mundos cargados:', Object.keys(this.worldsData).length);
        } catch (error) {
            console.error('Error cargando configuración:', error);
            
            // Fallback: crear configuración básica si no se puede cargar el JSON
            console.log('Usando configuración de fallback...');
            this.puzzlesConfig = {
                worlds: {
                    mundo1: { name: "Mundo 1", emoji: "🌍", colorPalette: { background: "#4A90E2", cardBack: "#E8F4FD", cardBorder: "#4A90E2", primary: "#4A90E2" }, puzzles: Array.from({length: 15}, (_, i) => ({ name: `Puzzle ${i + 1}`, pieces: 4 + i })) },
                    mundo2: { name: "Mundo 2", emoji: "🏔️", colorPalette: { background: "#8B4513", cardBack: "#F5E6D3", cardBorder: "#8B4513", primary: "#8B4513" }, puzzles: Array.from({length: 15}, (_, i) => ({ name: `Puzzle ${i + 1}`, pieces: 4 + i })) },
                    mundo3: { name: "Mundo 3", emoji: "🏖️", colorPalette: { background: "#FF6B6B", cardBack: "#FFE0E0", cardBorder: "#FF6B6B", primary: "#FF6B6B" }, puzzles: Array.from({length: 15}, (_, i) => ({ name: `Puzzle ${i + 1}`, pieces: 4 + i })) },
                    mundo4: { name: "Mundo 4", emoji: "🏜️", colorPalette: { background: "#D2691E", cardBack: "#F5DEB3", cardBorder: "#D2691E", primary: "#D2691E" }, puzzles: Array.from({length: 15}, (_, i) => ({ name: `Puzzle ${i + 1}`, pieces: 4 + i })) },
                    mundo5: { name: "Mundo 5", emoji: "🌋", colorPalette: { background: "#DC143C", cardBack: "#FFB6C1", cardBorder: "#DC143C", primary: "#DC143C" }, puzzles: Array.from({length: 15}, (_, i) => ({ name: `Puzzle ${i + 1}`, pieces: 4 + i })) },
                    mundo6: { name: "Mundo 6", emoji: "🏞️", colorPalette: { background: "#228B22", cardBack: "#E0FFE0", cardBorder: "#228B22", primary: "#228B22" }, puzzles: Array.from({length: 15}, (_, i) => ({ name: `Puzzle ${i + 1}`, pieces: 4 + i })) },
                    mundo7: { name: "Mundo 7", emoji: "🏰", colorPalette: { background: "#800080", cardBack: "#E6E6FA", cardBorder: "#800080", primary: "#800080" }, puzzles: Array.from({length: 15}, (_, i) => ({ name: `Puzzle ${i + 1}`, pieces: 4 + i })) },
                    mundo8: { name: "Mundo 8", emoji: "🏔️", colorPalette: { background: "#4682B4", cardBack: "#E0F6FF", cardBorder: "#4682B4", primary: "#4682B4" }, puzzles: Array.from({length: 15}, (_, i) => ({ name: `Puzzle ${i + 1}`, pieces: 4 + i })) },
                    mundo9: { name: "Mundo 9", emoji: "🌊", colorPalette: { background: "#20B2AA", cardBack: "#E0FFFF", cardBorder: "#20B2AA", primary: "#20B2AA" }, puzzles: Array.from({length: 15}, (_, i) => ({ name: `Puzzle ${i + 1}`, pieces: 4 + i })) },
                    mundo10: { name: "Mundo 10", emoji: "🚀", colorPalette: { background: "#2F4F4F", cardBack: "#F0F8FF", cardBorder: "#2F4F4F", primary: "#2F4F4F" }, puzzles: Array.from({length: 15}, (_, i) => ({ name: `Puzzle ${i + 1}`, pieces: 4 + i })) }
                }
            };
            
            // Convertir datos del JSON al formato esperado
            this.worldsData = {};
            let worldIndex = 1;
            for (const [worldId, worldData] of Object.entries(this.puzzlesConfig.worlds)) {
                this.worldsData[worldIndex] = {
                    name: worldData.name,
                    emoji: worldData.emoji,
                    color: `world-${worldIndex}`,
                    colorPalette: worldData.colorPalette,
                    description: 'Descubre los secretos de este mundo',
                    puzzles: worldData.puzzles.map(puzzle => ({
                        name: puzzle.name,
                        country: puzzle.country,
                        curiosity: puzzle.curiosity,
                        pieces: puzzle.pieces,
                        gridSize: puzzle.gridSize,
                        magnetStrength: puzzle.magnetStrength
                    }))
                };
                worldIndex++;
            }
            
            console.log('Configuración de fallback creada:', this.worldsData);
        }
    }

    // ===== AUDIO =====
    initAudio() {
        try {
            // Crear elementos de audio con archivos MP3 reales
            this.audio.background = new Audio('audio/background.mp3');
            this.audio.background.volume = 0.2;
            this.audio.background.loop = true;
            this.audio.background.preload = 'auto';
            
            this.audio.move = new Audio('audio/move.mp3');
            this.audio.move.volume = 0.3;
            this.audio.move.preload = 'auto';
            
            this.audio.complete = new Audio('audio/complete.mp3');
            this.audio.complete.volume = 0.7;
            this.audio.complete.preload = 'auto';
            
            // ACTIVAR AUDIO POR DEFECTO
            console.log('🔊 Activando audio por defecto...');
            this.state.audioEnabled = true;
            
            // Aplicar configuración de audio
            this.updateAudioSettings();
            
            // Configurar activación de audio en primera interacción
            this.setupAudioActivation();
            
        } catch (error) {
            console.warn('Error inicializando audio:', error);
        }
    }

    setupAudioActivation() {
        // Función para activar el audio en la primera interacción
        const activateAudio = () => {
            if (this.state.audioEnabled) {
                // Marcar que el audio ha sido activado
                this.audioActivated = true;
                // Intentar reproducir música de fondo para activar el contexto de audio
                this.startBackgroundMusic();
            }
            // Remover los event listeners después de la primera activación
            document.removeEventListener('click', activateAudio);
            document.removeEventListener('touchstart', activateAudio);
            document.removeEventListener('keydown', activateAudio);
        };
        
        // Añadir event listeners para activar el audio
        document.addEventListener('click', activateAudio);
        document.addEventListener('touchstart', activateAudio);
        document.addEventListener('keydown', activateAudio);
    }

    playSound(soundName) {
        if (!this.state.audioEnabled) return;
        
        try {
            if (this.audio[soundName]) {
                this.audio[soundName].currentTime = 0;
                this.audio[soundName].play().catch(e => {
                    console.warn('No se pudo reproducir sonido:', e);
                });
            }
        } catch (error) {
            console.warn('Error reproduciendo sonido:', error);
        }
    }

    updateAudioSettings() {
        // Aplicar configuración de audio a todos los elementos
        Object.values(this.audio).forEach(audio => {
            if (audio) {
                audio.muted = !this.state.audioEnabled;
            }
        });
    }

    toggleAudio() {
        console.log('🔊 toggleAudio() llamado - Estado actual:', this.state.audioEnabled);
        this.state.audioEnabled = !this.state.audioEnabled;
        console.log('🔊 Nuevo estado de audio:', this.state.audioEnabled);
        
        this.updateAudioSettings();
        this.state.saveProgress();
        
        // Actualizar el toggle en la UI
        const soundToggle = document.getElementById('sound-toggle');
        if (soundToggle) {
            soundToggle.checked = this.state.audioEnabled;
        }
        
        // Actualizar estado visual del botón flotante
        this.updateSoundButtonState();
        
        // Si se activa el audio, iniciar música de fondo inmediatamente
        if (this.state.audioEnabled) {
            console.log('🔊 Activando audio y música de fondo...');
            this.audioActivated = true; // Asegurar que el audio esté activado
            this.startBackgroundMusic();
        } else {
            console.log('🔊 Desactivando audio...');
            this.stopBackgroundMusic();
        }
    }

    startBackgroundMusic() {
        console.log('🎵 startBackgroundMusic() llamado');
        console.log('🎵 audioEnabled:', this.state.audioEnabled);
        console.log('🎵 audio.background existe:', !!this.audio.background);
        console.log('🎵 audioActivated:', this.audioActivated);
        
        if (this.state.audioEnabled && this.audio.background) {
            console.log('🎵 Iniciando reproducción de música...');
            // Evitar errores de AbortError pausando primero
            this.audio.background.pause();
            this.audio.background.currentTime = 0;
            
            // Pequeño delay para evitar conflictos
            setTimeout(() => {
                if (this.state.audioEnabled) {
                    console.log('🎵 Intentando reproducir música...');
                    this.audio.background.play().then(() => {
                        console.log('✅ Música de fondo iniciada correctamente');
                    }).catch(e => {
                        // Solo mostrar errores que no sean AbortError
                        if (e.name !== 'AbortError') {
                            console.warn('❌ No se pudo iniciar música de fondo:', e);
                        } else {
                            console.log('⚠️ AbortError (normal):', e.message);
                        }
                    });
                } else {
                    console.log('🎵 Audio desactivado, no reproduciendo');
                }
            }, 100);
        } else {
            console.log('🎵 Condiciones no cumplidas para reproducir música');
        }
    }

    stopBackgroundMusic() {
        if (this.audio.background) {
            this.audio.background.pause();
            this.audio.background.currentTime = 0;
        }
    }

    toggleBackgroundMusic() {
        if (this.state.audioEnabled) {
            this.state.audioEnabled = false;
            this.stopBackgroundMusic();
            console.log('Música desactivada');
        } else {
            this.state.audioEnabled = true;
            this.audioActivated = true;
            
            // Asegurar que el contexto de audio esté activo
            if (this.audio.background) {
                this.audio.background.play().then(() => {
                    console.log('Música activada y reproduciéndose');
                }).catch(e => {
                    console.warn('Error al reproducir música:', e);
                    // Intentar activar el contexto de audio
                    this.audio.background.load();
                    setTimeout(() => {
                        this.audio.background.play().catch(console.warn);
                    }, 100);
                });
            }
            console.log('Música activada');
        }
        this.state.saveProgress();
        
        // Actualizar estado visual del botón
        this.updateSoundButtonState();
    }
    
    updateSoundButtonState() {
        const soundBtn = document.getElementById('floating-sound-btn');
        if (soundBtn) {
            if (this.state.audioEnabled) {
                soundBtn.classList.remove('disabled');
            } else {
                soundBtn.classList.add('disabled');
            }
        }
    }

    handleBackgroundMusic(screenName) {
        // La música de fondo debe reproducirse en todas las pantallas si está habilitada
        // Solo intentar reproducir si el audio ya ha sido activado por el usuario
        if (this.audioActivated && this.state.audioEnabled) {
            this.startBackgroundMusic();
        }
    }

    // ===== AUTENTICACIÓN =====
    async checkAuth() {
        // Modo offline - sin autenticación por ahora
        console.log('Modo offline activado - sin autenticación');
        this.state.isLoggedIn = false;
    }

    async tryAutoLogin() {
        // Modo offline - sin auto-login
        console.log('Modo offline - sin auto-login');
    }

    mergeProgress(serverData) {
        const localProgress = this.state.getLocalProgress();
        
        // Usar el progreso más avanzado
        this.state.currentWorld = Math.max(serverData.currentWorld || 1, localProgress.currentWorld);
        this.state.currentLevel = Math.max(serverData.currentLevel || 1, localProgress.currentLevel);
        this.state.totalTime = Math.max(serverData.totalTime || 0, localProgress.totalTime);
        
        // Combinar niveles completados
        const serverCompleted = new Set(serverData.completedLevels || []);
        const localCompleted = new Set(localProgress.completedLevels);
        this.state.completedLevels = new Set([...serverCompleted, ...localCompleted]);
        
        this.state.saveProgress();
    }

    // ===== NAVEGACIÓN ENTRE PANTALLAS =====
    showScreen(screenName) {
        // Ocultar todas las pantallas
        const screens = document.querySelectorAll('.screen');
        screens.forEach(screen => {
            screen.style.display = 'none';
        });
        
        // Mostrar pantalla solicitada
        const targetScreen = document.getElementById(`${screenName}-screen`);
        if (targetScreen) {
            targetScreen.style.display = 'flex';
            this.currentScreen = screenName;
        }
        
        // Mostrar/ocultar botones específicos según la pantalla
        const shuffleBtn = document.getElementById('menu-shuffle');
        const hintBtn = document.getElementById('menu-hint');
        const previewBtn = document.getElementById('menu-preview');
        const levelsBtn = document.getElementById('menu-levels');
        
        if (shuffleBtn) {
            shuffleBtn.style.display = screenName === 'puzzle' ? 'flex' : 'none';
        }
        
        if (hintBtn) {
            hintBtn.style.display = screenName === 'puzzle' ? 'flex' : 'none';
        }
        
        if (previewBtn) {
            previewBtn.style.display = screenName === 'puzzle' ? 'flex' : 'none';
        }
        
        if (levelsBtn) {
            levelsBtn.style.display = (screenName === 'puzzle' || screenName === 'levels') ? 'flex' : 'none';
        }
        
        // Aplicar colores de mundo si es necesario
        if (screenName === 'worlds' || screenName === 'levels' || screenName === 'puzzle' || screenName === 'completed') {
            this.applyWorldColors();
        } else {
            document.body.className = '';
            document.body.style.background = '';
        }
        
        // Controlar música de fondo según la pantalla
        this.handleBackgroundMusic(screenName);
    }

    applyWorldColors(worldId = null) {
        // Usar el mundo especificado o el mundo actual
        const targetWorld = worldId || this.state.currentWorld;
        const worldData = this.worldsData[targetWorld];
        
        if (!worldData || !worldData.colorPalette) {
            console.warn('No se encontraron colores para el mundo:', targetWorld);
            return;
        }

        const colors = worldData.colorPalette;
        console.log('Aplicando colores del mundo:', targetWorld, 'Colores:', colors);
        
        // PANTALLA DE MUNDOS: NO cambiar fondo, solo aplicar colores a tarjetas
        if (this.currentScreen === 'worlds') {
            // La pantalla de mundos mantiene su fondo genérico
            // Los colores se aplican individualmente a cada tarjeta en renderWorlds()
            // Pero aplicamos las variables CSS para los botones flotantes
            document.documentElement.style.setProperty('--world-fondo', colors.fondo);
            document.documentElement.style.setProperty('--world-borde', colors.borde);
            document.documentElement.style.setProperty('--world-botones', colors.botones);
            document.documentElement.style.setProperty('--world-botones-border', colors.botones_border);
            return;
        }
        
        // PANTALLA DE NIVELES: Aplicar fondo del mundo específico
        if (this.currentScreen === 'levels') {
            const levelsScreen = document.getElementById('levels-screen');
            if (levelsScreen) {
                levelsScreen.style.background = colors.fondo;
            }
            // Aplicar variables CSS para los botones flotantes
            document.documentElement.style.setProperty('--world-fondo', colors.fondo);
            document.documentElement.style.setProperty('--world-borde', colors.borde);
            document.documentElement.style.setProperty('--world-botones', colors.botones);
            document.documentElement.style.setProperty('--world-botones-border', colors.botones_border);
            return;
        }
        
        // PANTALLA DE PUZZLE: Aplicar fondo del mundo específico
        if (this.currentScreen === 'puzzle') {
            const puzzleScreen = document.getElementById('puzzle-screen');
            if (puzzleScreen) {
                puzzleScreen.style.background = colors.fondo;
            }
            // Aplicar variables CSS para los botones flotantes
            document.documentElement.style.setProperty('--world-fondo', colors.fondo);
            document.documentElement.style.setProperty('--world-borde', colors.borde);
            document.documentElement.style.setProperty('--world-botones', colors.botones);
            document.documentElement.style.setProperty('--world-botones-border', colors.botones_border);
            return;
        }
        
        // Aplicar a la pantalla de completado
        const completedScreen = document.getElementById('completed-screen');
        if (completedScreen) {
            completedScreen.style.background = colors.fondo;
        }
        
        // Aplicar colores a las variables CSS para otros elementos
        document.documentElement.style.setProperty('--world-fondo', colors.fondo);
        document.documentElement.style.setProperty('--world-borde', colors.borde);
        document.documentElement.style.setProperty('--world-botones', colors.botones);
        document.documentElement.style.setProperty('--world-botones-border', colors.botones_border);
    }

    setupTopMenuBar() {
        // Botón de ajustes
        const settingsBtn = document.getElementById('menu-settings');
        if (settingsBtn) {
            settingsBtn.addEventListener('click', () => {
                this.showSettingsScreen();
            });
        }

        // Botón de mapa
        const mapBtn = document.getElementById('menu-map');
        if (mapBtn) {
            mapBtn.addEventListener('click', () => {
                this.showWorldsScreen();
            });
        }

        // Botón de sorpréndeme
        const surpriseBtn = document.getElementById('menu-surprise');
        if (surpriseBtn) {
            surpriseBtn.addEventListener('click', () => {
                this.surpriseMeFromAllWorlds();
            });
        }

        // Botón de niveles (visible en pantalla de puzzles y niveles)
        const levelsBtn = document.getElementById('menu-levels');
        if (levelsBtn) {
            levelsBtn.addEventListener('click', () => {
                this.showLevelsScreen(this.state.currentWorld);
            });
        }

        // Botón de mezclar (solo visible en pantalla de puzzles)
        const shuffleBtn = document.getElementById('menu-shuffle');
        if (shuffleBtn) {
            shuffleBtn.addEventListener('click', () => {
                this.shuffleCurrentPuzzle();
            });
        }

        // Botón de pista (solo visible en pantalla de puzzles)
        const hintBtn = document.getElementById('menu-hint');
        if (hintBtn) {
            hintBtn.addEventListener('click', () => {
                this.showHint();
            });
        }

        // Botón de vista previa
        const previewBtn = document.getElementById('menu-preview');
        if (previewBtn) {
            previewBtn.addEventListener('click', () => {
                this.showPuzzlePreview();
            });
        }

        // ===== EVENT LISTENERS DE PÁGINA DE INICIO =====
        this.setupHomeEvents();
    }

    setupHomeEvents() {
        // Botón "Jugar ahora"
        const playNowBtn = document.getElementById('play-now-btn');
        if (playNowBtn) {
            playNowBtn.addEventListener('click', () => {
                this.playNow();
            });
        }

        // Botón "Explorar mundos"
        const exploreWorldsBtn = document.getElementById('explore-worlds-btn');
        if (exploreWorldsBtn) {
            exploreWorldsBtn.addEventListener('click', () => {
                this.showWorldsScreen();
            });
        }

        // Botón "Conéctate con Google"
        const googleLoginBtn = document.getElementById('google-login-btn');
        if (googleLoginBtn) {
            googleLoginBtn.addEventListener('click', () => {
                this.showAuthModal('login');
            });
        }

        // Botón ROJO "GOOGLE" - Login directo
        const googleRedBtn = document.getElementById('google-red-btn');
        if (googleRedBtn) {
            googleRedBtn.addEventListener('click', () => {
                if (typeof Android !== 'undefined') {
                    // Login directo sin ventana intermedia
                    this.performDirectGoogleLogin();
                } else {
                    console.log('Android no disponible');
                }
            });
        }

        // Botón de login con nick
        const nickLoginBtn = document.getElementById('nick-login-btn');
        const nickInput = document.getElementById('nick-input');
        if (nickLoginBtn && nickInput) {
            nickLoginBtn.addEventListener('click', () => {
                const nick = nickInput.value.trim();
                if (nick) {
                    this.performNickLogin(nick);
                } else {
                    this.showTemporaryMessage('Por favor, introduce tu nick');
                }
            });

            // Permitir login con Enter
            nickInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    const nick = nickInput.value.trim();
                    if (nick) {
                        this.performNickLogin(nick);
                    }
                }
            });
        }
    }

    // Login directo de Google sin ventana intermedia
    performDirectGoogleLogin() {
        console.log('🚀 Iniciando login directo de Google...');
        
        // Mostrar indicador de carga
        this.showLoadingMessage('Conectando con Google...');
        
        // Llamar directamente al método de login de Android
        if (typeof Android !== 'undefined' && Android.openLogin) {
            Android.openLogin();
        } else {
            this.hideLoadingMessage();
            console.error('❌ Android no disponible para login');
        }
    }

    // Login con nick existente
    performNickLogin(nick) {
        console.log('🔑 Iniciando login con nick:', nick);
        
        // Mostrar indicador de carga
        this.showLoadingMessage(`Conectando como ${nick}...`);
        
        // Llamar al método real de Android para login con nick
        if (typeof Android !== 'undefined' && Android.loginWithNick) {
            console.log('✅ Llamando a Android.loginWithNick con:', nick);
            Android.loginWithNick(nick);
            
            // Timeout de 15 segundos para consulta real a Firebase
            setTimeout(() => {
                if (this.isLoading) {
                    this.hideLoadingMessage();
                    this.showTemporaryMessage('Error: Timeout al conectar con Firebase. Verifica tu conexión.');
                    console.error('❌ Timeout en login real con Firebase');
                }
            }, 15000);
        } else {
            this.hideLoadingMessage();
            console.error('❌ Android.loginWithNick no disponible');
            this.showTemporaryMessage('Error: Método de login no disponible');
        }
    }

    // Auto-detectar usuario al iniciar
    async checkUserStatus() {
        console.log('🔍 Verificando estado del usuario...');
        
        if (typeof Android !== 'undefined' && Android.getUser) {
            try {
                const userData = Android.getUser();
                console.log('📱 Respuesta de Android.getUser():', userData);
                
                if (userData === 'null') {
                    console.log('ℹ️ Usuario no logueado');
                    return false;
                } else if (userData === 'loading') {
                    console.log('⏳ Cargando datos del usuario...');
                    // Los datos se cargarán via callback onUserLoaded
                    return false;
                } else if (userData && userData !== 'null') {
                    const user = JSON.parse(userData);
                    console.log('✅ Usuario detectado:', user);
                    this.showUserWelcome(user);
                    return true;
                }
            } catch (error) {
                console.log('ℹ️ Usuario no logueado o error:', error);
            }
        }
        
        return false;
    }

    // Mostrar usuario invitado
    showGuestUser() {
        console.log('👤 Mostrando usuario invitado');
        
        // Solo mostrar invitado si no hay usuario logueado
        if (!this.isLoggedIn) {
            const floatingUserNick = document.getElementById('floating-user-nick');
            if (floatingUserNick && floatingUserNick.style.display === 'none') {
                floatingUserNick.textContent = '👤 Invitado';
                floatingUserNick.style.display = 'flex';
                floatingUserNick.title = 'Modo invitado - Haz login para guardar tu progreso';
            }
        }
    }

    // Mostrar bienvenida del usuario
    showUserWelcome(user) {
        console.log('👋 Mostrando bienvenida para:', user.nick);
        
        // Marcar como logueado
        this.isLoggedIn = true;
        this.currentUser = user;
        
        // RESTAURAR DATOS DEL JUEGO DESDE FIREBASE
        this.restoreGameDataFromFirebase(user);
        
        // SINCRONIZAR PROGRESO LOCAL CON FIREBASE
        this.syncLocalProgressWithFirebase(user);
        
        // Mostrar nick en la barra flotante
        const floatingUserNick = document.getElementById('floating-user-nick');
        if (floatingUserNick) {
            floatingUserNick.textContent = `👤 ${user.nick}`;
            floatingUserNick.style.display = 'flex';
            floatingUserNick.title = `Conectado como ${user.nick} - ${user.puzzlesCompletados} puzzles`;
        }
        
        // Actualizar botón de login con datos del usuario (si existe)
        const loginBtn = document.getElementById('menu-login');
        if (loginBtn) {
            loginBtn.innerHTML = '🚪';
            loginBtn.title = `Cerrar sesión (${user.nick})`;
            
            // Cambiar funcionalidad a logout
            loginBtn.onclick = () => this.logout();
        }
        
        // Restaurar datos del juego si están disponibles
        if (user.completedLevels) {
            try {
                // completedLevels ya es un array JavaScript, no necesita parsing
                const completedLevels = Array.isArray(user.completedLevels) ? user.completedLevels : JSON.parse(user.completedLevels);
                this.state.completedLevels = new Set(completedLevels);
                console.log('✅ Niveles completados restaurados:', completedLevels.length);
            } catch (error) {
                console.log('Error al parsear niveles completados:', error);
            }
        }
        
        if (user.totalTime) {
            this.state.totalTime = user.totalTime;
            console.log('✅ Tiempo total restaurado:', user.totalTime);
        }
        
        if (user.audioEnabled !== undefined) {
            this.state.audioEnabled = user.audioEnabled;
            console.log('✅ Configuración de audio restaurada:', user.audioEnabled);
        }
        
        if (user.currentWorld) {
            this.state.currentWorld = user.currentWorld;
            console.log('✅ Mundo actual restaurado:', user.currentWorld);
        }
        
        if (user.currentLevel) {
            this.state.currentLevel = user.currentLevel;
            console.log('✅ Nivel actual restaurado:', user.currentLevel);
        }
        
        // Guardar progreso localmente con los datos restaurados
        this.state.saveProgress();
        
        // Actualizar UI con los datos restaurados
        // this.updateUI(); // Método no existe, comentado
        
        // Mostrar mensaje de bienvenida
        this.showTemporaryMessage(`¡Bienvenido de nuevo, ${user.nick}! 🎉`);
    }

    // Cerrar sesión
    logout() {
        console.log('🚪 Cerrando sesión...');
        
        if (typeof Android !== 'undefined' && Android.logout) {
            Android.logout();
        } else {
            // Si no hay Android, cerrar sesión localmente
            this.handleLogoutComplete();
        }
    }

    // Manejar logout completado
    handleLogoutComplete() {
        // Limpiar estado de usuario
        this.isLoggedIn = false;
        this.currentUser = null;
        
        // Ocultar nick del usuario en la barra flotante
        const floatingUserNick = document.getElementById('floating-user-nick');
        if (floatingUserNick) {
            floatingUserNick.style.display = 'none';
        }
        
        // Restaurar botón de login (si existe)
        const loginBtn = document.getElementById('menu-login');
        if (loginBtn) {
            loginBtn.innerHTML = '👤';
            loginBtn.title = 'Iniciar Sesión';
            loginBtn.onclick = () => this.performDirectGoogleLogin();
        }
        
        this.showTemporaryMessage('Sesión cerrada correctamente');
    }

    // Manejar errores de login
    onLoginError(errorMessage) {
        console.error('❌ Error de login:', errorMessage);
        this.hideLoadingMessage();
        this.showTemporaryMessage(`Error: ${errorMessage}`);
    }

    // Manejar datos de usuario cargados desde Firebase
    onUserLoaded(userData) {
        console.log('📥 Datos de usuario recibidos desde Firebase:', userData);
        console.log('📥 Tipo de userData:', typeof userData);
        console.log('📥 userData como string:', JSON.stringify(userData));
        
        this.hideLoadingMessage();
        
        try {
            // userData ya es un objeto JavaScript, no necesita parsing
            this.showUserWelcome(userData);
        } catch (error) {
            console.error('❌ Error en onUserLoaded:', error);
            console.error('❌ userData que causó el error:', userData);
        }
    }

    // Restaurar datos del juego desde Firebase
    restoreGameDataFromFirebase(user) {
        console.log('🔄 Restaurando datos del juego desde Firebase...');
        
        // Restaurar niveles completados
        if (user.completedLevels) {
            try {
                // completedLevels ya es un array JavaScript, no necesita parsing
                const firebaseLevels = Array.isArray(user.completedLevels) ? user.completedLevels : JSON.parse(user.completedLevels);
                console.log('📊 Niveles desde Firebase:', firebaseLevels);
                
                // Convertir array a Set y actualizar el estado
                this.state.completedLevels = new Set(firebaseLevels);
                console.log('✅ Niveles restaurados:', this.state.completedLevels.size);
            } catch (e) {
                console.warn('Error parseando completedLevels:', e);
            }
        }
        
        // Restaurar tiempo total
        if (user.totalTime) {
            this.state.totalTime = user.totalTime;
            console.log('⏱️ Tiempo total restaurado:', this.state.totalTime);
        }
        
        // Restaurar configuración de audio
        if (user.audioEnabled !== undefined) {
            this.state.audioEnabled = user.audioEnabled;
            console.log('🔊 Audio restaurado:', this.state.audioEnabled);
        }
        
        // Restaurar mundo y nivel actual
        if (user.currentWorld) {
            this.state.currentWorld = user.currentWorld;
            console.log('🌍 Mundo actual restaurado:', this.state.currentWorld);
        }
        
        if (user.currentLevel) {
            this.state.currentLevel = user.currentLevel;
            console.log('🎯 Nivel actual restaurado:', this.state.currentLevel);
        }
        
        // Actualizar la UI con los datos restaurados
        this.updateUIWithRestoredData();
        
        console.log('✅ Datos del juego restaurados desde Firebase');
    }
    
    // Actualizar UI con datos restaurados
    updateUIWithRestoredData() {
        console.log('🎨 Actualizando UI con datos restaurados...');
        
        // Actualizar botón de audio
        this.updateSoundButtonState();
        
        // Si estamos en la pantalla de mundos, re-renderizar
        if (this.currentScreen === 'worlds') {
            console.log('🔄 Re-renderizando mundos con datos restaurados...');
            this.renderWorlds();
        }
        
        // Si estamos en la pantalla de niveles, re-renderizar
        if (this.currentScreen === 'levels') {
            console.log('🔄 Re-renderizando niveles con datos restaurados...');
            this.showLevelsScreen(this.state.currentWorld);
        }
        
        console.log('✅ UI actualizada con datos restaurados');
    }

    // Sincronizar progreso local con Firebase
    syncLocalProgressWithFirebase(user) {
        console.log('🔄 Sincronizando progreso local con Firebase...');
        
        // Obtener progreso local actual
        const localCompletedLevels = this.state.completedLevels || [];
        // Convertir Set a Array si es necesario
        const localLevelsArray = Array.isArray(localCompletedLevels) ? localCompletedLevels : Array.from(localCompletedLevels);
        const localPuzzlesCompletados = localLevelsArray.length;
        const localTotalTime = this.state.totalTime || 0;
        
        console.log('📊 Progreso local:', {
            puzzlesCompletados: localPuzzlesCompletados,
            totalTime: localTotalTime,
            completedLevels: localLevelsArray
        });
        
        console.log('📊 Progreso Firebase:', {
            puzzlesCompletados: user.puzzlesCompletados || 0,
            totalTime: user.totalTime || 0,
            completedLevels: user.completedLevels || "[]"
        });
        
        // Determinar qué progreso usar (el mayor)
        let finalPuzzlesCompletados = Math.max(localPuzzlesCompletados, user.puzzlesCompletados || 0);
        let finalTotalTime = Math.max(localTotalTime, user.totalTime || 0);
        
        // Para completedLevels, combinar ambos arrays
        let firebaseCompletedLevels = [];
        try {
            // completedLevels ya es un array JavaScript, no necesita parsing
            firebaseCompletedLevels = Array.isArray(user.completedLevels) ? user.completedLevels : JSON.parse(user.completedLevels || "[]");
        } catch (e) {
            console.warn('Error parseando completedLevels de Firebase:', e);
            firebaseCompletedLevels = [];
        }
        
        // Combinar niveles completados (sin duplicados)
        const combinedLevels = [...new Set([...localLevelsArray, ...firebaseCompletedLevels])];
        
        console.log('🔄 Progreso final combinado:', {
            puzzlesCompletados: finalPuzzlesCompletados,
            totalTime: finalTotalTime,
            completedLevels: combinedLevels
        });
        
        // Actualizar el estado local con el progreso combinado
        this.state.completedLevels = combinedLevels;
        this.state.totalTime = finalTotalTime;
        
        // Guardar progreso combinado en Firebase
        if (typeof Android !== 'undefined' && Android.saveGameProgress) {
            const progressData = {
                completedLevels: JSON.stringify(combinedLevels),
                totalTime: finalTotalTime,
                audioEnabled: this.state.audioEnabled,
                currentWorld: this.state.currentWorld,
                currentLevel: this.state.currentLevel
            };
            
            console.log('💾 Guardando progreso combinado en Firebase:', progressData);
            console.log('🔍 Verificando Android.saveGameProgress...');
            console.log('🔍 typeof Android:', typeof Android);
            console.log('🔍 Android object:', Android);
            console.log('🔍 Android.saveGameProgress:', Android?.saveGameProgress);
            
            if (Android.saveGameProgress) {
                console.log('💾 Llamando Android.saveGameProgress...');
                const result = Android.saveGameProgress(JSON.stringify(progressData));
                console.log('💾 Resultado de saveGameProgress:', result);
            } else {
                console.warn('⚠️ Android.saveGameProgress no disponible');
                console.warn('⚠️ Métodos disponibles en Android:', Object.keys(Android || {}));
            }
        }
        
        // Actualizar la UI con el progreso combinado
        this.updateUIWithCombinedProgress(finalPuzzlesCompletados, finalTotalTime);
        
        console.log('✅ Sincronización completada');
    }

    // Actualizar UI con progreso combinado
    updateUIWithCombinedProgress(puzzlesCompletados, totalTime) {
        // Actualizar el título del nick con el progreso real
        const floatingUserNick = document.getElementById('floating-user-nick');
        if (floatingUserNick) {
            floatingUserNick.title = `Conectado como ${this.currentUser.nick} - ${puzzlesCompletados} puzzles`;
        }
        
        // Actualizar el progreso en la UI si estamos en la pantalla de mundos
        if (this.currentScreen === 'worlds') {
            this.renderWorlds();
        }
        
        console.log('🎨 UI actualizada con progreso combinado:', { puzzlesCompletados, totalTime });
    }

    // Mostrar mensaje temporal
    showTemporaryMessage(message) {
        // Crear o actualizar mensaje temporal
        let messageEl = document.getElementById('temp-message');
        if (!messageEl) {
            messageEl = document.createElement('div');
            messageEl.id = 'temp-message';
            messageEl.style.cssText = `
                position: fixed;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                background: rgba(0,0,0,0.8);
                color: white;
                padding: 15px 25px;
                border-radius: 10px;
                z-index: 10000;
                font-size: 16px;
                text-align: center;
            `;
            document.body.appendChild(messageEl);
        }
        
        messageEl.textContent = message;
        
        // Ocultar después de 3 segundos
        setTimeout(() => {
            if (messageEl && messageEl.parentNode) {
                messageEl.parentNode.removeChild(messageEl);
            }
        }, 3000);
    }

    // Mostrar mensaje de carga
    showLoadingMessage(message) {
        this.isLoading = true;
        
        let loadingEl = document.getElementById('loading-message');
        if (!loadingEl) {
            loadingEl = document.createElement('div');
            loadingEl.id = 'loading-message';
            loadingEl.style.cssText = `
                position: fixed;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                background: rgba(0,0,0,0.9);
                color: white;
                padding: 20px 30px;
                border-radius: 15px;
                z-index: 10001;
                font-size: 18px;
                text-align: center;
            `;
            document.body.appendChild(loadingEl);
        }
        
        loadingEl.innerHTML = `
            <div style="margin-bottom: 10px;">⏳</div>
            <div>${message}</div>
        `;
    }

    // Ocultar mensaje de carga
    hideLoadingMessage() {
        this.isLoading = false;
        
        const loadingEl = document.getElementById('loading-message');
        if (loadingEl && loadingEl.parentNode) {
            loadingEl.parentNode.removeChild(loadingEl);
        }
    }

    playNow() {
        // Lógica para "Jugar ahora" - ir al primer puzzle disponible
        const firstAvailableLevel = this.state.getFirstAvailableLevel();
        if (firstAvailableLevel) {
            this.showPuzzleScreen(firstAvailableLevel.world, firstAvailableLevel.level);
        } else {
            // Si no hay niveles disponibles, mostrar mundos
            this.showWorldsScreen();
        }
    }

    handleStartup() {
        // Verificar si es la primera vez
        const isFirstTime = this.state.completedLevels.size === 0 && 
                           this.state.currentWorld === 1 && 
                           this.state.currentLevel === 1;
        
        if (isFirstTime) {
            // Primera vez: configurar valores por defecto
            this.state.currentWorld = 1;
            this.state.currentLevel = 1;
        } else {
            // Ya se había conectado: configurar el mundo donde estaba
            // Buscar el primer nivel no completado del mundo actual
            const firstIncompleteLevel = this.getFirstIncompleteLevel(this.state.currentWorld);
            if (firstIncompleteLevel) {
                this.state.currentLevel = firstIncompleteLevel;
            } else {
                // Si todos están completados, ir al nivel 1
                this.state.currentLevel = 1;
            }
        }
        
        // Aplicar colores del mundo actual
        this.applyWorldColors(this.state.currentWorld);
        
        // No mostrar pantalla automáticamente - la página de inicio se encargará
        console.log('Configuración de inicio completada. Mundo:', this.state.currentWorld, 'Nivel:', this.state.currentLevel);
    }

    showIntroScreen() {
        this.showScreen('intro');
        this.setupIntroEvents();
    }


    showSettingsScreen() {
        this.showScreen('settings');
        this.setupSettingsEvents();
    }


    setupSettingsEvents() {
        // Botón de cierre
        const closeBtn = document.getElementById('close-settings');
        if (closeBtn) {
            // Limpiar event listeners previos
            closeBtn.replaceWith(closeBtn.cloneNode(true));
            const newCloseBtn = document.getElementById('close-settings');
            
            newCloseBtn.addEventListener('click', () => {
                // Volver a la pantalla anterior
                if (this.currentScreen === 'settings') {
                    // Si veníamos de una pantalla específica, volver ahí
                    if (this.state.currentWorld && this.state.currentLevel) {
                        this.showLevelsScreen(this.state.currentWorld);
                    } else {
                        this.showWorldsScreen();
                    }
                }
            });
        }

        // Toggle de sonido
        const soundToggle = document.getElementById('sound-toggle');
        if (soundToggle) {
            // Limpiar event listeners previos
            soundToggle.replaceWith(soundToggle.cloneNode(true));
            const newSoundToggle = document.getElementById('sound-toggle');
            
            // Establecer el estado actual del toggle
            newSoundToggle.checked = this.state.audioEnabled;
            
            newSoundToggle.addEventListener('change', (e) => {
                this.toggleAudio();
            });
        }
    }


    getNextPendingPuzzle() {
        // Buscar el primer puzzle no completado del mundo actual
        for (let world = this.state.currentWorld; world <= GAME_CONFIG.totalWorlds; world++) {
            for (let level = 1; level <= GAME_CONFIG.levelsPerWorld; level++) {
                if (!this.state.isLevelCompleted(world, level)) {
                    return { world, level };
                }
            }
        }
        return null;
    }

    getFirstIncompleteLevel(world) {
        // Buscar el primer nivel no completado de un mundo específico
        for (let level = 1; level <= GAME_CONFIG.levelsPerWorld; level++) {
            if (!this.state.isLevelCompleted(world, level)) {
                return level;
            }
        }
        return null; // Todos los niveles están completados
    }

    shuffleCurrentPuzzle() {
        // Mezclar el puzzle actual (funcionalidad del botón de mezclar)
        if (!this.puzzle || !this.puzzleOrder) return;
        
        // Ocultar toast si existe
        this.hideCompletedToast();
        
        // Verificar si el puzzle está completado
        const isCompleted = this.state.isLevelCompleted(this.state.currentWorld, this.state.currentLevel);
        
        if (isCompleted) {
            // Si está completado, mezclar y reiniciar
            this.shuffleArray(this.puzzleOrder);
            
            // Marcar como no completado para que se pueda jugar de nuevo
            this.state.markLevelIncomplete(this.state.currentWorld, this.state.currentLevel);
            
            // Quitar la clase de completado del área del puzzle
            const puzzleArea = document.getElementById('puzzle-area');
            if (puzzleArea) {
                puzzleArea.classList.remove('puzzle-completed');
            }
            
            // Quitar la clase del contenedor del puzzle para mover el botón
            const puzzleScreen = document.getElementById('puzzle-screen');
            if (puzzleScreen) {
                puzzleScreen.classList.remove('puzzle-completed');
            }
            
            // Volver a imagen cortada y re-renderizar
            this.updatePuzzleToShuffled();
            
            // Reiniciar temporizador
            this.startTimer();
            
            // Mostrar pista de nuevo (ya está en la barra de menú)
            // No es necesario hacer nada aquí ya que el botón está siempre disponible
        } else {
            // Si no está completado, mezclar normalmente
            this.shuffleArray(this.puzzleOrder);
            // Obtener gridSize correcto del puzzle actual
            const worldData = this.worldsData[this.state.currentWorld];
            const puzzleData = worldData.puzzles[this.state.currentLevel - 1];
            const gridSize = Math.ceil(Math.sqrt(puzzleData.pieces));
            this.renderPuzzlePositions(gridSize, document.querySelector('.puzzle-board'));
        }
    }

    surpriseMeFromAllWorlds() {
        // Buscar un puzzle aleatorio pendiente de todos los mundos
        const pendingPuzzles = [];
        for (let world = 1; world <= GAME_CONFIG.totalWorlds; world++) {
            for (let level = 1; level <= GAME_CONFIG.levelsPerWorld; level++) {
                if (!this.state.isLevelCompleted(world, level)) {
                    pendingPuzzles.push({ world, level });
                }
            }
        }
        
        if (pendingPuzzles.length > 0) {
            const randomPuzzle = pendingPuzzles[Math.floor(Math.random() * pendingPuzzles.length)];
            this.showPuzzleScreen(randomPuzzle.world, randomPuzzle.level);
        } else {
            // Si todos están completados, ir a un puzzle aleatorio
            const randomWorld = Math.floor(Math.random() * GAME_CONFIG.totalWorlds) + 1;
            const randomLevel = Math.floor(Math.random() * GAME_CONFIG.levelsPerWorld) + 1;
            this.showPuzzleScreen(randomWorld, randomLevel);
        }
    }

    surpriseMeFromCurrentWorld() {
        // Buscar un puzzle aleatorio pendiente del mundo actual
        const pendingPuzzles = [];
        for (let level = 1; level <= GAME_CONFIG.levelsPerWorld; level++) {
            if (!this.state.isLevelCompleted(this.state.currentWorld, level)) {
                pendingPuzzles.push(level);
            }
        }
        
        if (pendingPuzzles.length > 0) {
            const randomLevel = pendingPuzzles[Math.floor(Math.random() * pendingPuzzles.length)];
            this.showPuzzleScreen(this.state.currentWorld, randomLevel);
        } else {
            // Si todos están completados, ir a un nivel aleatorio
            const randomLevel = Math.floor(Math.random() * GAME_CONFIG.levelsPerWorld) + 1;
            this.showPuzzleScreen(this.state.currentWorld, randomLevel);
        }
    }

    toggleSound(enabled) {
        // Implementar toggle de sonido
        console.log('Sonido:', enabled ? 'activado' : 'desactivado');
        // Aquí puedes implementar la lógica para activar/desactivar el sonido
    }

    showWorldsScreen() {
        this.showScreen('worlds');
        
        // Quitar clase del body para mostrar botones flotantes
        document.body.classList.remove('home-screen-active');
        
        // Aplicar colores del mundo actual
        this.applyWorldColors();
        
        // Ocultar toast si existe
        this.hideCompletedToast();
        
        this.renderWorlds();
        this.updateStats();
        this.setupWorldsEvents();
        
        // Mostrar banner en pantalla de mundos
        window.adMobManager.showBanner();
    }

    showLevelsScreen(world) {
        this.state.currentWorld = world;
        this.showScreen('levels');
        this.applyWorldColors(world); // Aplicar colores del mundo DESPUÉS de cambiar pantalla
        
        // Quitar clase del body para mostrar botones flotantes
        document.body.classList.remove('home-screen-active');
        
        // Asegurar que la barra de menú esté visible
        const topMenuBar = document.getElementById('top-menu-bar');
        if (topMenuBar) {
            topMenuBar.style.display = 'flex';
            console.log('🔧 Barra de menú mostrada en pantalla de niveles');
        }
        
        // Ocultar toast si existe
        this.hideCompletedToast();
        
        // Verificar que los datos estén cargados
        if (!this.worldsData || !this.worldsData[world]) {
            console.error('Datos del mundo no cargados:', world);
            return;
        }
        
        this.renderLevels();
        this.setupLevelsEvents();
    }

    setupLevelsEvents() {
        // Ya no hay botones específicos en la pantalla de niveles
        // Todo se maneja desde la barra de menú superior
    }

    showPuzzleScreen(world, level) {
        console.log(`Cambiando a mundo ${world}, nivel ${level}`);
        this.state.currentWorld = world;
        this.state.currentLevel = level;
        console.log(`Estado actualizado: mundo ${this.state.currentWorld}, nivel ${this.state.currentLevel}`);
        
        // Quitar clase del body para mostrar botones flotantes
        document.body.classList.remove('home-screen-active');
        this.showScreen('puzzle');
        this.applyWorldColors(world); // Aplicar colores del mundo DESPUÉS de cambiar pantalla
        
        // Verificar que los datos estén cargados
        if (!this.worldsData || !this.worldsData[world]) {
            console.error('Datos del mundo no cargados:', world);
            return;
        }
        
        this.startPuzzle();
        this.setupPuzzleEvents();
        
        // Ocultar banner durante el juego
        window.adMobManager.hideBanner();
    }

    showCompletedScreen() {
        // No cambiar de pantalla, solo mostrar el toast sobre el puzzle actual
        this.renderCompletedInfo();
        this.setupCompletedEvents();
    }

    // ===== PANTALLA DE INTRODUCCIÓN =====
    setupIntroEvents() {
        const startBtn = document.getElementById('start-game');
        const playerNameInput = document.getElementById('player-name');
        
        if (startBtn) {
            startBtn.addEventListener('click', () => {
                const name = playerNameInput.value.trim() || 'Explorador';
                this.state.playerName = name;
                this.state.saveProgress();
                this.showWorldsScreen();
            });
        }
        
        if (playerNameInput) {
            playerNameInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    startBtn.click();
                }
            });
        }
    }

    // ===== PANTALLA DE MUNDOS =====
    renderWorlds() {
        const worldsGrid = document.getElementById('worlds-grid');
        if (!worldsGrid) {
            console.error('No se encontró el contenedor worlds-grid');
            return;
        }
        
        console.log('Renderizando mundos. Total de mundos disponibles:', Object.keys(this.worldsData).length);
        console.log('Datos de mundos:', this.worldsData);
        
        worldsGrid.innerHTML = '';
        
        for (let world = 1; world <= GAME_CONFIG.totalWorlds; world++) {
            const worldData = this.worldsData[world];
            if (!worldData) {
                console.warn('No se encontraron datos para el mundo:', world);
                continue;
            }
            
            const progress = this.state.getWorldProgress(world);
            const isUnlocked = true; // Modo relax - todos los mundos desbloqueados
            
            const worldCard = document.createElement('div');
            worldCard.className = `world-card ${worldData.color} ${isUnlocked ? '' : 'locked'}`;
            worldCard.setAttribute('data-world-colors', 'true');
            
            // Aplicar colores específicos del mundo usando CSS variables
            if (worldData.colorPalette) {
                console.log('Aplicando colores a tarjeta del mundo:', world, worldData.colorPalette);
                
                // Usar los colores del JSON (que ahora serán bonitos)
                const colors = worldData.colorPalette;
                
                // Usar el color de fondo del mundo para la tarjeta
                worldCard.style.background = colors.fondo;
                worldCard.style.borderColor = colors.borde;
                
                // Aplicar colores usando CSS variables
                worldCard.style.setProperty('--world-card-bg', colors.fondo);
                worldCard.style.setProperty('--world-card-border', colors.borde);
                worldCard.style.setProperty('--world-progress-color', colors.botones);
            }
            
            const progressPercentage = Math.round((progress / GAME_CONFIG.levelsPerWorld) * 100);
            
            worldCard.innerHTML = `
                <h3>${worldData.name}</h3>
                <div class="world-middle-line">
                    <div class="world-progress">${progress}/${GAME_CONFIG.levelsPerWorld}</div>
                </div>
                <div class="world-progress-bar">
                    <div class="world-progress-fill" style="width: ${progressPercentage}%; background: var(--world-progress-color, #4A90E2)"></div>
                </div>
            `;
            
            if (isUnlocked) {
                worldCard.addEventListener('click', () => {
                    this.showLevelsScreen(world);
                });
            }
            
            worldsGrid.appendChild(worldCard);
        }
    }

    updateStats() {
        const totalTimeEl = document.getElementById('total-time');
        const completedPuzzlesEl = document.getElementById('completed-puzzles');
        
        if (totalTimeEl) {
            totalTimeEl.textContent = this.formatTime(this.state.totalTime);
        }
        
        if (completedPuzzlesEl) {
            completedPuzzlesEl.textContent = this.state.completedLevels.size;
        }

        // Actualizar botones flotantes
        this.updateFloatingButtons();
    }

    updateFloatingButtons() {
        const timeText = this.formatTime(this.state.totalTime);
        const puzzlesText = this.state.completedLevels.size.toString();

        // Actualizar elementos únicos
        const timeEl = document.getElementById('floating-time-text');
        if (timeEl) timeEl.textContent = timeText;

        const puzzlesEl = document.getElementById('floating-puzzles-text');
        if (puzzlesEl) puzzlesEl.textContent = puzzlesText;
    }

    setupWorldsEvents() {
        const surpriseBtn = document.getElementById('surprise-me');
        
        if (surpriseBtn) {
            surpriseBtn.addEventListener('click', () => {
                const randomLevel = this.state.getRandomPendingLevel();
                if (randomLevel) {
                    this.showPuzzleScreen(randomLevel.world, randomLevel.level);
                } else {
                    alert('¡Felicidades! Has completado todos los puzzles disponibles.');
                }
            });
        }
    }

    // ===== PANTALLA DE NIVELES =====
    renderLevels() {
        const levelsGrid = document.getElementById('levels-grid');
        const worldTitle = document.getElementById('current-world-title');
        const worldProgressFill = document.getElementById('world-progress-fill');
        const worldProgressText = document.getElementById('world-progress-text');
        
        if (!levelsGrid) return;
        
        const worldData = this.worldsData[this.state.currentWorld];
        if (!worldData) {
            console.error('Datos del mundo no encontrados:', this.state.currentWorld);
            return;
        }
        
        const progress = this.state.getWorldProgress(this.state.currentWorld);
        
        if (worldTitle) {
            worldTitle.textContent = worldData.name; // Quitar el emoji del título
        }
        
        if (worldProgressFill) {
            worldProgressFill.style.width = `${(progress / GAME_CONFIG.levelsPerWorld) * 100}%`;
        }
        
        if (worldProgressText) {
            worldProgressText.textContent = `${progress}/${GAME_CONFIG.levelsPerWorld}`;
        }
        
        levelsGrid.innerHTML = '';
        
        console.log(`Creando ${GAME_CONFIG.levelsPerWorld} niveles para el mundo ${this.state.currentWorld}`);
        
        for (let level = 1; level <= GAME_CONFIG.levelsPerWorld; level++) {
            const isCompleted = this.state.isLevelCompleted(this.state.currentWorld, level);
            const isUnlocked = this.state.isLevelUnlocked(this.state.currentWorld, level);
            const isCurrent = this.state.currentLevel === level;
            
            console.log(`Nivel ${level}: completado=${isCompleted}, desbloqueado=${isUnlocked}, actual=${isCurrent}`);
            
            const levelCard = document.createElement('div');
            
            // Determinar las clases CSS según el estado
            let cardClasses = 'level-card';
            if (isCompleted) {
                cardClasses += ' completed';
                if (isCurrent) {
                    cardClasses += ' completed-selected'; // Verde suave cuando está seleccionado
                }
            } else if (isCurrent) {
                cardClasses += ' current'; // Azul cuando está seleccionado y no completado
            }
            if (!isUnlocked) {
                cardClasses += ' locked';
            }
            
            levelCard.className = cardClasses;
            levelCard.textContent = level;
            
            if (isUnlocked) {
                levelCard.addEventListener('click', () => {
                    console.log(`Click en nivel ${level} del mundo ${this.state.currentWorld}`);
                    this.showPuzzleScreen(this.state.currentWorld, level);
                });
            }
            
            levelsGrid.appendChild(levelCard);
        }
        
        console.log(`Total de niveles creados: ${levelsGrid.children.length}`);
    }

    setupLevelsEvents() {
        // No hay eventos específicos para la pantalla de niveles
        // Los botones de navegación están en la barra de menú superior
    }

    // ===== PUZZLE =====
    startPuzzle() {
        const worldData = this.worldsData[this.state.currentWorld];
        if (!worldData) {
            console.error('Datos del mundo no encontrados:', this.state.currentWorld);
            return;
        }
        
        // Verificar que el nivel existe en el array de puzzles
        if (!worldData.puzzles || this.state.currentLevel > worldData.puzzles.length) {
            console.error('Nivel no encontrado:', this.state.currentLevel, 'Disponibles:', worldData.puzzles?.length || 0);
            return;
        }
        
        const placeData = worldData.puzzles[this.state.currentLevel - 1];
        if (!placeData) {
            console.error('Datos del puzzle no encontrados:', this.state.currentLevel);
            return;
        }
        
        // Actualizar título del puzzle: usar name y country del puzzle
        const puzzleTitle = document.getElementById('puzzle-title');
        if (puzzleTitle) {
            const composedTitle = `${placeData.name}, ${placeData.country}`;
            puzzleTitle.textContent = composedTitle;
        }
        
        // Verificar si el puzzle está completado
        const isCompleted = this.state.isLevelCompleted(this.state.currentWorld, this.state.currentLevel);
        
        // Gestionar la clase del contenedor del puzzle
        const puzzleScreen = document.getElementById('puzzle-screen');
        if (puzzleScreen) {
            if (isCompleted) {
                puzzleScreen.classList.add('puzzle-completed');
            } else {
                puzzleScreen.classList.remove('puzzle-completed');
            }
        }
        
        // Iniciar temporizador solo si no está completado
        if (!isCompleted) {
            this.startTimer();
        }
        
        // Iniciar música de fondo
        this.startBackgroundMusic();
        
        // Crear puzzle
        this.createPuzzle(isCompleted);
        if (window.puzzleResize) window.puzzleResize();
        
        // Configurar botones según el estado del puzzle
        this.setupPuzzleButtons(isCompleted);
        
        // Añadir indicador visual si está completado
        if (isCompleted) {
            const puzzleArea = document.querySelector('.puzzle-area');
            if (puzzleArea) {
                puzzleArea.classList.add('puzzle-completed');
            }
            // Mostrar toast para puzzles completados
            this.renderCompletedInfo();
        } else {
            const puzzleArea = document.querySelector('.puzzle-area');
            if (puzzleArea) {
                puzzleArea.classList.remove('puzzle-completed');
            }
            // Ocultar toast para puzzles no completados
            this.hideCompletedToast();
        }
    }

    createPuzzle(isCompleted = false) {
        const puzzleArea = document.getElementById('puzzle-area');
        if (!puzzleArea) return;
        
        // Obtener datos del puzzle actual desde el JSON
        const worldData = this.worldsData[this.state.currentWorld];
        const puzzleData = worldData.puzzles[this.state.currentLevel - 1];
        
        // Usar las piezas del JSON para calcular el grid, pero siempre ocupar el mismo espacio
        const totalPieces = puzzleData.pieces;
        const gridSize = Math.ceil(Math.sqrt(totalPieces)); // Grid basado en piezas del JSON
        
        // Crear imagen del puzzle
        const imagePath = `img/puzzles/m${String(this.state.currentWorld).padStart(2, '0')}p${String(this.state.currentLevel).padStart(2, '0')}.webp`;
        
        // Limpiar área del puzzle
        puzzleArea.innerHTML = '';
        
        // Usar el puzzle-container que ya existe en el HTML
        const puzzleContainer = document.querySelector('.puzzle-container');
        if (!puzzleContainer) return;
        
        // Configurar el contenedor existente - SIN estilos JavaScript
        // Dejar que el CSS maneje todo
        
        // Crear grid de posiciones (guías)
        const board = document.createElement('div');
        board.className = 'puzzle-board';
        board.style.position = 'relative';
        board.style.width = '100%';
        board.style.height = '100%';
        board.style.border = '2px solid var(--world-card-border, #B8D4E3)';
        board.style.borderRadius = 'var(--border-radius-lg)';
        board.style.overflow = 'hidden';
        
        // Inicializar variables del puzzle
        this.puzzleTiles = [];
        
        // Si está completado, mostrar orden correcto; si no, mezclar
        if (isCompleted) {
            this.puzzleOrder = Array.from({length: totalPieces}, (_, i) => i);
        } else {
            this.puzzleOrder = Array.from({length: totalPieces}, (_, i) => i);
            this.shuffleArray(this.puzzleOrder);
        }
        
        // Guardar el estado de completado para usar en la creación de piezas
        this.isPuzzleCompleted = isCompleted;
        
        // Crear celdas guía
        for (let i = 0; i < totalPieces; i++) {
            const cell = document.createElement('div');
            cell.className = 'puzzle-cell';
            const rect = this.getCellRect(i, gridSize, board);
            Object.assign(cell.style, {
                position: 'absolute',
                left: rect.left + 'px',
                top: rect.top + 'px',
                width: rect.width + 'px',
                height: rect.height + 'px',
                border: '1px dashed rgba(0,0,0,0.1)',
                pointerEvents: 'none'
            });
            board.appendChild(cell);
        }
        
        // Crear piezas del puzzle
        console.log(`Creando ${totalPieces} piezas para puzzle ${this.state.currentWorld}-${this.state.currentLevel}`);
        console.log(`Imagen: ${imagePath}`);
        
        for (let i = 0; i < totalPieces; i++) {
            const tile = document.createElement('div');
            tile.className = 'puzzle-tile';
            tile.dataset.pieceIndex = i;
            
            // Calcular posición de la imagen para mostrar solo la parte correspondiente
            const { cols, rows } = this.getGridDimensions(totalPieces);
            const row = Math.floor(i / cols);
            const col = i % cols;
            const posX = (col / (cols - 1)) * 100;
            const posY = (row / (rows - 1)) * 100;
            
            // Estilos de la pieza
            console.log('Cargando imagen para pieza:', imagePath, 'Posición:', posX, posY, 'Tamaño:', cols, rows);
            
            // Verificar que la imagen existe
            const img = new Image();
            img.onload = () => console.log('Imagen cargada correctamente:', imagePath);
            img.onerror = () => console.error('Error cargando imagen:', imagePath);
            img.src = imagePath;
            
            // Si está completado, mostrar imagen completa; si no, mostrar pieza cortada
            if (this.isPuzzleCompleted) {
                // Imagen completa sin cortes
                Object.assign(tile.style, {
                    position: 'absolute',
                    backgroundImage: `url(${imagePath})`,
                    backgroundSize: '100% 100%',
                    backgroundPosition: '0% 0%',
                    backgroundRepeat: 'no-repeat',
                    cursor: 'default',
                    border: 'none',
                    borderRadius: 'var(--border-radius-sm)',
                    transition: 'all 0.2s ease'
                });
            } else {
                // Pieza cortada normal
                Object.assign(tile.style, {
                    position: 'absolute',
                    backgroundImage: `url(${imagePath})`,
                    backgroundSize: `${cols * 100}% ${rows * 100}%`,
                    backgroundPosition: `${posX}% ${posY}%`,
                    backgroundRepeat: 'no-repeat',
                    cursor: 'grab',
                    border: '1px solid rgba(0,0,0,0.2)',
                    borderRadius: 'var(--border-radius-sm)',
                    transition: 'all 0.2s ease'
                });
            }
            
            this.puzzleTiles.push(tile);
            board.appendChild(tile);
        }
        
        console.log(`Piezas creadas: ${this.puzzleTiles.length}`);
        
        puzzleArea.appendChild(board);
        
        // Esperar un frame para que el DOM se actualice
        requestAnimationFrame(() => {
            // Si está completado, mostrar imagen completa
            if (isCompleted) {
                this.updatePuzzleToComplete();
            } else {
                // Inicializar posiciones y arrastrar solo si no está completado
                this.renderPuzzlePositions(gridSize, board);
                this.enablePuzzleDrag(gridSize, board);
            }
        });
        
        this.puzzle = {
            tiles: this.puzzleTiles,
            order: this.puzzleOrder,
            gridSize,
            totalPieces,
            container: board
        };
    }

    // Funciones auxiliares para el sistema de arrastrar y soltar
    shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }

    getGridDimensions(totalPieces) {
        const cols = Math.ceil(Math.sqrt(totalPieces));
        const rows = Math.ceil(totalPieces / cols);
        return { cols, rows };
    }

    getCellRect(index, gridSize, boardEl) {
        const w = boardEl.clientWidth;
        const h = boardEl.clientHeight;

        // Calcular dimensiones reales del grid basándose en el número total de piezas
        const totalPieces = this.puzzleTiles.length;
        const { cols, rows } = this.getGridDimensions(totalPieces);

        const cellW = w / cols;
        const cellH = h / rows;

        const col = index % cols;
        const row = Math.floor(index / cols);

        return {
            left:  col * cellW,
            top:   row * cellH,
            width: cellW,
            height: cellH
        };
    }

    renderPuzzlePositions(gridSize, board) {
        console.log(`Renderizando posiciones para ${this.puzzleTiles.length} piezas`);
        
        for (let pieceIndex = 0; pieceIndex < this.puzzleTiles.length; pieceIndex++) {
            const pos = this.puzzleOrder.indexOf(pieceIndex);
            const rect = this.getCellRect(pos, gridSize, board);
            const tile = this.puzzleTiles[pieceIndex];
            
            console.log(`Pieza ${pieceIndex}: posición ${pos}, rect:`, rect);
            
            Object.assign(tile.style, {
                left: rect.left + 'px',
                top: rect.top + 'px',
                width: rect.width + 'px',
                height: rect.height + 'px',
                display: 'block', // Asegurar que se muestre
                visibility: 'visible' // Asegurar que sea visible
            });
            
            // Marcar como correcta si está en su posición
            tile.classList.toggle('correct', pos === pieceIndex);
        }
        
        console.log('Posiciones renderizadas');
    }

    enablePuzzleDrag(gridSize, board) {
        let dragging = null;
        let startClient = null;
        let startRect = null;
        let boardRect = null;
        let snapPreview = null;

        // Helper UI: rectángulo de previsualización
        const ensurePreview = () => {
            if (!snapPreview) {
                snapPreview = document.createElement('div');
                Object.assign(snapPreview.style, {
                    position: 'absolute',
                    border: '2px solid rgba(255,255,255,0.75)',
                    boxShadow: '0 0 0 4px rgba(255,255,255,0.25) inset',
                    borderRadius: '12px',
                    pointerEvents: 'none',
                    transition: 'left 60ms, top 60ms, width 60ms, height 60ms',
                    zIndex: '2'
                });
                board.appendChild(snapPreview);
            }
        };

        const clamp = (v, min, max) => Math.max(min, Math.min(max, v));

        const toBoardCoords = (clientX, clientY) => {
            const x = clamp(clientX - boardRect.left, 0, boardRect.width);
            const y = clamp(clientY - boardRect.top,  0, boardRect.height);
            return { x, y };
        };

        const getCellFromPoint = (x, y) => {
            const totalPieces = this.puzzleTiles.length;
            const { cols, rows } = this.getGridDimensions(totalPieces);
            
            const cellW = boardRect.width  / cols;
            const cellH = boardRect.height / rows;
            
            // Calcular columna y fila con mayor precisión
            const col = Math.floor(x / cellW);
            const row = Math.floor(y / cellH);
            
            // Aplicar límites
            const cCol = clamp(col, 0, cols - 1);
            const cRow = clamp(row, 0, rows - 1);
            
            return cRow * cols + cCol;
        };

        // Función para calcular la celda más cercana con zona de imán
        const getNearestCellWithMagnet = (x, y) => {
            const totalPieces = this.puzzleTiles.length;
            const { cols, rows } = this.getGridDimensions(totalPieces);
            
            const cellW = boardRect.width / cols;
            const cellH = boardRect.height / rows;
            
            // Calcular posición relativa dentro de la celda
            const col = x / cellW;
            const row = y / cellH;
            
            // Zona de imán: si está dentro del 30% del centro de la celda, se engancha
            const magnetZone = 0.3;
            const colCenter = Math.floor(col) + 0.5;
            const rowCenter = Math.floor(row) + 0.5;
            
            const colDist = Math.abs(col - colCenter);
            const rowDist = Math.abs(row - rowCenter);
            
            let finalCol, finalRow;
            
            if (colDist < magnetZone) {
                finalCol = Math.floor(col);
            } else {
                finalCol = Math.round(col);
            }
            
            if (rowDist < magnetZone) {
                finalRow = Math.floor(row);
            } else {
                finalRow = Math.round(row);
            }
            
            // Aplicar límites
            const cCol = clamp(finalCol, 0, cols - 1);
            const cRow = clamp(finalRow, 0, rows - 1);
            
            return cRow * cols + cCol;
        };

        this.puzzleTiles.forEach((tile, pieceIndex) => {
            tile.onpointerdown = (e) => {
                // Bloquear piezas si el puzzle está completado
                const isCompleted = this.state.isLevelCompleted(this.state.currentWorld, this.state.currentLevel);
                if (isCompleted) {
                    e.preventDefault();
                    e.stopPropagation();
                    return;
                }
                
                // Descomenta para bloquear piezas ya correctas:
                // if (this.puzzleOrder.indexOf(pieceIndex) === pieceIndex) return;

                e.preventDefault();
                e.stopPropagation();

                tile.setPointerCapture?.(e.pointerId);

                dragging = pieceIndex;
                startClient = { x: e.clientX, y: e.clientY };
                boardRect = board.getBoundingClientRect();

                const pos = this.puzzleOrder.indexOf(pieceIndex);
                startRect = this.getCellRect(pos, gridSize, board);

                Object.assign(tile.style, { zIndex: '10', cursor: 'grabbing', transition: 'none' });
                ensurePreview();
            };

            tile.onpointermove = (e) => {
                if (dragging !== pieceIndex) return;
                e.preventDefault(); // fuerza que no haga scroll en algunos navegadores

                const dx = e.clientX - startClient.x;
                const dy = e.clientY - startClient.y;

                const newLeft = clamp(startRect.left + dx, 0, boardRect.width  - startRect.width);
                const newTop  = clamp(startRect.top  + dy, 0, boardRect.height - startRect.height);

                tile.style.left = newLeft + 'px';
                tile.style.top  = newTop  + 'px';

                // Usar el sistema de imán mejorado para la previsualización
                const targetIndex = getNearestCellWithMagnet(newLeft, newTop);
                const targetRect = this.getCellRect(targetIndex, gridSize, board);

                Object.assign(snapPreview.style, {
                    left: `${targetRect.left}px`,
                    top: `${targetRect.top}px`,
                    width: `${targetRect.width}px`,
                    height: `${targetRect.height}px`,
                    display: 'block'
                });
            };

            tile.onpointerup = (e) => {
                if (dragging !== pieceIndex) return;

                try { tile.releasePointerCapture?.(e.pointerId); } catch {}

                Object.assign(tile.style, { zIndex: '', cursor: 'grab', transition: '' });

                // Snap mejorado con sistema de imán
                const tileLeft = parseFloat(tile.style.left) || 0;
                const tileTop  = parseFloat(tile.style.top)  || 0;
                
                // Usar el sistema de imán mejorado para el snap final
                const toPos = getNearestCellWithMagnet(tileLeft, tileTop);
                const fromPos = this.puzzleOrder.indexOf(pieceIndex);
                const other = this.puzzleOrder[toPos];

                // Intercambio
                this.puzzleOrder[toPos] = pieceIndex;
                this.puzzleOrder[fromPos] = other;

                if (snapPreview) snapPreview.style.display = 'none';
                dragging = null;

                this.renderPuzzlePositions(gridSize, board);
                this.checkPuzzleComplete();
                this.playSound?.('move');
            };
        });
    }

    nearestCell(left, top, gridSize, board) {
        // Ya no la usamos (mantenla si la referencias en otro sitio)
        const rect0 = this.getCellRect(0, gridSize, board);
        const col = Math.round(left / rect0.width);
        const row = Math.round(top  / rect0.height);
        const cCol = Math.max(0, Math.min(gridSize - 1, col));
        const cRow = Math.max(0, Math.min(gridSize - 1, row));
        return cRow * gridSize + cCol;
    }

    checkPuzzleComplete() {
        const isComplete = this.puzzleOrder.every((pieceIndex, position) => pieceIndex === position);
        
        if (isComplete) {
            // Puzzle completado
            this.completePuzzle();
        }
    }

    handlePieceClick(clickedPiece, pieces) {
        const currentPos = parseInt(clickedPiece.dataset.currentPosition);
        const correctPos = parseInt(clickedPiece.dataset.correctPosition);
        
        // Verificar si la pieza está en la posición correcta
        if (currentPos === correctPos) {
            // Pieza correcta
            clickedPiece.classList.add('correct');
            this.playSound('move');
            
            // Verificar si el puzzle está completo
            if (this.isPuzzleComplete(pieces)) {
                this.completePuzzle();
            }
        } else {
            // Pieza incorrecta - mover a la posición correcta
            this.movePieceToCorrectPosition(clickedPiece, pieces);
            this.playSound('move');
        }
    }

    movePieceToCorrectPosition(piece, pieces) {
        const correctPos = parseInt(piece.dataset.correctPosition);
        const currentPos = parseInt(piece.dataset.currentPosition);
        
        // Intercambiar con la pieza en la posición correcta
        const correctPiece = pieces.find(p => parseInt(p.dataset.currentPosition) === correctPos);
        
        if (correctPiece) {
            // Intercambiar posiciones
            piece.dataset.currentPosition = correctPos;
            correctPiece.dataset.currentPosition = currentPos;
            
            // Reordenar en el DOM
            const puzzleGrid = document.querySelector('.puzzle-grid');
            const allPieces = Array.from(puzzleGrid.children);
            allPieces.sort((a, b) => {
                return parseInt(a.dataset.currentPosition) - parseInt(b.dataset.currentPosition);
            });
            
            allPieces.forEach(p => puzzleGrid.appendChild(p));
        }
    }

    isPuzzleComplete(pieces) {
        return pieces.every(piece => {
            return parseInt(piece.dataset.currentPosition) === parseInt(piece.dataset.correctPosition);
        });
    }

    completePuzzle() {
        // Detener temporizador
        console.log('Completando puzzle - deteniendo temporizador');
        this.stopTimer();
        
        // Reproducir sonido de completado
        this.playSound('complete');
        
        // Marcar nivel como completado
        this.state.completeLevel(this.state.currentWorld, this.state.currentLevel);
        
        // Añadir clase al contenedor del puzzle para mover el botón
        const puzzleScreen = document.getElementById('puzzle-screen');
        if (puzzleScreen) {
            puzzleScreen.classList.add('puzzle-completed');
        }
        
        // Actualizar tiempo total
        this.state.totalTime += this.state.puzzleTime;
        this.state.saveProgress();
        
        // Sincronizar con servidor si está logueado
        if (this.state.isLoggedIn) {
            this.syncProgress();
        }
        
        // Mostrar interstitial cada 5 niveles completados
        if (this.state.completedLevels.size % 5 === 0) {
            window.adMobManager.showInterstitial().catch(console.error);
        }
        
        // Actualizar imagen a completa
        this.updatePuzzleToComplete();
        
        // Mostrar pantalla de completado
        setTimeout(() => {
            this.showCompletedScreen();
        }, 1000);
    }

    updatePuzzleToComplete() {
        // Ocultar todas las piezas y mostrar una imagen completa
        if (this.puzzleTiles && this.puzzleTiles.length > 0) {
            const imagePath = `img/puzzles/m${String(this.state.currentWorld).padStart(2, '0')}p${String(this.state.currentLevel).padStart(2, '0')}.webp`;
            
            // Ocultar todas las piezas individuales
            this.puzzleTiles.forEach(tile => {
                tile.style.display = 'none';
            });
            
            // Crear una imagen completa que cubra todo el puzzle
            const puzzleBoard = document.querySelector('.puzzle-board');
            if (puzzleBoard) {
                // Eliminar imagen completa anterior si existe
                const existingCompleteImage = puzzleBoard.querySelector('.puzzle-complete-image');
                if (existingCompleteImage) {
                    existingCompleteImage.remove();
                }
                
                // Crear nueva imagen completa
                const completeImage = document.createElement('div');
                completeImage.className = 'puzzle-complete-image';
                completeImage.style.cssText = `
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background-image: url(${imagePath});
                    background-size: 100% 100%;
                    background-position: center;
                    background-repeat: no-repeat;
                    border-radius: var(--border-radius-sm);
                    z-index: 10;
                `;
                
                puzzleBoard.appendChild(completeImage);
            }
        }
    }

    updatePuzzleToShuffled() {
        // Volver a imagen cortada cuando se mezcla
        if (this.puzzleTiles && this.puzzleTiles.length > 0) {
            const imagePath = `img/puzzles/m${String(this.state.currentWorld).padStart(2, '0')}p${String(this.state.currentLevel).padStart(2, '0')}.webp`;
            const worldData = this.worldsData[this.state.currentWorld];
            const puzzleData = worldData.puzzles[this.state.currentLevel - 1];
            const totalPieces = puzzleData.pieces;
            const { cols, rows } = this.getGridDimensions(totalPieces);
            const gridSize = Math.ceil(Math.sqrt(totalPieces));
            
            // Eliminar imagen completa si existe
            const puzzleBoard = document.querySelector('.puzzle-board');
            if (puzzleBoard) {
                const existingCompleteImage = puzzleBoard.querySelector('.puzzle-complete-image');
                if (existingCompleteImage) {
                    existingCompleteImage.remove();
                }
            }
            
            // Mostrar todas las piezas individuales de nuevo
            this.puzzleTiles.forEach((tile, index) => {
                // Mostrar la pieza
                tile.style.display = 'block';
                
                // Calcular posición de la imagen para mostrar solo la parte correspondiente
                const row = Math.floor(index / cols);
                const col = index % cols;
                const posX = (col / (cols - 1)) * 100;
                const posY = (row / (rows - 1)) * 100;
                
                // Volver a imagen cortada normal
                Object.assign(tile.style, {
                    backgroundImage: `url(${imagePath})`,
                    backgroundSize: `${cols * 100}% ${rows * 100}%`,
                    backgroundPosition: `${posX}% ${posY}%`,
                    backgroundRepeat: 'no-repeat',
                    cursor: 'grab',
                    border: '1px solid rgba(0,0,0,0.2)'
                });
            });
            
            // Re-renderizar posiciones y habilitar arrastre
            setTimeout(() => {
                this.renderPuzzlePositions(gridSize, puzzleBoard);
                this.enablePuzzleDrag(gridSize, puzzleBoard);
            }, 100);
        }
    }

    startTimer() {
        console.log('Iniciando temporizador');
        this.state.puzzleStartTime = Date.now();
        this.state.puzzleTime = 0;
        
        this.timerInterval = setInterval(() => {
            // Verificar que el puzzle no esté completado antes de actualizar
            if (this.state.isLevelCompleted && this.state.isLevelCompleted(this.state.currentWorld, this.state.currentLevel)) {
                console.log('Puzzle completado, deteniendo temporizador automáticamente');
                this.stopTimer();
                return;
            }
            this.state.puzzleTime = Math.floor((Date.now() - this.state.puzzleStartTime) / 1000);
            this.updateTimer();
        }, 1000);
    }

    stopTimer() {
        console.log('Deteniendo temporizador, interval actual:', this.timerInterval);
        if (this.timerInterval) {
            clearInterval(this.timerInterval);
            this.timerInterval = null;
            console.log('Temporizador detenido correctamente');
        } else {
            console.log('No había temporizador activo');
        }
    }

    updateTimer() {
        const timerEl = document.getElementById('puzzle-time');
        if (timerEl) {
            timerEl.textContent = this.formatTime(this.state.puzzleTime);
        }
    }

    setupPuzzleButtons(isCompleted) {
        // Los botones de puzzle ahora están en la barra de menú superior
        // y se manejan automáticamente por showScreen()
        
        // El botón de pista siempre está disponible en la barra de menú
        // cuando estamos en la pantalla de puzzle
        
        // Mostrar botón "Siguiente Nivel" siempre
        const nextBtn = document.getElementById('next-level-btn');
        if (nextBtn) {
            nextBtn.style.display = 'block';
        }
    }

    setupPuzzleEvents() {
        const backBtn = document.getElementById('back-to-levels');
        const nextBtn = document.getElementById('next-level-btn');
        
        if (backBtn) {
            backBtn.addEventListener('click', () => {
                this.stopTimer();
                this.showLevelsScreen(this.state.currentWorld);
            });
        }
        
        if (nextBtn) {
            nextBtn.addEventListener('click', () => {
                this.goToNextLevel();
            });
        }
        
        // El botón de pista ahora está en la barra de menú superior
        // y se maneja en setupTopMenuBar()

        // ===== BOTONES FLOTANTES =====
        this.setupFloatingButtons();
    }

    setupFloatingButtons() {
        // Botón Mundos
        const worldsBtn = document.getElementById('floating-worlds-btn');
        if (worldsBtn) {
            worldsBtn.addEventListener('click', () => {
                if (this.currentScreen === 'puzzle') {
                    this.stopTimer();
                }
                this.showWorldsScreen();
            });
        }

        // Botón Tiempo (solo muestra el tiempo actual)
        const timeBtn = document.getElementById('floating-time-btn');
        if (timeBtn) {
            // No necesita evento click, solo muestra información
        }

        // Botón Puzzles (solo muestra el número de puzzles completados)
        const puzzlesBtn = document.getElementById('floating-puzzles-btn');
        if (puzzlesBtn) {
            // No necesita evento click, solo muestra información
        }

        // Botón Música
        const soundBtn = document.getElementById('floating-sound-btn');
        if (soundBtn) {
            soundBtn.addEventListener('click', () => {
                this.toggleAudio();
            });
        }
        
        // Inicializar estado del botón de sonido
        this.updateSoundButtonState();
    }

    showHint() {
        if (!this.puzzle) return;
        
        // Simular anuncio y después hacer el movimiento
        this.showAd('pista', () => {
            this.executeHint();
        });
    }

    executeHint() {
        if (!this.puzzle) return;
        
        const { order, gridSize, container } = this.puzzle;

        const wrongPos = order.findIndex((pieceIndex, pos) => pieceIndex !== pos);
        if (wrongPos === -1) return; // ya está completo

        const pieceIndex = order[wrongPos];
        // mueve esa pieza a su posición correcta (swap con lo que haya allí)
        const otherAtCorrect = order[pieceIndex];
        order[pieceIndex] = pieceIndex;
        order[wrongPos] = otherAtCorrect;

        this.renderPuzzlePositions(gridSize, container);
        this.checkPuzzleComplete();
    }

    showPuzzlePreview() {
        if (!this.puzzle) return;
        
        // Simular anuncio y después mostrar la vista previa
        this.showAd('vista_previa', () => {
            this.executePuzzlePreview();
        });
    }

    executePuzzlePreview() {
        // Construir la ruta de la imagen del puzzle actual
        const imagePath = `img/puzzles/m${String(this.state.currentWorld).padStart(2, '0')}p${String(this.state.currentLevel).padStart(2, '0')}.webp`;
        
        // Mostrar el modal
        const modal = document.getElementById('puzzle-preview-modal');
        const previewImg = document.getElementById('preview-puzzle-img');
        const countdown = document.getElementById('preview-countdown');
        
        if (modal && previewImg && countdown) {
            // Establecer la imagen real del puzzle
            previewImg.src = imagePath;
            
            // Mostrar modal
            modal.style.display = 'flex';
            
            // Iniciar countdown
            let timeLeft = 5;
            countdown.textContent = timeLeft;
            
            const timer = setInterval(() => {
                timeLeft--;
                countdown.textContent = timeLeft;
                
                if (timeLeft <= 0) {
                    clearInterval(timer);
                    modal.style.display = 'none';
                }
            }, 1000);
        }
    }

    showAd(type, callback = null) {
        // Simular anuncio (en una implementación real, aquí se mostraría un anuncio real)
        console.log(`📺 Mostrando anuncio para: ${type}`);
        
        // Crear un overlay temporal para simular el anuncio
        const adOverlay = document.createElement('div');
        adOverlay.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(0, 0, 0, 0.9);
            z-index: 4000;
            display: flex;
            justify-content: center;
            align-items: center;
            color: white;
            font-size: 24px;
            font-weight: bold;
        `;
        
        const adContent = document.createElement('div');
        adContent.style.cssText = `
            text-align: center;
            padding: 40px;
            background: linear-gradient(135deg, #4a90e2, #7b68ee);
            border-radius: 20px;
            box-shadow: 0 20px 40px rgba(0, 0, 0, 0.5);
        `;
        
        adContent.innerHTML = `
            <div style="font-size: 60px; margin-bottom: 20px;">📺</div>
            <h2 style="margin: 0 0 10px 0;">Anuncio</h2>
            <p style="margin: 0; opacity: 0.8;">${type === 'pista' ? '💡 Pista disponible' : '👁️ Vista previa disponible'}</p>
        `;
        
        adOverlay.appendChild(adContent);
        document.body.appendChild(adOverlay);
        
        // Simular duración del anuncio (2 segundos)
        setTimeout(() => {
            document.body.removeChild(adOverlay);
            // Ejecutar callback si se proporciona
            if (callback && typeof callback === 'function') {
                callback();
            }
        }, 2000);
    }

    // ===== PANTALLA DE COMPLETADO =====
    renderCompletedInfo() {
        const worldData = this.worldsData[this.state.currentWorld];
        if (!worldData) {
            console.error('Datos del mundo no encontrados:', this.state.currentWorld);
            return;
        }
        
        const placeData = worldData.puzzles[this.state.currentLevel - 1];
        if (!placeData) {
            console.error('Datos del puzzle no encontrados:', this.state.currentLevel);
            return;
        }
        
        // Crear el toast dinámicamente en la pantalla del puzzle
        const puzzleScreen = document.getElementById('puzzle-screen');
        if (!puzzleScreen) {
            console.error('No se encontró la pantalla del puzzle');
            return;
        }
        
        // Eliminar toast anterior si existe
        const existingToast = puzzleScreen.querySelector('.puzzle-completed-toast');
        if (existingToast) {
            existingToast.remove();
        }
        
        // Crear el toast
        const toast = document.createElement('div');
        toast.className = 'puzzle-completed-toast';
        toast.innerHTML = `
            <div class="toast-content">
                <div class="toast-time">
                    <span class="toast-icon">⏱️</span>
                    <span class="toast-time-text">${this.formatTime(this.state.puzzleTime)}</span>
                </div>
                <div class="toast-curiosity">${placeData.curiosity}</div>
            </div>
        `;
        
        // Aplicar el color de fondo del mundo actual
        if (worldData.colorPalette && worldData.colorPalette.background) {
            toast.style.background = worldData.colorPalette.background;
        }
        
        puzzleScreen.appendChild(toast);
    }

    setupCompletedEvents() {
        // Ya no hay botones en el toast, se manejan desde la barra superior
        // Solo ocultar el toast cuando se salga de la pantalla del puzzle
    }

    hideCompletedToast() {
        const puzzleScreen = document.getElementById('puzzle-screen');
        if (puzzleScreen) {
            const existingToast = puzzleScreen.querySelector('.puzzle-completed-toast');
            if (existingToast) {
                existingToast.remove();
            }
        }
    }

    goToNextLevel() {
        // Prevenir múltiples llamadas simultáneas
        if (this.isNavigating) {
            console.log('Navegación en progreso, ignorando llamada');
            return;
        }
        
        this.isNavigating = true;
        
        // Validar que tenemos datos cargados
        if (!this.worldsData || !this.state.currentWorld || !this.state.currentLevel) {
            console.error('Datos no disponibles para navegación');
            this.isNavigating = false;
            return;
        }
        
        // Ir al siguiente nivel (completado o no)
        let nextWorld = this.state.currentWorld;
        let nextLevel = this.state.currentLevel + 1;
        
        console.log(`Navegando desde mundo ${this.state.currentWorld}, nivel ${this.state.currentLevel}`);
        console.log(`Configuración: ${GAME_CONFIG.levelsPerWorld} niveles por mundo, ${GAME_CONFIG.totalWorlds} mundos totales`);
        
        // Si hemos superado los niveles del mundo actual, ir al siguiente mundo
        if (nextLevel > GAME_CONFIG.levelsPerWorld) {
            nextWorld = this.state.currentWorld + 1;
            nextLevel = 1;
            console.log(`Superado nivel ${GAME_CONFIG.levelsPerWorld}, yendo al mundo ${nextWorld}, nivel ${nextLevel}`);
        }
        
        // Si hemos superado todos los mundos, volver al primer mundo
        if (nextWorld > GAME_CONFIG.totalWorlds) {
            nextWorld = 1;
            nextLevel = 1;
            console.log(`Superado mundo ${GAME_CONFIG.totalWorlds}, volviendo al mundo ${nextWorld}, nivel ${nextLevel}`);
        }
        
        // Validar que el mundo y nivel existen
        if (!this.worldsData[nextWorld] || !this.worldsData[nextWorld].puzzles || nextLevel > this.worldsData[nextWorld].puzzles.length) {
            console.error(`Mundo ${nextWorld} o nivel ${nextLevel} no existe`);
            this.isNavigating = false;
            return;
        }
        
        console.log(`Navegando a mundo ${nextWorld}, nivel ${nextLevel}`);
        
        // Usar setTimeout para permitir que se complete la navegación actual
        setTimeout(() => {
            this.showPuzzleScreen(nextWorld, nextLevel);
            this.isNavigating = false;
        }, 100);
    }

    // ===== UTILIDADES =====
    formatTime(seconds) {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
    }

    async syncProgress() {
        // Modo offline - sin sincronización
        console.log('Modo offline - sin sincronización');
    }

    // ===== AUTENTICACIÓN =====
    showAuthModal(mode = 'login') {
        this.state.mode = mode;
        this.state.showLoginModal = mode === 'login';
        this.state.showRegisterModal = mode === 'register';
        
        const modal = document.getElementById('auth-modal');
        const title = document.getElementById('auth-title');
        const form = document.getElementById('auth-form');
        
        if (modal && title && form) {
            title.textContent = mode === 'login' ? 'Iniciar Sesión' : 'Registrarse';
            form.innerHTML = this.getAuthFormHTML(mode);
            modal.style.display = 'flex';
            
            this.setupAuthEvents();
        }
    }

    getAuthFormHTML(mode) {
        if (mode === 'login') {
            return `
                <div class="form-group">
                    <label for="auth-email">Email:</label>
                    <input type="email" id="auth-email" required>
                </div>
                <div class="form-group">
                    <label for="auth-password">Contraseña:</label>
                    <input type="password" id="auth-password" required>
                </div>
                <button id="auth-submit" class="btn-primary">Iniciar Sesión</button>
                <p style="text-align: center; margin-top: 1rem;">
                    ¿No tienes cuenta? <a href="#" id="switch-to-register">Regístrate aquí</a>
                </p>
            `;
        } else if (mode === 'register') {
            return `
                <div class="form-group">
                    <label for="auth-name">Nombre:</label>
                    <input type="text" id="auth-name" required>
                </div>
                <div class="form-group">
                    <label for="auth-username">Usuario:</label>
                    <input type="text" id="auth-username" required>
                </div>
                <div class="form-group">
                    <label for="auth-email">Email:</label>
                    <input type="email" id="auth-email" required>
                </div>
                <div class="form-group">
                    <label for="auth-password">Contraseña:</label>
                    <input type="password" id="auth-password" required minlength="6">
                </div>
                <div class="form-group">
                    <label for="auth-confirm-password">Confirmar Contraseña:</label>
                    <input type="password" id="auth-confirm-password" required minlength="6">
                </div>
                <button id="auth-submit" class="btn-primary">Registrarse</button>
                <p style="text-align: center; margin-top: 1rem;">
                    ¿Ya tienes cuenta? <a href="#" id="switch-to-login">Inicia sesión aquí</a>
                </p>
            `;
        }
        return '';
    }

    setupAuthEvents() {
        const submitBtn = document.getElementById('auth-submit');
        const switchToRegister = document.getElementById('switch-to-register');
        const switchToLogin = document.getElementById('switch-to-login');
        const closeBtn = document.getElementById('close-auth-modal');
        const modal = document.getElementById('auth-modal');
        
        if (submitBtn) {
            submitBtn.addEventListener('click', () => {
                this.handleAuthSubmit();
            });
        }
        
        if (switchToRegister) {
            switchToRegister.addEventListener('click', (e) => {
                e.preventDefault();
                this.showAuthModal('register');
            });
        }
        
        if (switchToLogin) {
            switchToLogin.addEventListener('click', (e) => {
                e.preventDefault();
                this.showAuthModal('login');
            });
        }
        
        if (closeBtn) {
            closeBtn.addEventListener('click', () => {
                modal.style.display = 'none';
            });
        }
        
        if (modal) {
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    modal.style.display = 'none';
                }
            });
        }
    }

    async handleAuthSubmit() {
        const email = document.getElementById('auth-email')?.value;
        const password = document.getElementById('auth-password')?.value;
        const name = document.getElementById('auth-name')?.value;
        const username = document.getElementById('auth-username')?.value;
        const confirmPassword = document.getElementById('auth-confirm-password')?.value;
        
        if (!email || !password) {
            alert('Por favor, completa todos los campos obligatorios.');
            return;
        }
        
        if (this.state.mode === 'register') {
            if (!name || !username) {
                alert('Por favor, completa todos los campos.');
                return;
            }
            
            if (password !== confirmPassword) {
                alert('Las contraseñas no coinciden.');
                return;
            }
            
            if (password.length < 6) {
                alert('La contraseña debe tener al menos 6 caracteres.');
                return;
            }
            
            await this.handleRegister(name, username, email, password);
        } else {
            await this.handleLogin(email, password);
        }
    }

    async handleRegister(name, username, email, password) {
        try {
            if (!window.API || !window.API.api) {
                alert('Funcionalidad de registro no disponible en modo offline.');
                return;
            }
            
            const result = await window.API.api('auth.php?action=register', {
                method: 'POST',
                body: JSON.stringify({ name, username, email, password })
            });
            
            if (result.success) {
                if (result.requires_verification) {
                    alert('Registro exitoso. Revisa tu email para el código de verificación.');
                    this.showAuthModal('verify');
                } else {
                    alert('Registro exitoso. Ya puedes iniciar sesión.');
                    this.showAuthModal('login');
                }
            } else {
                alert('Error en el registro: ' + (result.message || 'Error desconocido'));
            }
        } catch (error) {
            console.error('Error en registro:', error);
            alert('Error de conexión. Intenta de nuevo.');
        }
    }

    async handleLogin(email, password) {
        try {
            if (!window.API || !window.API.api) {
                alert('Funcionalidad de login no disponible en modo offline.');
                return;
            }
            
            const result = await window.API.api('auth.php?action=login', {
                method: 'POST',
                body: JSON.stringify({ username: email, password })
            });
            
            if (result.success) {
                this.state.isLoggedIn = true;
                this.state.userInfo = result.user;
                
                // Guardar credenciales para auto-login
                localStorage.setItem(`${GAME_CONFIG.name}_user_email`, email);
                localStorage.setItem(`${GAME_CONFIG.name}_user_token`, btoa(password));
                
                // Cerrar modal
                document.getElementById('auth-modal').style.display = 'none';
                
                // Sincronizar progreso
                this.syncProgress().catch(console.error);
                
                alert('¡Bienvenido! Tu progreso se ha sincronizado.');
            } else {
                alert('Error en el login: ' + (result.message || 'Credenciales incorrectas'));
            }
        } catch (error) {
            console.error('Error en login:', error);
            alert('Error de conexión. Intenta de nuevo.');
        }
    }
}

// ===== INICIALIZACIÓN =====
document.addEventListener('DOMContentLoaded', () => {
    // Inicializar juego
    window.game = new RinconesDelMundo();
});

// ===== API WRAPPER =====
window.API = {
    api: async (endpoint, options = {}) => {
        try {
            console.log('API Call:', endpoint);
            const response = await fetch(endpoint, {
                method: options.method || 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    ...options.headers
                },
                body: options.body
            });
            
            console.log('API Response status:', response.status);
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const text = await response.text();
            console.log('API Response text:', text.substring(0, 200));
            
            return JSON.parse(text);
        } catch (error) {
            console.error('API Error:', error);
            console.error('Endpoint:', endpoint);
            return { success: false, message: 'Error de conexión' };
        }
    }
};

// ===== ADMOB INTEGRATION =====
class AdMobManager {
    constructor() {
        this.isInitialized = false;
        this.bannerAd = null;
        this.interstitialAd = null;
        this.rewardedAd = null;
    }

    async init() {
        if (!GAME_CONFIG.admob.enabled) return;
        
        try {
            // Verificar si AdMob está disponible
            if (typeof google !== 'undefined' && google.ads && google.ads.gma) {
                await google.ads.gma.initialize();
                this.isInitialized = true;
                console.log('AdMob inicializado correctamente');
            } else {
                console.log('AdMob no disponible, usando modo simulación');
            }
        } catch (error) {
            console.error('Error inicializando AdMob:', error);
        }
    }

    // Mostrar banner
    async showBanner() {
        if (!this.isInitialized) return this.simulateAd('banner');
        
        try {
            if (this.bannerAd) {
                this.bannerAd.destroy();
            }
            
            this.bannerAd = google.ads.gma.ads.BannerAd({
                adUnitId: GAME_CONFIG.admob.bannerId,
                size: google.ads.gma.ads.AdSize.BANNER,
                position: google.ads.gma.ads.AdPosition.BOTTOM_CENTER
            });
            
            await this.bannerAd.load();
            await this.bannerAd.show();
        } catch (error) {
            console.error('Error mostrando banner:', error);
            return this.simulateAd('banner');
        }
    }

    // Ocultar banner
    hideBanner() {
        if (this.bannerAd) {
            this.bannerAd.destroy();
            this.bannerAd = null;
        }
    }

    // Mostrar interstitial
    async showInterstitial() {
        if (!this.isInitialized) return this.simulateAd('interstitial');
        
        try {
            if (this.interstitialAd) {
                this.interstitialAd.destroy();
            }
            
            this.interstitialAd = google.ads.gma.ads.InterstitialAd({
                adUnitId: GAME_CONFIG.admob.interstitialId
            });
            
            await this.interstitialAd.load();
            await this.interstitialAd.show();
        } catch (error) {
            console.error('Error mostrando interstitial:', error);
            return this.simulateAd('interstitial');
        }
    }

    // Mostrar rewarded ad
    async showRewardedAd() {
        if (!this.isInitialized) return this.simulateAd('rewarded');
        
        try {
            if (this.rewardedAd) {
                this.rewardedAd.destroy();
            }
            
            this.rewardedAd = google.ads.gma.ads.RewardedAd({
                adUnitId: GAME_CONFIG.admob.rewardedId
            });
            
            await this.rewardedAd.load();
            await this.rewardedAd.show();
            return true;
        } catch (error) {
            console.error('Error mostrando rewarded ad:', error);
            return this.simulateAd('rewarded');
        }
    }

    // Simular ads para desarrollo
    simulateAd(type) {
        console.log(`[SIMULACIÓN] Mostrando ${type} ad`);
        return new Promise(resolve => {
            setTimeout(() => {
                console.log(`[SIMULACIÓN] ${type} ad completado`);
                resolve(true);
            }, 1000);
        });
    }
}

// Instancia global de AdMob
window.adMobManager = new AdMobManager();

// ===== AUTO-RESIZE DEL PUZZLE =====
(function attachPuzzleAutoResize() {
  function sizePuzzleContainer() {
    const container = document.querySelector('.puzzle-container');
    if (!container) return;

    // Altura disponible = hasta el borde inferior del viewport
    const topInViewport = container.getBoundingClientRect().top;
    const available = Math.max(240, window.innerHeight - topInViewport - 16);

    container.style.height = available + 'px';
  }

  // Lanzar y mantener actualizado
  window.addEventListener('DOMContentLoaded', sizePuzzleContainer);
  window.addEventListener('load', sizePuzzleContainer);
  window.addEventListener('resize', sizePuzzleContainer);
  window.addEventListener('orientationchange', sizePuzzleContainer);

  // Recalcula también un poco después por si hay fuentes/gradientes
  window.addEventListener('load', () => setTimeout(sizePuzzleContainer, 50));

  // Exponer por si cambias nivel/mundo
  window.puzzleResize = sizePuzzleContainer;
})();
