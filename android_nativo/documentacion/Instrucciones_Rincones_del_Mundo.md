## 📘 Instrucciones para implementación -- **Rincones del Mundo**

**Descripción general:**\
Juego de puzzles visuales tipo *relax*. El jugador completa imágenes
reales de diferentes lugares del mundo (una por nivel). Cada mundo tiene
su propia **paleta de colores** y **temática visual**.

------------------------------------------------------------------------

### 🧭 Estructura general

-   **10 mundos**, cada uno con **15 niveles**.\
-   En total, 150 puzzles.\
-   La dificultad **varía dentro del mismo mundo**, no sigue orden
    estricto: algunos más fáciles, otros con más piezas.\
-   El último nivel de cada mundo (nivel 15) es el **reto** más difícil
    (mayor número de piezas).\
-   Al completar un nivel se **desbloquea el siguiente**
    automáticamente.\
-   Si un jugador quiere, puede pulsar **"Siguiente"** para pasar aunque
    no haya completado el actual.
-   En el inicio habrá la posilibilidad de darle a un boton "sorprendeme" 
    y le llevará a un nivel pendiente de hacer aleatorio.
    - La idea es que esten en el primer mundo pero podrían ir a cualquier mundo y darle a una tarjeta, 
    no son niveles, son puzzles, pueden hacer el que esté pendiente de hacer.

------------------------------------------------------------------------

### 🎨 Interfaz

-   **Pantalla inicial**: pide nombre del jugador (opcional, se puede
    omitir pero debe existir estructura para añadirlo más adelante).\
-   **Pantalla de mundos**: muestra 10 tarjetas (1 por mundo).
    -   Cada tarjeta con su color base (según paleta).\
    -   Al entrar, se muestran las 15 tarjetas de ese mundo (cards cuadradas con
        número).\
-   **Pantalla de puzzle**:
    -   Piezas cuadradas (sin bordes redondeados, con 2px de
        separación).\
    -   Puzzle visible a tamaño completo, centrado verticalmente.\
    -   Margen generoso arriba y abajo (para evitar cortes en móvil).\
    -   Fondo y UI adaptados a la paleta del mundo.\
    -   Al completar, aparece animación suave (tipo fade o escala) y se
        muestra:
        -   ✅ mensaje "Completado"
        -   🕒 tiempo total del puzzle
        -   📍 curiosidad del lugar (texto que vendrá del otro
            documento)\
    -   Botón **"Siguiente nivel"** debajo del mensaje.

------------------------------------------------------------------------

### 🎵 Sonido

-   Música tranquila de fondo, distinta para cada mundo.\
-   Pequeños efectos suaves:
    -   Al mover pieza.\
    -   Al colocarla correctamente.\
    -   Al completar el puzzle.

------------------------------------------------------------------------

### 💾 Progreso

-   Se guarda localmente (localStorage) para que no se pierda si se
    cierra.\
-   Si se desea, puede añadirse registro simple (nombre del jugador +
    progreso) en base de datos más adelante.

------------------------------------------------------------------------

### ⏱ Tiempo y HUD

-   Mostrar el **tiempo que lleva en el puzzle actual** (arriba a la
    derecha).\
-   Mostrar el **tiempo total acumulado** de todos los puzzles
    completados (puede ir en la pantalla de niveles).

------------------------------------------------------------------------

### ⚙️ Dificultad y grid

-   Mundos 1--3 → puzzles 3×3\
-   Mundos 4--7 → puzzles 4×4\
-   Mundos 8--10 → puzzles 5×5\
-   Dentro de cada mundo, niveles intercalan dificultad (no ascendente).

------------------------------------------------------------------------

### 📄 Archivos de apoyo

1.  **Documento 1 (este):** instrucciones para desarrollo.\
2.  **Documento 2:** listado de mundos, prompts de imágenes,
    curiosidades y paletas de color (referencia visual).

------------------------------------------------------------------------

### 💡 Extras posibles (si hay tiempo)

