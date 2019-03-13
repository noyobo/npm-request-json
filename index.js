const request = require('request');
const semver = require('semver');

/**
 * 请求一个包的描述信息
 * @param name 包名
 * @param version 版本默认 latest
 * @param registry 总是以为指定的为准，否则读取用户的设置项
 * @return promise
 *
 */
module.exports = function npmRequest({ name, version = 'latest', registry = 'https://registry.npmjs.com' }) {
  const registryUrl = registry || 'https://registry.npmjs.com';
  const pkgUrl = `${registryUrl}/${name.replace(/\//g, '%2f')}`;

  return new Promise((resolve, reject) => {
    request({ url: pkgUrl, json: true }, (err, response, pkgData) => {
      if (err || !pkgData || pkgData.error || !pkgData['dist-tags']) {
        reject(err || new Error(JSON.stringify(response.body)));
      } else {
        if (!semver.valid(version)) {
          version = pkgData['dist-tags'][version];
        }

        if (semver.valid(version)) {
          if (pkgData && pkgData.versions && pkgData.versions[version]) {
            resolve(pkgData.versions[version]);
          } else {
            reject(new Error('Can not found version ' + version + ' of ' + name));
          }
        } else {
          reject(new Error('Can not found version ' + version + ' of ' + name));
        }
      }
    });
  });
};
