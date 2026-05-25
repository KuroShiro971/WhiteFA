import React from 'react'

const defaultUsers = [

  {
    username: 'admin',
    password: 'whitefa-admin',
    role: 'Administrateur'
  },
  {
    username: 'entreprise',
    password: 'whitefa',
    role: 'Utilisateur'
  }
]

export default function GestionEntrepriseRP() {
  const [users, setUsers] = React.useState(() => {
    const savedUsers = localStorage.getItem('rp-users')
    return savedUsers ? JSON.parse(savedUsers) : defaultUsers
  })

  const [loggedIn, setLoggedIn] = React.useState(false)
  const [isAdmin, setIsAdmin] = React.useState(false)
  const [username, setUsername] = React.useState('')
  const [password, setPassword] = React.useState('')

  const [newUsername, setNewUsername] = React.useState('')
  const [newPassword, setNewPassword] = React.useState('')
  const [newRole, setNewRole] = React.useState('Utilisateur')

  const [ca, setCa] = React.useState(0)
  const [salaires, setSalaires] = React.useState(0)
  const [depenses, setDepenses] = React.useState(0)

  React.useEffect(() => {
    localStorage.setItem('rp-users', JSON.stringify(users))
  }, [users])

  const handleLogin = () => {
    const foundUser = users.find(
      (u) => u.username === username && u.password === password
    )

    if (foundUser) {
      setLoggedIn(true)
      setIsAdmin(foundUser.role === 'Administrateur')
    }
  }

  const createUser = () => {
    if (!newUsername || !newPassword) return

    const alreadyExists = users.find(
      (u) => u.username === newUsername
    )

    if (alreadyExists) {
      alert('Utilisateur déjà existant')
      return
    }

    const newUser = {
      username: newUsername,
      password: newPassword,
      role: newRole
    }

    setUsers([...users, newUser])

    setNewUsername('')
    setNewPassword('')
    setNewRole('Utilisateur')
  }

  const deleteUser = (usernameToDelete) => {
    const filtered = users.filter(
      (u) => u.username !== usernameToDelete
    )

    setUsers(filtered)
  }

  const benefice = ca - salaires - depenses
  const impots = benefice > 0 ? benefice * 0.15 : 0
  const restant = benefice - impots

  if (!loggedIn) {
    return (
      <div className="min-h-screen bg-zinc-950 flex items-center justify-center p-6">
        <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-8 w-full max-w-md shadow-2xl text-white">
          <h1 className="text-3xl font-bold mb-2">
            Connexion Panel
          </h1>

          <p className="text-zinc-400 mb-6">
            Accès sécurisé au système comptable.
          </p>

          <input
            type="text"
            placeholder="Nom d'utilisateur"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full bg-zinc-800 border border-zinc-700 rounded-2xl px-4 py-3 mb-4 focus:outline-none focus:ring-2 focus:ring-yellow-500"
          />

          <input
            type="password"
            placeholder="Mot de passe"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full bg-zinc-800 border border-zinc-700 rounded-2xl px-4 py-3 mb-4 focus:outline-none focus:ring-2 focus:ring-yellow-500"
          />

          <button
            onClick={handleLogin}
            className="w-full bg-yellow-500 hover:bg-yellow-400 text-black font-bold py-3 rounded-2xl transition"
          >
            Se connecter
          </button>

          <div className="mt-6 text-sm text-zinc-500 space-y-1">
            <p>• Utilisateur : entreprise / whitefa</p>
            <p>• Admin : admin / whitefa-admin</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-white p-8 flex items-center justify-center">
      <div className="w-full max-w-5xl bg-zinc-900 rounded-3xl shadow-2xl border border-zinc-800 p-8">
        <div className="mb-8 flex items-center justify-between gap-4 flex-wrap">
          <div>
            <h1 className="text-4xl font-bold tracking-tight">
              Gestion Entreprise RP
            </h1>

            <p className="text-zinc-400 mt-2">
              Calcul automatique des bénéfices et des impôts.
            </p>
          </div>

          <div className="inline-flex items-center gap-2 bg-zinc-800 border border-zinc-700 px-4 py-2 rounded-xl text-sm">
            <span className="text-yellow-400 font-semibold">
              {isAdmin ? 'ADMINISTRATEUR' : 'UTILISATEUR'}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div>
            <label className="block mb-2 text-sm font-medium text-zinc-300">
              Chiffre d'affaires ($)
            </label>

            <input
              type="number"
              value={ca}
              onChange={(e) => setCa(Number(e.target.value))}
              className="w-full bg-zinc-800 border border-zinc-700 rounded-2xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-yellow-500"
            />
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium text-zinc-300">
              Salaires ($)
            </label>

            <input
              type="number"
              value={salaires}
              onChange={(e) => setSalaires(Number(e.target.value))}
              className="w-full bg-zinc-800 border border-zinc-700 rounded-2xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-yellow-500"
            />
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium text-zinc-300">
              Dépenses ($)
            </label>

            <input
              type="number"
              value={depenses}
              onChange={(e) => setDepenses(Number(e.target.value))}
              className="w-full bg-zinc-800 border border-zinc-700 rounded-2xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-yellow-500"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-zinc-800 rounded-2xl p-6 border border-zinc-700">
            <h2 className="text-sm text-zinc-400 mb-2">Bénéfice</h2>

            <p className="text-3xl font-bold text-green-400">
              {benefice.toLocaleString()} $
            </p>
          </div>

          <div className="bg-zinc-800 rounded-2xl p-6 border border-zinc-700">
            <h2 className="text-sm text-zinc-400 mb-2">
              Impôts (15%)
            </h2>

            <p className="text-3xl font-bold text-red-400">
              {impots.toLocaleString()} $
            </p>
          </div>

          <div className="bg-zinc-800 rounded-2xl p-6 border border-zinc-700">
            <h2 className="text-sm text-zinc-400 mb-2">
              Reste après impôts
            </h2>

            <p className="text-3xl font-bold text-yellow-400">
              {restant.toLocaleString()} $
            </p>
          </div>
        </div>

        {isAdmin && (
          <div className="mt-8 bg-zinc-800 border border-zinc-700 rounded-2xl p-6">
            <h2 className="text-2xl font-bold mb-6">
              Administration Utilisateurs
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <input
                type="text"
                placeholder="Nom utilisateur"
                value={newUsername}
                onChange={(e) => setNewUsername(e.target.value)}
                className="bg-zinc-900 border border-zinc-700 rounded-2xl px-4 py-3"
              />

              <input
                type="password"
                placeholder="Mot de passe"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="bg-zinc-900 border border-zinc-700 rounded-2xl px-4 py-3"
              />

              <select
                value={newRole}
                onChange={(e) => setNewRole(e.target.value)}
                className="bg-zinc-900 border border-zinc-700 rounded-2xl px-4 py-3"
              >
                <option>Utilisateur</option>
                <option>Administrateur</option>
                <option>Comptable</option>
                <option>Gouvernement</option>
              </select>
            </div>

            <button
              onClick={createUser}
              className="bg-yellow-500 hover:bg-yellow-400 text-black font-bold px-6 py-3 rounded-2xl transition"
            >
              Créer utilisateur
            </button>

            <div className="mt-8 overflow-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-zinc-700 text-zinc-400">
                    <th className="py-3">Utilisateur</th>
                    <th className="py-3">Rôle</th>
                    <th className="py-3">Actions</th>
                  </tr>
                </thead>

                <tbody>
                  {users.map((user, index) => (
                    <tr key={index} className="border-b border-zinc-800">
                      <td className="py-3">{user.username}</td>
                      <td className="py-3">{user.role}</td>
                      <td className="py-3">
                        <button
                          onClick={() => deleteUser(user.username)}
                          className="bg-red-500 hover:bg-red-400 text-white px-4 py-2 rounded-xl"
                        >
                          Supprimer
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        <div className="mt-8 bg-zinc-800 border border-zinc-700 rounded-2xl p-6">
          <h2 className="text-xl font-semibold mb-3">
            Résumé fiscal
          </h2>

          <div className="space-y-2 text-zinc-300">
            <p>
              • Chiffre d'affaires :
              <span className="text-white font-semibold">
                {' '} {ca.toLocaleString()} $
              </span>
            </p>

            <p>
              • Total salaires :
              <span className="text-white font-semibold">
                {' '} {salaires.toLocaleString()} $
              </span>
            </p>

            <p>
              • Dépenses :
              <span className="text-white font-semibold">
                {' '} {depenses.toLocaleString()} $
              </span>
            </p>

            <p>
              • Bénéfice imposable :
              <span className="text-green-400 font-semibold">
                {' '} {benefice.toLocaleString()} $
              </span>
            </p>

            <p>
              • Taxe gouvernementale (15%) :
              <span className="text-red-400 font-semibold">
                {' '} {impots.toLocaleString()} $
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
