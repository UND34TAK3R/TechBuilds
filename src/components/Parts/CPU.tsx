import { useEffect, useState } from 'react';

interface Item {
    cpu_id: number;
    name: string;
    cores: string;
    architecture: string;
    base_clock: string;
    boost_clock: string;
    graphics: string;
    tdp: string;
    price: string;
}

function CPU() {
    const [data, setData] = useState<Item[]>([]);

    useEffect(() => {
        fetch('http://localhost:5500/CPU')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => setData(data))
            .catch(error => console.error('Error fetching data:', error));
    }, []);

    return (
        <>
            <table className="table table-bordered">
                <thead>
                    <tr>
                        <th scope="col">Name</th>
                        <th scope="col">Cores</th>
                        <th scope="col">Architecture</th>
                        <th scope="col">Base Clock</th>
                        <th scope="col">Boost Clock</th>
                        <th scope="col">Graphics</th>
                        <th scope="col">Price</th>
                        <th scope="col">Selection</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((item: Item) => (
                        <tr key={item.cpu_id}>
                            <td>{item.name}</td>
                            <td>{item.cores}</td>
                            <td>{item.architecture}</td>
                            <td>{item.base_clock}</td>
                            <td>{item.boost_clock}</td>
                            <td>{item.graphics}</td>
                            <td>{item.price}</td>
                            <td><button>Add To Build</button></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    );
}

export default CPU;
