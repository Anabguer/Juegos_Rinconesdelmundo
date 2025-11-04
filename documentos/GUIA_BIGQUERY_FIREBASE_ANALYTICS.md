# 🔍 Guía de BigQuery + Firebase para Análisis de Datos
## Rincones del Mundo - Consultas SQL sobre Firestore

---

## 📋 Índice
1. [¿Qué es BigQuery Export?](#qué-es-bigquery-export)
2. [Configuración Inicial](#configuración-inicial)
3. [Estructura de Datos](#estructura-de-datos)
4. [Queries SQL - Ejemplos Prácticos](#queries-sql-ejemplos-prácticos)
5. [Dashboard y Visualización](#dashboard-y-visualización)
6. [Alternativas sin BigQuery](#alternativas-sin-bigquery)
7. [Costos y Límites](#costos-y-límites)

---

## ¿Qué es BigQuery Export?

**BigQuery** es el data warehouse de Google Cloud que permite ejecutar queries SQL sobre grandes volúmenes de datos.

### Ventajas:
- ✅ **Queries SQL complejas** sobre tus datos de Firestore
- ✅ **Análisis histórico** (todos los cambios quedan registrados)
- ✅ **Reportes automáticos** y dashboards
- ✅ **Exportación a CSV/Excel**
- ✅ **Integración con Data Studio** (visualizaciones)

### Para Rincones del Mundo:
Puedes analizar:
- Usuarios inactivos (no login en X días)
- Progreso de jugadores
- Puzzles más/menos jugados
- Tiempos de resolución
- Conversión de usuarios registrados → jugadores activos

---

## 🚀 Configuración Inicial

### Paso 1: Activar BigQuery Export

1. **Firebase Console** → [console.firebase.google.com](https://console.firebase.google.com)
2. Selecciona tu proyecto: **"Rincones del Mundo"**
3. **Firestore Database** (menú lateral)
4. Pestaña **"Usage"**
5. Click en **"Export to BigQuery"**

### Paso 2: Configurar Exportación

**Opción A - Streaming (Recomendada para análisis en tiempo real)**
```
✅ Datos disponibles en minutos
✅ Actualizaciones continuas
⚠️ Mayor consumo de recursos
```

**Opción B - Scheduled (Recomendada para reportes diarios)**
```
✅ Exportación diaria automática
✅ Menor costo
⚠️ Datos con hasta 24h de retraso
```

### Paso 3: Seleccionar Colecciones

Marca las colecciones que quieres exportar:

```
✅ apps/rincones_del_mundo/users
✅ apps/rincones_del_mundo/progress
✅ apps/rincones_del_mundo/rankings (si existe)
```

### Paso 4: Verificar Exportación

1. **Google Cloud Console** → [console.cloud.google.com](https://console.cloud.google.com)
2. **BigQuery** (menú lateral)
3. Busca tu proyecto
4. Verás un dataset llamado: `firestore_export`

---

## 📊 Estructura de Datos

### Tablas generadas automáticamente:

```
firestore_export/
  ├── users_raw_latest          (última versión de cada documento)
  ├── users_raw_changelog       (historial de cambios)
  ├── progress_raw_latest
  └── progress_raw_changelog
```

### Estructura de una fila:

| Campo | Tipo | Descripción |
|-------|------|-------------|
| `document_id` | STRING | ID del documento (UID del usuario) |
| `timestamp` | TIMESTAMP | Fecha de la operación |
| `operation` | STRING | `INSERT`, `UPDATE`, `DELETE` |
| `data` | JSON | Contenido completo del documento |

### Ejemplo de campo `data`:

```json
{
  "nick": "Jugador123",
  "email": "usuario@email.com",
  "lastLogin": {
    "_seconds": 1730822400,
    "_nanoseconds": 0
  },
  "createdAt": {
    "_seconds": 1720000000,
    "_nanoseconds": 0
  }
}
```

---

## 🔎 Queries SQL - Ejemplos Prácticos

### 1️⃣ Usuarios inactivos (más de 1 mes sin login)

```sql
SELECT 
  document_id as user_id,
  JSON_VALUE(data, '$.nick') as nickname,
  JSON_VALUE(data, '$.email') as email,
  TIMESTAMP_SECONDS(CAST(JSON_VALUE(data, '$.lastLogin._seconds') AS INT64)) as last_login,
  TIMESTAMP_DIFF(
    CURRENT_TIMESTAMP(), 
    TIMESTAMP_SECONDS(CAST(JSON_VALUE(data, '$.lastLogin._seconds') AS INT64)), 
    DAY
  ) as days_inactive
FROM 
  `tu-proyecto.firestore_export.users_raw_latest`
WHERE 
  TIMESTAMP_DIFF(
    CURRENT_TIMESTAMP(), 
    TIMESTAMP_SECONDS(CAST(JSON_VALUE(data, '$.lastLogin._seconds') AS INT64)), 
    DAY
  ) > 30
ORDER BY 
  days_inactive DESC;
```

**Resultado esperado:**
| user_id | nickname | email | last_login | days_inactive |
|---------|----------|-------|------------|---------------|
| abc123 | Juan | juan@email.com | 2024-08-15 | 82 |
| def456 | María | maria@email.com | 2024-09-01 | 65 |

---

### 2️⃣ Usuarios activos en los últimos 7 días

```sql
SELECT 
  COUNT(*) as usuarios_activos,
  COUNT(DISTINCT document_id) as usuarios_unicos
FROM 
  `tu-proyecto.firestore_export.users_raw_latest`
WHERE 
  TIMESTAMP_DIFF(
    CURRENT_TIMESTAMP(), 
    TIMESTAMP_SECONDS(CAST(JSON_VALUE(data, '$.lastLogin._seconds') AS INT64)), 
    DAY
  ) <= 7;
```

---

### 3️⃣ Estadísticas completas por usuario

```sql
SELECT 
  u.document_id as user_id,
  JSON_VALUE(u.data, '$.nick') as nickname,
  JSON_VALUE(u.data, '$.email') as email,
  TIMESTAMP_SECONDS(CAST(JSON_VALUE(u.data, '$.createdAt._seconds') AS INT64)) as fecha_registro,
  TIMESTAMP_SECONDS(CAST(JSON_VALUE(u.data, '$.lastLogin._seconds') AS INT64)) as ultimo_login,
  TIMESTAMP_DIFF(
    CURRENT_TIMESTAMP(), 
    TIMESTAMP_SECONDS(CAST(JSON_VALUE(u.data, '$.lastLogin._seconds') AS INT64)), 
    DAY
  ) as dias_sin_login,
  COALESCE(ARRAY_LENGTH(JSON_QUERY_ARRAY(p.data, '$.completedLevels')), 0) as puzzles_completados,
  JSON_VALUE(p.data, '$.currentWorld') as mundo_actual,
  JSON_VALUE(p.data, '$.currentLevel') as nivel_actual
FROM 
  `tu-proyecto.firestore_export.users_raw_latest` u
LEFT JOIN 
  `tu-proyecto.firestore_export.progress_raw_latest` p
ON 
  u.document_id = p.document_id
ORDER BY 
  puzzles_completados DESC;
```

---

### 4️⃣ Usuarios registrados pero nunca jugaron

```sql
SELECT 
  u.document_id as user_id,
  JSON_VALUE(u.data, '$.nick') as nickname,
  JSON_VALUE(u.data, '$.email') as email,
  TIMESTAMP_SECONDS(CAST(JSON_VALUE(u.data, '$.createdAt._seconds') AS INT64)) as fecha_registro,
  TIMESTAMP_DIFF(
    CURRENT_TIMESTAMP(), 
    TIMESTAMP_SECONDS(CAST(JSON_VALUE(u.data, '$.createdAt._seconds') AS INT64)), 
    DAY
  ) as dias_desde_registro
FROM 
  `tu-proyecto.firestore_export.users_raw_latest` u
LEFT JOIN 
  `tu-proyecto.firestore_export.progress_raw_latest` p
ON 
  u.document_id = p.document_id
WHERE 
  p.document_id IS NULL 
  OR ARRAY_LENGTH(JSON_QUERY_ARRAY(p.data, '$.completedLevels')) = 0
ORDER BY 
  fecha_registro DESC;
```

---

### 5️⃣ Top 10 jugadores más activos

```sql
SELECT 
  u.document_id as user_id,
  JSON_VALUE(u.data, '$.nick') as nickname,
  ARRAY_LENGTH(JSON_QUERY_ARRAY(p.data, '$.completedLevels')) as puzzles_completados,
  JSON_VALUE(p.data, '$.currentWorld') as mundo_actual,
  TIMESTAMP_SECONDS(CAST(JSON_VALUE(u.data, '$.lastLogin._seconds') AS INT64)) as ultimo_login
FROM 
  `tu-proyecto.firestore_export.users_raw_latest` u
INNER JOIN 
  `tu-proyecto.firestore_export.progress_raw_latest` p
ON 
  u.document_id = p.document_id
ORDER BY 
  puzzles_completados DESC
LIMIT 10;
```

---

### 6️⃣ Distribución de usuarios por nivel de progreso

```sql
SELECT 
  CASE 
    WHEN puzzles_completados = 0 THEN '0 puzzles (sin iniciar)'
    WHEN puzzles_completados BETWEEN 1 AND 5 THEN '1-5 puzzles (principiante)'
    WHEN puzzles_completados BETWEEN 6 AND 20 THEN '6-20 puzzles (intermedio)'
    WHEN puzzles_completados BETWEEN 21 AND 50 THEN '21-50 puzzles (avanzado)'
    ELSE '50+ puzzles (experto)'
  END as categoria,
  COUNT(*) as cantidad_usuarios
FROM (
  SELECT 
    u.document_id,
    COALESCE(ARRAY_LENGTH(JSON_QUERY_ARRAY(p.data, '$.completedLevels')), 0) as puzzles_completados
  FROM 
    `tu-proyecto.firestore_export.users_raw_latest` u
  LEFT JOIN 
    `tu-proyecto.firestore_export.progress_raw_latest` p
  ON 
    u.document_id = p.document_id
)
GROUP BY 
  categoria
ORDER BY 
  categoria;
```

---

### 7️⃣ Tasa de retención (usuarios que vuelven después de 7 días)

```sql
WITH primeros_logins AS (
  SELECT 
    document_id,
    MIN(TIMESTAMP_SECONDS(CAST(JSON_VALUE(data, '$.createdAt._seconds') AS INT64))) as primer_login
  FROM 
    `tu-proyecto.firestore_export.users_raw_latest`
  GROUP BY 
    document_id
),
usuarios_que_volvieron AS (
  SELECT 
    u.document_id
  FROM 
    `tu-proyecto.firestore_export.users_raw_latest` u
  JOIN 
    primeros_logins pl ON u.document_id = pl.document_id
  WHERE 
    TIMESTAMP_DIFF(
      TIMESTAMP_SECONDS(CAST(JSON_VALUE(u.data, '$.lastLogin._seconds') AS INT64)),
      pl.primer_login,
      DAY
    ) >= 7
)
SELECT 
  COUNT(DISTINCT pl.document_id) as total_usuarios,
  COUNT(DISTINCT uv.document_id) as usuarios_retenidos,
  ROUND(COUNT(DISTINCT uv.document_id) * 100.0 / COUNT(DISTINCT pl.document_id), 2) as tasa_retencion_pct
FROM 
  primeros_logins pl
LEFT JOIN 
  usuarios_que_volvieron uv ON pl.document_id = uv.document_id;
```

---

### 8️⃣ Actividad por día de la semana

```sql
SELECT 
  FORMAT_TIMESTAMP('%A', TIMESTAMP_SECONDS(CAST(JSON_VALUE(data, '$.lastLogin._seconds') AS INT64))) as dia_semana,
  COUNT(*) as cantidad_logins
FROM 
  `tu-proyecto.firestore_export.users_raw_changelog`
WHERE 
  operation = 'UPDATE'
  AND TIMESTAMP_DIFF(
    CURRENT_TIMESTAMP(),
    TIMESTAMP_SECONDS(CAST(JSON_VALUE(data, '$.lastLogin._seconds') AS INT64)),
    DAY
  ) <= 30
GROUP BY 
  dia_semana
ORDER BY 
  cantidad_logins DESC;
```

---

### 9️⃣ Usuarios que completaron todos los puzzles disponibles

```sql
-- Primero necesitas saber cuántos puzzles totales tienes
-- Ajusta el número 150 según tu configuración real

SELECT 
  u.document_id as user_id,
  JSON_VALUE(u.data, '$.nick') as nickname,
  JSON_VALUE(u.data, '$.email') as email,
  ARRAY_LENGTH(JSON_QUERY_ARRAY(p.data, '$.completedLevels')) as puzzles_completados,
  TIMESTAMP_SECONDS(CAST(JSON_VALUE(u.data, '$.lastLogin._seconds') AS INT64)) as ultimo_login
FROM 
  `tu-proyecto.firestore_export.users_raw_latest` u
INNER JOIN 
  `tu-proyecto.firestore_export.progress_raw_latest` p
ON 
  u.document_id = p.document_id
WHERE 
  ARRAY_LENGTH(JSON_QUERY_ARRAY(p.data, '$.completedLevels')) >= 150
ORDER BY 
  puzzles_completados DESC;
```

---

### 🔟 Resumen ejecutivo - Dashboard completo

```sql
SELECT 
  -- Usuarios totales
  COUNT(DISTINCT u.document_id) as usuarios_totales,
  
  -- Usuarios con al menos 1 puzzle completado
  COUNT(DISTINCT CASE 
    WHEN ARRAY_LENGTH(JSON_QUERY_ARRAY(p.data, '$.completedLevels')) > 0 
    THEN u.document_id 
  END) as usuarios_activos,
  
  -- Usuarios activos últimos 7 días
  COUNT(DISTINCT CASE 
    WHEN TIMESTAMP_DIFF(
      CURRENT_TIMESTAMP(), 
      TIMESTAMP_SECONDS(CAST(JSON_VALUE(u.data, '$.lastLogin._seconds') AS INT64)), 
      DAY
    ) <= 7
    THEN u.document_id 
  END) as usuarios_ultima_semana,
  
  -- Usuarios inactivos más de 30 días
  COUNT(DISTINCT CASE 
    WHEN TIMESTAMP_DIFF(
      CURRENT_TIMESTAMP(), 
      TIMESTAMP_SECONDS(CAST(JSON_VALUE(u.data, '$.lastLogin._seconds') AS INT64)), 
      DAY
    ) > 30
    THEN u.document_id 
  END) as usuarios_inactivos_30dias,
  
  -- Total de puzzles completados (suma de todos los usuarios)
  SUM(COALESCE(ARRAY_LENGTH(JSON_QUERY_ARRAY(p.data, '$.completedLevels')), 0)) as puzzles_totales_completados,
  
  -- Promedio de puzzles por usuario
  ROUND(AVG(COALESCE(ARRAY_LENGTH(JSON_QUERY_ARRAY(p.data, '$.completedLevels')), 0)), 2) as promedio_puzzles_usuario
  
FROM 
  `tu-proyecto.firestore_export.users_raw_latest` u
LEFT JOIN 
  `tu-proyecto.firestore_export.progress_raw_latest` p
ON 
  u.document_id = p.document_id;
```

---

## 📈 Dashboard y Visualización

### Google Data Studio (Looker Studio)

1. **Looker Studio** → [lookerstudio.google.com](https://lookerstudio.google.com)
2. **Crear** → **Informe**
3. **Añadir datos** → **BigQuery**
4. Selecciona tu proyecto y dataset
5. Arrastra gráficos y métricas

### Gráficos recomendados:

- 📊 **Usuarios activos vs inactivos** (Gráfico de columnas)
- 📈 **Evolución temporal de registros** (Línea temporal)
- 🥧 **Distribución por nivel de progreso** (Gráfico de pastel)
- 📉 **Tasa de retención** (Scorecard)
- 🗓️ **Actividad por día de semana** (Gráfico de barras)

---

## 🔧 Alternativas sin BigQuery

### Opción 1: Script con Firebase Admin SDK

Crear un script Node.js o PHP que:
1. Se conecte a Firestore vía Admin SDK
2. Ejecute queries simples
3. Genere CSV o HTML

**Ventajas:**
- ✅ Más simple de configurar
- ✅ No requiere Google Cloud

**Desventajas:**
- ❌ Queries menos potentes
- ❌ Sin historial de cambios
- ❌ Más lento con muchos datos

### Opción 2: Cloud Functions + Scheduled Tasks

```javascript
exports.generateWeeklyReport = functions.pubsub
  .schedule('every monday 09:00')
  .onRun(async (context) => {
    const usersSnapshot = await db.collection('users').get();
    // Procesar datos y enviar por email
  });
```

---

## 💰 Costos y Límites

### BigQuery - Nivel Gratuito:
```
✅ 10 GB de almacenamiento/mes GRATIS
✅ 1 TB de consultas/mes GRATIS
✅ Más que suficiente para tu app
```

### Costos adicionales (si superas el límite):
```
💵 Almacenamiento: $0.02 por GB/mes
💵 Queries: $5 por TB procesado
```

### Para Rincones del Mundo (estimación):
```
📊 ~1000 usuarios = ~10 MB de datos
📊 ~100 queries/mes = ~1 GB procesado
📊 Total: GRATIS (dentro del límite)
```

---

## 🎯 Queries Recomendadas para Empezar

### 1. Copia y pega primero:
```sql
-- Verificar que los datos están bien
SELECT * FROM `tu-proyecto.firestore_export.users_raw_latest` LIMIT 10;
```

### 2. Luego intenta:
```sql
-- Contar usuarios totales
SELECT COUNT(*) as total_usuarios 
FROM `tu-proyecto.firestore_export.users_raw_latest`;
```

### 3. Finalmente:
- Usa las queries de "Ejemplos Prácticos" (arriba)
- Modifica `tu-proyecto` por tu ID real de proyecto

---

## 📝 Notas Importantes

1. **Reemplaza** `tu-proyecto` por tu ID real de Google Cloud
2. **Ajusta** las rutas de las colecciones según tu estructura
3. **Verifica** los nombres de campos (nick, email, lastLogin, etc.)
4. **Las queries pueden tardar** unos segundos con muchos datos
5. **Guarda queries útiles** en BigQuery para reutilizarlas

---

## 🆘 Troubleshooting

### Error: "Table not found"
➡️ Verifica que BigQuery Export esté configurado y la exportación haya finalizado

### Error: "Access Denied"
➡️ Ve a IAM & Admin en Google Cloud y verifica que tienes permisos de "BigQuery User"

### No hay datos en las tablas
➡️ Espera unos minutos después de configurar (streaming) o hasta el día siguiente (scheduled)

### Campos JSON vacíos
➡️ Verifica que tus documentos en Firestore tengan esos campos

---

## 📚 Referencias Útiles

- [BigQuery Documentation](https://cloud.google.com/bigquery/docs)
- [Firebase BigQuery Export](https://firebase.google.com/docs/firestore/extend-with-bigquery)
- [BigQuery SQL Reference](https://cloud.google.com/bigquery/docs/reference/standard-sql/query-syntax)
- [Looker Studio](https://lookerstudio.google.com)

---

**Creado para:** Rincones del Mundo  
**Fecha:** Noviembre 2024  
**Versión:** 1.0

