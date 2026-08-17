# 🏁 Circuit de Chimay — Site Officiel

> **Vitesse, Héritage et Légende Trappiste depuis 1926.**  
> Site web immersif et vitrine pour le mythique circuit routier de 4,52 km situé à Chimay, en Belgique.

---

## 🏎️ À propos

Créé en 1926, le **Circuit de Chimay** est l'un des derniers circuits routiers semi-permanents d'Europe. Témoin d'exploits légendaires en auto et moto, il accueille chaque saison des événements incontournables tels que l'**Open Trophy**, le **Classic TT** et des épreuves internationales de **Supermoto**.

Ce projet propose une expérience web moderne, immersive et fluide qui met en valeur l'histoire, le calendrier des courses, le tracé interactif et les infrastructures du circuit (Le Pitlane, réceptions VIP, billetterie).

---

## ✨ Fonctionnalités

- 🌟 **Écran de chargement animé** : Tracé vectoriel dynamique avec voiture de course lumineuse SVG.
- 🏎️ **Hero Carousel immersif** : Défilement fluide de visuels haute résolution avec transitions cinématiques.
- 🗺️ **Carte interactive du tracé** : Visualisation SVG du circuit de 4,52 km avec détails des virages clés et animations au scroll.
- 📅 **Calendrier des événements & Billetterie** : Présentation claire des courses majeures avec compte à rebours et liens directs vers la réservation.
- 🏢 **Infrastructures & Restauration** : Présentation du clubhouse, des loges VIP et de la brasserie / restaurant "Le Pitlane".
- 📱 **Design Responsive & Glassmorphism** : Navigation fluide et soignée sur mobile, tablette et desktop.
- 🌐 **Sélecteur multilingue** : Interface conçue pour le public international (FR / NL / EN).
- ⚡ **Animations ultra-performantes** : Propulsé par **GSAP** et **ScrollTrigger** pour une expérience dynamique sans temps de latence.

---

## 🛠️ Technologies utilisées

- **HTML5** : Structure sémantique, optimisée pour le SEO et l'accessibilité.
- **Vanilla CSS3** : Design sur mesure, typographie soignée (*Syne*, *Plus Jakarta Sans*), variables CSS, effets de flou et glassmorphism.
- **JavaScript (ES6+)** : Logique applicative, gestion du menu mobile, carrousel interactif et contrôles dynamiques.
- **GSAP (GreenSock) & ScrollTrigger** : Animations interactives haute fidélité au défilement.

---

## 📁 Structure du projet

```text
site-circuit-de-chimay/
├── assets/             # Images, icônes, logos et médias du circuit
├── index.html          # Page principale du site
├── style.css           # Feuilles de styles, design system & responsive
├── script.js           # Interactions, animations GSAP et logique JS
└── README.md           # Documentation du projet
```

---

## 🚀 Démarrage rapide

Le projet est conçu sans dépendance lourde de build (zéro configuration requise).

### 1. Cloner le dépôt
```bash
git clone https://github.com/robinwattier/site-circuit-de-chimay.git
cd site-circuit-de-chimay
```

### 2. Lancer le site en local
Vous pouvez simplement ouvrir `index.html` dans votre navigateur ou utiliser un serveur de développement local :

**Avec VS Code / Extension Live Server :**
- Clic droit sur `index.html` > *Open with Live Server*.

**Avec Python :**
```bash
# Python 3
python -m http.server 3000
```
Puis accédez à `http://localhost:3000`.

**Avec Node.js (npx serve) :**
```bash
npx serve .
```

---

## 📄 Licence & Crédits

- **Projet** : Circuit de Chimay
- **Conception & Développement** : Robin Wattier
- Tous droits réservés &copy; 1926–2026 Circuit de Chimay.
