import React from "react";

const CSRSection = () => {
  const initiatives = [
    {
      heading: "Social Inclusion",
      title: "Jamii Stawi",
      text: "Empowering lives through health equity, educational support, and economic dignity for neighboring communities.",
    },
    {
      heading: "Climate Resilience",
      title: "Uhifadhi Action",
      text: "Active reforestation, waste circularity, and plastic neutrality to preserve Africa’s untamed landscapes.",
    },
    {
      heading: "Mentorship",
      title: "Mvuto Network",
      text: "Fostering the next generation of African conservationists and ethical hospitality leaders through mentorship.",
    },
  ];

  return (
    <section className="relative bg-white overflow-hidden pt-24 pb-52 px-6 md:px-20">

      {/* CONTENT */}
      <div className="max-w-6xl mx-auto relative z-10">

        {/* TITLE */}
        <h2 className="text-5xl md:text-6xl font-bold leading-none mb-5">
          <span style={{ color: "#0b3d2e" }}>Kovu </span>
          <span style={{ color: "#c8a248" }}>Afrika</span>
        </h2>

        {/* DESCRIPTION */}
        <p className="text-[#444] leading-relaxed max-w-3xl mb-20 text-lg">
          <span className="font-semibold">
            “Healing Landscapes, Empowering Lives”.
          </span>{" "}
          Kovu Afrika represents our commitment to leaving a positive,
          healing mark on the African continent. It is the bedrock of our
          Eco-Luxury philosophy.
        </p>

        {/* CARDS */}
        <div className="grid md:grid-cols-3 gap-8">

          {initiatives.map((item, index) => (
            <div
              key={index}
              className="bg-white border border-[#e8e8e8] rounded-3xl p-8 shadow-sm hover:shadow-xl transition duration-500"
            >

              {/* HEADING */}
              <h3 className="text-2xl font-bold text-black mb-3">
                {item.heading}
              </h3>

              {/* TITLE */}
              <p
                className="text-xl font-semibold mb-4"
                style={{ color: "#c8a248" }}
              >
                {item.title}
              </p>

              {/* TEXT */}
              <p className="text-[#555] leading-relaxed text-[15px]">
                {item.text}
              </p>

            </div>
          ))}

        </div>
      </div>

      {/* BOTTOM DESIGN */}
      <div className="absolute bottom-0 left-0 w-full h-40 flex">

        {/* GOLD SECTION */}
        <div
          className="w-1/2 h-full"
          style={{ backgroundColor: "#c8a248" }}
        />

        {/* PATTERN SECTION */}
        <div className="w-1/2 h-full bg-[#c8a248] flex items-center justify-center">

          <div className="grid grid-cols-10 gap-3">

            {Array.from({ length: 80 }).map((_, index) => (
              <div
                key={index}
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: "#0b3d2e" }}
              />
            ))}

          </div>

        </div>
      </div>
    </section>
  );
};

export default CSRSection;