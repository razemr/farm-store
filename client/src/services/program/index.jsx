export const loadMilestonesFromTemplate = (templates, startDate, acres) => {

  let endDate = startDate;

  let milestones = templates.map((template) => {
    const date = new Date(startDate.getTime() + (template.daysFromStart * 24 * 60 * 60 * 1000));

    if(date.getTime() > endDate.getTime()) {
      endDate = date;
    }

    const productApplications = template.productApplications.map((pa) => {
      const quantity = Math.ceil(acres * pa.quantity);

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

  return {milestones, endDate};
};
