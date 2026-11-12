<div align="center">

<img src="docs/media/hero.svg" alt="Slim Moms — a full-stack calorie tracker" width="100%">

<p>
  <a href="https://goit-slim-moms.vercel.app"><img alt="Live" src="https://img.shields.io/badge/live-open%20Slim%20Moms-fc842d?style=for-the-badge&labelColor=0c0d14"></a>
  <img alt="React 19" src="https://img.shields.io/badge/React%2019-Redux%20Toolkit-9b89c9?style=for-the-badge&labelColor=0c0d14">
  <img alt="Node" src="https://img.shields.io/badge/Node.js-Express-5fbf8f?style=for-the-badge&labelColor=0c0d14">
  <img alt="Team" src="https://img.shields.io/badge/GoIT-team%20project-fc842d?style=for-the-badge&labelColor=0c0d14">
</p>

<p><em>A full-stack web app for tracking daily calorie intake, with personalised recommendations<br>
based on height, weight, age and blood type. Built as a GoIT team project.</em></p>

<table>
  <tr>
    <td width="50%"><img src="screenshots/main-page.png" alt="Landing page with the calorie calculator"></td>
    <td width="50%"><img src="screenshots/diary-page.png" alt="The food diary"></td>
  </tr>
</table>

</div>

<img src="docs/media/divider.svg" width="100%" alt="">

## Features

| | |
|---|---|
| **Quick calculator** | A public form that works out your daily calorie goal from height, current and desired weight, age and blood type. |
| **Personal results** | A modal with your goal and the foods not recommended for your blood type. |
| **Accounts** | Registration and login, with the session persisted through Redux Persist. |
| **Diary** | A daily food log with a date picker: add and remove products and watch calories update in real time. |
| **Calculator page** | Save your calorie goal to your profile. |
| **Sidebar** | Today's goal, what you have eaten and the foods to avoid. |

```mermaid
flowchart LR
  C[client · React 19 + Redux Toolkit] -- Axios --> S[server · Express]
  S --> DB[(MongoDB)]
  S --> AUTH[JWT auth]
  S --> P[Products · calories · diary endpoints]
```

<img src="docs/media/divider.svg" width="100%" alt="">

## Türkçe özet

**Slim Moms**, günlük kalori alımını takip eden ve boy, kilo, yaş ve kan grubuna göre kişisel öneriler veren full-stack bir web uygulaması. Herkese açık hesaplayıcı, kişisel sonuç ekranı, tarih seçmeli yemek günlüğü ve kan grubuna göre önerilmeyen yiyecekler listesi var. GoIT eğitimi kapsamında ekip projesi olarak geliştirildi; backend tarafında ürün, kalori ve günlük uç noktalarını yazdım.

<img src="docs/media/divider.svg" width="100%" alt="">

## Development

```sh
cd server && npm install && npm run dev     # API
cd client && npm install && npm run dev     # web app
```

See `SETUP.md` for environment variables and `CONTRIBUTING.MD` for the team workflow.

<div align="center">
<br>
<a href="https://github.com/kutluhangil"><img src="docs/media/signature.svg" width="100%" alt="Team project, contribution by kutluhangil"></a>
<sub>Fork of <a href="https://github.com/goit-nodejs-project/SlimMoms">goit-nodejs-project/SlimMoms</a> · a GoIT Full Stack team project.</sub>
</div>
