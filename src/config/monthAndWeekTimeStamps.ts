export type TimeStamps  = {
    start : number,
    end : number
}
export default function getStartAndEndOfWeek() : TimeStamps {
    const currentDate = new Date();
    const currentDay = currentDate.getDay();
    
    // Calculate the start of the week
    const startOfWeek = new Date(currentDate); 
    startOfWeek.setDate(currentDate.getDate() - currentDay); 
    startOfWeek.setHours(0, 0, 0, 0); // Set the time to the beginning of the day (midnight)
  
    // Calculate the end of the week
    const endOfWeek = new Date(currentDate); 
    endOfWeek.setDate(currentDate.getDate() + (6 - currentDay)); 
    endOfWeek.setHours(23, 59, 59, 999); // Set the time to the end of the day (just before midnight)
  
    // Get the timestamps of the start and end of the week
    const startTimestamp = startOfWeek.getTime();
    const endTimestamp = endOfWeek.getTime();
  
    return {
      start: startTimestamp,
      end: endTimestamp
    };
}

export function getStartAndEndOfMonth():TimeStamps {
  const currentDate = new Date();

  // Get the start of the month
  const startOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
  const start = startOfMonth.getTime();

  // Get the present day (current date)
  const end = currentDate.getTime();

  return {start, end};
}

export function getStartAndPresentDayOfLastMonth():TimeStamps {
  function getStartOfLastMonth(): number {
    const currentDate = new Date();
    const startOfLastMonth = new Date(currentDate);
    startOfLastMonth.setMonth(startOfLastMonth.getMonth() - 1);
    startOfLastMonth.setDate(1);
    return startOfLastMonth.getTime();
  }
  
  function getPresentDayOfLastMonth(): number {
    const startOfLastMonth = new Date();
    startOfLastMonth.setMonth(startOfLastMonth.getMonth() - 1);
    return startOfLastMonth.getTime();
  }
  return {
    start:getStartOfLastMonth(),
    end:getPresentDayOfLastMonth()
  }
}