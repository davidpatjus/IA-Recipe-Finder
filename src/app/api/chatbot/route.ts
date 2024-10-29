import { sendMessageToGemini } from "@/utils/AIGemini";
import { NextResponse } from "next/server";

// async function handleGPTQuery(query: string) {
//   return `Respuesta de Gemini para la consulta: ${query}`;
// }

async function handleGeminiQuery(query: string) {
	try {
		const response = await sendMessageToGemini(query);
		return response;
	} catch (error) {
		console.error(error);
		return "Error al procesar la consulta" + error;
	}
}

// Funciones de formato de respuestas por tipo de consulta
function formatRecipeResponse(data: string) {
  return {
    title: "Receta Sugerida",
    content: data,
    additionalInfo: "Más sobre esta receta en nuestro blog",
  };
}

function formatIngredientResponse(data: string) {
  return {
    title: "Información de Ingredientes",
    content: data,
    healthTips: "Úsalo en recetas balanceadas",
  };
}

function formatHealthHabitsResponse(data: string) {
  return {
    title: "Consejos Saludables",
    content: data,
    suggestions: "Incorpora estos hábitos gradualmente",
  };
}

function formatLocalTrendsResponse(data: string) {
  return {
    title: "Tendencias Actuales",
    content: data,
    region: "Consulta las tendencias de tu área",
  };
}

function formatDietPersonalizationResponse(data: string) {
  return {
    title: "Personalización de Dieta",
    content: data,
    notes: "Basado en tus preferencias y necesidades",
  };
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function addMetaData(response: any) {
  return {
    ...response,
    timestamp: new Date().toISOString(),
    status: "success",
  };
}

export async function POST(req: Request) {
  const { queryType, query } = await req.json();

  // Validación de entrada
  if (!queryType || !query) {
    return NextResponse.json(
      { message: "Tipo de consulta o consulta faltante", status: "error" },
      { status: 400 }
    );
  }

  try {
    let response;
    let formattedResponse;

    switch (queryType) {
      case "recetas":
        response = await handleGeminiQuery(query);
        formattedResponse = formatRecipeResponse(response);
        break;
      case "ingredientes":
        response = await handleGeminiQuery(query);
        formattedResponse = formatIngredientResponse(response);
        break;
      case "habitos_saludables":
        response = await handleGeminiQuery(query);
        formattedResponse = formatHealthHabitsResponse(response);
        break;
      case "tendencias_locales":
        response = await handleGeminiQuery(query);
        formattedResponse = formatLocalTrendsResponse(response);
        break;
      case "personalizacion_alimenticia":
        response = await handleGeminiQuery(query);
        formattedResponse = formatDietPersonalizationResponse(response);
        break;
      default:
        return NextResponse.json(
          { message: "Tipo de consulta no reconocido", status: "error" },
          { status: 400 }
        );
    }

    // Agregar metadatos y devolver respuesta final
    return NextResponse.json(addMetaData(formattedResponse), { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Error al procesar la consulta", status: "error" },
      { status: 500 }
    );
  }
}
