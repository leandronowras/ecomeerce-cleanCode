import SimulateFreigth from "../../src/application/useCases/simulate_freight/SimulateFreight"
import SimulateFreigthInput from "../../src/application/useCases/simulate_freight/SimulateFreightInput"
import DefaultFreightCalculator from "../../src/application/useCases/simulate_freight/DefaultFreightCalculator"
import PgPromiseConnectionAdapter from "../../src/infra/database/PgPromiseConnectionAdapter"
import ItemRepositoryDatabase from "../../src/infra/repository/database/ItemRepositoryDatabase"

test('deve simular o frete dos itens', async () => {
    const connection = PgPromiseConnectionAdapter.getInstance()
    const itemRepository = new ItemRepositoryDatabase(connection)
    const freightCalculator = new DefaultFreightCalculator()
    const simulateFreight = new SimulateFreigth(itemRepository, freightCalculator)
    const input = new SimulateFreigthInput([
        {
            idItem: 4,
            quantity: 1
        },
        {
            idItem: 5,
            quantity: 1 
        },
        {
            idItem: 6,
            quantity: 3
        }
    ])

    const output = await simulateFreight.execute(input)
    expect(output.amount).toBe(260)
})