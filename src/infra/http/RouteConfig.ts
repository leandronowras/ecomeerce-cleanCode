import DefaultFreightCalculator from "../../application/useCases/simulate_freight/DefaultFreightCalculator";
import SimulateFreigth from "../../application/useCases/simulate_freight/SimulateFreight";
import RepositoryFactory from "../../domain/factory/RepositoryFactory";
import PlaceOrderController from "../controller/PlaceOrderController";
import PgPromiseConnectionAdapter from "../database/PgPromiseConnectionAdapter";
import ItemRepositoryDatabase from "../repository/database/ItemRepositoryDatabase";
import Http from "./Http";

export default class RouteConfig {
    constructor(http: Http, repositoryFactory: RepositoryFactory) {
        http.on("/order", "post", async function (params: any, body: any) {
           const placeOrderController = new PlaceOrderController(repositoryFactory)
           return placeOrderController.execute(params, body)
        })
        
        http.on("/simulateFreight", "post", async function (params: any, body: any) {
            const simulateFreight = new SimulateFreigth(new ItemRepositoryDatabase(PgPromiseConnectionAdapter.getInstance()), new DefaultFreightCalculator())
            const input = body
            return await simulateFreight.execute(input)
        })
    }
}