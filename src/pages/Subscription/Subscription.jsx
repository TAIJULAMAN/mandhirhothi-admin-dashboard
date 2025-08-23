import React, { useState } from "react";
import { FaCheck } from "react-icons/fa";
import PageHeading from "../../Components/Shared/PageHeading";
import { useGetAllSubscriptionQuery } from "../../redux/api/manageSubscriptionApi";
import UpdateSubscriptionModal from "./UpdateSubscriptionModal";

export default function Subscription() {
  const {
    data: subscriptionData,
    isLoading,
    refetch,
  } = useGetAllSubscriptionQuery();
  const [updateModalOpen, setUpdateModalOpen] = useState(false);

  const currentPlan = subscriptionData?.data || null;

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen overflow-y-auto">
      <div className="flex items-center justify-start mb-5">
        <PageHeading title="Subscription Management" />
      </div>
      <div className="flex justify-center items-center p-5">
        <div className="bg-white shadow-lg relative rounded-2xl px-5 py-20 w-full max-w-xl text-center">
          <h1 className="text-2xl font-bold text-center mb-6">
            Your Subscription Plan
          </h1>

          {currentPlan ? (
            <>
              <div className="flex justify-center">
                <div className="w-full max-w-md border-2 border-[#00823A] rounded-md ">
                  {/* Plan Header */}
                  <div className="text-center mb-8 bg-green-50 p-5">
                    <h2 className="text-green-600 font-semibold text-base py-10">
                      {currentPlan.subscriptionName}
                    </h2>

                    <div className="mb-5 flex items-center justify-center">
                      <span className="text-5xl font-semibold text-green-600">
                        £{currentPlan.price}
                      </span>
                      <span className="text-green-600 ml-2">/Per Month</span>
                    </div>

                    <div className="text-center pb-10">
                      <p className="text-gray-700 font-medium">
                        {currentPlan.description}
                      </p>
                    </div>
                  </div>

                  {/* Features List */}
                  <div className="space-y-6 px-6 py-8">
                    {currentPlan.featuresList
                      ?.slice(0, 8)
                      .map((feature, index) => (
                        <div key={index} className="flex items-center gap-3">
                          <FaCheck className="w-5 h-5 text-green-600 flex-shrink-0" />
                          <span className="text-gray-700">{feature.value}</span>
                        </div>
                      ))}
                    {currentPlan.featuresList?.length > 8 && (
                      <div className="text-gray-500 text-sm mt-2">
                        +{currentPlan.featuresList.length - 8} more features
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Button */}
              <div className="mt-12">
                <button
                  onClick={() => setUpdateModalOpen(true)}
                  className="w-full bg-[#00823A] text-white font-semibold py-3 px-5 rounded-full transition-colors duration-200 shadow-lg hover:shadow-xl"
                >
                  Update Subscription
                </button>
              </div>
            </>
          ) : (
            <div className="text-gray-500">No plan available</div>
          )}
        </div>
      </div>

      {/* Update Modal */}
      <UpdateSubscriptionModal
        open={updateModalOpen}
        onClose={() => setUpdateModalOpen(false)}
        currentPlan={currentPlan}
        refetch={refetch}
      />
    </div>
  );
}
