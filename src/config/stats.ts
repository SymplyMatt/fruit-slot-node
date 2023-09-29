export type BookingStats = {
    totalBookings? : Number,
    pendingBookings : Number,
    cancelledBookings : Number,
    successfulBookings : Number,
}

export type GrowthStats = {
    totalBookingsGrowth : Number,
    pendingBookingsGrowth : Number,
    cancelledBookingsGrowth : Number,
    successfulBookingsGrowth : Number,
}

export type UsersStats = {
    newUsers : Number,
    activeUsers : Number,
}

export type UserGrowthStats = {
    newUsersGrowth : Number,
    activeUsersGrowth : Number,
}

export type DailyBookings = {
    day?:string,
    year?:string | Number,
    totalBookings: number,
    pendingBookings?: number,
    cancelledBookings?: number,
    successfulBookings?: number,
}