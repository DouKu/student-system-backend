'use strict';

const Controller = require('egg').Controller;
const md5 = require('md5');
const sendToWormhole = require('stream-wormhole');
const awaitWriteStream = require('await-stream-ready').write;
const path = require('path');
const fs = require('fs-extra');

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
    const target = path.join(this.config.baseDir, 'app/public/uploads', filename);
    const writeStream = fs.createWriteStream(target);
    try {
      await awaitWriteStream(stream.pipe(writeStream));
    } catch (err) {
      await sendToWormhole(stream);
      throw err;
    }
    // 文件响应
    ctx.body = {
      url: '/public/uploads/' + filename,
    };

  }
}

module.exports = UserController;
