Cruvita
===

#Deploy app
grunt build && cd dist && heroku git:clone -a lsascore && cd lsascore/ && rm -rf public/ && rm -rf server/ && mv ../public . && mv ../server . && git add --all && git commit -m "Pushing new build" && git push
