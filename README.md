```bash
npx sequelize migration:generate --name=init-photos
npx sequelize db:migrate

npx sequelize migration:create --name add-desccolumn-to-albums
```
insert into users (name, student_id, password) values ('林光裕', '20142100236', '1234567');
insert into admins (name, password) values ('admin', 'admin123456@');

alter table admins add choose int not null default 0;