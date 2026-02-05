type Rsvp = {
  mainGuestId?: string;
  attendingGuestIds: string[];
  accommodations: string | null;
  songRecommendations: string | null;
  plusOne?: {
    id: string;
    name: string;
  };
};

export const submitRsvp = async (rsvp: Rsvp) =>
  $fetch("/api/rsvp/submit", {
    method: "PUT",
    body: rsvp,
  });
