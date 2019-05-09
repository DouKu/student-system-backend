drop table if exists `User`;
create table User (
	`id`            int not null primary key auto_increment comment '递增ID',
	`name`		    varchar(30) not null comment '姓名',
	`sutdent_id`      int not null comment '学号',
	`sex`         int not null default 0 comment '性别 0 未配置 1 男 2 女',
	`email`          varchar(255) not null comment '邮箱',
	`id_card`		varchar(255) not null comment '身份证',
	`password`	    varchar(255) not null comment '密码',
	`account_location` 	varchar(255) not null comment '户口所在地',
	`tel_num` 	varchar(255) not null comment '电话号码',
	`is_dorm` 	int not null comment '是否内宿 0 否 1 是',
	`address` 	varchar(255) not null comment '家庭住址',
	`graduated_school` 	varchar(255) not null comment '毕业学校',
	`guardian_name` 	varchar(30) not null comment '监护人姓名',
	`guardian_tel_num` 	varchar(255) not null comment '监护人电话号码',
	`guardian_id_card` 	varchar(255) not null comment '监护人身份证',
	`created_at` 	timestamp not null DEFAULT CURRENT_TIMESTAMP comment '创建时间',

	key `name` (`name`),
	key `sutdent_id` (`sutdent_id`),
	key `sex` (`sex`),
	key `email` (`email`),
	key `id_card` (`id_card`),
	key `password` (`password`),
	key `account_location` (`account_location`),
	key `tel_num` (`tel_num`),
	key `is_dorm` (`is_dorm`),
	key `address` (`address`),
	key `graduated_school` (`graduated_school`),
	key `guardian_name` (`guardian_name`),
	key `guardian_tel_num` (`guardian_tel_num`),
	key `guardian_id_card` (`guardian_id_card`),
	key `created_at` (`created_at`)
) engine=innodb default charset=utf8 collate=utf8_general_ci comment='用户信息';