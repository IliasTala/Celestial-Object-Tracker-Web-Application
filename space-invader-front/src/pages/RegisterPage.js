import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import RegisterForm from '../components/RegisterForm';
import { register } from '../services/AuthService';

function RegisterPage() {
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (username, email, password) => {
    try {
      await register(username, email, password);
      toast.success("Inscription réussie !");
      setTimeout(() => navigate('/login'), 3000); // Redirection après 3 secondes
    } catch (error) {
      toast.error("Erreur d'inscription: " + error.response?.data?.message || 'Erreur lors de l’inscription');
    }
  };

  return (
    <div className="login-page" style={{ backgroundColor: '#f0f0f0' }}>
      <ToastContainer />
      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="card">
              <div className="card-body">
                <h2 className="card-title text-center">Inscription</h2>
                <RegisterForm onRegister={handleRegister} />
                {error && <p className="text-danger">{error}</p>}
                <div className="text-center mt-4">
                  <p>Déjà inscrit ? <Link to="/login">Retour à la connexion</Link></p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RegisterPage;
