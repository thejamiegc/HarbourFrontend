import React, {useEffect, useState} from 'react';
import facade from "../apiFacade.js";

const Owners = ({user}) => {
    const [owners, setOwners] = useState([{
        id: "",
        name: "",
        address: "",
        phone: "",
    }]);

    useEffect(() => {
        if (user.username !== "") {
            facade.fetchData("/owner").then(res => setOwners(res));
        }
    })

    return (
        <div>
            <h1>Owners</h1>
            {user.username ? (<>
            <table className="table">
                <thead>
                <tr>
                    <th>Id</th>
                    <th>Name</th>
                    <th>Address</th>
                    <th>Phone</th>
                </tr>
                </thead>
                <tbody>
                {owners.map((owner, index) => (
                    <tr key={index}>
                        <td>{owner.id}</td>
                        <td>{owner.name}</td>
                        <td>{owner.address}</td>
                        <td>{owner.phone}</td>

                    </tr>
                ))}
                </tbody>
            </table>
                </>) : (
                <p>Please login to see the owners</p>
                )}
        </div>
    );
};

export default Owners;