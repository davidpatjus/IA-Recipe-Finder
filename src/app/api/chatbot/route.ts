import { NextResponse } from "next/server";

async function handleGPTQuery(query: string) {
    return { result: `Respuesta avanzada de GPT para la consulta: ${query}` };
}

async function handleGeminiQuery(query: string) {
    return { result: `Respuesta de Gemini para la consulta: ${query}` };
}

export async function POST(req: Request) {
    const { queryType, query } = await req.json();

    try {
        let response;

        switch (queryType) {
            case 'recetas':
                response = await handleGPTQuery(query);
                break;
            case 'ingredientes':
                response = await handleGeminiQuery(query);
                break;
            case 'habitos_saludables':
                response = await handleGeminiQuery(query);
                break;
            case 'tendencias_locales':
                response = await handleGPTQuery(query);
                break;
            case 'personalizacion_alimenticia':
                response = await handleGPTQuery(query);
                break;
            default:
                response = { result: 'Tipo de consulta no reconocido' };
                break;
        }

        return NextResponse.json(response, { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: 'Error al procesar la consulta' }, { status: 500 });
    }
}
