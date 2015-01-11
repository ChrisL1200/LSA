Cruvita
===

#Deploy app
cd /opt/LSA && git pull && bower install && npm install && grunt build && cd dist && export NODE_ENV=production && forever start server/app.js
