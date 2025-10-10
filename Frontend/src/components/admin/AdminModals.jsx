import React from 'react';

const AdminModals = ({ 
  showAddUser, setShowAddUser, addUser,
  showAddProvider, setShowAddProvider, addProvider,
  showAddService, setShowAddService, addService,
  showEditService, setShowEditService, editService, editingService
}) => {
  return (
    <>
      {/* Add User Modal */}
      {showAddUser && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-gray-800 rounded-2xl p-6 w-full max-w-md">
            <h3 className="text-xl font-bold mb-4 text-gray-100">Add New User</h3>
            <form onSubmit={(e) => {
              e.preventDefault();
              const formData = new FormData(e.target);
              addUser({
                firstname: formData.get('firstname'),
                lastname: formData.get('lastname'),
                email: formData.get('email'),
                phone: formData.get('phone'),
                password: formData.get('password')
              });
            }}>
              <div className="space-y-4">
                <input name="firstname" placeholder="First Name" className="w-full p-3 border border-gray-600 bg-gray-700 text-white rounded-xl" required />
                <input name="lastname" placeholder="Last Name" className="w-full p-3 border border-gray-600 bg-gray-700 text-white rounded-xl" required />
                <input name="email" type="email" placeholder="Email" className="w-full p-3 border border-gray-600 bg-gray-700 text-white rounded-xl" required />
                <input name="phone" placeholder="Phone" className="w-full p-3 border border-gray-600 bg-gray-700 text-white rounded-xl" required />
                <input name="password" type="password" placeholder="Password" className="w-full p-3 border border-gray-600 bg-gray-700 text-white rounded-xl" required />
              </div>
              <div className="flex gap-3 mt-6">
                <button type="submit" className="flex-1 bg-blue-700 text-white py-3 rounded-xl hover:bg-blue-800">
                  Add User
                </button>
                <button type="button" onClick={() => setShowAddUser(false)} className="flex-1 bg-gray-600 text-gray-200 py-3 rounded-xl hover:bg-gray-500">
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Add Provider Modal */}
      {showAddProvider && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-gray-800 rounded-2xl p-6 w-full max-w-md">
            <h3 className="text-xl font-bold mb-4 text-gray-100">Add New Provider</h3>
            <form onSubmit={(e) => {
              e.preventDefault();
              const formData = new FormData(e.target);
              addProvider({
                firstname: formData.get('firstname'),
                lastname: formData.get('lastname'),
                email: formData.get('email'),
                contact: formData.get('contact'),
                profession: formData.get('profession'),
                experience: formData.get('experience'),
                password: formData.get('password')
              });
            }}>
              <div className="space-y-4">
                <input name="firstname" placeholder="First Name" className="w-full p-3 border border-gray-600 bg-gray-700 text-white rounded-xl" required />
                <input name="lastname" placeholder="Last Name" className="w-full p-3 border border-gray-600 bg-gray-700 text-white rounded-xl" required />
                <input name="email" type="email" placeholder="Email" className="w-full p-3 border border-gray-600 bg-gray-700 text-white rounded-xl" required />
                <input name="contact" placeholder="Contact" className="w-full p-3 border border-gray-600 bg-gray-700 text-white rounded-xl" required />
                <select name="profession" className="w-full p-3 border border-gray-600 bg-gray-700 text-white rounded-xl" required>
                  <option value="">Select Profession</option>
                  <option value="plumber">Plumber</option>
                  <option value="electrician">Electrician</option>
                  <option value="technician">Technician</option>
                  <option value="carpenter">Carpenter</option>
                  <option value="painter">Painter</option>
                  <option value="mechanic">Mechanic</option>
                </select>
                <input name="experience" type="number" placeholder="Experience (years)" className="w-full p-3 border border-gray-600 bg-gray-700 text-white rounded-xl" required />
                <input name="password" type="password" placeholder="Password" className="w-full p-3 border border-gray-600 bg-gray-700 text-white rounded-xl" required />
              </div>
              <div className="flex gap-3 mt-6">
                <button type="submit" className="flex-1 bg-green-700 text-white py-3 rounded-xl hover:bg-green-800">
                  Add Provider
                </button>
                <button type="button" onClick={() => setShowAddProvider(false)} className="flex-1 bg-gray-600 text-gray-200 py-3 rounded-xl hover:bg-gray-500">
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Add Service Modal */}
      {showAddService && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-gray-800 rounded-2xl p-6 w-full max-w-md">
            <h3 className="text-xl font-bold mb-4 text-gray-100">Add New Service</h3>
            <form onSubmit={(e) => {
              e.preventDefault();
              const formData = new FormData(e.target);
              addService({
                name: formData.get('name'),
                category: formData.get('category'),
                description: formData.get('description'),
                price: formData.get('price'),
                image: formData.get('image')
              });
            }}>
              <div className="space-y-4">
                <input name="name" placeholder="Service Name" className="w-full p-3 border border-gray-600 bg-gray-700 text-white rounded-xl" required />
                <select name="category" className="w-full p-3 border border-gray-600 bg-gray-700 text-white rounded-xl" required>
                  <option value="">Select Category</option>
                  <option value="plumber">Plumber</option>
                  <option value="electrician">Electrician</option>
                  <option value="technician">Technician</option>
                  <option value="carpenter">Carpenter</option>
                  <option value="painter">Painter</option>
                  <option value="mechanic">Mechanic</option>
                </select>
                <textarea name="description" placeholder="Service Description" className="w-full p-3 border border-gray-600 bg-gray-700 text-white rounded-xl" rows="3" required></textarea>
                <input name="price" type="number" placeholder="Price" className="w-full p-3 border border-gray-600 bg-gray-700 text-white rounded-xl" required />
                <input name="image" placeholder="Image URL" className="w-full p-3 border border-gray-600 bg-gray-700 text-white rounded-xl" required />
              </div>
              <div className="flex gap-3 mt-6">
                <button type="submit" className="flex-1 bg-orange-700 text-white py-3 rounded-xl hover:bg-orange-800">
                  Add Service
                </button>
                <button type="button" onClick={() => setShowAddService(false)} className="flex-1 bg-gray-600 text-gray-200 py-3 rounded-xl hover:bg-gray-500">
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Service Modal */}
      {showEditService && editingService && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-gray-800 rounded-2xl p-6 w-full max-w-md">
            <h3 className="text-xl font-bold mb-4 text-gray-100">Edit Service</h3>
            <form onSubmit={(e) => {
              e.preventDefault();
              const formData = new FormData(e.target);
              editService(editingService._id, {
                name: formData.get('name'),
                category: formData.get('category'),
                description: formData.get('description'),
                price: formData.get('price'),
                image: formData.get('image')
              });
            }}>
              <div className="space-y-4">
                <input name="name" defaultValue={editingService.name} placeholder="Service Name" className="w-full p-3 border border-gray-600 bg-gray-700 text-white rounded-xl" required />
                <select name="category" defaultValue={editingService.category} className="w-full p-3 border border-gray-600 bg-gray-700 text-white rounded-xl" required>
                  <option value="">Select Category</option>
                  <option value="plumber">Plumber</option>
                  <option value="electrician">Electrician</option>
                  <option value="technician">Technician</option>
                  <option value="carpenter">Carpenter</option>
                  <option value="painter">Painter</option>
                  <option value="mechanic">Mechanic</option>
                </select>
                <textarea name="description" defaultValue={editingService.description} placeholder="Service Description" className="w-full p-3 border border-gray-600 bg-gray-700 text-white rounded-xl" rows="3" required></textarea>
                <input name="price" type="number" defaultValue={editingService.price} placeholder="Price" className="w-full p-3 border border-gray-600 bg-gray-700 text-white rounded-xl" required />
                <input name="image" defaultValue={editingService.image} placeholder="Image URL" className="w-full p-3 border border-gray-600 bg-gray-700 text-white rounded-xl" required />
              </div>
              <div className="flex gap-3 mt-6">
                <button type="submit" className="flex-1 bg-blue-700 text-white py-3 rounded-xl hover:bg-blue-800">
                  Update Service
                </button>
                <button type="button" onClick={() => setShowEditService(false)} className="flex-1 bg-gray-600 text-gray-200 py-3 rounded-xl hover:bg-gray-500">
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default AdminModals;