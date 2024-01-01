type CharacterPortraitProps = {
  skinColour: string;
  hairColour: string;
  eyeColour: string;
};

const Eye = ({ colour, pos }: { colour: string; pos: string }) => (
  <div
    className={`flex justify-center items-center bg-white h-10 w-10 rounded-full absolute ${pos}`}
  >
    <div
      className="flex justify-center items-center h-8 w-8 bg-black rounded-full"
      style={{ backgroundColor: colour }}
    >
      <div className="h-4 w-4 bg-black rounded-full">
        <div className="h-2 w-2 bg-white rounded-full"></div>
      </div>
    </div>
  </div>
);

const CharacterPortrait = ({
  skinColour,
  hairColour,
  eyeColour,
}: CharacterPortraitProps) => (
  <div className="p-4">
    <div className="relative">
      <div
        className={`flex items-center justify-center h-44 w-32 rounded-full mx-2`}
        style={{ backgroundColor: skinColour }}
      >
        <div
          className={`h-20 w-40 rounded-t-full absolute -top-2`}
          style={{ backgroundColor: hairColour }}
        ></div>
        <Eye colour={eyeColour} pos="left-4" />
        <Eye colour={eyeColour} pos="right-4" />

        <div className="w-12 h-2 bg-black rounded-full absolute bottom-8"></div>
      </div>
    </div>
  </div>
);

export default CharacterPortrait;
