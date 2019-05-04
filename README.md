```bash
npx sequelize migration:generate --name=init-photos
npx sequelize db:migrate

npx sequelize migration:create --name add-desccolumn-to-albums
```