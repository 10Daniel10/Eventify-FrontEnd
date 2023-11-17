// next.config.js
const withCSS = require('@zeit/next-css');

module.exports = withCSS({
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    // Encuentra la regla de estilo de Material-UI
    const muiStyleRule = config.module.rules.find(
      (rule) =>
        rule.oneOf && rule.oneOf.some((subRule) => subRule.issuer && subRule.issuer.include && subRule.issuer.include.includes('@mui')),
    );

    // Establece la prioridad de los estilos de Material-UI
    if (muiStyleRule) {
      muiStyleRule.issuer = { ...muiStyleRule.issuer, priority: 1 };
    }

    // Encuentra la regla de tus estilos CSS modules
    const cssModulesRule = config.module.rules.find(
      (rule) => rule.oneOf && rule.oneOf.some((subRule) => String(subRule.test) === String(/\.module\.css$/)),
    );

    // Establece la prioridad de tus estilos CSS modules
    if (cssModulesRule) {
      cssModulesRule.issuer = { ...cssModulesRule.issuer, priority: 2 };
    }

    return config;
  },
});