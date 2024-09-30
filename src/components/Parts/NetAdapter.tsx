import  { useState, useEffect } from 'react';

interface Item {
    na_id: number;
    brand: string;
    model: string;
    protocol: string;
    interface: string;
    max_speed: string;
    price: string;
}

function NetAdapter(){
    const [data, setData] = useState<Item[]>([]);
    useEffect(() => {
        fetch('http://localhost:5500/NetAdapter')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => setData(data))
            .catch(error => console.error('Error fetching data:', error));
    }, []);
    return(
        <>
            <table className="table table-bordered">
                <thead>
                    <tr>
                        <th scope="col">Brand</th>
                        <th scope="col">Model</th>
                        <th scope="col">Protocol</th>
                        <th scope="col">Interface</th>
                        <th scope="col">Max Speed</th>
                        <th scope="col">Price</th>
                        <th scope="col">Selection</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((item: Item) => (
                        <tr key={item.na_id}>
                            <td>{item.brand}</td>
                            <td>{item.model}</td>
                            <td>{item.protocol}</td>
                            <td>{item.interface}</td>
                            <td>{item.max_speed}</td>
                            <td>{item.price}</td>
                            <td><button>Add To Build</button></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    )
}

export default NetAdapter;