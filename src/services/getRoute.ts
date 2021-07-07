export const getRoute = async (service: any, params: any): Promise<any> => {
    try {

        const result = await service.getDodoRoute(params);
        if (result.status !== 200) {
            throw new Error(result.data);
        }
        if (result.status === 200 && !result.code) {
            return result.data
        }
    } catch (error) {
        console.log(error);

        getRoute(service, params)

    }
}