import Item from "../../../domain/entity/Item"

export default interface FreightCalculator {
     calculate(item: Item): number
}