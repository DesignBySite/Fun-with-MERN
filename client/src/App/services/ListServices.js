class ListServicesProvider {
    getList = async() => {
        try {
            console.log('list service provider');

            const result = await fetch('/api/blog/all');
            const body = await result.json();
            console.log(body);            
            return body;
        } catch(err) {
            console.log(err);
        }
    }

}

export default ListServicesProvider;
