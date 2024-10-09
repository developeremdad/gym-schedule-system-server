import QueryBuilder from '../../builder/QueryBuilder'
import { User } from '../User/user.model'

const getAllTraineesFromDB = async (query: Record<string, unknown>) => {
  const buildingQuery = new QueryBuilder(User.find(), query)
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

export const TraineeServices = {
  getAllTraineesFromDB,
}
