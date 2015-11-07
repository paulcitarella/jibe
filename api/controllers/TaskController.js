/**
 * TaskController
 *
 * @description :: Server-side logic for managing Tasks
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

var actionUtil = require('sails/lib/hooks/blueprints/actionUtil');

module.exports = {
  find: function (req, res) {
    Task.ownedBy(req.user).exec(function(err, tasks) {
      if (err) return res.serverError(err);
      return req.wantsJSON ? res.ok(tasks) : res.view('tasks/index', {tasks: tasks});
    });
  },

  findOne: function (req, res) {
    Task.ownedBy(req.user).where({id: req.param('id')}).exec(function(err, tasks) {
      if (err) return res.serverError(err);
      return tasks.length ? res.ok(tasks) : res.notFound();
    });
  },

  create: function (req, res) {
    var task = actionUtil.parseValues(req);
    task.owner = req.user;
    Task.create(task).exec(function(err, newTask) {
      if (err) return res.negotiate(err);
      return res.created(newTask);
    });
  },

  destroy: function (req, res) {
    var pk = actionUtil.requirePk(req);
    var criteria = {id: pk, owner:req.user};

    Task.count({id: pk, owner:req.user.id}, function(err, count) {
      if (!count) return res.notFound();

      Task.destroy(pk).exec(function(err) {
        if (err) return res.negotiate(err);
        return res.ok();
      });
    });
  }
};
