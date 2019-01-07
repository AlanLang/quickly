const { injectBabelPlugin } = require('react-app-rewired');
const rewireLess = require('react-app-rewire-less');
module.exports = function override(config, env) {
   config = injectBabelPlugin(
     ['import', { libraryName: 'antd', libraryDirectory: 'es', style: true }],
     config,
   );
   config = rewireLess.withLoaderOptions({
    modifyVars: { "@input-bg": "#6b6b6f","@component-background": "#6b6b6f","@background-color-light":"#d1d1d4" },
    javascriptEnabled: true,
   })(config, env);
  return config;
};