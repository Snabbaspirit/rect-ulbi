import {useState} from 'react'

export const useFetching = (callback) => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    console.log(error)
    const fetching = async () => {
        try {
            setIsLoading(true)
            await callback()
        } catch (e) {
            setError(e.message)
        } finally {
            setIsLoading(false)
        }
    }

    return [fetching, isLoading, error]
}

export default useFetching;