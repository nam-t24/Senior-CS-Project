"use client"
import PageHeading from "@/components/dashboard/PageHeading";
import { getAllOpenGrants } from "@/utils/scripts/grants";
import { useState, useEffect } from "react";
import BrowseGrantCard from "@/components/dashboard/BrowseGrantCard";

export default function BrowseGrants() {

  const [grants, setGrants] = useState([]);
  const [search, setSearch] = useState("");

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchGrants = async () => {
      const grantData = await getAllOpenGrants();
      if(grantData === null){
        setError(true);
        setLoading(false);
        return;
      }
      setGrants(grantData);
      setLoading(false);
    }

    fetchGrants();
  }, []);

  return (
    <div className="">
      <PageHeading
        header="Open Grants"
        description="Browse grants open for applications"
      />
      {!loading &&
      (error ? (
        <div className="mt-8 text-center">
          There was an error retrieving grant history. Reload or try again
          later.
        </div>
      ) :
      <>
        {/* Search bar */}
        <input
          type="text"
          placeholder="Search grants ..."
          className="w-96 px-4 p-2 border-2 border-gray-300 rounded-md my-8 bg-white"
          onChange={(e) => setSearch(e.target.value)}
        />

        {/* Grant lists */}
        <section className="grid grid-cols-4 gap-3 animateDown">
          {grants.map((grant) => {
            return(<BrowseGrantCard key={grant.id} id={grant.id} name={grant.name} amount={grant.amount} description={grant.description} deadline={grant.deadline} />);
          })}
        </section>
      </>
    )}
    </div>
  );
}