import React from 'react';

function useRegister() {
    const registerUser = async (data: any) => {
        try {
            const response = await fetch('/api/Users/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            if (response.ok) {
                return true;
            } else {
                throw new Error('Registration failed');
            }
        } catch (error) {
            throw error;
        }
    };

    return {
        registerUser,
    };
}

export default useRegister;