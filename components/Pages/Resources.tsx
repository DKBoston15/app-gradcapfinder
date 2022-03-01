import React, { useEffect } from "react";
import { supabaseClient } from "../../lib/client";
import Dropdown from "../Dropdown";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import UniversitySidebar from "../ResourceComponents/UniversitySidebar";
import ServiceOffering from "../ResourceComponents/ServiceOffering";
import LinkList from "../ResourceComponents/LinkList";
import ConferenceList from "../ResourceComponents/ConferencesList";
import { useConferenceStore } from "../../store/conferenceStore";

export default function Resources({ setCurrentPage }: any) {
  const user = supabaseClient.auth.user();
  const getConferences = useConferenceStore(
    (state: any) => state.getConferences
  );

  useEffect(() => {
    const realtimeJournalUpdates = supabaseClient
      .from("conferences")
      .on("*", (payload) => {
        const getConferences = useConferenceStore.getState().getConferences;
        getConferences();
      })
      .subscribe();
  }, []);

  // @ts-ignore
  useEffect(async () => {
    if (user) {
      await getConferences();
    }
  }, [user]);

  return (
    <>
      <div className="absolute right-4 top-4">
        <Dropdown setCurrentPage={setCurrentPage} user={user} />
      </div>
      <ToastContainer
        position="top-right"
        autoClose={4000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <div className="w-full flex h-max-h-6xl">
        <UniversitySidebar />
        <div className="flex flex-col">
          <div className="flex space-y-8 xl:space-y-0 xl:space-x-24 p-16 flex-col xl:flex-row">
            <ServiceOffering
              icon="grad"
              text="Come work and ask questions live with Dr. Bozeman! M-S (8AM-10AM CST)"
              link="https://www.youtube.com/watch?v=orKQxipJHMc&ab_channel=DaneBozeman"
            />
            <ServiceOffering
              icon="studying"
              text="Join Dr. Bozeman in Office Hours every Friday (7PM CST)"
              link="https://us02web.zoom.us/j/2059491199"
            />
          </div>
          <div className="flex flex-col space-y-8 xl:space-y-0 xl:space-x-24 p-16 pt-0 xl:pt-8 xl:flex-row">
            <LinkList />
            <div className="flex flex-col space-y-8">
              <ServiceOffering
                icon="book"
                text=""
                link="https://us02web.zoom.us/j/2059491199"
              />
              <ConferenceList />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
