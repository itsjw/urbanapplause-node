export default opts => {
  return new Promise((resolve, reject) => {
    let xhr = new XMLHttpRequest();
    console.log('new xhr created');
      xhr.open(opts.method || "GET", opts.url, true);
      xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhr.onload = () => {
      console.log('xhr onload called');
      if (xhr.status >= 200 && xhr.status < 300) {
        console.log('about to request xhr reqponse which is', xhr.response);
                resolve(xhr.response);
      } else {

                console.log('rejecting', xhr.statusText);
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
          console.log('error')
        };
        if (opts.headers) {
            Object.keys(opts.headers).forEach(key => {
                xhr.setRequestHeader(key, opts.headers[key]);
            });
        }

        xhr.send(opts.data);
    });
}
