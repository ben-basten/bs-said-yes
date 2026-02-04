type Rsvp = {
  mainGuestId?: string;
  attendingGuestIds: string[];
  accommodations: string | null;
  songRecommendations: string | null;
};

export const submitRsvp = async (rsvp: Rsvp) =>
  $fetch("/api/rsvp/submit", {
    method: "PUT",
    body: rsvp,
  });
