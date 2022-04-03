import StockEntry from "../../../domain/entity/StockEntry";
import RepositoryFactory from "../../../domain/factory/RepositoryFactory";
import StockEntryRepository from "../../../domain/repository/StockEntryRepository";
import SaveStockInput from "./SaveStockInput";

export default class SaveStock {
    stockEntryRepostory: StockEntryRepository

    constructor(
        readonly repositoryFactory: RepositoryFactory
    ){
        this.stockEntryRepostory = repositoryFactory.createStockEntryRepository()
    }

    async execute(input: SaveStockInput): Promise<void> {
        await this.stockEntryRepostory.save(new StockEntry(input.idItem, input.operation, input.quantity, new Date()))
    }
}