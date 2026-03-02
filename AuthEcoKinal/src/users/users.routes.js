import { Router } from 'express'
import { validateJWT } from '../../middlewares/validate-jwt.js'
import { validateRole } from '../../middlewares/validate-role.js'
import { updateMyPassword, updateProfile } from './users.controller.js'

const router = Router()

router.patch(
  '/change-password',
  validateJWT,
  validateRole('ADMIN_GENERAL', 'USUARIO'),
  updateMyPassword
)

router.put(
  '/update-profile',
  validateJWT,
  validateRole('ADMIN_GENERAL', 'USUARIO'),
  updateProfile
)

export default router