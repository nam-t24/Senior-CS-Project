import Image from "next/image";
// How it works section of the homepage
export default function HowItWorks() {
    return (
      <div id="HowItWorks" className="w-full 2xl:py-20 py-16 px-24">
        <div className="2xl:text-6xl text-5xl font-semibold text-center 2xl:mb-32 mb-28">
          How It Works
        </div>
        {/* Steps Section */}
        <div className="w-full 2xl:w-[90rem] mx-auto flex flex-col 2xl:space-y-32 space-y-24">
          {/* Create organization section */}
          <section className="flex items-center justify-between">
            {/* Text */}
            <div className="w-[30rem]">
              <div className="2xl:text-4xl text-3xl font-semibold">
                Create your <p className="text-maroon inline">organization</p>
              </div>
              <div className="text-gray-500 mt-4 text-lg">
                Create your organization with your team to manage your grants or
                applications. Organizations receiving funding can apply to grants
                and those providing funding can create grants.
              </div>
            </div>
            {/* Image */}
            <div className="bg-darkmaroon pt-8 pl-8 rounded-lg overflow-hidden border border-darkmaroon">
              <div className="2xl:w-[40rem] w-[36rem] 2xl:h-[25rem] h-[23rem] relative rounded-tl-lg overflow-hidden">
                <Image
                  src="/assets/homepage/organization.png"
                  alt="organization"
                  fill={true}
                />
              </div>
            </div>
          </section>
          {/* Grant section */}
          <section className="flex items-center justify-between">
            {/* Image */}
            <div className="bg-darkmaroon pt-8 pl-8 pb-8 rounded-lg overflow-hidden border border-darkmaroon">
              <div className="2xl:w-[40rem] w-[36rem] 2xl:h-[25rem] h-[23rem] relative rounded-tl-lg rounded-bl-lg overflow-hidden">
                <Image
                  src="/assets/homepage/grant.png"
                  alt="grant"
                  fill={true}
                />
              </div>
            </div>
            {/* Text */}
            <div className="w-[30rem]">
              <div className="2xl:text-4xl text-3xl font-semibold">
                Apply to or create a <p className="text-maroon inline">grant</p>
              </div>
              <div className="text-gray-500 mt-4 text-lg">
                Create grants for non-profits to apply to if you are a donor
                organization. If you are a non-profit, apply to grants to
                receive funding. Grants can be created for specific causes or
                general funding.
              </div>
            </div>
          </section>
          {/* Application section */}
          <section className="flex items-center justify-between">
            {/* Text */}
            <div className="w-[30rem]">
              <div className="2xl:text-4xl text-3xl font-semibold">
                Review <p className="text-maroon inline">applications</p> and
                choose a <p className="text-maroon inline">recipient</p>
              </div>
              <div className="text-gray-500 mt-4 text-lg">
                Review applications submitted by non-profits and choose a
                recipient for your grant. Non-profits can track the status of
                their applications.
              </div>
            </div>
            {/* Image */}
            <div className="bg-darkmaroon pl-8 pb-8 rounded-lg overflow-hidden border border-darkmaroon">
              <div className="2xl:w-[40rem] w-[36rem] 2xl:h-[25rem] h-[23rem] relative rounded-bl-lg overflow-hidden">
                <Image
                  src="/assets/homepage/applications.png"
                  alt="applications"
                  fill={true}
                />
              </div>
            </div>
          </section>
          {/* History section */}
          <section className="flex items-center justify-between">
            {/* Image */}
            <div className="bg-darkmaroon pt-8 pr-8 rounded-lg overflow-hidden border border-darkmaroon">
              <div className="2xl:w-[40rem] w-[36rem] 2xl:h-[25rem] h-[23rem] relative rounded-tr-lg overflow-hidden">
                <Image
                  src="/assets/homepage/history.png"
                  alt="history"
                  fill={true}
                />
              </div>
            </div>
            {/* Text */}
            <div className="w-[30rem]">
              <div className="2xl:text-4xl text-3xl font-semibold">
                Keep track of your <p className="text-maroon inline">grant</p>{" "}
                or <p className="text-maroon inline">application history</p>
              </div>
              <div className="text-gray-500 mt-4 text-lg">
                View all past grants created and received. Stats of your history
                will be shown below your history table.
              </div>
            </div>
          </section>
        </div>
        <div className="2xl:mt-28 mt-20">
          <div className="2xl:text-5xl text-4xl font-semibold text-center 2xl:mb-8 mb-6">
            Other <p className="text-maroon inline">features</p>
          </div>
          <div className="flex justify-center text-gray-500 text-lg">
            <ul className="list-disc">
              <li>Secure login authentication</li>
              <li>Manage your user profile</li>
              <li>Manage your organization</li>
              <li>
                Keep track of all your current applications or open grants
              </li>
              <li>Edit, close, and delete your grants</li>
              <li>Browse and search all open grants</li>
              <li>Search for specific user and organization profiles</li>
            </ul>
          </div>
        </div>
      </div>
    );

}