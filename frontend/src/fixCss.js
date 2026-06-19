const fs = require('fs');
const css = fs.readFileSync('public/index.compiled.css', 'utf8');
fs.writeFileSync('public/index.compiled.css', css.replaceAll('calc(infinity * 1px)', '9999px'));
