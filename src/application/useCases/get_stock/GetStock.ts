import StockCalculator from "../../../domain/entity/service/StockCalculator";
import RepositoryFactory from "../../../domain/factory/RepositoryFactory";
import StockEntryRepository from "../../../domain/repository/StockEntryRepository";

export default class GetStock {
    stockEntryRepository: StockEntryRepository;
    constructor(
        readonly repositoryFactory: RepositoryFactory
    ) {
        this.stockEntryRepository = repositoryFactory.createStockEntryRepository()
    }

    async execute(idItem: number) : Promise<number> {
        const stockEntries = await this.stockEntryRepository.getByIdItem(idItem)
        const calculator = new StockCalculator()
        return calculator.calculate(stockEntries)
    }
}