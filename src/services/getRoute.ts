export const getRoute = async (service: any, params: any): Promise<any> => {
    try {
        
        
        const result = await service.getDodoRoute(params);
        if (result.status !== 200) {
            throw new Error(result.data);
        }
        console.log(result.data);
        return result.data
    } catch (error) {
        console.log(error);

        getRoute(service, params)

    }
}