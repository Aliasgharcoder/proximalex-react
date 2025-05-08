import React, { useState } from 'react';
import { UserCog, Save, Lock,Edit2,FileText, Briefcase, Phone, Mail, User, ChevronDown } from 'lucide-react';

const ProfileSettingsView = () => {
  const [form, setForm] = useState({
    fullName: 'John Doe',
    email: 'johndoe@lawfirm.com',
    phone: '+1 (234) 567-8900',
    specialization: 'Criminal Law',
    barNumber: 'BAR-12345',
    yearsOfPractice: '10',
    bio: 'Experienced criminal defense attorney with over 10 years of practice. Specialized in white-collar crimes and federal cases. Admitted to the State Bar and U.S. District Court.',
  });

  const [isEditing, setIsEditing] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      console.log('Updated Profile:', form);
      setIsSubmitting(false);
      setIsEditing(false);
      // Show success message
    }, 1500);
  };

  const toggleEdit = () => {
    setIsEditing(!isEditing);
  };

  return (
    <div className="bg-gray-50 min-h-screen p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-indigo-100 rounded-lg text-indigo-600">
              <UserCog className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-2xl font-semibold text-gray-800">Profile Settings</h1>
              <p className="text-sm text-gray-500">
                Manage your professional profile and account details
              </p>
            </div>
          </div>
          
          {!isEditing ? (
            <button
              onClick={toggleEdit}
              className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
            >
              <Edit2 className="w-4 h-4" />
              <span>Edit Profile</span>
            </button>
          ) : (
            <div className="flex gap-3">
              <button
                onClick={toggleEdit}
                className="flex items-center gap-2 bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <X className="w-4 h-4" />
                <span>Cancel</span>
              </button>
              <button
                type="submit"
                form="profile-form"
                disabled={isSubmitting}
                className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors disabled:opacity-70"
              >
                {isSubmitting ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Save className="w-4 h-4" />
                )}
                <span>{isSubmitting ? 'Saving...' : 'Save Changes'}</span>
              </button>
            </div>
          )}
        </div>

        {/* Profile Form */}
        <form
          id="profile-form"
          onSubmit={handleSubmit}
          className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden"
        >
          {/* Personal Information Section */}
          <div className="border-b border-gray-200 p-6">
            <h2 className="text-lg font-medium text-gray-900 mb-6 flex items-center gap-2">
              <User className="w-5 h-5 text-gray-500" />
              <span>Personal Information</span>
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                {isEditing ? (
                  <input
                    type="text"
                    name="fullName"
                    value={form.fullName}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    required
                  />
                ) : (
                  <div className="px-3 py-2 text-gray-900">{form.fullName}</div>
                )}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                {isEditing ? (
                  <div className="relative">
                    <input
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                      required
                    />
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                      <Mail className="h-5 w-5 text-gray-400" />
                    </div>
                  </div>
                ) : (
                  <div className="px-3 py-2 text-gray-900 flex items-center gap-2">
                    <Mail className="w-4 h-4 text-gray-400" />
                    {form.email}
                  </div>
                )}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                {isEditing ? (
                  <div className="relative">
                    <input
                      type="tel"
                      name="phone"
                      value={form.phone}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    />
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                      <Phone className="h-5 w-5 text-gray-400" />
                    </div>
                  </div>
                ) : (
                  <div className="px-3 py-2 text-gray-900 flex items-center gap-2">
                    <Phone className="w-4 h-4 text-gray-400" />
                    {form.phone}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Professional Information Section */}
          <div className="border-b border-gray-200 p-6">
            <h2 className="text-lg font-medium text-gray-900 mb-6 flex items-center gap-2">
              <Briefcase className="w-5 h-5 text-gray-500" />
              <span>Professional Information</span>
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Specialization</label>
                {isEditing ? (
                  <select
                    name="specialization"
                    value={form.specialization}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  >
                    <option>Criminal Law</option>
                    <option>Corporate Law</option>
                    <option>Family Law</option>
                    <option>Intellectual Property</option>
                    <option>Real Estate Law</option>
                    <option>Tax Law</option>
                  </select>
                ) : (
                  <div className="px-3 py-2 text-gray-900">{form.specialization}</div>
                )}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Bar Number</label>
                {isEditing ? (
                  <input
                    type="text"
                    name="barNumber"
                    value={form.barNumber}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  />
                ) : (
                  <div className="px-3 py-2 text-gray-900 flex items-center gap-2">
                    <Lock className="w-4 h-4 text-gray-400" />
                    {form.barNumber}
                  </div>
                )}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Years of Practice</label>
                {isEditing ? (
                  <input
                    type="number"
                    name="yearsOfPractice"
                    value={form.yearsOfPractice}
                    onChange={handleChange}
                    min="0"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  />
                ) : (
                  <div className="px-3 py-2 text-gray-900">{form.yearsOfPractice} years</div>
                )}
              </div>
            </div>
          </div>

          {/* Bio Section */}
          <div className="p-6">
            <h2 className="text-lg font-medium text-gray-900 mb-6 flex items-center gap-2">
              <FileText className="w-5 h-5 text-gray-500" />
              <span>Professional Bio</span>
            </h2>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">About You</label>
              {isEditing ? (
                <textarea
                  name="bio"
                  value={form.bio}
                  onChange={handleChange}
                  rows={5}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                />
              ) : (
                <div className="px-3 py-2 text-gray-900 whitespace-pre-line">{form.bio}</div>
              )}
            </div>
          </div>

          {/* Form Actions (for mobile) */}
          {isEditing && (
            <div className="md:hidden border-t border-gray-200 p-4 bg-gray-50">
              <div className="flex justify-end gap-3">
                <button
                  type="button"
                  onClick={toggleEdit}
                  className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors disabled:opacity-70"
                >
                  {isSubmitting ? 'Saving...' : 'Save Changes'}
                </button>
              </div>
            </div>
          )}
        </form>

        {/* Password Section */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 mt-6 p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-6 flex items-center gap-2">
            <Lock className="w-5 h-5 text-gray-500" />
            <span>Password & Security</span>
          </h2>
          
          <button className="text-indigo-600 hover:text-indigo-800 font-medium">
            Change Password
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileSettingsView;