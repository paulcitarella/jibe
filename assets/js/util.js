module.exports = {
  /* Configures default themes for the spinner plugin
   * E.g. app.config(['usSpinnerConfigProvider', util.configSpinnerThemes]);
   */
  configSpinnerThemes: function (usSpinnerConfigProvider) {
    usSpinnerConfigProvider.setTheme('small', {lines: 12, radius: 4, width: 2, length: 4});
    usSpinnerConfigProvider.setTheme('medium', {lines: 12, radius: 6, width: 3, length: 6});
    usSpinnerConfigProvider.setTheme('large', {lines: 12, radius: 8, width: 4, length: 8});
  },

  /* Introduces delay into all angular http requests for dev purposes
   * E.g. $httpProvider.interceptors.push(["$q", "$timeout", util.configHttpDelay]);
   */
  configHttpDelay: function ($q, $timeout) {
    return {
      'response': function(response) {
        return $q(function(resolve, reject) {
          if (response.config.url && response.config.url.indexOf('/templates') != -1) {
            resolve(response);
          } else {
            $timeout(function() {
              resolve(response);
            }, 1000);
          }
        });
      }
    };
  },

  paginator: function(totalCount, pageSize) {
    var paginator = {
      currentPage: 1,
      totalCount: totalCount,
      pageSize: pageSize,

      setCount: function(response) {
        var totalCount = response.headers('X-Total-Count');
        if (totalCount) paginator.totalCount = totalCount;
      },

      hasNextPage: function() {
        var hasNext = paginator.totalCount > (paginator.pageSize * paginator.currentPage);
        return hasNext;
      },

      hasPreviousPage: function() {
        return paginator.currentPage > 1;
      },

      getPageCount: function() {
        return Math.ceil(paginator.totalCount / paginator.pageSize);
      }
    };

    return paginator;
  },

  flashError: function(Flash) {
    Flash.create('danger', '<strong>Oops!</strong><br/>Looks like something went wrong. Please try again later.');
  },

  flashSuccess: function(Flash, msg) {
    Flash.create('success', '<strong>Success</strong><br/>' + msg);
  }
};
