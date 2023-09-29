export function calculateGrowthRate(initialValue: number, finalValue: number): number {
    const valueDifference = finalValue - initialValue;
    if(initialValue == 0) initialValue = 1; 
    const division = valueDifference / initialValue;
    const percent = division * 100;
    return percent;
}

export function calculateBookingPercentage(bookingValue: number, allBookings: number): number {
    const percent = (bookingValue / allBookings) * 100;
    return percent || 0;
}