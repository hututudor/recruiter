const fs = require("fs");
const path = require("path");
const { paths } = require("react-app-rewired");

module.exports = {
  webpack: function(config, env) {
    const absolutePaths = generateWebpackAliases();
    config.resolve.alias = {
      ...config.resolve.alias,
      ...absolutePaths,
      assets: path.resolve(paths.appPath, `${paths.appSrc}/app/assets`),
      app: path.resolve(paths.appPath, `${paths.appSrc}/app`),
      "@kogaio": path.resolve(paths.appPath, "node_modules/@ivoryio/kogaio")
    };
    return config;
  },
};

function generateWebpackAliases() {
  const modulesRoot = path.resolve(paths.appPath, `${paths.appSrc}/packages`);
  const aliases = Object.assign(
    {},
    ...fs.readdirSync(modulesRoot).map(folder => ({
      [`${folder}`]: path.resolve(
        paths.appPath,
        `${paths.appSrc}/packages/${folder}`
      )
    }))
  );
  return aliases;
}