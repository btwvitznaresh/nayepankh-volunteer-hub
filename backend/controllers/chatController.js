import { Anthropic } from "@anthropic-ai/sdk";

const client = new Anthropic();

const systemPrompt = `You are Pankh, a friendly and helpful AI assistant for NayePankh Foundation, a non-profit NGO based in India that empowers underprivileged students and communities.

Your personality:
- Name: Pankh 🦋
- Friendly, helpful, and encouraging
- You can speak in English and Hindi mix if needed
- Represent NayePankh Foundation with pride

Your capabilities:
1. Answer FAQs about NayePankh
2. Guide volunteer registration step by step
3. Suggest best volunteering roles based on user skills and interests
4. Generate social media captions for awareness campaigns
5. Provide motivation and encouragement to volunteers
6. Show real impact statistics
7. Help with donation queries
8. Remember conversation context

NayePankh Foundation Facts:
- Founded to empower underprivileged students and communities
- Focus areas: Education, Skill Development, Community Empowerment
- Based in India with volunteers across multiple cities
- Mission: Create lasting positive change through volunteer efforts
- Vision: Empower every individual to reach their potential

Always be warm, supportive, and encouraging. Help users find ways to contribute to the foundation's mission.`;

export const chat = async (req, res) => {
  try {
    const { messages } = req.body;

    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({ message: "Messages array is required" });
    }

    const response = await client.messages.create({
      model: "claude-3-5-sonnet-20241022",
      max_tokens: 1024,
      system: systemPrompt,
      messages: messages.map((msg) => ({
        role: msg.role,
        content: msg.content,
      })),
    });

    const assistantMessage = response.content[0].text;

    res.status(200).json({
      success: true,
      message: assistantMessage,
    });
  } catch (error) {
    console.error("Chat error:", error);
    res.status(500).json({ message: error.message });
  }
};

export const generateCaption = async (req, res) => {
  try {
    const { topic } = req.body;

    if (!topic) {
      return res.status(400).json({ message: "Topic is required" });
    }

    const response = await client.messages.create({
      model: "claude-3-5-sonnet-20241022",
      max_tokens: 500,
      system: systemPrompt,
      messages: [
        {
          role: "user",
          content: `Generate an engaging Instagram caption about ${topic} for NayePankh Foundation. Make it inspiring and include relevant hashtags.`,
        },
      ],
    });

    const caption = response.content[0].text;

    res.status(200).json({
      success: true,
      caption,
    });
  } catch (error) {
    console.error("Caption generation error:", error);
    res.status(500).json({ message: error.message });
  }
};
