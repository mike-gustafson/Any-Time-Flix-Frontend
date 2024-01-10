import 'bootstrap/dist/css/bootstrap.css';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import handleLogout from '@/app/utils/handleLogout';

export default function Profile({ dataProp }) {
  const router = useRouter();
  const [isLoading, setLoading] = useState(true);

  const expirationTime = new Date(parseInt(localStorage.getItem('expiration')) * 1000);
  const currentTime = Date.now();

  if (currentTime >= expirationTime) {
    handleLogout();
    alert('Session has ended. Please login to continue.');
    router.push('/');
  }

    const data = dataProp;
  return (
    <div className="container">
      <div className="main-body">
        <div className="row gutters-sm">
          <div className="col-md-4 mb-3">
            <div className="card">
              <div className="card-body text-right">
                <h4 className="mt-3">{data.firstName} {data.lastName}</h4>
                <p className="text-muted">{data.email}</p>
                <p className="text-muted">{data.userName}</p>
                <p className="text-muted">{data.city}, {data.state}, {data.country}</p>
              </div>
            </div>
          </div>
          <div className="col-md-8">
            <div className="card mb-3">
              <div className="card-body">
                <h4>Biography</h4>
                <p>{data.bio || 'No biography available.'}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
