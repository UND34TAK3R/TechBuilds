import { useState, useEffect } from 'react';
import axios from 'axios';

function BuildAuth() {
    const [buildId, setBuildId] = useState<any>();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            axios
                .get('http://localhost:5500/build/status', {
                    headers: { Authorization: `Bearer ${token}` },
                })
                .then((response) => {
                    if (response.status === 201) {
                        setBuildId(response.data.build_id);
                    }
                })
                .catch((error) => {
                    console.error('Error verifying token:', error);
                });
        }
    }, []);

    return { buildId }; // Return an object with buildId
}

export default BuildAuth;
