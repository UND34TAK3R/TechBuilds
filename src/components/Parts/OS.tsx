import { useState, useEffect } from 'react';

interface Item {
    os_id: number;
    name: string;
    type: string;
    storage_capacity: string;
    price: string;
}
function OS(){
    const [data, setData] = useState<Item[]>([]);
    useEffect(() => {
        fetch('http://localhost:5500/OS')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok.');
                }
                return response.json();
            })
            .then(data => setData(data))
            .catch(error => console.error('Error fetching data:', error));
    })
    return(
        <>
            <table className="table table-bordered">
                <thead>
                    <tr>
                        <th scope="col">Name</th>
                        <th scope="col">Type</th>
                        <th scope="col">Storage Capacity</th>
                        <th scope="col">Price</th>
                        <th scope="col">Selection</th>
                    </tr>
                </thead>
                <tbody>
                {data.map((item: Item) => (
                        <tr key={item.os_id}>
                            <td>{item.name}</td>
                            <td>{item.type}</td>
                            <td>{item.storage_capacity}</td>
                            <td>{item.price}</td>
                            <td><button>Add To Build</button></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    )
}

export default OS;