import Image from "next/image";

export default function WhyMinted() {
    return (
      <div
        id="WhyMinted"
        className="w-full bg-maroon/20 text-center 2xl:pt-20 pt-16 overflow-hidden"
      >
        <div className="2xl:text-6xl text-5xl font-semibold text-darkmaroon 2xl:mb-10 mb-8">
          Why Minted
        </div>
        <div className="text-gray-600 2xl:text-xl text-lg w-[55rem] mx-auto flex flex-col space-y-8">
          <div>
            Minted is a feature-rich application that connects donors and
            non-profits in a seamless and efficient way. This app is dedicated
            to help boost community projects by helping non-profits get the
            funding they need. All features are user-friendly with an easy to
            navigate dashboard.
          </div>
          <div>We're built for non-profits. We're built for change.</div>
        </div>
        {/* Image section */}
        <div className="flex justify-center mt-20">
          <div className="relative  2xl:w-[70rem] w-[60rem] 2xl:h-[30rem] h-[25rem] rounded-t-xl overflow-hidden simpleShadow">
            <Image
              src="/assets/homepage/dashboard.png"
              alt="dashboard"
              fill={true}
            />
          </div>
        </div>
      </div>
    );
}