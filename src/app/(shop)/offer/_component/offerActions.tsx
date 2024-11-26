import { useState } from "react";
import { API } from "@/lib/config";

const OfferActions = ({ offerId }: { offerId: string }) => {
  const [action, setAction] = useState<"accepted" | "rejected" | null>(null);
  const [loading, setLoading] = useState(false);

  const handleAction = async (status: "accepted" | "rejected") => {
    setLoading(true);
    try {
      const response = await fetch(`${API}/user/offer/${offerId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status }),
      });

      if (response.ok) {
        alert(`Offer ${status} successfully!`);
        setAction(status); // Set the action to either 'accepted' or 'rejected'
      } else {
        const error = await response.json();
        alert("Failed to update offer");
      }
    } catch (error) {
      alert("An error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='flex gap-4'>
      <button
        onClick={() => handleAction("accepted")}
        className={`bg-green-500 text-white text-lg px-2 py-2 rounded ${
          action ? "opacity-50 cursor-not-allowed" : "hover:bg-green-600"
        }`}
      >
        {loading && action === "accepted" ? "Processing..." : "Accept Offer"}
      </button>
      <button
        onClick={() => handleAction("rejected")}
        className={`bg-red-500 text-white px-4 py-2 rounded ${
          action ? "opacity-50 cursor-not-allowed" : "hover:bg-red-600"
        }`}
      >
        {loading && action === "rejected" ? "Processing..." : "Reject Offer"}
      </button>
    </div>
  );
};

export default OfferActions;
