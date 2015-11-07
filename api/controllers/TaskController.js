/**
 * TaskController
 *
 * @description :: Server-side logic for managing Tasks
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
  tasklist: function (req, res) {
    Task.find({owner: req.user.id}, function(err, tasks) {
      if (err) return res.serverError(err);

      return res.view('tasks/index', {tasks: tasks});
    });
  }
};
