import { useState } from 'react';
import { useRouter } from 'next/navigation';
export default function User({ user }) {

    const [redirect, setRedirect] = useState(false);
    const router = useRouter();

    function addUserData() {
        // add email to localStorage
        localStorage.setItem('email', user.email);
        // set redirect to true
        setRedirect(true);

    }

    if (redirect) { router.push('/users/profile') }

    return (
        <tr>
            <td>{user.firstName}</td>
            <td>{user.lastName}</td>
            <td>{user.userName}</td>
            <td>{user.city}</td>
            <td>{user.state}</td>
            <td>{user.country}</td>
            <td>{user.email}</td>
            <td>{user.password}</td>
            <td>{user.bio}</td>
            <td onClick={addUserData}>{user.email}</td>
        </tr>
    )
}