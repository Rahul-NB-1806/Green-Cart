const fs = require('fs');
const css = fs.readFileSync('src/index.compiled.css', 'utf8');
fs.writeFileSync('src/index.compiled.css', css.replaceAll('calc(infinity * 1px)', '9999px'));
