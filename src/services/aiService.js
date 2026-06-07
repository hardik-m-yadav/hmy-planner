import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

if (!apiKey) {
  console.error(
    "Gemini API Key Missing! Add VITE_GEMINI_API_KEY in your .env file"
  );
}

const genAI = new GoogleGenerativeAI(apiKey);

export const generateStudyPlan = async (
  goal,
  hours,
  subject
) => {
  try {
    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash",
    });

    const prompt = `
You are an expert study planner.

Create a detailed study plan.

Goal:
${goal}

Subject:
${subject}

Study Hours Per Day:
${hours}

Requirements:
1. Daily Study Schedule
2. Weekly Study Timetable
3. Revision Strategy
4. Mock Test Plan
5. Productivity Tips
6. Break Recommendations
7. Time Management Advice

Format:
- Use headings
- Use bullet points
- Make the plan realistic
- Keep it clean and easy to read

Return only the study plan.
`;

    const result = await model.generateContent(prompt);

    return result.response.text();
  } catch (error) {


    if (error?.message?.includes("API_KEY")) {
      return "Invalid Gemini API Key. Please check your .env file.";
    }

    if (error?.message?.includes("quota")) {
      return "Gemini API quota exceeded. Try again later.";
    }

    return "Failed to generate study plan. Check browser console for details.";
  }
};
