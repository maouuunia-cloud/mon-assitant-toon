<!DOCTYPE html>
<html lang="fr">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
    <title>TextToon Assistant</title>
    
    <!-- Configuration PWA (Effet App plein écran) -->
    <meta name="apple-mobile-web-app-capable" content="yes">
    <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">
    <meta name="apple-mobile-web-app-title" content="TextToon">
    <meta name="mobile-web-app-capable" content="yes">
    
    <!-- Deep Linking : Forcer l'ouverture de l'application WEBTOON si installée -->
    <!-- iOS (App Store ID pour Webtoon) -->
    <meta name="apple-itunes-app" content="app-id=881561345">
    <meta property="al:ios:app_store_id" content="881561345">
    <meta property="al:ios:app_name" content="WEBTOON">
    <meta property="al:ios:url" content="linewebtoon://">

    <!-- Android (Package name pour Webtoon) -->
    <meta property="al:android:package" content="com.naver.linewebtoon">
    <meta property="al:android:app_name" content="WEBTOON">
    <meta property="al:android:url" content="linewebtoon://">

    <!-- Tailwind CSS -->
    <script src="https://cdn.tailwindcss.com"></script>
    
    <!-- Babel pour transformer le JSX en direct -->
    <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>

    <!-- Import Map pour React et Lucide -->
    <script type="importmap">
      {
        "imports": {
          "react": "https://esm.sh/react@18.2.0",
          "react-dom/client": "https://esm.sh/react-dom@18.2.0/client",
          "lucide-react": "https://esm.sh/lucide-react@0.284.0"
        }
      }
    </script>

    <style>
      body {
        margin: 0;
        padding: 0;
        overflow: hidden;
        width: 100vw;
        height: 100vh;
        background-color: #171717;
      }
      #root {
        height: 100%;
        width: 100%;
      }
    </style>
  </head>
  <body>
    <div id="root"></div>
    
    <!-- On charge App.jsx directement en précisant que c'est du Babel -->
    <script type="text/babel" data-type="module" src="./App.jsx"></script>

    <!-- Script de lancement -->
    <script type="text/babel" data-type="module">
      import React from 'react';
      import ReactDOM from 'react-dom/client';
      import App from './App.jsx';

      const rootElement = document.getElementById('root');
      if (rootElement) {
        const root = ReactDOM.createRoot(rootElement);
        root.render(
          <React.StrictMode>
            <App />
          </React.StrictMode>
        );
      }
    </script>
  </body>
</html>
