import React, { useState } from 'react';

function LoginForm({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Vérifiez si les valeurs sont bien récupérées
    console.log('Submitting with:', username, password);

    try {
      await onLogin(username, password);
    } catch (err) {
      // Afficher l'erreur dans le formulaire
      setError(err.message);
    }
  };

  return (
    <div className="login-form">
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="username">Nom d'utilisateur :</label>
          <input
            type="text"
            className="form-control"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Mot de passe :</label>
          <input
            type="password"
            className="form-control"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {error && <p className="text-danger">{error}</p>}
        <div className="text-center mt-3">
          <button type="submit" className="btn btn-primary">
            Se connecter
          </button>
        </div>
      </form>
    </div>
  );
}

export default LoginForm;
