import nodemailer from 'nodemailer'

export const sendVerificationEmail = async (email, token) => {

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  })

const verificationLink = `${token}`

  await transporter.sendMail({
    from: `"Autenticacion ECO KINAL" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: 'Verifica tu cuenta!',
    html: `
      <h2>Verifica tu cuenta</h2>
      <p>Copia este token y pegalo donde se te solicita para verificar tu cuenta:</p>
      <br>
      <a href="${verificationLink}">${verificationLink}</a>
    `
  })
}
