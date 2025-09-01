import React, { useState } from "react";
import { FaCheck } from "react-icons/fa";
import PageHeading from "../../Components/Shared/PageHeading";
import { useGetAllSubscriptionQuery } from "../../redux/api/manageSubscriptionApi";
import UpdateSubscriptionModal from "./UpdateSubscriptionModal";
import Loader from "../../Components/Shared/Loaders/Loader";

export default function Subscription() {
  const {
    data: subscriptionData,
    isLoading,
    refetch,
  } = useGetAllSubscriptionQuery();
  const [updateModalOpen, setUpdateModalOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);

  const subscriptions = subscriptionData?.data?.all_subscription || [];

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="min-h-screen overflow-y-auto">
      <div className="flex items-center justify-start mb-5">
        <PageHeading title="Subscription Management" />
      </div>

      <div className="flex justify-center items-center gap-6 p-5">
        {subscriptions.length > 0 ? (
          subscriptions.map((plan) => (
            <div
              key={plan._id}
              className="bg-white shadow-lg relative rounded-2xl px-5 py-10 text-center"
            >
              {/* Header */}
              <div className="border-2 border-[#00823A] rounded-md">
                <div className="text-center mb-8 bg-green-50 p-5">
                  <h2 className="text-green-600 font-semibold text-base py-5">
                    {plan.subscriptionName}
                  </h2>

                  <div className="mb-5 flex items-center justify-center">
                    <span className="text-5xl font-semibold text-green-600">
                      £{plan.price}
                    </span>
                    <span className="text-green-600 ml-2">/4 months</span>
                  </div>

                  <div className="text-center pb-5">
                    <p className="text-gray-700 font-medium">{plan.description}</p>
                  </div>
                </div>

                {/* Features */}
                <div className="space-y-6 px-6 py-8">
                  {plan.featuresList?.map((feature) => (
                    <div key={feature._id} className="flex items-center gap-3">
                      <FaCheck className="w-5 h-5 text-green-600 flex-shrink-0" />
                      <span className="text-gray-700">{feature.value}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Button */}
              <div className="mt-8">
                <button
                  onClick={() => {
                    setSelectedPlan(plan);
                    setUpdateModalOpen(true);
                  }}
                  className="w-full bg-[#00823A] text-white font-semibold py-3 px-5 rounded-full transition-colors duration-200 shadow-lg hover:shadow-xl"
                >
                  Update Subscription
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="text-gray-500 text-center col-span-full">
            No plan available
          </div>
        )}
      </div>

      {/* Update Modal */}
      {selectedPlan && (
        <UpdateSubscriptionModal
          open={updateModalOpen}
          onClose={() => setUpdateModalOpen(false)}
          currentPlan={selectedPlan}
          refetch={refetch}
        />
      )}
    </div>
  );
}
