import React from 'react'


interface User {
    id: number;
    name: string;
    email: string
}

const UsersPage = async () => {
    const res = await fetch(
        'https://jsonplaceholder.typicode.com/users',
        { cache:  'no-store'} // caching here happening - every ten sec data is fetching if {next: { revalidate: 10 }}
    )
    const users: User[] = await res.json()

    return (
        <>
        <h1>UsersPage</h1>
        <p>{new Date().toLocaleTimeString()}</p>
        <ul>
            {users.map(user => <li key={user.id}>
                <th>{user.name}</th>
                <th>{user.email}</th>

            </li>)}
        </ul>
        </>
    )
}

export default UsersPage