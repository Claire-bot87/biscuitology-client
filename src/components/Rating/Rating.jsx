import { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate, Link } from 'react-router';
import { biscuitUpdate, biscuitShow } from '../../services/biscuitService';
import { UserContext } from '../../contexts/UserContext';

const RateBiscuit = () => {
    const { user } = useContext(UserContext);
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        type: '',
        image: '',
        taste: [0],
        texture: [0],
        dunkability: [0],
    });

    const [oldData, setOldData] = useState({
        name: '',
        description: '',
        type: '',
        image: '',
        taste: [0],
        texture: [0],
        dunkability: [0],
    });

    const [errors, setErrors] = useState({});
    const navigate = useNavigate();
    const { biscuitId } = useParams();

    useEffect(() => {
        if (!user) {
            navigate('/signin');
        }

        biscuitShow(biscuitId)
            .then((data) => {
                if (data.user !== user.id) {
                    navigate(`/biscuits/${biscuitId}`);
                }
                setFormData(prevData => ({
                    ...prevData,
                    name: data.name,
                    description: data.description,
                    type: data.type,
                    image: data.image,
                  }));
            });
    }, [biscuitId, navigate, user]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
                 console.log("Calling biscuitShow");
        biscuitShow(biscuitId)
            .then((data) => {
                // Correct way to update oldData
                setOldData((prevOldData) => [...prevOldData, data]);
                console.log(`NEW DATA ADDED:`, data); // Log the new data directly
            });

            // Send the updated ratings back to the server
            const updatedFormData = { ...formData, oldData };
            const updatedBiscuit = await biscuitUpdate(biscuitId, updatedFormData);
            navigate(`/biscuits/${updatedBiscuit.id}`);
        } catch (error) {
            setErrors(error.response?.data?.errors || {});
        }
    };

    const handleChange = (e) => {
        setErrors({ ...errors, [e.target.name]: '' });
        // const updatedValue = parseInt(e.target.value, 10) || 0;

        setFormData({ ...formData, [e.target.name]: e.target.value })

        // setFormData((prevState) => {
        //     // Add the new rating to the array (taste, texture, dunkability)
        //     return {
        //         ...prevState,
        //         [e.target.name]: [...prevState[e.target.name], updatedValue],
        //     };
        // }
    // );
    };

    const fields = [
        { name: 'taste', label: 'Taste', min: 1, max: 5 },
        { name: 'texture', label: 'Texture', min: 1, max: 5 },
        { name: 'dunkability', label: 'Dunkability', min: 1, max: 5 },
    ];

    return (
        <section>
            <section className='container'>
                <h1>Rate Biscuit</h1>
                <form onSubmit={handleSubmit}>
                    {/* Dynamic Fields for Taste, Texture, Dunkability */}
                    {fields.map((field) => (
                        <div className='form-control' key={field.name}>
                            <label htmlFor={field.name}>{field.label}</label>
                            <input
                                className='input'
                                type='number'
                                placeholder='Add rating'
                                name={field.name}
                                id={field.name}
                                min={field.min}
                                max={field.max}
                                value={formData[field.name][formData[field.name].length - 1] || ""}
                                onChange={handleChange}
                                required
                            />
                        </div>
                    ))}
                    <div className='button-group'>
                        <Link to='/'>Cancel</Link>
                        <button type='submit' disabled={formData.name === ''}>
                            Submit Rating
                        </button>
                    </div>
                </form>
            </section>
        </section>
    );
};

export default RateBiscuit;
