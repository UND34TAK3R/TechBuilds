import { useEffect, useState } from 'react';
import BuildAuth from '../api';
import { Link } from 'react-router-dom';

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

function CPU({ handleCPU }: any) {
    const [data, setData] = useState<Item[]>([]);
    const { buildId } = BuildAuth();
    
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

    const handleClick = async (cpu_id: number) => {
        if (!buildId) {
            alert("Build ID not available. Please try again later.");
            return;
        }

        const BuildData = { build_id: buildId, cpu_id };  // Pass the clicked cpu_id here
        
        try {
            const response = await fetch('http://localhost:5500/AddCPU', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(BuildData),
            });
            
            const result = await response.json();

            if (response.ok) {
                alert(result.message);
                handleCPU(BuildData); 
                console.log(BuildData);
            } else {
                alert(result.message);
                console.log(BuildData);
            }
        } catch (error) {
            console.error('Error during build creation:', error);
            alert('An error occurred. Please try again later.');
            console.log(BuildData);
        }
    };

    if (!buildId) {
        return <div>Loading build data...</div>;  // Display this while waiting for buildId
    }

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
                            <td>
                                <Link to='/Builder'>
                                    <button onClick={() => handleClick(item.cpu_id)} disabled={!buildId}>
                                        Add To Build
                                    </button>
                                </Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    );
}

export default CPU;
