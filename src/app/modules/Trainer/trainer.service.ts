import QueryBuilder from '../../builder/QueryBuilder'
import { Trainer } from './trainer.model'

const getAllTrainersFromDB = async (query: Record<string, unknown>) => {
  const buildingQuery = new QueryBuilder(Trainer.find(), query)
    .filter()
    .sort()
    .paginate()
    .fields()

  const meta = await buildingQuery.countTotal()
  const result = await buildingQuery.modelQuery

  return {
    meta,
    result,
  }
}

export const TrainerServices = {
  getAllTrainersFromDB,
}
