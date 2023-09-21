export const Contact = () => (
  <section
    id="contact"
    className="flex h-96 w-full scroll-mt-16 flex-col content-center items-center justify-center gap-8 bg-gray-200 px-8">
    <p className="font-alphapipe text-3xl lg:text-4xl">Ready to get started?</p>
    <p className="w-full max-w-xl text-center font-quicksand text-base [text-wrap:balance] lg:text-lg">
      Albert is always looking for opportunities to flex his creative muscles.
      Do reach out!
    </p>
    <a
      className="w-max rounded-md bg-slate-500 px-4 py-2 font-quicksand text-xl text-white hover:bg-slate-400"
      href="mailto:albertesyang@gmail.com?subject=Hey%20Albert!"
      alt-text="Reach out to Albert via email. (Opens mail client)">
      Say Hello
    </a>
  </section>
);
