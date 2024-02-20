import React, { useState } from 'react';
import '../styles/SolarSystem.css';

const AddObjectModal = ({ isOpen, onClose, onAdd }) => {
    const [name, setName] = useState('');
    const [latitude, setLatitude] = useState(''); // Initialisez comme chaîne vide
    const [longitude, setLongitude] = useState(''); // Initialisez comme chaîne vide

    if (!isOpen) return null;

    const handleAddClick = () => {
        const newObject = {
            name: name,
            latitude: parseFloat(latitude) || 0, // Convertissez en nombre, avec 0 comme valeur par défaut
            longitude: parseFloat(longitude) || 0 // Convertissez en nombre, avec 0 comme valeur par défaut
        };
        onAdd(newObject);
        onClose();
        setName('');
        setLatitude(''); // Réinitialisez comme chaîne vide
        setLongitude(''); // Réinitialisez comme chaîne vide
    };

    return (
        <div className='celestial-modal'  style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 1001  // Assurez-vous que ce z-index est supérieur à celui de tous les autres éléments
        }}>
            <div className='celestial-modal' style={{ position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', backgroundColor: 'white', padding: '20px', zIndex: 1000, border: '1px solid black' }}
            >
            <h2>Ajouter un Objet Céleste</h2>
            <input
                type="text"
                placeholder="Nom"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />
            <input
                type="number"
                placeholder="Latitude"
                value={latitude}
                onChange={(e) => setLatitude(e.target.value)}
            />
            <input
                type="number"
                placeholder="Longitude"
                value={longitude}
                onChange={(e) => setLongitude(e.target.value)}
            />
            <button className='btn' onClick={handleAddClick}>Ajouter</button>
            <button className='btn' onClick={onClose}>Fermer</button>
        </div>
        </div>
    );
};

export default AddObjectModal;