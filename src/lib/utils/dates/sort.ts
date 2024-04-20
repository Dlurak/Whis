export const sortDates = (d: Date[]) => d.sort((a, b) => a.getTime() - b.getTime());

export const firstDate = (d: Date[]) => sortDates(d).at(0);
export const latestDate = (d: Date[]) => sortDates(d).at(-1);
