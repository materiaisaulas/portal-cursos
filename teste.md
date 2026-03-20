git submodule add https://github.com/user/curso-java.git cursos/curso-java
git submodule add https://github.com/user/curso-python.git cursos/curso-python


git submodule add https://github.com/materiaisaulas/flutter.git

cd algoritmos
git add .
git commit -m "Atualizações no submódulo algoritmos"
git push

cd ../flutter
git add .
git commit -m "Atualizações no submódulo flutter"
git push

cd ../ihc
git add .
git commit -m "Atualizações no submódulo ihc"
git push

cd ..
 
 