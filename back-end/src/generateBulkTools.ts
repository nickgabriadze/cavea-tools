export const generateDataInBulk = () => {
  const locations = [
    "მთავარი ოფისი",
    "კავეა გალერია",
    "კავეა თბილისი მოლი",
    "კავეა ისთ ფოინთი",
    "კავეა სითი მოლი",
  ];
  const toolObjects = [];
  for (let i = 0; i < 300000; i++) {
    const itemLocation = Math.floor(Math.random() * locations.length);
    const itemName = `Tool ${i}`;
    const itemPrice = Math.floor(Math.random() * 1000);
    toolObjects.push({
      itemName,
      itemLocation,
      itemPrice,
    });
  }

  return toolObjects;
};
