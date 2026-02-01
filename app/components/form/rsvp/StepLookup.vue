<template>
  <div class="flex flex-col gap-y-7">
    <Heading as="h2">Look up your RSVP</Heading>
    <p class="max-w-copy">
      Please enter the first and last name of one member of your party below. If
      you're responding for you and a guest (or your family), you'll be able to
      RSVP for your entire group on the next step.
    </p>
    <FormInput label="First and Last Name" name="name" required />
    <button type="button" class="button button-lg ml-auto">Search</button>
  </div>
</template>
