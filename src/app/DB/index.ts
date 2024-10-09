import config from '../config'
import { USER_ROLE } from '../modules/User/user.constant'
import { User } from '../modules/User/user.model'

const adminUser = {
  fullName: 'admin',
  email: 'mdemdadullahammed@gmail.com',
  password: config.super_admin_password,
  role: USER_ROLE.superAdmin,
}

const seedAdmin = async () => {
  //when database is connected, we will check is there any user who is super admin
  const isAdminExits = await User.findOne({ role: USER_ROLE.superAdmin })

  if (!isAdminExits) {
    // await User.create(adminUser)
  }
}

export default seedAdmin
