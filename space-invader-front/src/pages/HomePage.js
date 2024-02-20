import React, { useEffect, useState, useContext } from 'react';
import ThreeJSComponent from '../components/ThreeJSComponent';
import { getAllCelestialObjects, createCelestialObject, deleteCelestialObject, updateCelestialObject } from '../services/SatelliteService';
import { AuthContext } from '../contexts/AuthContext';
import AddObjectModal from '../components/AddObjectModal';
import '../styles/SolarSystem.css';

function HomePage() {
    const [celestialObjects, setCelestialObjects] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { user } = useContext(AuthContext);
    const isAdmin = user?.role === 'Administrator';
    
    useEffect(() => {
        if (user && user.token) {
            getAllCelestialObjects(user.token)
                .then(data => {
                    setCelestialObjects(data);
                })
                .catch(error => {
                    console.error("Erreur:", error);
                });
        }
    }, [user]);

    
    
    const loadCelestialObjects = () => {
        if (user && user.token) {
            getAllCelestialObjects(user.token)
                .then(data => {
                    setCelestialObjects(data);
                })
                .catch(error => {
                    console.error("Erreur lors du chargement des objets célestes:", error);
                });
        }
    };
    
    const handleAddObject = (newObject) => {
        const token = user?.token || localStorage.getItem('token');
        if (token) {
            createCelestialObject(newObject, token)
                .then(() => {
                    loadCelestialObjects(); // Recharger les objets célestes
                    setIsModalOpen(false); // Fermer le modal
                })
                .catch(error => {
                    console.error("Erreur lors de l'ajout:", error);
                });
        }
    };
    
    const handleDeleteObject = async (id) => {
        const token = user?.token || localStorage.getItem('token');
        if (token && id) {
            try {
                await deleteCelestialObject(id, token);
                loadCelestialObjects(); // Recharger après la suppression
            } catch (error) {
            }
        } else {
            console.log("Token ou ID manquant pour la suppression");
        }
    };
    
    const handleUpdateObject = (updatedObject) => {
        const token = user?.token || localStorage.getItem('token');
        updateCelestialObject(updatedObject.id, updatedObject, token)
            .then(() => {
                loadCelestialObjects();
            })
            .catch(error => {
                console.error("Erreur lors de la mise à jour:", error);
            });
    };
    
    return (
        <div style={{ position: 'relative', width: '100vw', height: '100vh' }}>
            {/* Bouton positionné en haut de la page */}
            {isAdmin && (
                <div style={{ position: 'absolute', top: '10px', left: '10px', zIndex: 100}}>
                    <button  style={{borderColor: 'whitesmoke', borderRadius: '5px', padding: '10px 10px', }} onClick={() => setIsModalOpen(true)}>Ajouter un Objet Céleste</button>
                </div>
            )}

            {/* Composant ThreeJSComponent pour le rendu 3D */}
            <ThreeJSComponent
                celestialObjects={celestialObjects}
                isInteractive={!isModalOpen}
                onDeleteObject={handleDeleteObject}
                onUpdateObject={handleUpdateObject}
                isAdmin={isAdmin}
            />
            {isModalOpen && isAdmin && (
                <AddObjectModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onAdd={handleAddObject}
            />
            )}
           <footer className="instructions-footer">
                <p>Cliquez gauche / Touchez pour <span className="action">Orbiter</span></p>
                <p>Clic molette / Défilement / Pincement pour <span className="action">Zoomer</span></p>
                <p>Clic droit / Balayage à 3 doigts pour <span className="action">Panoramiquer</span></p>
            </footer>

        </div>
    );
}

export default HomePage;
