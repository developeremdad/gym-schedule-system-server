import QueryBuilder from '../../builder/QueryBuilder'
import { ClassSchedule } from './classSchedule.model'

const getAllClassScheduleFromDB = async (query: Record<string, unknown>) => {
  const buildingQuery = new QueryBuilder(ClassSchedule.find(), query)
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

export const ClassScheduleServices = {
  getAllClassScheduleFromDB,
}
