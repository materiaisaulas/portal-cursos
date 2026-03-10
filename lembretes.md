# 1. Ir para o repositório do portal
cd portal-cursos

# 2. Adicionar o submodule
git submodule add <URL_DO_REPOSITORIO> <PASTA_DESTINO>

# exemplo
git submodule add https://github.com/materiaisaulas/ferramentas.git ferramentas

# 3. Registrar o submodule
git add .gitmodules ferramentas

# 4. Fazer commit
git commit -m "Adiciona submodule ferramentas"

# 5. Enviar para o GitHub
git push