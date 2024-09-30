import { useEffect, useState } from "react";

interface Item {
    storage_id: number;
    name: string;
    type: string;
    form_factor: string;
    capacity: string;
    cache_size: string;
    interface: string;
    price: string;
}
function Storage(){
    const [data, setData] = useState<Item[]>([]);
    useEffect(() => {
        fetch('http://localhost:5500/Storage')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
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
                        <th scope="col">Model</th>
                        <th scope="col">Type</th>
                        <th scope="col">Form Factor</th>
                        <th scope="col">Storage Capacity</th>
                        <th scope="col">Cache Capacity</th>
                        <th scope="col">Interface</th>
                        <th scope="col">Price</th>
                        <th scope="col">Selection</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((item: Item) => (
                        <tr key={item.storage_id}>
                            <td>{item.name}</td>
                            <td>{item.type}</td>
                            <td>{item.form_factor}</td>
                            <td>{item.capacity}</td>
                            <td>{item.cache_size}</td>
                            <td>{item.interface}</td>
                            <td>{item.price}</td>
                            <td><button>Add To Build</button></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    )
}

export default Storage;