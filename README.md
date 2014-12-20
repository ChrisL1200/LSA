Cruvita
===

#Deploy app
cd /opt/LSA && git pull && grunt build && cd dist && export NODE_ENV=production && forever start server/app.js
