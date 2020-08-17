'use strict';

const Controller = require('egg').Controller;
const md5 = require('md5');
const sendToWormhole = require('stream-wormhole');
const awaitWriteStream = require('await-stream-ready').write;
const path = require('path');
const fs = require('fs-extra');
const nodeXlsx = require('node-xlsx');
const excelExport = require('excel-export');
const sha256 = require('sha256');

class UserController extends Controller {
  // 添加当个学生
  async create() {
    const { ctx } = this;
    const body = ctx.request.body;
    let password = '123456';
    if (body.id_card) {
      password = body.id_card.substr(6, 8);
    }
    body.password = sha256(password);
    ctx.validate({
      name: {
        require: true,
        type: 'string',
      },
    }, body);

    const user = await ctx.model.User.create(body);
    ctx.body = user;
  }
  // 更新学生信息
  async update() {
    const { ctx } = this;
    const body = ctx.request.body;
    ctx.validate({
      id: {
        require: true,
        type: 'number',
      },
    });

    const user = await ctx.model.User.findById(body.id);
    if (!user) {
      ctx.status = 404;
      return;
    }
    const data = Object.assign({}, body);
    if (data.password) {
      delete data.password;
    }
    await user.update(data);
    ctx.body = user;
  }
  // 删除学生信息
  async remove() {
    const { ctx } = this;
    const body = ctx.request.body;
    ctx.validate({
      id: {
        require: true,
        type: 'number',
      },
    });

    const user = await ctx.model.User.destroy({
      where: {
        id: body.id,
      },
    });
    ctx.body = user;
  }
  // 获取学生列表
  async index() {
    const { ctx } = this;
    const { query, admin } = ctx;
    const search = {};
    if (query.keyword) {
      search.id_card = query.keyword;
    }
    const users = await ctx.model.User.findAll({
      limit: parseInt(query.limit) || 10,
      offset: parseInt(query.offset) || 0,
      where: search,
      attributes: {
        exclude: [
          'password',
          'created_at',
          'updated_at',
        ],
      },
    });

    const total = await ctx.model.User.count();
    ctx.body = {
      choose: admin.choose,
      users,
      total,
    };
  }
  // 批量导入学生信息
  async import() {
    const { ctx } = this;
    const stream = await ctx.getFileStream();
    const filename = md5(stream.filename) + path
      .extname(stream.filename)
      .toLocaleLowerCase();
    const target = path.join(this.config.baseDir, 'app/.tmp/', filename);
    const writeStream = fs.createWriteStream(target);
    try {
      await awaitWriteStream(stream.pipe(writeStream));
    } catch (err) {
      await sendToWormhole(stream);
      throw err;
    }
    try {
      const excel = nodeXlsx.parse(target);
      const sheet = excel[0].data;
      sheet.shift();
      const users = sheet.map(msg => {
        return {
          name: msg[0],
          id_card: msg[1],
          student_id: msg[2],
          sex: msg[3],
          password: sha256(msg[1].substr(6, 8)),
        };
      });
      users.forEach(async user => {
        const res = await ctx.model.User.findOne({
          where: {
            id_card: user.id_card,
          },
        });
        if (!res) {
          await ctx.model.User.create(user);
        } else {
          await res.update(user);
        }
      });
      ctx.body = 200;
    } catch (err) {
      throw err;
    }
  }
  // 导出学生信息
  async export() {
    const { ctx } = this;
    console.log(ctx);
    const users = await ctx.model.User.findAll({
      where: {},
      attributes: {
        exclude: [
          'password',
          'created_at',
          'updated_at',
        ],
      },
    });
    const allData = [];
    users.forEach(user => {
      const temp = [
        user.name,
        user.student_id,
        user.sex,
        user.id_card,
        user.account_location,
        user.tel_num,
        user.is_dorm,
        user.is_create_file,
        user.is_subsistence,
        user.is_disability,
        user.address,
        user.graduated_school,
        user.guardian_name,
        user.guardian_tel_num,
        user.guardian_id_card,
        user.first_subject,
        user.second_subject,
      ];
      allData.push(temp);
    });
    ctx.body = allData;
    const conf = {
      cols: [{
        caption: '姓名',
        type: 'string',
      }, {
        caption: '学号',
        type: 'string',
      }, {
        caption: '性别',
        type: 'string',
      }, {
        caption: '身份证',
        type: 'string',
      }, {
        caption: '户口所在地',
        type: 'string',
      }, {
        caption: '电话号码',
        type: 'string',
      }, {
        caption: '是否内宿',
        type: 'string',
      }, {
        caption: '是否建档立卡贫困户',
        type: 'string',
      }, {
        caption: '是否低保户',
        type: 'string',
      }, {
        caption: '是否残疾生',
        type: 'string',
      }, {
        caption: '家庭住址',
        type: 'string',
      }, {
        caption: '毕业学校',
        type: 'string',
      }, {
        caption: '监护人姓名',
        type: 'string',
      }, {
        caption: '监护人电话号码',
        type: 'string',
      }, {
        caption: '监护人身份证',
        type: 'string',
      }, {
        caption: '科目信息一',
        type: 'string',
      }, {
        caption: '科目信息二',
        type: 'string',
      }],
      rows: allData,
    };
    ctx.body = conf;
    const res = excelExport.execute(conf);
    const data = new Buffer(res, 'binary');
    ctx.set('Content-Type', 'application/vnd.openxmmlformats:charset:s=utf-8');
    ctx.set('Content-Disposition', `attachment; filename=${encodeURIComponent('学生信息表')}_${Date.now()}.xlsx`);
    ctx.body = data;
  }
}

module.exports = UserController;
