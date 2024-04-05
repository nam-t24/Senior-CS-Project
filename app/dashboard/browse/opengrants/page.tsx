"use client"
import PageHeading from "@/components/dashboard/PageHeading";
import { getAllOpenGrants } from "@/utils/scripts/grants";
import { useState, useEffect } from "react";
import BrowseGrantCard from "@/components/dashboard/BrowseGrantCard";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";


export default function BrowseGrants() {

  const [grants, setGrants] = useState([]);
  const [filteredGrants, setFilteredGrants] = useState([]);
  const [search, setSearch] = useState('');

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [sortType, setSortType] = useState('');
  const [resetSelect, setResetSelect] = useState(0);


  // Fetch grants
  useEffect(() => {
    const fetchGrants = async () => {

      const grantData = await getAllOpenGrants();
      if(grantData === null){
        setError(true);
        setLoading(false);
        return;
      }
      setGrants(grantData);
      setFilteredGrants(grantData);
      setLoading(false);
    }

    fetchGrants();
  }, []);

  // Handle search
  useEffect(() => {
    const timer = setTimeout(() => {
      if(search !== ''){
        const newFiltered = grants.filter((grant) => {
          return grant.name.toLowerCase().includes(search.toLowerCase());
        })
        setFilteredGrants(newFiltered);
      } else {
        if(!loading){
          setFilteredGrants(grants);
        }
      }
      setResetSelect(resetSelect === 0 ? 1 : 0);
      setSortType('');
    }, 750);

    return (() => {
      clearTimeout(timer);
    })
    
  }, [search]);

  // Handle sorting
  useEffect(() => {
    if(sortType === ''){
      return;
    }
    let sortedArray = [...filteredGrants];
    if(sortType === 'priceAscending'){
      sortedArray.sort((a, b) => a.amount - b.amount);
    } else if(sortType === 'priceDescending'){
      sortedArray.sort((a, b) => b.amount - a.amount);
    } else if(sortType === 'dateAscending'){
      sortedArray.sort((a, b) =>
        new Date(a.deadline) > new Date(b.deadline)
          ? 1
          : new Date(b.deadline) > new Date(a.deadline)
          ? -1
          : 0
      );

    } else if(sortType === 'dateDescending'){
      sortedArray.sort((a, b) =>
        new Date(b.deadline) > new Date(a.deadline)
          ? 1
          : new Date(a.deadline) > new Date(b.deadline)
          ? -1
          : 0
      );
    } else {
      return;
    }
    setFilteredGrants(sortedArray);

  }, [sortType])

  return (
    <div className="">
      <PageHeading
        header="Open Grants"
        description="Browse grants open for applications"
      />
      {!loading &&
        (error ? (
          <div className="mt-8 text-center">
            There was an error retrieving grants. Reload or try again
            later.
          </div>
        ) : (
          <>
            {/* Search bar */}
            <input
              type="text"
              placeholder="Search grants ..."
              className="w-96 px-4 p-2 border-2 border-gray-300 rounded-md mt-8 bg-white"
              onChange={(e) => setSearch(e.target.value)}
            />

            {/* Filter section */}
            <div className="flex items-center space-x-2 mt-4 2xl:mb-12 mb-8">
              <div className="font-medium">Sort by:</div>
              {/* Select items */}
              <Select
                key={resetSelect}
                onValueChange={(value) => {
                  setSortType(value);
                }}
              >
                <SelectTrigger className="w-48 h-[2rem]">
                  <SelectValue placeholder="Select sort" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="priceAscending">
                    <div className="flex items-center justify-between w-[140px]">
                      <p>Price ascending</p>{" "}
                      <ArrowUpwardIcon fontSize="inherit" />
                    </div>
                  </SelectItem>
                  <SelectItem value="priceDescending">
                    <div className="flex items-center justify-between w-[140px]">
                      <p>Price descending</p>{" "}
                      <ArrowDownwardIcon fontSize="inherit" />
                    </div>
                  </SelectItem>
                  <SelectItem value="dateAscending">
                    <div className="flex items-center justify-between w-[140px]">
                      <p>Date ascending</p>{" "}
                      <ArrowUpwardIcon fontSize="inherit" />
                    </div>
                  </SelectItem>
                  <SelectItem value="dateDescending">
                    <div className="flex items-center justify-between w-[140px]">
                      <p>Date descending</p>{" "}
                      <ArrowDownwardIcon fontSize="inherit" />
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Grant lists */}
            <section className="grid 2xl:grid-cols-5 xl:grid-cols-4 lg:grid-cols-3 grid-cols-1 2xl:gap-4 gap-3 animateDown">
              {filteredGrants.map((grant) => {
                return (
                  <BrowseGrantCard
                    key={grant.id}
                    id={grant.id}
                    name={grant.name}
                    amount={grant.amount}
                    description={grant.description}
                    deadline={grant.deadline}
                  />
                );
              })}
            </section>
          </>
        ))}
    </div>
  );
}