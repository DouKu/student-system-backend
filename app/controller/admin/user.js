'use strict';

const Controller = require('egg').Controller;
const md5 = require('md5');
const sendToWormhole = require('stream-wormhole');
const awaitWriteStream = require('await-stream-ready').write;
const path = require('path');
const fs = require('fs-extra');
const nodeXlsx = require('node-xlsx');

class UserController extends Controller {
  // 添加当个学生
  async create() {
    const { ctx } = this;
    const body = ctx.request.body;
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
        request: true,
        type: 'string',
      },
    });

    const user = await ctx.model.User.findById(body.id);
    if (!user) {
      ctx.status = 404;
      return;
    }
    await user.update(body);
    ctx.body = user;
  }
  // 获取学生列表
  async index() {
    const { ctx } = this;
    const { query } = ctx;
    const users = await ctx.model.User.findAll({
      where: query,
      attributes: {
        exclude: [
          'password',
          'created_at',
          'updated_at',
        ],
      },
    });
    ctx.body = users;
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
          password: msg[1].substr(msg[1].length - 6),
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
  // async export() {
  //   const { ctx } = this;

  // }
}

module.exports = UserController;
