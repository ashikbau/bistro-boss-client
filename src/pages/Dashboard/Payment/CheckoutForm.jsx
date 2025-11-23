import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useCart from "../../../hooks/useCart";
import useAuth from "../../../hooks/useAuth";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const CheckoutForm = () => {
  const [error, setError] = useState('');
  const [clientSecret, setClientSecret] = useState('');
  const [transactionId, setTransactionId] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  const stripe = useStripe();
  const elements = useElements();
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const [cart, refetch] = useCart();
  const navigate = useNavigate();

  const totalPrice = cart.reduce((total, item) => total + item.price, 0);

  // Create payment intent when total is ready
  useEffect(() => {
    if (totalPrice > 0) {
      axiosSecure.post('/create-payment-intent', { price: totalPrice })
        .then(res => {
          setClientSecret(res.data.clientSecret);
        })
        .catch(err => console.error("Error creating payment intent:", err));
    }
  }, [axiosSecure, totalPrice]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) return;

    const card = elements.getElement(CardElement);
    if (!card) return;

    // Create payment method
    const { error: paymentError, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card,
    });

    if (paymentError) {
      setError(paymentError.message);
      return;
    } else {
      setError('');
    }

    // Confirm payment
    const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: card,
        billing_details: {
          email: user?.email || 'anonymous',
          name: user?.displayName || 'anonymous',
        },
      },
    });

    if (confirmError) {
      console.error('Confirm payment error:', confirmError);
      setError(confirmError.message);
      return;
    }

    if (paymentIntent.status === 'succeeded') {
      setTransactionId(paymentIntent.id);

      // Prepare payment object
      const payment = {
        email: user.email,
        phone: phoneNumber,
        price: totalPrice,
        transactionId: paymentIntent.id,
        date: new Date(),
        cartIds: cart.map(item => item._id),
        menuItemIds: cart.map(item => item.menuId),
        status: 'Paid',
      };

      try {
        const res = await axiosSecure.post('/orders', payment);
        refetch();

        if (res.data?.orderResult?.insertedId) {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Thank you for your payment!",
            showConfirmButton: false,
            timer: 2000,
          });
          navigate('/dashboard/paymentHistory');
        }
      } catch (err) {
        console.error("Failed to save payment:", err);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto bg-white p-6 rounded-md shadow-md">
      <h2 className="text-xl font-bold mb-4">Complete Your Payment</h2>

      {/* Phone Input */}
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Phone Number</label>
        <input
          type="tel"
          required
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          placeholder="+45 12345678"
          className="input input-bordered w-full"
        />
      </div>

      {/* Stripe Card Element */}
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Card Info</label>
        <div className="border p-3 rounded-md">
          <CardElement
            options={{
              style: {
                base: {
                  fontSize: '16px',
                  color: '#32325d',
                  '::placeholder': {
                    color: '#aab7c4',
                  },
                },
                invalid: {
                  color: '#fa755a',
                },
              },
            }}
          />
        </div>
      </div>

      {/* Error Message */}
      {error && <p className="text-red-600 mt-2">{error}</p>}

      {/* Success Message */}
      {transactionId && (
        <p className="text-green-600 mt-2">
          ✅ Transaction successful! ID: <strong>{transactionId}</strong>
        </p>
      )}

      {/* Submit Button */}
      <button
        className="btn btn-primary w-full mt-4"
        type="submit"
        disabled={!stripe || !clientSecret}
      >
        Pay DKK {totalPrice.toFixed(2)}
      </button>
    </form>
  );
};

export default CheckoutForm;



