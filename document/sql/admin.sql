drop table if exists `Admin`;
create table Admin (
	`id`            int not null primary key auto_increment comment '递增ID',
	`role`		      int not null comment '角色 0 超级管理员',
	`name`          varchar(30) not null comment '管理员名称',
  `password`      varchar(255) not null comment '密码',
	`created_at` 	  timestamp not null DEFAULT CURRENT_TIMESTAMP comment '创建时间',

	key `role` (`role`),
	key `name` (`name`),
	key `password` (`password`),
	key `created_at` (`created_at`)
) engine=innodb default charset=utf8 collate=utf8_general_ci comment='管理员信息';
