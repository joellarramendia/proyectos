import {streamText} from 'ai'
import { openrouter } from '../lib/ai'

export default {
    async generateRecipe(prompt: string) {
        const result = streamText({
            // model: openrouter('meta-llama/llama-3.3-70b-instruct:free'),
            // model: openrouter('nvidia/nemotron-3-super-120b-a12b:free'),
            // model: openrouter('google/gemma-3n-e2b-it:free'),
            model: openrouter('google/gemma-3n-e4b-it:free'),
            prompt: prompt
            // system: 'Eres un bartender que tiene 50 años de experiencia y le sirvio una bebida a James Bond' ##No todos los modelos soportan
        })

        return result.textStream
    }
}