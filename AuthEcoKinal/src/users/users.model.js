import { DataTypes } from 'sequelize'

export const initUserModel = (sequelize) => {
  return sequelize.define('users', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },

    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'El nombre no puede estar vacío'
        }
      }
    },

    username: {
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: {
        msg: 'El nombre de usuario ya existe'
      },
      validate: {
        notEmpty: {
          msg: 'El nombre de usuario no puede estar vacío'
        }
      }
    },

    email: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: {
        msg: 'El correo ya está registrado'
      },
      validate: {
        notEmpty: {
          msg: 'El correo no puede estar vacío'
        },
        isEmail: {
          msg: 'Debe proporcionar un correo válido'
        }
      }
    },

    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'La contraseña no puede estar vacía'
        },
        len: {
          args: [6, 100],
          msg: 'La contraseña debe tener al menos 6 caracteres'
        }
      }
    },

    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },

  })
}