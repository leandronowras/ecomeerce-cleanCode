export default interface OrderDao {
    get(code: string): Promise<any>
    findAll(): Promise<any>
}