import { API } from "@/lib/config";
import { Offer } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Loader2 } from "lucide-react";
import React, { useState } from "react";
import { useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
interface NotificationDropDownProps {
  offer: Offer;
}

const NotificationDropDown: React.FC<NotificationDropDownProps> = ({
  offer,
}) => {
  const [action, setAction] = useState<"accepted" | "rejected" | null>(null);
  const [loading, setLoading] = useState(false);
  const { data: session } = useSession();

  // Function to handle accept/reject actions
  const handleAction = async (
    status: "accepted" | "rejected",
    offerId: string
  ) => {
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
        setAction(status); // Update action state
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

  const currentUser = session?.user?.id;
  console.log(currentUser);

  return (
    <div key={offer.id} className='w-full mb-4 bg-white h-26 p-2 rounded'>
      <h1 className='text-gray-500 cursor-pointer hover:underline'>
        Price: £{offer.price}
      </h1>
      <h1 className='text-gray-500 cursor-pointer '>Product: {offer.name}</h1>
      {offer.sellerId == currentUser && offer.buyerId !== currentUser && (
        <p className='text-gray-500'>Status: {offer.status}</p>
      )}

      {/* If the current user is the seller and the offer is pending */}
      {offer.sellerId === currentUser && offer.status === "pending" ? (
        <div className='flex gap-4'>
          <button
            onClick={() => handleAction("accepted", offer.id)}
            className={`bg-green-500 text-white text-lg px-1 h-8 rounded ${
              action ? "opacity-50 cursor-not-allowed" : "hover:bg-green-600"
            }`}
            // disabled={!!action || loading}
          >
            {loading && action === "accepted" ? "Processing..." : "Accept"}
          </button>
          <button
            onClick={() => handleAction("rejected", offer.id)}
            className={`bg-red-500 text-white text-lg px-1 h-8 rounded ${
              action ? "opacity-50 cursor-not-allowed" : "hover:bg-red-600"
            }`}
            // disabled={!!action || loading}
          >
            {loading && action === "rejected" ? "Processing..." : "Reject"}
          </button>
        </div>
      ) : null}

      {/* Always show the offer status to the buyer */}
      {offer.buyerId === currentUser && (
        <div>
          <p className='text-gray-500'>Status: {offer.status}</p>
          {offer.status === "accepted" && (
            <Link
              href={`/product/${offer.productId}`}
              className='hover:underline text-blue-500'
            >
              Buy the offer
            </Link>
          )}
        </div>
      )}
    </div>
  );
};

export default NotificationDropDown;
