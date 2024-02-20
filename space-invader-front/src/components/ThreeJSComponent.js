import React, { useRef, useEffect, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import '../styles/SolarSystem.css';


function ThreeJSComponent({ celestialObjects, isInteractive, onDeleteObject, onUpdateObject, isAdmin }) {
    const mountRef = useRef(null);
    const [selectedObject, setSelectedObject] = useState(null);
    // État pour contrôler l'affichage de la modale
    const [isModalOpen, setIsModalOpen] = useState(false);
    
    const CelestialInfoModal = ({ object, onClose, onDeleteObject, onUpdateObject }) => {
        if (!object) return null;
    
        const handleDeleteClick = () => {
            if (object?.id) {
                const isConfirmed = window.confirm("Êtes-vous sûr de vouloir supprimer cet objet céleste ?");
                if (isConfirmed) {
                    onDeleteObject(object.id);
                    onClose();
                }
            }
        };

        const handleUpdateClick = () => {
            const newName = window.prompt("Entrez le nouveau nom", object.name);
            if (newName === null) return;

            const newLatitude = window.prompt("Entrez la nouvelle latitude", object.latitude);
            if (newLatitude === null) return;

            const newLongitude = window.prompt("Entrez la nouvelle longitude", object.longitude);
            if (newLongitude === null) return;

            const updatedObject = {
                id: object.id,
                name: newName,
                latitude: parseFloat(newLatitude),
                longitude: parseFloat(newLongitude)
            };
            onUpdateObject(updatedObject);
            onClose();
        };
    
        return (
            <div className="celestial-modal" style={{ position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', backgroundColor: 'white', padding: '20px', zIndex: 1000, border: '1px solid black' }}>
                <h2>Informations sur l'Objet Céleste</h2>
                <p>Nom: {object.name}</p>
                <p>Latitude: {object.latitude}</p>
                <p>Longitude: {object.longitude}</p>
                <button  className="btn" onClick={onClose}>Fermer</button>
                {isAdmin && (
                    <>
                        <button  className="btn"  onClick={handleUpdateClick}>Modifier</button>
                        <button  className="btn"  onClick={handleDeleteClick}>Supprimer</button>
                    </>
                )}
            </div>
        );
    };



    // Fonction pour fermer la modale
    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedObject(null);
    };

    useEffect(() => {
        
        
        // Initialisation
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer({ antialias: true });
        renderer.setSize(window.innerWidth, window.innerHeight);
        mountRef.current.appendChild(renderer.domElement);

        // Gérer le redimensionnement de la fenêtre pour ajuster le canvas
        const onWindowResize = () => {
            const width = window.innerWidth;
            const height = window.innerHeight;

            renderer.setSize(width, height);
            camera.aspect = width / height;
            camera.updateProjectionMatrix();
        };

        window.addEventListener('resize', onWindowResize);
        
        // Chargeur de texture
        const textureLoader = new THREE.TextureLoader();

        // Charger l'image pour le fond
    const backgroundTexture = textureLoader.load('/image/stars.jpg');
    scene.background = backgroundTexture;
    
        // Charger la texture du Soleil
        const sunTexture = textureLoader.load('/image/sun.jpg'); // Assurez-vous que le chemin est correct
        const sunGeometry = new THREE.SphereGeometry(1, 32, 32);
        const sunMaterial = new THREE.MeshBasicMaterial({ map: sunTexture });
        const sun = new THREE.Mesh(sunGeometry, sunMaterial);
        scene.add(sun);
        sun.userData = { speed: 0.003 };
        // Textures pour les planètes
        const planetTextures = [
            textureLoader.load('/image/jupiter.jpg'),
            textureLoader.load('/image/mars.jpg'),
            textureLoader.load('/image/mercury.jpg'),
            textureLoader.load('/image/neptune.jpg'),
            textureLoader.load('/image/pluto.jpg'),
            textureLoader.load('/image/saturn.jpg'),
            textureLoader.load('/image/uranus.jpg'),
            textureLoader.load('/image/venus.jpg'),
        ];
        
        // Fonction pour convertir latitude/longitude en position 3D
        const latLongToVector3 = (latitude, longitude, radius) => {
            const phi = (90 - latitude) * (Math.PI / 180);
            const theta = (longitude + 180) * (Math.PI / 180);
            const x = -(radius * Math.sin(phi) * Math.cos(theta));
            const z = radius * Math.sin(phi) * Math.sin(theta);
            const y = radius * Math.cos(phi);
            return new THREE.Vector3(x, y, z);
        };

        // Ajouter des objets célestes avec des textures aléatoires
        const celestialMeshes = celestialObjects.map(obj => {
            const objectGeometry = new THREE.SphereGeometry(0.1, 32, 32);
            const texture = planetTextures[Math.floor(Math.random() * planetTextures.length)];
            const objectMaterial = new THREE.MeshBasicMaterial({ map: texture });
            const celestialObject = new THREE.Mesh(objectGeometry, objectMaterial);

            const position = latLongToVector3(obj.latitude, obj.longitude, 2);
            celestialObject.position.set(position.x, position.y, position.z);

            // Stocker les informations de l'objet dans userData
            celestialObject.userData = { id: obj.id, name: obj.name, latitude: obj.latitude, longitude: obj.longitude };

            scene.add(celestialObject);
            celestialObject.userData = {
                id: obj.id,
                name: obj.name,
                latitude: obj.latitude,
                longitude: obj.longitude,
                speed: Math.random() * 0.010 // Vitesse aléatoire pour la démo
            };
            return celestialObject;
        });

        // Gestionnaire de clics
        const raycaster = new THREE.Raycaster();
        const mouse = new THREE.Vector2();

        const onDocumentMouseDown = event => {
            if (!isInteractive) return;
            event.preventDefault();

            mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
            mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

            raycaster.setFromCamera(mouse, camera);
            const intersects = raycaster.intersectObjects(celestialMeshes);

            if (intersects.length > 0) {
                const selected = intersects[0].object.userData;
        setSelectedObject(selected);
            }
        };

        if (isInteractive) {
            document.addEventListener('mousedown', onDocumentMouseDown);
        } else {
            document.removeEventListener('mousedown', onDocumentMouseDown);
        }

         // Positionner la caméra
         camera.position.z = 5;

         // Ajouter des contrôles de caméra
         const controls = new OrbitControls(camera, renderer.domElement);
 
         // Ajouter de l'éclairage
         const light = new THREE.PointLight(0xFFFFFF, 1, 100);
         light.position.set(10, 10, 10);
         scene.add(light);
 
         // Boucle de rendu
         const animate = () => {
             requestAnimationFrame(animate);
             controls.update(); // Mettre à jour les contrôles de la caméra
             celestialMeshes.forEach(mesh => {
                // Exemple d'animation : rotation autour de l'axe Y
                mesh.rotation.y += mesh.userData.speed;
            });
            sun.rotation.y += sun.userData.speed;
             renderer.render(scene, camera);
         };
 
         animate();
 
         // Nettoyage
         return () => {
             window.removeEventListener('resize', onWindowResize);
             if (mountRef.current) {
                 mountRef.current.removeChild(renderer.domElement);
             }
             document.removeEventListener('mousedown', onDocumentMouseDown, false);
         };
     }, [celestialObjects, isInteractive]);
 
     useEffect(() => {
        if (selectedObject) {
            setIsModalOpen(true);
        }
    }, [selectedObject]);

    return (
        <div style={{ width: '100vw', height: '100vh', position: 'absolute', top: 0, left: 0 }}>
            <div ref={mountRef} style={{ width: '100vw', height: '100vh', position: 'relative' }}/>
            {selectedObject &&  
                <CelestialInfoModal 
                    object={selectedObject} 
                    onClose={() => setSelectedObject(null)} 
                    onDeleteObject={onDeleteObject} 
                    onUpdateObject={onUpdateObject} 
                />
            }
        </div>
    );
 }
 
 export default ThreeJSComponent;