import React, {useState} from 'react';
import facade from "../apiFacade.js";

const Home = () => {
    const [typeofsearch, setTypeofsearch] = useState("");
    const [searchWord, setSearchWord] = useState("");
    const searchList = ["Harbour", "Owners of a boat"];
    const [owners, setOwners] = useState([{
        id: "",
        name: "",
        address: "",
        phone: "",
    }]);
    const [boats, setboats] = useState([{
        id: "",
        name: "",
        brand: "",
        image: "",
    }]);

    const search = () => {
        if (typeofsearch === "Harbour" && searchWord !== "") {
            facade.fetchData(`/boat/${searchWord}` ).then(res => setboats(res));
            setOwners([{
                id: "",
                name: "",
                address: "",
                phone: "",
            }])
            console.log("Harbour");
        } else if (typeofsearch === "Owners of a boat"  && searchWord !== "") {
            facade.fetchData(`/owner/${searchWord}` ).then(res => setOwners(res));
            setboats([{
                id: "",
                name: "",
                brand: "",
                make: "",
                image: "",
            }])
            console.log("Owners of a boat");
        }else {
            console.log("No search selected");
        }

    }

    const searchWordChange = (event) => {
        setSearchWord(event.target.value)

    }

    const displayData = () => {
        if (owners[0].id !== "") {
        return (
            <div>
                <h1>Owners</h1>
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
            </div>
        )} else if (boats[0].id !== "") {
            return (
                <div>
                    <h1>Boats</h1>
                    <table className="table">
                        <thead>
                        <tr>
                            <th>Id</th>
                            <th>Name</th>
                            <th>Brand</th>
                            <th>Make</th>
                            <th>Image</th>
                        </tr>
                        </thead>
                        <tbody>
                        {boats.map((boat, index) => (
                            <tr key={index}>
                                <td>{boat.id}</td>
                                <td>{boat.name}</td>
                                <td>{boat.brand}</td>
                                <td>{boat.make}</td>
                                <td><img src={boat.image} alt="a boat" s/>  </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            )
        }
    }

    return (
        <div className="row featurette">
            <div className="col-md-7 order-md-2">

                <h1>Welcome to online Harbour!</h1>

                <input placeholder="Search" onChange={searchWordChange}/>
                <select id={"select"}
                        name="select"
                        value={typeofsearch}
                        onChange={event =>setTypeofsearch(event.target.value) }>
                    <option value="">Select a search</option>
                    {searchList.map(searchterm => (
                        <option key={searchterm} value={searchterm}> {searchterm}</option>
                    ))}
                </select>
                <button onClick={search}>Search</button>

                {displayData()}
            </div>
        </div>



    );
};

export default Home;