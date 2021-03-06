drop table if exists `Admins`;
create table Admins (
	`id`            int not null primary key auto_increment comment '递增ID',
	`role`		      int not null default 0  comment '角色 0 超级管理员',
	`name`          varchar(30) not null comment '管理员名称',
  `password`      varchar(255) not null comment '密码',
	`choose`        int not null default 0 comment '是否开启选课',
	`created_at` 	  timestamp not null DEFAULT CURRENT_TIMESTAMP comment '创建时间',
	`updated_at` 	  timestamp not null DEFAULT CURRENT_TIMESTAMP comment '更新时间',

	key `role` (`role`),
	key `name` (`name`),
	key `password` (`password`),
	key `choose` (`choose`),
	key `created_at` (`created_at`),
	key `updated_at` (`updated_at`)
) engine=innodb default charset=utf8 collate=utf8_general_ci comment='管理员信息';
