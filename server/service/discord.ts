export const postToDiscord = async (message: string) => {
  const url = useRuntimeConfig().discordWebhookUrl;
  if (!url) {
    console.warn("Discord webhook URL is not configured.");
    return;
  }
  try {
    await $fetch(url, {
      method: "POST",
      body: {
        content: message,
      },
    });
  } catch (error) {
    console.error("Error posting to Discord:", error);
  }
};
