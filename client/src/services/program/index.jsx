export const loadMilestonesFromTemplate = (templates, startDate, acres) => {
  let milestones = templates.map((template) => {
    const date = new Date(startDate.getTime() + template * 24 * 60 * 60 * 1000);
    const productApplications = template.productApplications.map((pa) => {
      const quantity = Math.floor(acres * pa.quantity);

      return {
        product: pa.product,
        unit: pa.unit,
        quantity,
      };
    });

    return {
      date,
      productApplications,
    };
  });

  return milestones;
};
