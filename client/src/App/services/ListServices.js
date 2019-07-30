class ListServicesProvider {
    getList = async() => {
        try {
            const result = await fetch('/api/getList')
            .then(res => res.json());
            return result;
        } catch(err) {
            console.log(err);
        }
    }

}

export default ListServicesProvider;
