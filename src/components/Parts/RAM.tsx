import { useState, useEffect } from 'react';

interface Item {
    ram_id: number;
    name: string;
    type: string;
    capacity: string;
    speed: string;
    configuration: string;
    latency: string;
    price: string;
}
function RAM(){
    const [data, setData] = useState<Item[]>([]);
    useEffect(() => {
        fetch('http://localhost:5500/RAM')
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
                        <th scope="col">Memory Size</th>
                        <th scope="col">Memory Speed</th>
                        <th scope="col">Configuration</th>
                        <th scope="col">Latency</th>
                        <th scope="col">Price</th>
                        <th scope="col">Selection</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((item: Item) => (
                        <tr key={item.ram_id}>
                            <td>{item.name}</td>
                            <td>{item.type}</td>
                            <td>{item.capacity}</td>
                            <td>{item.speed}</td>
                            <td>{item.configuration}</td>
                            <td>{item.latency}</td>
                            <td>{item.price}</td>
                            <td><button>Add To Build</button></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    )
}

export default RAM;