'use client';

import React, { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import { useCartStore } from '@/store/useCartStore';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';

export default function CheckoutPage() {
  const router = useRouter();
  const { data: session } = useSession();
  const { items, getTotalPrice, clearCart } = useCartStore();
  const [mounted, setMounted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Form State
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [area, setArea] = useState('');
  const [city, setCity] = useState('Dhaka');
  const [paymentMethod, setPaymentMethod] = useState('Cash on Delivery');
  const [trxId, setTrxId] = useState('');

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  if (items.length === 0) {
    router.push('/cart');
    return null;
  }

  const itemsPrice = getTotalPrice();
  const shippingPrice = itemsPrice > 0 ? (city === 'Dhaka' ? 60 : 100) : 0;
  const totalPrice = itemsPrice + shippingPrice;

  const handleCheckout = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!session) {
      alert("Please login to place an order");
      router.push('/login');
      return;
    }

    setIsSubmitting(true);
    try {
      const orderData = {
        orderItems: items.map(i => ({
          name: i.name,
          qty: i.quantity,
          image: i.image,
          price: i.discountPrice || i.price,
          product: i._id,
        })),
        shippingAddress: { fullName, phone, address, area, city },
        paymentMethod,
        trxId: paymentMethod === 'bKash' ? trxId : undefined,
        itemsPrice,
        shippingPrice,
        totalPrice,
      };

      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderData),
      });

      if (res.ok) {
        clearCart();
        alert('Order placed successfully!');
        router.push('/dashboard');
      } else {
        const error = await res.json();
        alert(error.message);
      }
    } catch (error) {
      console.error(error);
      alert('Failed to place order');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1 bg-background py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-text-main mb-8">Checkout</h1>
          
          <form onSubmit={handleCheckout} className="flex flex-col lg:flex-row gap-8">
            
            {/* Shipping Details */}
            <div className="flex-1 space-y-6">
              <div className="bg-surface p-6 rounded-lg border border-border shadow-sm">
                <h2 className="text-xl font-bold mb-4">Delivery Information</h2>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input label="Full Name" required value={fullName} onChange={e => setFullName(e.target.value)} />
                    <Input label="Phone Number" required value={phone} onChange={e => setPhone(e.target.value)} />
                  </div>
                  <Input label="Address Details" required value={address} onChange={e => setAddress(e.target.value)} />
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input label="Area" required value={area} onChange={e => setArea(e.target.value)} />
                    <div className="w-full">
                      <label className="block text-sm font-medium text-text-main mb-1">City</label>
                      <select 
                        className="flex h-10 w-full rounded-md border border-border bg-surface px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                        value={city}
                        onChange={e => setCity(e.target.value)}
                        required
                      >
                        <option value="Dhaka">Dhaka</option>
                        <option value="Bagerhat">Bagerhat</option>
                        <option value="Bandarban">Bandarban</option>
                        <option value="Barguna">Barguna</option>
                        <option value="Barisal">Barisal</option>
                        <option value="Bhola">Bhola</option>
                        <option value="Bogra">Bogra</option>
                        <option value="Brahmanbaria">Brahmanbaria</option>
                        <option value="Chandpur">Chandpur</option>
                        <option value="Chapainawabganj">Chapainawabganj</option>
                        <option value="Chittagong">Chittagong (Chattogram)</option>
                        <option value="Chuadanga">Chuadanga</option>
                        <option value="Comilla">Comilla</option>
                        <option value="Cox's Bazar">Cox's Bazar</option>
                        <option value="Dinajpur">Dinajpur</option>
                        <option value="Faridpur">Faridpur</option>
                        <option value="Feni">Feni</option>
                        <option value="Gaibandha">Gaibandha</option>
                        <option value="Gazipur">Gazipur</option>
                        <option value="Gopalganj">Gopalganj</option>
                        <option value="Habiganj">Habiganj</option>
                        <option value="Jamalpur">Jamalpur</option>
                        <option value="Jessore">Jessore</option>
                        <option value="Jhalokati">Jhalokati</option>
                        <option value="Jhenaidah">Jhenaidah</option>
                        <option value="Joypurhat">Joypurhat</option>
                        <option value="Khagrachari">Khagrachari</option>
                        <option value="Khulna">Khulna</option>
                        <option value="Kishoreganj">Kishoreganj</option>
                        <option value="Kurigram">Kurigram</option>
                        <option value="Kushtia">Kushtia</option>
                        <option value="Lakshmipur">Lakshmipur</option>
                        <option value="Lalmonirhat">Lalmonirhat</option>
                        <option value="Madaripur">Madaripur</option>
                        <option value="Magura">Magura</option>
                        <option value="Manikganj">Manikganj</option>
                        <option value="Meherpur">Meherpur</option>
                        <option value="Moulvibazar">Moulvibazar</option>
                        <option value="Munshiganj">Munshiganj</option>
                        <option value="Mymensingh">Mymensingh</option>
                        <option value="Naogaon">Naogaon</option>
                        <option value="Narail">Narail</option>
                        <option value="Narayanganj">Narayanganj</option>
                        <option value="Narsingdi">Narsingdi</option>
                        <option value="Natore">Natore</option>
                        <option value="Netrokona">Netrokona</option>
                        <option value="Nilphamari">Nilphamari</option>
                        <option value="Noakhali">Noakhali</option>
                        <option value="Pabna">Pabna</option>
                        <option value="Panchagarh">Panchagarh</option>
                        <option value="Patuakhali">Patuakhali</option>
                        <option value="Pirojpur">Pirojpur</option>
                        <option value="Rajbari">Rajbari</option>
                        <option value="Rajshahi">Rajshahi</option>
                        <option value="Rangamati">Rangamati</option>
                        <option value="Rangpur">Rangpur</option>
                        <option value="Satkhira">Satkhira</option>
                        <option value="Shariatpur">Shariatpur</option>
                        <option value="Sherpur">Sherpur</option>
                        <option value="Sirajganj">Sirajganj</option>
                        <option value="Sunamganj">Sunamganj</option>
                        <option value="Sylhet">Sylhet</option>
                        <option value="Tangail">Tangail</option>
                        <option value="Thakurgaon">Thakurgaon</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-surface p-6 rounded-lg border border-border shadow-sm">
                <h2 className="text-xl font-bold mb-4">Payment Method</h2>
                <div className="space-y-3">
                  <label className="flex items-center gap-3 p-3 border border-border rounded-md cursor-pointer hover:bg-gray-50">
                    <input 
                      type="radio" 
                      name="paymentMethod" 
                      value="Cash on Delivery"
                      checked={paymentMethod === 'Cash on Delivery'}
                      onChange={e => setPaymentMethod(e.target.value)}
                      className="text-primary focus:ring-primary w-4 h-4"
                    />
                    <span className="font-medium text-text-main">Cash on Delivery</span>
                  </label>
                  <label className="flex items-center gap-3 p-3 border border-border rounded-md cursor-pointer hover:bg-gray-50">
                    <input 
                      type="radio" 
                      name="paymentMethod" 
                      value="bKash"
                      checked={paymentMethod === 'bKash'}
                      onChange={e => setPaymentMethod(e.target.value)}
                      className="text-primary focus:ring-primary w-4 h-4"
                    />
                    <span className="font-medium text-text-main">bKash (Manual)</span>
                  </label>
                  
                  {paymentMethod === 'bKash' && (
                    <div className="ml-7 p-4 bg-gray-50 rounded-md border border-gray-200">
                      <p className="text-sm text-text-main mb-3">
                        Please send <strong className="text-primary text-lg">৳{totalPrice}</strong> to our bKash Personal Number: <strong className="font-bold text-lg">017XXXXXXXX</strong> (Demo)
                      </p>
                      <Input 
                        label="Enter your bKash TrxID" 
                        required 
                        value={trxId} 
                        onChange={e => setTrxId(e.target.value)} 
                        placeholder="e.g. 8N52A8XXXX"
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Order Summary */}
            <div className="w-full lg:w-96 flex-shrink-0">
              <div className="bg-surface p-6 rounded-lg border border-border shadow-sm sticky top-24">
                <h2 className="text-lg font-bold text-text-main mb-4">Order Summary</h2>
                
                <div className="space-y-4 mb-4 border-b border-border pb-4 max-h-64 overflow-y-auto">
                  {items.map(item => (
                    <div key={item._id} className="flex justify-between text-sm">
                      <span className="truncate pr-4 text-text-light">{item.quantity} x {item.name}</span>
                      <span className="font-medium text-text-main">৳{(item.discountPrice || item.price) * item.quantity}</span>
                    </div>
                  ))}
                </div>

                <div className="space-y-3 text-sm text-text-main mb-4">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>৳{itemsPrice}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Delivery Fee</span>
                    <span>৳{shippingPrice}</span>
                  </div>
                  <div className="border-t border-border pt-3 flex justify-between font-bold text-lg">
                    <span>Total</span>
                    <span className="text-primary">৳{totalPrice}</span>
                  </div>
                </div>

                <Button 
                  type="submit"
                  className="w-full py-6 text-lg" 
                  isLoading={isSubmitting}
                >
                  Confirm Order
                </Button>
              </div>
            </div>
            
          </form>
        </div>
      </main>
      <Footer />
    </div>
  );
}
