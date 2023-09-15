export const Pill = ({ text }: { text: string }) => {
  return (
    <div className="box-border h-6 w-min rounded-full bg-gray-300 px-2 py-1 font-quicksand text-sm">
      {text}
    </div>
  );
};
