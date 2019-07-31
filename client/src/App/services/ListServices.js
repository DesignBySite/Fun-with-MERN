class ListServicesProvider {
    getList = async() => {
        try {
            const result = await fetch('/api/blog/all', {
                mode: 'cors',
                headers: {
                    'content-type': 'text/html',
                    'Access-Control-Allow-Origin':'*'
                  }
            })
            .then(res => res.json());
            return result;
        } catch(err) {
            console.log(err);
        }
    }

}

export default ListServicesProvider;
