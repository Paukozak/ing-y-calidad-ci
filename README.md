# 2do Parcial – Ingeniería y Calidad de Software

## Integración y Entrega Continua (CI/CD)

Proyecto que implementa un entorno completo de **Integración Continua (CI)** y **Entrega Continua (CD)**, aplicando los conceptos vistos en la materia: repositorio de código, servidor de IC, entorno de desarrollo local, pruebas automatizadas, análisis de calidad de código, notificaciones y despliegue automático.

---

## 🎯 Consigna

Configurar un entorno de IC/CD que incluya como mínimo:

- 1 repositorio de código.
- 1 servidor de IC.
- 1 entorno de desarrollo local (build local).
- 1 prueba automatizada.
- Una build que realice el despliegue en el entorno de entrega.

Como agregados, se incorporan herramientas de inspección de código (**SonarCloud**), notificaciones (**Slack**) y prácticas de **Spec Driven Development**.

---

## 🏗️ Arquitectura del entorno

```
 Desarrollador
      │  git push / pull request
      ▼
 GitHub (repositorio)
      │  dispara workflow
      ▼
 GitHub Actions (servidor de IC)
      │
      ├──► Job "test"   → corre test/test.js (valida los requisitos del sistema)
      │         │
      │         └─ si falla ──► Notificación a Slack ❌ y se detiene el pipeline
      │
      ├──► Job "sonar"  → análisis de calidad con SonarCloud
      │
      └──► Job "deploy" → despliegue automático a Vercel (solo en main)
                │
                └─ Notificación a Slack ✅ / ❌ según el resultado
```

---

## 🧰 Herramientas utilizadas

| Componente | Herramienta |
|---|---|
| Repositorio de código | GitHub |
| Servidor de IC | GitHub Actions |
| Runtime / build local | Node.js 22 |
| Pruebas automatizadas | Script propio (`test/test.js`) |
| Especificación (SDD) | `SPEC.md` |
| Inspección de código | SonarCloud |
| Notificaciones | Slack (Incoming Webhook) |
| Entorno de entrega / despliegue | Vercel |

---

## 📁 Estructura del proyecto

```
.
├── .github/workflows/ci.yml   # Pipeline de IC/CD
├── index.html                 # Aplicación (front-end estático)
├── ci_cd_ingycalidad.png       # Esquema del entorno
├── SPEC.md                     # Especificación (Spec Driven Development)
├── test/test.js                # Test que valida los requisitos del sistema
└── package.json
```

---

## 💻 Entorno de desarrollo local (build local)

Requisitos: [Node.js](https://nodejs.org/) (v22 recomendado).

```bash
# Clonar el repositorio
git clone https://github.com/Paukozak/ing-y-calidad-ci.git
cd ing-y-calidad-ci

# Ejecutar la prueba automatizada (build local)
node test/test.js

# Ver la aplicación
# Abrir index.html directamente en el navegador
```

---

## 🧪 Pruebas basadas en especificación

El archivo [`SPEC.md`](./SPEC.md) documenta los requisitos funcionales del sistema (RF-01 a RF-03) siguiendo prácticas de **Spec Driven Development**. El script [`test/test.js`](./test/test.js) implementa esos mismos requisitos como verificaciones directas:

- RF-01: debe existir el archivo `index.html`.
- RF-02: `index.html` debe contener la palabra "Integración".
- RF-03: `index.html` debe contener la palabra "Entrega".

Por cada requisito, el test reporta `OK` o `FALLO` y finaliza con código de salida `1` si alguno no se cumple, deteniendo así el pipeline.

---

## 🔄 Pipeline de Integración Continua

El workflow [`.github/workflows/ci.yml`](./.github/workflows/ci.yml) se ejecuta en cada `push` o `pull request` a `main`, y consta de 3 jobs:

### 1. `test`
- Instala Node.js 22.
- Corre `node test/test.js`, que valida los requisitos definidos en `SPEC.md`.
- Si falla, envía una notificación a Slack y detiene el pipeline (los jobs siguientes no se ejecutan).

### 2. `sonar`
- Ejecuta el análisis estático de código con **SonarCloud** (`SonarSource/sonarcloud-github-action`).
- Reporta calidad de código, code smells, duplicaciones, etc. en el dashboard de SonarCloud.

### 3. `deploy`
- Solo corre sobre la rama `main` y si `test` pasó correctamente.
- Despliega la aplicación a **Vercel** (`npx vercel --prod`).
- Notifica el resultado (éxito o fallo) a Slack.

---

## 🔔 Notificaciones a Slack

El pipeline envía mensajes a un canal de Slack mediante un *Incoming Webhook* en estos casos:

- ❌ Cuando fallan los tests (no se llega a deployar).
- ✅ Cuando el deploy a producción fue exitoso.
- ❌ Cuando el pipeline falla en general.

---

## 📦 Despliegue

El entorno de entrega es **Vercel**, donde se publica automáticamente la última versión de `main` que pasó las pruebas.

### Secrets configurados en GitHub Actions

| Secret | Uso |
|---|---|
| `SONAR_TOKEN` | Autenticación con SonarCloud |
| `VERCEL_TOKEN` | Autenticación con Vercel |
| `VERCEL_PROJECT_ID` | Proyecto de Vercel a desplegar |
| `VERCEL_ORG_ID` | Organización/cuenta de Vercel |
| `SLACK_WEBHOOK_URL` | Webhook para notificaciones a Slack |

---

## 👤 Autor

**Paula Kozak** — 4to año - Ingeniería en Sistemas de Información
