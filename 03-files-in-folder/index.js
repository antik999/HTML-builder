const fs = require('fs');
const path = require('path');

const secretFolderPath = path.join(__dirname, 'secret-folder');

fs.readdir(secretFolderPath, { withFileTypes: true }, (err, files) => {
  if (err) {
    console.error(err);
    return;
  }

  files.forEach(async (file) => {
    if (file.isFile()) {
      const fileNameWithExt = file.name;
      const fileName = path.parse(fileNameWithExt).name;
      const fileExtension = path.parse(fileNameWithExt).ext.slice(1);
      const fileStats = await fs.promises.stat(path.join(secretFolderPath, fileNameWithExt));
      const fileSize = Math.round(fileStats.size / 1024);
      
      console.log(`${fileName} - ${fileExtension} - ${fileSize}kb`);
    }
  });
});
