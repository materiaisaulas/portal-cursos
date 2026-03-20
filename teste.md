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
 
 
  <!-- - [Padronização Visual com ThemeData](flutter/componentes_basicos/app_padrao.md)
    - [ListViewWidget](flutter/componentes_basicos/list_view_widget.md)
    - [Row](flutter/componentes_basicos/row_widget.md)
    - [Expanded](flutter/componentes_basicos/expanded_widget.md)
    - [Flexible](flutter/componentes_basicos/flexible_widget.md) -->