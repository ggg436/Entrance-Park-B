import React from 'react';

const StatsSection = () => {
  const stats = [
    {
      number: "98%",
      label: "Farmer Satisfaction Rate",
      description: "Our users report increased productivity and satisfaction"
    },
    {
      number: "45%",
      label: "Average Yield Increase",
      description: "Farmers see significant improvements in crop yields"
    },
    {
      number: "24/7",
      label: "Monitoring & Support",
      description: "Continuous monitoring of your farm operations"
    },
    {
      number: "500k+",
      label: "Acres Under Management",
      description: "Total farmland being optimized with our platform"
    }
  ];

  return (
    <section className="py-20 bg-green-50">
      <div className="max-w-7xl mx-auto px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-zinc-900 mb-4">
            Trusted by Farmers Worldwide
          </h2>
          <p className="text-lg text-zinc-600 max-w-2xl mx-auto">
            Join thousands of farmers who are already transforming their operations with our platform.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-5xl font-bold text-green-600 mb-2">{stat.number}</div>
              <div className="text-xl font-semibold text-zinc-900 mb-2">{stat.label}</div>
              <div className="text-zinc-600">{stat.description}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;