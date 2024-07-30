export const Avatar = () => {
  return (
    <div className="absolute z-20 w-20 h-20 overflow-hidden -translate-x-1/2 -translate-y-1/2 rounded-full select-none -top-2.5 bg-primary-600 left-1/2">
      <img
        src="https://avatar.iran.liara.run/public"
        alt="avatar"
        className="object-cover object-center w-full h-full"
        loading="lazy"
      />
    </div>
  );
};
