// Helper functions for time calculations
export const convertTo24Hour = (timeStr: string): number => {
  const [hours, minutes] = timeStr.split(':').map(Number);
  return hours * 100 + minutes;
};
