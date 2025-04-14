import { Medicament } from "./store";

export const getGroupedByTimeMedicaments = (medicaments: Medicament[]) => {
  return medicaments.reduce<
      Record<string, Medicament[]>
    >((acc, medicament) => {
      const times = medicament.schedule.times;

      times.forEach((time) => {
        if (!acc[time]) {
          acc[time] = [medicament];
        } else {
          acc[time].push(medicament);
        }
      });

      return acc;
    }, {});
}
