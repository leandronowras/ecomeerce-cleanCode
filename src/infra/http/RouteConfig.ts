import OrderDao from "../../application/dao/OrderDAO";
import DefaultFreightCalculator from "../../application/useCases/simulate_freight/DefaultFreightCalculator";
import SimulateFreigth from "../../application/useCases/simulate_freight/SimulateFreight";
import RepositoryFactory from "../../domain/factory/RepositoryFactory";
import Broker from "../broker/Broker";
import GetOrderController from "../controller/GetOrderController";
import GetOrdersController from "../controller/GetOrdersController";
import PlaceOrderController from "../controller/PlaceOrderController";
import Connection from "../database/Connection";
import PgPromiseConnectionAdapter from "../database/PgPromiseConnectionAdapter";
import ItemRepositoryDatabase from "../repository/database/ItemRepositoryDatabase";
import Http from "./Http";

export default class RouteConfig {
    constructor(http: Http, repositoryFactory: RepositoryFactory, orderDAO: OrderDao, broker: Broker) {
        http.on("/order", "post", async function (params: any, body: any) {
           const placeOrderController = new PlaceOrderController(repositoryFactory, broker)
           return placeOrderController.execute(params, body)
        })
        
        http.on("/simulateFreight", "post", async function (params: any, body: any) {
            const simulateFreight = new SimulateFreigth(new ItemRepositoryDatabase(PgPromiseConnectionAdapter.getInstance()), new DefaultFreightCalculator())
            const input = body
            return await simulateFreight.execute(input)
        })

        http.on("/orders", "get", async function (params: any, body: any) {
            const getOrdersController = new GetOrdersController(orderDAO)
            return getOrdersController.execute(params, body)
        })

        http.on("/orders/:code", "get", async function (params: any, body: any) {
            const getOrderController = new GetOrderController(orderDAO)
            return getOrderController.execute(params, body)
        })
    }
}