-   Transición de "tarjeta girando" cuando un nivel se completa.\
-   Sombra animada o leve brillo sobre las piezas correctas.\
-   Pantalla de *créditos* o *diario de viaje* con las imágenes
    completadas.

------------------------------------------------------------------------

### MUNDOS Y PALETA DE COLORES

Cada mundo tendrá un tono de color, color cards y bordes referente a su paleta.

🌍 Mundo 1 – Sereno — Paleta: azul claro · crema · gris piedra
🌫️ Mundo 2 – Bruma — Paleta: azul grisáceo · malva · blanco roto
☀️ Mundo 3 – Luz — Paleta: amarillo claro · coral · turquesa
🌾 Mundo 4 – Recuerdo — Paleta: sepia · terracota · beige
🌊 Mundo 5 – Río — Paleta: verde agua · azul profundo · arena
🌋 Mundo 6 – Ceniza — Paleta: gris carbón · violeta oscuro · cobre
🌿 Mundo 7 – Eco — Paleta: verde hoja · marrón suave · dorado tenue
❄️ Mundo 8 – Silencio — Paleta: blanco nieve · azul hielo · plata
🌇 Mundo 9 – Horizonte — Paleta: naranja coral · púrpura · azul marino
🌌 Mundo 10 – Aurora — Paleta: fucsia · violeta · azul hielo

Mundos, cards y curiosidades:

### mundo 1 - Sereno
1. Templo Daigo-ji, Japón – *Fundado en 874, su jardín cambia de color cinco veces al año.*
2. Fiordo de Geiranger, Noruega – *Uno de los fiordos más profundos de Europa.*
3. Playa de Navagio, Grecia – *Famosa por su barco encallado y aguas turquesa.*
4. Lago Moraine, Canadá – *Su color azul viene del polvo glaciar suspendido.*
5. Jardines de Kioto, Japón – *Inspirados en la meditación Zen.*
6. Montañas Dolomitas, Italia – *Patrimonio natural de la UNESCO.*
7. Costa Amalfitana, Italia – *Casas de colores colgadas sobre el mar.*
8. Lago Bled, Eslovenia – *Su isla alberga una iglesia del siglo XV.*
9. Cataratas de Plitvice, Croacia – *Dieciséis lagos conectados por cascadas.*
10. Valle de Lauterbrunnen, Suiza – *Inspiró los paisajes de El Señor de los Anillos.*
11. Cabo de Formentor, España – *El faro más fotografiado de Mallorca.*
12. Lago Louise, Canadá – *El reflejo perfecto de las Montañas Rocosas.*
13. Isla de Skye, Escocia – *Sus colinas parecen esculpidas por el viento.*
14. Río Li, China – *Escenario de paisajes en billetes chinos.*
15. Monte Fuji, Japón – *Visible desde Tokio en días despejados.*

### mundo 2 - Bruma
1. Bosque de Hallerbos, Bélgica – *Cada primavera se cubre de campanillas azules.*
2. Lago Baikal, Rusia – *El lago más profundo del mundo.*
3. Montañas Huangshan, China – *Su niebla inspiró pinturas antiguas.*
4. Selva Valdiviana, Chile – *Hogar de especies prehistóricas.*
5. Fiordo Doubtful Sound, Nueva Zelanda – *El sonido más silencioso del planeta.*
6. Isla de Skellig Michael, Irlanda – *Antiguo monasterio sobre el Atlántico.*
7. Caminito del Rey, España – *Antiguamente, uno de los senderos más peligrosos.*
8. Lago Bohinj, Eslovenia – *Envuelto en bruma la mayor parte del año.*
9. Bosque de Redwood, EE. UU. – *Árboles que superan los 100 metros.*
10. Lago di Como, Italia – *Refugio de artistas y poetas.*
11. Rila Lakes, Bulgaria – *Siete lagos glaciares, cada uno con su leyenda.*
12. Fiordo Milford Sound, Nueva Zelanda – *Descrito por Kipling como la octava maravilla.*
13. Bosques del Cáucaso, Georgia – *Entre Asia y Europa, casi mágicos.*
14. Parque Torres del Paine, Chile – *Famoso por sus cuernos de granito.*
15. Lago Misurina, Italia – *Su aire ayuda a tratar el asma.*

