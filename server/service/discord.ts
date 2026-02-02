export const postToDiscord = async (message: string) => {
  const url = useRuntimeConfig().discordWebhookUrl;
  if (!url) {
    // eslint-disable-next-line no-console
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
    // eslint-disable-next-line no-console
    console.error("Error posting to Discord:", error);
  }
};
