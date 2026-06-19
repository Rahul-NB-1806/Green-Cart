const fs = require('fs');
const path = require('path');
const css = fs.readFileSync(path.join(__dirname, 'index.compiled.css'), 'utf8');
fs.writeFileSync(path.join(__dirname, 'index.compiled.css'), css.replace(/calc\(infinity \* 1px\)/g, '9999px'));
