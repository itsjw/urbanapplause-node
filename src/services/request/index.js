export default opts => {
  console.log(opts);

  return new Promise((resolve, reject) => {
    let xhr = new XMLHttpRequest();
    xhr.open(opts.method || "GET", opts.url, true);

    xhr.onload = () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        resolve(xhr.response);
      } else {
        reject({
          status: xhr.status,
          statusText: xhr.statusText
        });
      }
    };
    xhr.onerror = () => {
      reject({
        status: this.status,
        statusText: xhr.statusText
      });
    };
    if (opts.headers) {
      Object.keys(opts.headers).forEach(key => {
        xhr.setRequestHeader(key, opts.headers[key]);
      });
    }

    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send(JSON.stringify(opts.data));
  });
}
