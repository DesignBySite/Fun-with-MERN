class ListServicesProvider {
    getList = async() => {
        try {
            console.log('list service provider');

            const result = await fetch('/api/blog/all', {
                mode: 'cors',
                headers: {
                    'content-type': 'application/json',
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
