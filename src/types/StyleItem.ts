export type Item = Record<string,{
    descriptions: string,
    list: {
        description: string,
        value: string
    }[],
    value: string,
    unit: string
}>

export  type Sample = Record<string,{
    descriptions: string,
    list?: {
        description: string,
        value: string
    }[],
}>