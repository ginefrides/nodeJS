const User = require('../model/User')

module.exports = class UserController {

  static newUser(req, res) {
    res.render('users/userform')
  }

  static async newUserSave(req, res) {
    const usuario = {
      nome: req.body.nome,
      modelo: req.body.modelo,
      motor: req.body.motor,
      ano: req.body.ano,
      fab: req.body.fab,
      vlr: req.body.vlr,
      cor: req.body.cor,
      opc: req.body.opc,
    }

    await User.create(usuario)
      .then(() => {
        this.allUsers()//carrega todos os carros
      }).catch((error) => {
        console.log(error)
      })
    res.redirect('/users/allUsers')

  }
  static async home(req, res) {
    res.render('users/home')
  }

  static async allUsers(req, res) {
    const users = await User.findAll({ raw: true })
    res.render('users/viewuser', { users })
  }

  static async updateUser(req, res) {
    const id = req.params.id
    const user = await User.findOne({ where: { id: id }, raw: true })
    res.render('users/edit', { user })

  }

  static async updateUserSave(req, res) {
    const id = req.body.id
    const user = {
      nome: req.body.nome,
      modelo: req.body.modelo,
      motor: req.body.motor,
      ano: req.body.ano,
      fab: req.body.fab,
      vlr: req.body.vlr,
      cor: req.body.cor,
      opc: req.body.opc
    }
    await User.update(user, { where: { id: id } })
      .then(res.redirect('/users/allUsers'))
      .catch((err) => {
        console.log(err)
      })
  }

  static async removeUser(req, res) {
    const id = req.body.id
    await User.destroy({ where: { id: id } })
      .then(res.redirect('/users/allUsers'))
      .catch((err) => {
        console.log(err)
      })
  }


}
