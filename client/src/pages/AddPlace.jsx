import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/Button'; 
import AddPlaceForm from '../components/AddPlaceForm';

function AddPlace() {
    const navigate = useNavigate();
    
    const [formData, setFormData] = useState({
        location: '',
        placeName: '',
        dateVisited: '', 
        description: '',
        rating: 5,
        imageUrl: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: name === 'rating' ? Number(value) : value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault(); 
        
        try {
            const response = await fetch('http://localhost:8080/api/places', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                alert('Place added successfully!');
                navigate('/'); 
            } else {
                alert('Failed to save. Ensure all fields are filled correctly.');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Network error, make sure backend is running.');
        }
    };

    return (
        <div className="page">
            <h1>Add New Journey</h1>
            <AddPlaceForm onSubmit={handleSubmit} className="add-form">
                <div className="form-group">
                    <label>Location (City/Country) *</label>
                    <input 
                        name="location" 
                        value={formData.location} 
                        onChange={handleChange} 
                        required 
                    />
                </div>

                <div className="form-group">
                    <label>Site Name *</label>
                    <input 
                        name="placeName" 
                        value={formData.placeName} 
                        onChange={handleChange} 
                        required 
                    />
                </div>

                <div className="form-group">
                    <label>Date *</label>
                    <input 
                        name="dateVisited" 
                        type="date"        
                        value={formData.dateVisited} 
                        onChange={handleChange} 
                        required 
                    />
                </div>

                <div className="form-group">
                    <label>Rating (1-5) *</label>
                    <input 
                        name="rating" 
                        type="number" 
                        min="1" 
                        max="5" 
                        value={formData.rating} 
                        onChange={handleChange} 
                        required 
                    />
                </div>

                <div className="form-group">
                    <label>Description</label>
                    <textarea 
                        name="description" 
                        value={formData.description} 
                        onChange={handleChange} 
                    />
                </div>

                <div className="form-group">
                    <label>Image URL</label>
                    <input 
                        name="imageUrl" 
                        value={formData.imageUrl} 
                        onChange={handleChange} 
                        placeholder="https://..." 
                    />
                </div>
            </AddPlaceForm>
        </div>
    );
}

export default AddPlace;