export const Pill = ({ text }: { text: string }) => {
  return (
    <div className="flex h-8 w-min items-center justify-center rounded-full bg-gray-300 px-3 py-1 font-quicksand text-xs">
      {text}
    </div>
  );
};
