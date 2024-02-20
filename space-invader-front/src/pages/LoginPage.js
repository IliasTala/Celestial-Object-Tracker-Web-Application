import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom'; // Importez Link depuis react-router-dom
import LoginForm from '../components/LoginForm';
import { login as loginService } from '../services/AuthService';
import { AuthContext } from '../contexts/AuthContext';
import '../styles/LoginPage.css'; // Importez votre feuille de style CSS

function LoginPage() {
  const { login } = useContext(AuthContext);
  const [error, setError] = useState('');
  const navigate = useNavigate(); // Hook pour naviguer

  const handleLogin = async (username, password) => {
    try {
        const userData = await loginService(username, password);
        if (userData.token) {
            login(userData);
            navigate('/home');
        } else {
            setError('Login failed. Token not received.');
        }
    } catch (err) {
        setError(err.response?.data?.message || 'Erreur de connexion');
    }
};

  

  return (
    <div className="login-page" style={{ backgroundColor: '#f0f0f0' }}>
      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="card">
              <div className="card-body">
                <h2 className="card-title text-center">Login</h2>
                <LoginForm onLogin={handleLogin} />
                {error && <p className="text-danger">{error}</p>}
                <div className="text-center mt-3">
                  <p>Pas encore inscrit ? <Link to="/register">Inscrivez-vous ici</Link></p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;