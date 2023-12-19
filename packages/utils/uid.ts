import { customAlphabet } from 'nanoid'
const lower = 'abcdefghijklmnopqrstuvwxyz'

export const uid = (num: number = 10) => customAlphabet(lower, num)
