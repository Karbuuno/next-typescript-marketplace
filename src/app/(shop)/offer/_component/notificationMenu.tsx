import { API } from "@/lib/config";
import { Offer } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Loader2 } from "lucide-react";
import React, { useState } from "react";
import { useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

// Define the type for Offer
interface OfferData extends Offer {
  productId: string;
  buyerId: string;
  sellerId: string;
  price: number;
  status: string;
}

const NotificationMenu = () => {
  const [action, setAction] = useState<"accepted" | "rejected" | null>(null);
  const [loading, setLoading] = useState(false);
  const { data: session } = useSession();

  const {
    data: offers,
    isError,
    isLoading,
  } = useQuery<OfferData[]>({
    queryKey: ["offer"],
    queryFn: () => axios.get(`${API}/user/offer`).then(res => res.data),
    staleTime: 60 * 1000,
    retry: 3,
  });

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

  return (
    <div className='w-96 h-96 bg-gray-100 absolute top-14 z-10 right-10 shadow-md p-4'>
      {isLoading ? (
        <Loader2 className='text-2xl items-center animate-spin' />
      ) : isError ? (
        <h1>Data Not Found</h1>
      ) : (
        <>
          {/* Notification dropdown arrow */}
          <span className='bg-gray-100 w-8 h-4 rotate-45 top-0 absolute right-16'></span>
          <div className='flex flex-col justify-start items-start text-lg mt-2'>
            {offers?.map(offer => (
              <div key={offer.id} className='w-full mb-4 bg-white h-26 p-2'>
                <h1 className='text-blue-500 cursor-pointer hover:underline'>
                  Offer Price: £{offer.price}
                </h1>

                {/* If the current user is the seller and the offer is pending */}
                {offer.sellerId === currentUser &&
                offer.status === "pending" ? (
                  <div className='flex gap-4'>
                    <button
                      onClick={() => handleAction("accepted", offer.id)}
                      className={`bg-green-500 text-white px-2 py-1 rounded ${
                        action
                          ? "opacity-50 cursor-not-allowed"
                          : "hover:bg-green-600"
                      }`}
                      disabled={!!action || loading}
                    >
                      {loading && action === "accepted"
                        ? "Processing..."
                        : "Accept Offer"}
                    </button>
                    <button
                      onClick={() => handleAction("rejected", offer.id)}
                      className={`bg-red-500 text-white px-4 py-2 rounded ${
                        action
                          ? "opacity-50 cursor-not-allowed"
                          : "hover:bg-red-600"
                      }`}
                      disabled={!!action || loading}
                    >
                      {loading && action === "rejected"
                        ? "Processing..."
                        : "Reject Offer"}
                    </button>
                  </div>
                ) : null}

                {/* Always show the offer status to the buyer */}
                {offer.buyerId === currentUser && (
                  <div>
                    <p className='text-gray-500'>Status: {offer.status}</p>
                    {offer.status === "accepted" && (
                      <Link href={`/product/${offer.productId}`}>
                        Buy the offer
                      </Link>
                    )}
                  </div>
                )}

                {/* Show status if neither seller nor buyer */}
                {offer.sellerId !== currentUser &&
                  offer.buyerId !== currentUser && <span>{offer.status}</span>}
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default NotificationMenu;
