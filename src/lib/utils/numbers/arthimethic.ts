export const sum = (arr: number[]) => arr.reduce((a, b) => a + b, 0)

export const average = (arr: number[]) => sum(arr) / arr.length
