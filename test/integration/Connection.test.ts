import PgPromiseConnectionAdapter from "../../src/infra/database/PgPromiseConnectionAdapter"

test.skip('deve criar um conexao com o banco de dados', async () => {
    const connection = PgPromiseConnectionAdapter.getInstance()
    const itemsData = await connection.query("select * from ccca.item", [])
    console.log(itemsData)
    expect(itemsData).toHaveLength(6)
})