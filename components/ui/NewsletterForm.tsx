"use client";

export default function NewsletterForm() {
  return (
    <form
      className="mt-5 flex gap-2"
      onSubmit={(e) => e.preventDefault()}
    >
      <input
        type="email"
        placeholder="Your email"
        className="flex-1 rounded-full border border-teal-200 bg-white/70 px-4 py-2 text-sm outline-none focus:border-primary"
      />
      <button className="rounded-full bg-gradient-to-r from-primary to-primary-hover px-4 py-2 text-sm font-medium text-white">
        Subscribe
      </button>
    </form>
  );
}
