
const { exec } = require('child_process');

// execute batch file

exec('my.bat', (err, stdout, stderr) => {
  
  if (err) {  
    console.error(err);
    return;
  }

  console.log(stdout);

});
