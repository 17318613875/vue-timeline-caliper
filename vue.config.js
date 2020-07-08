module.exports = {
  publicPath: process.env.NODE_ENV === "production" ? "/vue-timeline" : "/",
  configureWebpack: {
    output: {
      libraryExport: "default",
    },
  },
};
