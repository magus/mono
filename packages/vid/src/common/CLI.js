import child_process from 'child_process';

export function execSync(cmd) {
  return child_process.execSync(cmd).toString().trim();
}

export function exec(cmd, options = {}) {
  const result = {};
  result.stdout = '';
  result.stderr = '';
  result.code = null;

  result.promise = new Promise((resolve, reject) => {
    const child = child_process.spawn('sh', ['-c', cmd]);

    child.stdout.setEncoding('utf8');
    child.stderr.setEncoding('utf8');

    child.stdout.on('data', (data) => {
      result.stdout += data;
      if (options.verbose) {
        process.stdout.write(data);
      }
    });

    child.stderr.on('data', (data) => {
      result.stderr += data;
      if (options.verbose) {
        process.stderr.write(data);
      }
    });

    child.on('close', (code) => {
      result.code = code;
      if (code === 0) {
        resolve(result);
      } else {
        reject(result);
      }
    });
  });

  return result;
}
