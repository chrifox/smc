const Tile = ({ children }: { children: JSX.Element }) => (
  <div className="bg-gray-800 border border-gray-600 m-1">
    <div className="flex justify-center items-center border border-gray-400 p-2">
      {children}
    </div>
  </div>
);

export default Tile;