### mundo 3 - Luz
1. Campos de Lavanda, Provenza (Francia) – *Durante julio, el aire huele a miel y romero.*
2. Islas Maldivas – *Las playas parecen flotar, y la arena no quema por su origen coralino.*
3. Desierto del Sahara, Marruecos – *Las dunas cambian de forma cada noche por el viento.*
4. Santorini, Grecia – *Las casas se encalan cada primavera para reflejar el sol.*
5. Campos de Girasoles, Castilla (España) – *Los girasoles giran siguiendo la luz del sol.*
6. Isla de Holbox, México – *El mar brilla por la bioluminiscencia de pequeños organismos.*
7. Monte Table, Sudáfrica – *Una nube plana llamada “mantel” cubre su cima al atardecer.*
8. Campos de Té, Sri Lanka – *Cada hoja se recoge a mano antes de la salida del sol.*
9. Costa de Amalfi, Italia – *Los limoneros crecen entre las casas junto al mar.*
10. Parque Nacional de Yellowstone, EE. UU. – *Los géiseres laten con el corazón de la Tierra.*
11. Campos de Trigo, Ucrania – *Los colores de su bandera vienen del cielo y del trigo.*
12. Gran Barrera de Coral, Australia – *Visible desde el espacio, hogar de miles de especies marinas.*
13. Lago Titicaca, Perú-Bolivia – *Es el lago navegable más alto del mundo.*
14. Machu Picchu, Perú – *Durante siglos, estuvo escondido bajo la selva.*
15. Cabo de Gata, España – *La zona más soleada de Europa, con playas volcánicas.*

### mundo 4 - Recuerdo
1. Toledo, España – *Sus calles siguen el trazado romano original.*
2. Fez, Marruecos – *Su medina tiene más de 9.000 callejones.*
3. Venecia, Italia – *Las casas se hunden lentamente en la laguna.*
4. Oia, Santorini (Grecia) – *Algunos tejados aún conservan tejas del siglo XIX.*
5. Dubrovnik, Croacia – *Su muralla ha resistido más de 20 guerras.*
6. Praga, República Checa – *Su reloj astronómico lleva marcando el tiempo desde 1410.*
7. Florencia, Italia – *El Duomo tardó casi 150 años en completarse.*
8. Cartagena de Indias, Colombia – *Las fachadas coloridas datan de la época colonial.*
9. Petra, Jordania – *Tallada en roca rosa hace más de 2.000 años.*
10. Kyoto, Japón – *En primavera, los templos se llenan de cerezos centenarios.*
11. Cusco, Perú – *Su trazado urbano aún sigue el diseño inca original.*
12. Sevilla, España – *La Giralda fue primero un minarete.*
13. Estambul, Turquía – *Une dos continentes, Asia y Europa.*
14. Lisboa, Portugal – *Sus tranvías aún recorren rutas centenarias.*
15. Marrakech, Marruecos – *En la plaza Jemaa el-Fna, las historias se cuentan desde hace siglos.*

### mundo 5 - Río
1. Río Amazonas, Brasil – *Contiene una quinta parte del agua dulce del planeta.*
2. Lago Inle, Myanmar – *Los pescadores reman con una pierna para mantener el equilibrio.*
3. Cataratas del Iguazú, Argentina-Brasil – *Tienen más de 250 saltos de agua.*
4. Delta del Okavango, Botsuana – *Un río que desaparece en el desierto.*
5. Lago Ba Be, Vietnam – *El mayor lago natural del norte del país.*
6. Río Nilo, Egipto – *Su crecida anual daba vida al antiguo Egipto.*
7. Lago Titisee, Alemania – *Rodeado de bosques negros que inspiran leyendas.*
8. Río Mekong, Laos – *Alimenta a millones de personas en su recorrido.*
9. Lago Malawi, África – *Tiene más especies de peces que cualquier otro lago.*
10. Río Zambeze, Zambia – *Hogar de hipopótamos y cocodrilos.*
11. Lago Titicaca, Perú-Bolivia – *Sus islas flotantes están hechas de totora.*
12. Río Ganges, India – *Considerado sagrado por millones de personas.*
13. Lago Tanganyika, África – *Uno de los lagos más profundos del mundo.*
14. Río Hudson, EE. UU. – *Inspiró a la escuela artística del siglo XIX.*
15. Lago Baikal, Rusia – *En invierno, su hielo canta al romperse.*

