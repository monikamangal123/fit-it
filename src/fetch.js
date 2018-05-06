function getData(url, options) {
    return new Promise((resolve, reject) => {
        fetch(url, options)
            .then(response => response.json())
            .then(response => {
               return resolve(response);
            })
            .catch(e => reject(e));

    });
}

export {getData};