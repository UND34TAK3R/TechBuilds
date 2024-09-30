import { useEffect, useState } from 'react';

interface Item {
    gpu_id: number;
    brand: string;
    model: string;
    memory_size: string;
    base_clock: string;
    boost_clock: string;
    length_mm: string;
    price: string;
}

function GPU(){
    const [data, setData] = useState<Item[]>([]);

    useEffect(() => {
        fetch('http://localhost:5500/GPU')
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
                    <th scope="col">Memory Size</th>
                    <th scope="col">Base Clock</th>
                    <th scope="col">Boost Clock</th>
                    <th scope="col">Length</th>
                    <th scope="col">Price</th>
                    <th scope="col">Selection</th>
                    </tr>
                </thead>
                <tbody>
                {data.map((item: Item) => (
                        <tr key={item.gpu_id}>
                            <td>{item.brand}</td>
                            <td>{item.model}</td>
                            <td>{item.memory_size}</td>
                            <td>{item.base_clock}</td>
                            <td>{item.boost_clock}</td>
                            <td>{item.length_mm}</td>
                            <td>{item.price}</td>
                            <td><button>Add To Build</button></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    )
}

export default GPU;