### mundo 6 - Ceniza
1. Monte Etna, Italia – *Uno de los volcanes más activos del mundo, pero su suelo es fértil.*
2. Desierto de Atacama, Chile – *El lugar más seco del planeta; algunos telescopios observan desde allí el universo.*
3. Monte Bromo, Indonesia – *Los lugareños ofrecen flores y arroz a los dioses del volcán.*
4. Isla de Lanzarote, España – *Su paisaje lunar proviene de erupciones del siglo XVIII.*
5. Desierto del Namib, Namibia – *Las dunas más antiguas del mundo, algunas superan los 300 metros.*
6. Monte Vesubio, Italia – *La erupción que destruyó Pompeya en el año 79 d.C.*
7. Isla de Hawai’i, EE. UU. – *La lava del Kilauea ha creado nueva tierra en el océano.*
8. Desierto de Wadi Rum, Jordania – *Escenario de películas por su paisaje marciano.*
9. Monte Fuji, Japón – *Su forma perfecta lo convierte en símbolo de serenidad.*
10. Volcán Arenal, Costa Rica – *Dormido desde 2010, su silueta domina la selva.*
11. Desierto Negro, Egipto – *Lleno de montículos de basalto formados por antiguos volcanes.*
12. Monte Stromboli, Italia – *Erupciona con pequeñas explosiones cada 20 minutos.*
13. Islas Canarias, España – *Cada isla es el resultado de una erupción distinta.*
14. Parque Nacional de Yellowstone, EE. UU. – *Es un supervolcán en reposo.*
15. Monte Kilimanjaro, Tanzania – *Su cima nevada contrasta con las llanuras africanas.*

### mundo 7 - Eco
1. Selva Amazónica, Brasil – *Produce el 20% del oxígeno del planeta.*
2. Bosque de Yakushima, Japón – *Inspiró el escenario de “La princesa Mononoke”.*
3. Parque Nacional Kruger, Sudáfrica – *Hogar de los “cinco grandes” de África.*
4. Monteverde, Costa Rica – *Sus bosques nublados albergan más de 400 especies de orquídeas.*
5. Delta del Okavango, Botsuana – *Uno de los pocos ríos que muere en el desierto.*
6. Bosque Negro, Alemania – *Su nombre viene de la densidad de sus abetos.*
7. Islas Galápagos, Ecuador – *Las iguanas marinas solo existen aquí.*
8. Pantanal, Brasil – *La zona húmeda más grande del mundo.*
9. Bosque de Bialowieza, Polonia – *Refugio del último bisonte europeo.*
10. Parque Nacional de Banff, Canadá – *Sus lagos glaciares cambian de color según la luz.*
11. Selva Valdiviana, Chile – *Uno de los ecosistemas más antiguos de la Tierra.*
12. Lago Nakuru, Kenia – *Santuario de flamencos rosados.*
13. Bosques del Cáucaso, Georgia – *Entre Europa y Asia, mezcla de especies únicas.*
14. Selva de Daintree, Australia – *El bosque tropical más antiguo del planeta.*
15. Isla de Borneo, Malasia – *Hogar de los orangutanes y flores gigantes.*

