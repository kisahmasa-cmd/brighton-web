export default function CharityHeaderVideo() {
  return (
    <div className="py-4">
      {/* title */}
      <h1 className="text-center font-bold text-3xl">
        Bersama, #WujudkanMimpi Melalui Brighton Peduli
      </h1>
      {/* video */}
      <div className="py-6">
        <iframe
          width="560"
          height="315"
          src="https://www.youtube.com/embed/f2tPDoQFWPo?si=xYmItvq59YKCeZGU"
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          className="w-full aspect-video"
        ></iframe>
      </div>
    </div>
  );
}
