import { useEffect, useState } from 'react';
import UserTable from './UserTable';
import Profile from './profile/page'

export default function UserHome() {
  const [data, setData] = useState(null);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/users`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setData(data);
        setLoading(false);
      } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
      }
    };

    fetchData();
  }, []);

  if (isLoading) return <p>Loading...</p>;
  if (!data || !data.users || data.users.length === 0) return <p>No data to display.</p>;

  return (
    <main>
      <Profile />
    </main>
  );
}
