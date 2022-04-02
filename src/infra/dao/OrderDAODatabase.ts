import OrderDao from "../../application/dao/OrderDAO";
import Connection from "../database/Connection";

export default class OrderDaoDatabase implements OrderDao {
    constructor(
        readonly connection: Connection
    ) {
    }

    async get(code: string): Promise<any> {
        return this.connection.query("select code, total::float from ccca.order where code = $1", [code])
    }

    async findAll(): Promise<any> {
        return this.connection.query("select code, total::float from ccca.order", [])
    }
}
