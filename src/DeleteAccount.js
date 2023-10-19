import React, { useState, useEffect } from 'react';
import axios from 'axios';

function DeleteAccount({ isLoggedIn, username, onDeleteSuccess }) {
    const [isDeleteEnabled, setDeleteEnabled] = useState(false);

    useEffect(() => {
        if (isLoggedIn) {
            setDeleteEnabled(true);
        } else {
            setDeleteEnabled(false);
        }
    }, [isLoggedIn]);

    const handleDeleteAccount = () => {
        if (isLoggedIn) {
            axios.delete(`http://localhost:5000/api/user/${username}/delete`, {
                headers: {
                    'Content-Type': 'application/json',
                },
            })
                .then((response) => {
                    if (response.status === 200) {
                        console.log('Account deleted successfully');
                        onDeleteSuccess(); // Call a function to handle successful deletion
                    } else {
                        console.log('Failed to delete the account');
                    }
                })
                .catch((error) => {
                    console.error('Error while deleting the account:', error);
                });
        } else {
            console.log('User must be logged in to delete the account.');
        }
    };

    return (
        <div className="delete-account-button">
            <button
                onClick={handleDeleteAccount}
                disabled={!isDeleteEnabled}
                className={`delete-account-button${isDeleteEnabled ? '' : ' disabled'}`}
            >
                Delete Account
            </button>
        </div>
    );
}

export default DeleteAccount;
