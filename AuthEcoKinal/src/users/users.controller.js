import { changePassword } from './users.service.js'

export const updateMyPassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body

    // 🔹 Validaciones
    if (!currentPassword || !newPassword) {
      return res.status(400).json({
        error: 'Debes proporcionar la contraseña actual y la nueva contraseña'
      })
    }

    if (currentPassword.trim() === '' || newPassword.trim() === '') {
      return res.status(400).json({
        error: 'Los campos no pueden estar vacíos'
      })
    }

    if (newPassword.length < 6) {
      return res.status(400).json({
        error: 'La nueva contraseña debe tener al menos 6 caracteres'
      })
    }

    const response = await changePassword(
      req.user.id,
      currentPassword,
      newPassword
    )

    res.json(response)

  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}