import child_process from 'child_process';
import colors from 'colors';

colors.enabled = true;

export function execSync(cmd) {
  return child_process.execSync(cmd).toString().trim();
}

export function exec(cmd) {
  return new Promise((resolve, reject) => {
    const subprocess = child_process.spawn('sh', ['-c', cmd]);

    subprocess.stdout.setEncoding('utf8');
    subprocess.stderr.setEncoding('utf8');

    const result = {};
    result.stdout = '';
    result.stderr = '';
    result.code = null;

    subprocess.stdout.on('data', (data) => {
      result.stdout += data;
      process.stdout.write(data);
    });

    subprocess.stderr.on('data', (data) => {
      result.stderr += data;
      process.stderr.write(data);
    });

    subprocess.on('close', (code) => {
      result.code = code;
      if (code === 0) {
        resolve(result);
      } else {
        reject(result);
      }
    });
  });
}
