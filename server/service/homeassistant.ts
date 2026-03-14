export const postToHomeAssistant = async (
  payload: Record<string, string | boolean>,
) => {
  const url = useRuntimeConfig().homeAssistantWebhookUrl;
  if (!url) {
    // eslint-disable-next-line no-console
    console.warn("Home Assistant webhook URL is not configured.");
    return;
  }
  try {
    await $fetch(url, {
      method: "POST",
      body: payload,
    });
  } catch {
    // eslint-disable-next-line no-console
    console.error(`Error posting to Home Assistant.`);
  }
};
