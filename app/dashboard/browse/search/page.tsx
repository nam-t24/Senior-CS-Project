"use client"
import PageHeading from "@/components/dashboard/PageHeading";
import { getProfiles, getOrganizations } from "@/utils/scripts/search";
import { useState, useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";
import Link from "next/link";


export default function BrowseSearch() {
  const { toast } = useToast();

  const [loading ,setLoading] = useState(true);
  const [errorFetching, setErrorFetching] = useState(false);

  const [searchType, setSearchType] = useState(0); // 0 for profiles, 1 for organizations
  const [profiles, setProfiles] = useState([]);
  const [filteredProfiles, setFilteredProfiles] = useState([]);
  const [organizations, setOrganizations] = useState([]);
  const [filteredOrganizations, setFilteredOrganizations] = useState([]);

  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const profileData = await getProfiles();
      if(profileData === null){
        toast({
          variant: "destructive",
          title: "Unable to retrieve profiles",
          description: "Reload page or check another time",
        });
        setErrorFetching(true);
        setLoading(false);
        return;
      }
      setProfiles(profileData);
      setFilteredProfiles(profileData);

      const organizationData = await getOrganizations();
      if(organizationData === null){
        toast({
          variant: "destructive",
          title: "Unable to retrieve organizations",
          description: "Reload page or check another time",
        });
        setErrorFetching(true);
        setLoading(false);
        return;
      }
      setOrganizations(organizationData);
      setFilteredOrganizations(organizationData);
      setLoading(false);
    }

    fetchData();
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      if(search !== ''){
        if(searchType === 0){
          const newFiltered = profiles.filter((profile) => {
            return profile.full_name.toLowerCase().includes(search.toLowerCase()) || profile.email.toLowerCase().includes(search.toLowerCase());
          })
          setFilteredProfiles(newFiltered);
        } else {
          const newFiltered = organizations.filter((organization) => {
            return organization.name.toLowerCase().includes(search.toLowerCase()) || organization.email.toLowerCase().includes(search.toLowerCase());
          })
          setFilteredOrganizations(newFiltered);
        }
      } else {
        if(!loading){
          setFilteredProfiles(profiles);
          setFilteredOrganizations(organizations);
        }
      }
    }, 750);

    return () => {
      clearTimeout(timer);
    };
  }, [search]);

  function Card({id, name, email, type} : {id: string, name: string, email: string, type: number}) {
    return (
      <Link
        href={`/dashboard/browse/search/${
          type === 0 ? "profiles" : "organizations"
        }/${id}`}
        className="border-2 border-neutral-400 bg-[#FFFEFE] 2xl:w-72 w-64 py-3 2xl:px-5 px-4 2xl:mr-5 mr-4 2xl:mb-4 mb-3 rounded-lg group hover:text-darkmaroon hover:border-darkmaroon transition duration-500"
      >
        <div className="font-semibold truncate">{name}</div>
        <div className="text-sm text-body truncate group-hover:text-darkmaroon transition duration-500">
          {email}
        </div>
      </Link>
    );
  }

  return (
    <div className="">
      <PageHeading
        header="Search"
        description="Search for profiles and organizations"
      />
      {!loading &&
        (errorFetching ? (
          <div className="mt-8 text-center">
            There was an error retrieving grants. Reload or try again later.
          </div>
        ) : (
          // Successful fetch
          <section className="animateDown">
            {/* Search bar */}
            <input
              type="text"
              placeholder={`Search ${searchType === 0 ? "profiles" : "organizations"} ...`}
              className="w-96 px-4 p-2 border-2 border-gray-300 rounded-md mt-8 bg-white"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            {/* Type */}
            <div className="inline-flex space-x-1 > * + * bg-neutral-200 p-1 rounded-md ml-6">
              <button
                className={`py-1 px-2 rounded-md ${
                  searchType == 0 ? "bg-primary" : "bg-neutral-200"
                } transition duration-300`}
                onClick={() => {setSearchType(0); setSearch("")}}
              >
                Profiles
              </button>
              <button
                className={`py-1 px-2 rounded-md ${
                  searchType == 1 ? "bg-primary" : "bg-neutral-200"
                } transition duration-300`}
                onClick={() => {setSearchType(1); setSearch("")}}
              >
                Organizations
              </button>
            </div>

            {/* Card listings */}
            <div className="flex flex-wrap mt-8">
              {searchType === 0 ? (filteredProfiles.map((profile) => {
                return (
                  <Card
                    key={profile.id}
                    id={profile.id}
                    name={profile.full_name}
                    email={profile.email}
                    type={0}
                  />
                );
              })) : (
                filteredOrganizations.map((organization) => {
                  return (
                    <Card
                      key={organization.id}
                      id={organization.id}
                      name={organization.name}
                      email={organization.email}
                      type={1}
                    />
                  );
                })
              )}
            </div>
          </section>
        ))}
    </div>
  );

}