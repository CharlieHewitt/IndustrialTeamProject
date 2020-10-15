const CracoAntDesignPlugin = require("craco-antd");
const getCSSModuleLocalIdent = require("react-dev-utils/getCSSModuleLocalIdent");

module.exports = {
  plugins: [
    {
      plugin: CracoAntDesignPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            javascriptEnabled: true,
          },
        },
        cssLoaderOptions: {
          modules: {
            getLocalIdent: (context, localIdentName, localName, options) => {
              if (context.resourcePath.includes("node_modules")) {
                return localName;
              }
              return getCSSModuleLocalIdent(
                context,
                localIdentName,
                localName,
                options
              );
            },
          },
        },
        postcssLoaderOptions: {
          ident: "postcss",
          plugins: () => [
            require("autoprefixer")({
              overrideBrowserslist: [
                "defaults",
                "not ie < 11",
                "last 2 versions",
                "> 1%",
                "iOS 7",
                "last 3 iOS versions",
              ],
            }),
          ],
        },
      },
    },
  ],
};
