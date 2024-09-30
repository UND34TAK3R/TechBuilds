import { useEffect, useState } from 'react';

interface Item {
    cpu_cooler_id: number;
    name: string;
    rpm: string;
    noise_level: string;
    size: string;
    tdp: string;
    price: string;
}

function CPU_Cooler(){
    const [data, setData] = useState<Item[]>([]);
    useEffect(() => {
        fetch('http://localhost:5500/CPU_Cooler')
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
                    <th scope="col">Name</th>
                    <th scope="col">RPM</th>
                    <th scope="col">Noise Level</th>
                    <th scope="col">Size</th>
                    <th scope="col">TDP</th>
                    <th scope="col">Price</th>
                    <th scope="col">Selection</th>
                    </tr>
                </thead>
                <tbody>
                {data.map((item: Item) => (
                        <tr key={item.cpu_cooler_id}>
                            <td>{item.name}</td>
                            <td>{item.rpm}</td>
                            <td>{item.noise_level}</td>
                            <td>{item.size}</td>
                            <td>{item.tdp}</td>
                            <td>{item.price}</td>
                            <td><button>Add To Build</button></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    )
}

export default CPU_Cooler;