# Especificación del Sistema (SDD)

## 1. Descripción del proyecto

Este proyecto implementa un entorno completo de **Integración Continua (CI)** y **Entrega Continua (CD)** para una aplicación web estática, aplicando prácticas de **Spec Driven Development (SDD)**: la especificación funcional define los requisitos que el sistema debe cumplir, y las pruebas automatizadas verifican que se cumplan antes de cada despliegue.

## 2. Objetivo

Configurar un pipeline de IC/CD que:

- Ejecute pruebas automatizadas en cada `push` o `pull request` a `main`.
- Analice la calidad del código con SonarCloud.
- Notifique los resultados por Slack.
- Despliegue automáticamente a Vercel cuando las pruebas pasen en `main`.

## 3. Alcance

- **Aplicación:** página estática (`index.html`).
- **Repositorio de código:** GitHub.
- **Servidor de IC:** GitHub Actions.
- **Entorno de entrega:** Vercel.

## 4. Requisitos funcionales

| ID | Requisito | Verificado por |
|---|---|---|
| RF-01 | Debe existir el archivo `index.html`. | `test/test.js` |
| RF-02 | `index.html` debe contener la palabra "Integración". | `test/test.js` |
| RF-03 | `index.html` debe contener la palabra "Entrega". | `test/test.js` |

## 5. Requisitos no funcionales

| ID | Requisito |
|---|---|
| RNF-01 | El pipeline debe detener el despliegue si alguna prueba falla. |
| RNF-02 | El pipeline debe notificar por Slack cuando fallen los tests o el deploy. |
| RNF-03 | El código debe ser analizado por SonarCloud en cada ejecución del pipeline. |

## 6. Criterios de aceptación

- `node test/test.js` finaliza con código de salida `0` si se cumplen RF-01, RF-02 y RF-03.
- Si alguno falla, el job `test` falla, se notifica a Slack y los jobs `sonar` y `deploy` no se ejecutan para ese commit.
- El job `deploy` solo corre sobre `main` y únicamente si `test` pasó correctamente.

## 7. Trazabilidad

Cada requisito funcional (RF-01 a RF-03) está implementado como una verificación explícita dentro de [`test/test.js`](./test/test.js), ejecutada automáticamente por el workflow [`ci.yml`](./.github/workflows/ci.yml).
