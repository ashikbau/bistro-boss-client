import React, { useEffect, useState } from 'react';
import SectionTitle from '../../../components/SectionTitle/SectionTitle';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import useAuth from '../../../hooks/useAuth';
import Swal from 'sweetalert2';
import "./Featured.css";
import useCart from '../../../hooks/useCart';

const Featured = () => {
    const [items, setItems] = useState([]);
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();
    const [, refetch] = useCart();

    useEffect(() => {
        axiosSecure.get('/menu?featured=true') // backend filters menu items with featured: true
            .then(res => setItems(res.data))
            .catch(err => console.error('Error loading featured menu:', err));
    }, [axiosSecure]);

    const handleAddToCart = (item) => {
        if (!user) {
            Swal.fire('Login Required', 'Please log in to add items to cart.', 'warning');
            return;
        }

        const cartItem = {
            menuId: item._id,
            name: item.name,
            image: item.image,
            price: item.price,
            email: user.email,
        };

        axiosSecure.post('/carts', cartItem)
            .then(res => {
                if (res.data.insertedId) {
                    refetch();
                    Swal.fire('Added!', `${item.name} added to cart`, 'success');
                }
            })
            .catch(() => {
                Swal.fire('Error', 'Could not add to cart', 'error');
            });
    };

    return (
        <div className="featured-item bg-fixed text-neutral-content pt-8 my-20">
            <SectionTitle subHeading="check it out" heading="Featured Items" />

            {items.length > 0 ? (
                <div className="grid md:grid-cols-2 gap-10 bg-slate-700 bg-opacity-60 pb-20 pt-12 px-10 rounded-lg">
                    {items.map(item => (
                        <div key={item._id} className="md:flex items-center bg-gray-800 p-6 rounded shadow-md">
                            <div className="md:w-1/2">
                                <img
                                    src={item.image}
                                    alt={item.name}
                                    className="w-full h-auto rounded"
                                />
                            </div>
                            <div className="md:ml-6 md:w-1/2 mt-4 md:mt-0">
                                <p>{item.date || "Today's Special"}</p>
                                <p className="uppercase font-bold text-xl">{item.name}</p>
                                <p className="mt-2">{item.recipe}</p>
                                <p className="mt-2 font-bold text-green-300">${item.price}</p>
                                <button
                                    onClick={() => handleAddToCart(item)}
                                    className="btn btn-outline border-0 border-b-4 mt-4"
                                >
                                    Add To Cart
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <p className="text-center text-white">No featured items found.</p>
            )}
        </div>
    );

};

export default Featured;