import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

const Profile = () => {
  const { user, logout, updateProfile } = useAuth();
  const { cart, wishlist } = useCart();
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
  });
  const [message, setMessage] = useState({ type: '', text: '' });

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = async () => {
    try {
      const result = await updateProfile(formData);
      if (result.success) {
        setMessage({ type: 'success', text: 'Profile updated successfully!' });
        setIsEditing(false);
        setTimeout(() => setMessage({ type: '', text: '' }), 3000);
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'Failed to update profile' });
    }
  };

  if (!user) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h2 className="text-2xl font-bold mb-4">Please log in to view your profile</h2>
        <button
          onClick={() => navigate('/login')}
          className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700"
        >
          Go to Login
        </button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {message.text && (
        <div className={`mb-6 p-4 rounded-lg ${
          message.type === 'success' ? 'bg-green-50 text-green-700 border border-green-200' : 'bg-red-50 text-red-700 border border-red-200'
        }`}>
          {message.text}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Profile Info */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-3xl font-bold">My Profile</h1>
              <div className="flex gap-3">
                {!isEditing ? (
                  <button
                    onClick={() => setIsEditing(true)}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Edit Profile
                  </button>
                ) : (
                  <>
                    <button
                      onClick={handleSave}
                      className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
                    >
                      Save Changes
                    </button>
                    <button
                      onClick={() => {
                        setIsEditing(false);
                        setFormData({
                          name: user.name,
                          email: user.email,
                          phone: user.phone,
                        });
                      }}
                      className="border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      Cancel
                    </button>
                  </>
                )}
                <button
                  onClick={handleLogout}
                  className="border border-red-300 text-red-600 px-4 py-2 rounded-lg hover:bg-red-50 transition-colors"
                >
                  Logout
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                ) : (
                  <p className="text-lg font-semibold">{user.name}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email
                </label>
                {isEditing ? (
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                ) : (
                  <p className="text-lg">{user.email || 'Not provided'}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phone
                </label>
                {isEditing ? (
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                ) : (
                  <p className="text-lg">{user.phone || 'Not provided'}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Member Since
                </label>
                <p className="text-lg">
                  {new Date(user.createdAt).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </p>
              </div>
            </div>
          </div>

          {/* Address Book */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h2 className="text-2xl font-bold mb-6">Address Book</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="border border-gray-200 rounded-lg p-4 hover:border-blue-300 transition-colors">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-semibold">Default Shipping Address</h3>
                  <button className="text-blue-600 hover:text-blue-800 text-sm">
                    Edit
                  </button>
                </div>
                <p className="text-gray-600">123 Main Street</p>
                <p className="text-gray-600">New York, NY 10001</p>
                <p className="text-gray-600">United States</p>
                <p className="text-gray-600">Phone: (123) 456-7890</p>
              </div>

              <div className="border border-gray-200 rounded-lg p-4 hover:border-blue-300 transition-colors">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-semibold">Default Billing Address</h3>
                  <button className="text-blue-600 hover:text-blue-800 text-sm">
                    Edit
                  </button>
                </div>
                <p className="text-gray-600">123 Main Street</p>
                <p className="text-gray-600">New York, NY 10001</p>
                <p className="text-gray-600">United States</p>
                <p className="text-gray-600">Phone: (123) 456-7890</p>
              </div>
            </div>
            <button className="mt-6 border border-blue-600 text-blue-600 px-6 py-2 rounded-lg hover:bg-blue-50 transition-colors">
              + Add New Address
            </button>
          </div>
        </div>

        {/* Sidebar Stats */}
        <div className="space-y-6">
          {/* Account Stats */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h3 className="text-xl font-bold mb-4">Account Summary</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                <span className="font-medium">Items in Cart</span>
                <span className="bg-blue-600 text-white px-3 py-1 rounded-full font-bold">
                  {cart.reduce((sum, item) => sum + item.quantity, 0)}
                </span>
              </div>
              <div className="flex justify-between items-center p-3 bg-pink-50 rounded-lg">
                <span className="font-medium">Wishlist Items</span>
                <span className="bg-pink-600 text-white px-3 py-1 rounded-full font-bold">
                  {wishlist.length}
                </span>
              </div>
              <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                <span className="font-medium">Total Orders</span>
                <span className="bg-green-600 text-white px-3 py-1 rounded-full font-bold">
                  0
                </span>
              </div>
              <div className="flex justify-between items-center p-3 bg-purple-50 rounded-lg">
                <span className="font-medium">Account Status</span>
                <span className="bg-purple-600 text-white px-3 py-1 rounded-full font-bold text-sm">
                  Active
                </span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h3 className="text-xl font-bold mb-4">Quick Links</h3>
            <div className="space-y-3">
              <button
                onClick={() => navigate('/orders')}
                className="w-full text-left p-3 rounded-lg hover:bg-gray-50 transition-colors flex items-center justify-between"
              >
                <span className="flex items-center gap-3">
                  <span className="text-xl">📦</span>
                  My Orders
                </span>
                <span className="text-gray-400">→</span>
              </button>
              <button className="w-full text-left p-3 rounded-lg hover:bg-gray-50 transition-colors flex items-center justify-between">
                <span className="flex items-center gap-3">
                  <span className="text-xl">❤️</span>
                  My Wishlist
                </span>
                <span className="text-gray-400">→</span>
              </button>
              <button className="w-full text-left p-3 rounded-lg hover:bg-gray-50 transition-colors flex items-center justify-between">
                <span className="flex items-center gap-3">
                  <span className="text-xl">🔒</span>
                  Change Password
                </span>
                <span className="text-gray-400">→</span>
              </button>
              <button className="w-full text-left p-3 rounded-lg hover:bg-gray-50 transition-colors flex items-center justify-between">
                <span className="flex items-center gap-3">
                  <span className="text-xl">📱</span>
                  Notification Settings
                </span>
                <span className="text-gray-400">→</span>
              </button>
            </div>
          </div>

          {/* Security */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h3 className="text-xl font-bold mb-4">Security</h3>
            <div className="space-y-4">
              <div className="p-3 bg-yellow-50 rounded-lg">
                <p className="text-sm text-yellow-700">
                  🔒 Your account is secure. Last login: Today, 10:30 AM
                </p>
              </div>
              <button className="w-full border border-red-300 text-red-600 py-2 rounded-lg hover:bg-red-50 transition-colors">
                Delete Account
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;