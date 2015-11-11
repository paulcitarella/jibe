module.exports = {
  configSpinnerThemes: function (usSpinnerConfigProvider) {
    usSpinnerConfigProvider.setTheme('small', {lines: 11, radius: 4, width: 2, length: 4});
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
  }
};