### mundo 8 - Silencio
1. Laponia, Finlandia – *Durante el invierno, el sol apenas se asoma dos horas al día.*
2. Antártida – *Es el continente más ventoso y seco del planeta.*
3. Lago Baikal, Rusia – *Su hielo es tan claro que se ve a 40 metros de profundidad.*
4. Montañas Rocosas, Canadá – *Al amanecer, el silencio se rompe solo con el crujido del hielo.*
5. Fiordos Noruegos, Noruega – *El eco viaja durante segundos entre las montañas nevadas.*
6. Glaciar Perito Moreno, Argentina – *Cada día avanza dos metros sin que se note.*
7. Valle de Yosemite, EE. UU. – *En invierno, las cascadas se convierten en columnas de hielo.*
8. Islandia – *El agua termal contrasta con el hielo de alrededor.*
9. Lago Louise, Canadá – *Su superficie helada se usa como pista de patinaje natural.*
10. Monte Cook, Nueva Zelanda – *Las leyendas maoríes lo llaman Aoraki, “el que perfora las nubes”.*
11. Tromsø, Noruega – *El mejor lugar para ver auroras en silencio absoluto.*
12. Campo de Hielo Patagónico, Chile – *Uno de los mayores reservorios de agua dulce del mundo.*
13. Monte Everest, Nepal/Tíbet – *El punto más alto del planeta, donde el aire casi no vibra.*
14. Svalbard, Noruega – *Los osos polares son más numerosos que las personas.*
15. Alpes Suizos, Suiza – *En algunas aldeas aún no hay coches, solo trineos.*

### mundo 9 - Horizonte
1. Gran Cañón, EE. UU. – *Cada amanecer pinta nuevas sombras sobre sus paredes.*
2. Salar de Uyuni, Bolivia – *Cuando llueve, se convierte en el espejo más grande del mundo.*
3. Desierto del Sáhara, Marruecos – *Al caer el sol, la arena se enfría en minutos.*
4. Monte Uluru, Australia – *Cambia de color según la hora del día.*
5. Playa de Copacabana, Brasil – *Sus curvas siguen el ritmo de las olas.*
6. Cabo de Buena Esperanza, Sudáfrica – *Donde se cruzan dos océanos.*
7. Desierto de Wadi Rum, Jordania – *El cielo nocturno parece sin fin.*
8. Islas Fiyi – *El mar adquiere reflejos dorados al atardecer.*
9. Monument Valley, EE. UU. – *Escenario de incontables películas del oeste.*
10. Lago Titicaca, Perú – *Las puestas de sol tiñen el agua de cobre.*
11. Mont Saint-Michel, Francia – *Durante la marea alta parece flotar sobre el mar.*
12. Río Nilo, Egipto – *La vida sigue su ritmo desde hace milenios.*
13. Torres del Paine, Chile – *Las montañas se encienden en rojo con la primera luz.*
14. Gran Muralla, China – *Se extiende como una línea hacia el horizonte.*
15. Santorini, Grecia – *El sol se despide cada día entre cúpulas azules.*

### mundo 10 - Aurora
1. Tromsø, Noruega – *El cielo baila cuando el viento solar acaricia la Tierra.*
2. Reikiavik, Islandia – *Las luces del norte se reflejan sobre el mar helado.*
3. Lofoten, Noruega – *Las montañas parecen flotar bajo la aurora.*
4. Fairbanks, Alaska – *Se pueden ver luces incluso a -30 °C.*
5. Abisko, Suecia – *Su cielo despejado es ideal para observaciones astronómicas.*
6. Laponia, Finlandia – *Los renos pastan bajo el resplandor verde.*
7. Groenlandia – *Las auroras pueden durar horas enteras.*
8. Lago Inari, Finlandia – *El hielo refleja los colores del cielo.*
9. Yukón, Canadá – *Los pueblos indígenas las llaman “las voces de los antepasados”.*
10. Estación Espacial Internacional – *Los astronautas ven las auroras desde arriba.*
11. Península de Kola, Rusia – *Se ve tanto aurora como estrellas fugaces.*
12. Kiruna, Suecia – *Las minas iluminan el horizonte mientras baila la aurora.*
13. Yellowknife, Canadá – *Considerado uno de los mejores lugares del mundo para verla.*
14. Reykjavik, Islandia – *A veces la aurora se mezcla con luces de ciudad.*
15. Cabo Norte, Noruega – *Fin del continente, donde el cielo nunca duerme.*
