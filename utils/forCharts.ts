import dayjs from "dayjs";

export const calculateTotalSum = (dataArray: any) => {
  let totalSum = 0;

  dataArray.forEach((entry: any) => {
    const { month, ...categories } = entry;

    Object.values(categories).forEach((value) => {
      if (typeof value === "number") {
        totalSum += value;
      }
    });
  });

  return totalSum.toFixed(2);
};

export const processesData = (filteredEvents: any) => {
  const monthlyData = filteredEvents.reduce((acc: any, event: any) => {
    const month = dayjs(event.startDateTime).format('MMM');

    event.products.forEach((product: any) => {
      const categoryName = product.category.name;

      if (!acc[month]) {
        acc[month] = {};
      }

      if (!acc[month][categoryName]) {
        acc[month][categoryName] = 0;
      }

      acc[month][categoryName] += product.price;
    });

    return acc;
  }, {});

  return Object.keys(monthlyData)
    .sort((a, b) => dayjs(b, 'MMM').valueOf() - dayjs(a, 'MMM').valueOf())
    .map(month => {
      const categoryTotals = monthlyData[month];

      // Cambié el tipo de 'entry' para que 'month' sea de tipo 'string'
      const entry: Record<string, number | string> = { month };

      Object.keys(categoryTotals).forEach((category: any) => {
        entry[category] = categoryTotals[category];
      });

      return entry;
    });
};


export const generateChartDataByCategory = (dataArray: any[]) => {
  const chartData: { id: number; value: any; label: any; }[] = [];

  dataArray.forEach((entry) => {
    const { products } = entry;

    products.forEach((product: { category: any; price: any; }) => {
      const { category, price } = product;

      const existingData = chartData.find((data) => data.label === category.name);

      if (existingData) {
        existingData.value += price;
      } else {
        chartData.push({ id: chartData.length, value: price, label: category.name });
      }
    });
  });

  return chartData;
};