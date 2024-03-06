"use client"
import { useState } from "react"
import { createGrant } from "@/utils/scripts/grants";

// Page for testing api queries written in /utils/scripts
// Import your function you want to run
// Add function inside the run function in runQuery
// Don't touch anything else
export default function RunQuery() {
    const [runningQuery, setRunningQuery] = useState(false);
    const [data, setData] = useState<any>();

    const runQuery = () => {
        const run = async() => {
            setRunningQuery(true);

            // Replace this function
            // Example: const data = await createGrant("","","",7, new Date())
            const data = await createGrant("","","",7, new Date())


            console.log(data);
            setData(data);
            setRunningQuery(false);
        }
        run();
    }

    return(
        <div className="w-full min-h-screen bg-gray-800 flex flex-col items-center text-slate-50 py-16">
            <h1 className="text-5xl font-medium">Query Tester</h1>
            <div className="mt-6 text-slate-300">Test and run API queries here</div>
            <div className="mt-2 text-slate-300">Import query function to page and add the function to runQuery</div>

            <button className="border-2 border-slate-50 px-6 py-2 rounded-md hover:bg-slate-600 2xl:mt-16 mt-10 text-lg" onClick={()=>runQuery()}>{runningQuery ? "Running Query ..." : "Run Query"}</button>

            <div className="border-b-2 border-slate-50 2xl:w-80 w-64 text-center 2xl:py-2 py-1 mt-16 2xl:text-lg">Query Result</div>
            <div className="mt-6 2xl:max-w-[40rem] max-w-[30rem]"><pre>{JSON.stringify(data)}</pre></div>

        </div>
    )
}