module.exports = {
  devServer: {
    progress: false
  },
  chainWebpack: config => {
    config
      .plugin('html')
      .tap((args) => {
        args[0].title = "Netsoc Account Manager";
        return args;
      });
  }
};
