export type dadJoke = {
    id: string
    joke: string
    status: number
}

export type reports = [
    {
        joke: Promise<string>
        score: number | null
        date: string // 2024-04-09T11:05:04.486Z
    }
]