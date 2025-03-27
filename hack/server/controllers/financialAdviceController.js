const { GoogleGenerativeAI } = require("@google/generative-ai");
require("dotenv").config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const generateFinancialAdvice = async (req, res) => {
    try {
        console.log("Received request:", req.body);

        const { name, age, monthly_income, financial_goal } = req.body;

        if (!name || !age || !monthly_income || !financial_goal) {
            console.error("Missing required fields");
            return res.status(400).json({ error: "Missing required fields" });
        }

        const prompt = `Generate financial advice for ${name} (Age: ${age}, Monthly Income: ${monthly_income}, Financial Goal: ${financial_goal}).`;

        const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });

        console.log("Sending request to Gemini API...");
        const result = await model.generateContent([prompt]);

        console.log("Raw API Response:", JSON.stringify(result, null, 2));

        // ✅ Fix: Properly extract response text
        const responseText = result.response?.candidates?.[0]?.content?.parts?.[0]?.text;

        if (!responseText) {
            console.error("Empty response from Gemini API");
            return res.status(500).json({ error: "Empty response from Gemini API" });
        }

        console.log("Processed Response:", responseText);

        // ✅ Fix: Send response as JSON object
        res.json({ financial_advice: responseText });

    } catch (error) {
        console.error("Error:", error.message);
        res.status(500).json({ error: error.message }); // Removed the extra 'c'
    }
};

module.exports = { generateFinancialAdvice };