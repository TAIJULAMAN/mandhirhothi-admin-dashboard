// Components/Subscription/UpdateSubscriptionModal.jsx
import React, { useState, useEffect } from "react";
import { Modal, message } from "antd";
import { RxCross2 } from "react-icons/rx";
import { GoPlus } from "react-icons/go";
import { useUpdateSubscriptionMutation } from "../../redux/api/manageSubscriptionApi";

export default function UpdateSubscriptionModal({ open, onClose, currentPlan, refetch }) {
  const [updateSubscription] = useUpdateSubscriptionMutation();
  const [formData, setFormData] = useState({
    subscriptionName: "",
    price: "",
    description: "",
    featuresList: [""],
  });
  const [formErrors, setFormErrors] = useState({});

  // Load current plan into form
  useEffect(() => {
    if (currentPlan) {
      setFormData({
        subscriptionName: currentPlan.subscriptionName || "",
        price: currentPlan.price?.toString() || "",
        description: currentPlan.description || "",
        featuresList: currentPlan.featuresList?.length
          ? currentPlan.featuresList.map((f) => f.value)
          : [""],
      });
    }
  }, [currentPlan]);

  const validateForm = () => {
    const errors = {};
    if (!formData.subscriptionName?.trim()) errors.subscriptionName = "Name is required";
    if (!formData.price || formData.price <= 0) errors.price = "Valid price is required";
    if (!formData.description?.trim()) errors.description = "Description is required";
    const validFeatures = formData.featuresList.filter((f) => f.trim());
    if (validFeatures.length === 0) errors.featuresList = "At least one feature is required";
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleAddFeature = () => {
    setFormData((prev) => ({ ...prev, featuresList: [...prev.featuresList, ""] }));
  };

  const handleRemoveFeature = (index) => {
    setFormData((prev) => ({
      ...prev,
      featuresList: prev.featuresList.filter((_, i) => i !== index),
    }));
  };

  const handleFeatureChange = (index, value) => {
    setFormData((prev) => ({
      ...prev,
      featuresList: prev.featuresList.map((f, i) => (i === index ? value : f)),
    }));
  };

  const handleSave = async () => {
    if (!validateForm()) return;

    try {
      const payload = {
        subscriptionName: formData.subscriptionName.trim(),
        price: Number(formData.price),
        description: formData.description.trim(),
        featuresList: formData.featuresList.filter((f) => f.trim()).map((value) => ({ value })),
      };

      console.log("Saving Data:", payload); // 👈 check payload before sending

      await updateSubscription(payload).unwrap();

      message.success("Plan updated successfully");
      onClose();
      refetch();
    } catch (error) {
      console.error("Failed to update plan:", error);
      message.error(error.data?.message || "Failed to update plan");
    }
  };

  return (
    <Modal open={open} centered onCancel={onClose} footer={null} width={600}>
      <div className="p-5 max-h-[80vh] overflow-y-auto">
        <h2 className="text-center text-2xl font-bold">Update Subscription Plan</h2>
        <p className="text-center text-gray-500 mt-2">Update plan details and features</p>

        <div className="mt-6 space-y-6">
          {/* Plan Name */}
          <div>
            <label className="block text-sm font-medium text-gray-800 mb-2">Plan Name:</label>
            <input
              type="text"
              value={formData.subscriptionName}
              onChange={(e) => setFormData((prev) => ({ ...prev, subscriptionName: e.target.value }))}
              className="p-2 block w-full border border-gray-400 rounded-md"
              placeholder="Enter plan name"
            />
            {formErrors.subscriptionName && <p className="text-red-500 text-sm">{formErrors.subscriptionName}</p>}
          </div>

          {/* Price */}
          <div>
            <label className="block text-sm font-medium text-gray-800 mb-2">Price (£):</label>
            <input
              type="number"
              value={formData.price}
              onChange={(e) => setFormData((prev) => ({ ...prev, price: e.target.value }))}
              className="p-2 block w-full border border-gray-400 rounded-md"
              placeholder="Enter price"
            />
            {formErrors.price && <p className="text-red-500 text-sm">{formErrors.price}</p>}
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-800 mb-2">Description:</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
              className="p-2 block w-full border border-gray-400 rounded-md"
              placeholder="Enter description"
            />
            {formErrors.description && <p className="text-red-500 text-sm">{formErrors.description}</p>}
          </div>

          {/* Features */}
          <div className="space-y-4">
            <label className="block text-sm font-medium text-gray-800">Features:</label>
            {formData.featuresList.map((feature, index) => (
              <div key={index} className="flex gap-2">
                <input
                  type="text"
                  value={feature}
                  onChange={(e) => handleFeatureChange(index, e.target.value)}
                  className="flex-1 p-2 border rounded-md"
                  placeholder="Enter feature"
                />
                <button
                  onClick={() => handleRemoveFeature(index)}
                  className="text-red-500 hover:text-red-700"
                >
                  <RxCross2 className="h-5 w-5" />
                </button>
              </div>
            ))}
            {formErrors.featuresList && <p className="text-red-500 text-sm">{formErrors.featuresList}</p>}
          </div>

          <div className="flex justify-end">
            <button
              onClick={handleAddFeature}
              className="flex items-center gap-2 text-green-600 hover:text-green-700"
            >
              <GoPlus className="h-5 w-5" />
              Add Feature
            </button>
          </div>
        </div>

        {/* Actions */}
        <div className="grid grid-cols-2 gap-4 mt-5">
          <button
            onClick={onClose}
            className="px-4 py-2 border border-red-200 bg-red-50 text-red-500 rounded-md hover:bg-red-100 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
          >
            Save Changes
          </button>
        </div>
      </div>
    </Modal>
  );
}
