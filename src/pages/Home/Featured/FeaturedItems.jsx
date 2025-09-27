import { useEffect, useState } from 'react';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import useAuth from '../../../hooks/useAuth';
import Swal from 'sweetalert2';

const FeaturedItems = () => {
  const [featured, setFeatured] = useState([]);
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  useEffect(() => {
    axiosSecure.get('/menu/featured')
      .then(res => setFeatured(res.data))
      .catch(err => console.error(err));
  }, [axiosSecure]);

  const handleAddToCart = (item) => {
    if (!user) {
      Swal.fire("Login Required", "Please log in to add to cart.", "warning");
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
          Swal.fire("Added!", `${item.name} added to cart`, "success");
        }
      })
      .catch(err => {
        console.error(err);
        Swal.fire("Error", "Something went wrong", "error");
      });
  };

  return (
    <div className="grid md:grid-cols-3 gap-6">
      {featured.map(item => (
        <div key={item._id} className="border p-4 rounded shadow">
          <img src={item.image} alt={item.name} className="w-full h-40 object-cover mb-2" />
          <h3 className="text-lg font-bold">{item.name}</h3>
          <p>{item.recipe}</p>
          <p className="text-green-600 font-semibold">${item.price}</p>
          <button
            onClick={() => handleAddToCart(item)}
            className="mt-2 px-4 py-2 bg-yellow-500 hover:bg-yellow-600 text-white rounded"
          >
            Add to Cart
          </button>
        </div>
      ))}
    </div>
  );
};

export default FeaturedItems;
