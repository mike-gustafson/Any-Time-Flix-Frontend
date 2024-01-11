import 'bootstrap/dist/css/bootstrap.css';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import handleLogout from '../../utils/handleLogout';

export default function Profile({ userData }) {
    const router = useRouter();
    const [isLoading, setLoading] = useState(true);

    console.log('Profile.js is open')


    const expirationTime = new Date(parseInt(localStorage.getItem('expiration')) * 1000);
    const currentTime = Date.now();

    if (currentTime >= expirationTime) {
        handleLogout();
        alert('Session has ended. Please login to continue.');
        router.push('/');
    }

    return (
        <div className="container">
            <div className="main-body">
                <div className="row gutters-sm">
                    <div className="col-md-4 mb-3">
                        <div className="card">
                            <div className="card-body text-right">
                                <h4 className="mt-3">{userData.firstName} {userData.lastName}</h4>
                                <p className="text-muted">{userData.email}</p>
                                <p className="text-muted">{userData.userName}</p>
                                <p className="text-muted">{userData.city}, {userData.state}, {userData.country}</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-8">
                        <div className="card mb-3">
                            <div className="card-body">
                                <h4>Biography</h4>
                                <p>{userData.bio || 'No biography available.'}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
