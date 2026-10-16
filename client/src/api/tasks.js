import { supabase } from './supabaseClient'

// пример: получить все записи
export async function fetchTasks() {
    const { data, error } = await supabase.from('your_table').select('*')
    if (error) {
        console.error('Supabase fetchTasks error', error)
        throw error
    }
    return data
}

// пример: вставить запись
export async function createTask(payload) {
    const { data, error } = await supabase.from('your_table').insert([payload]).select()
    if (error) {
        console.error('Supabase createTask error', error)
        throw error
    }
    return data
}