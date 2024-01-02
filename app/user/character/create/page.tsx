import {
  CREATE_CHARACTER_5E,
  CREATE_CHARACTER_CUSTOM,
} from "@/app/constants/routes";

const CreateCharacterPage = () => {
  return (
    <div>
      <div className="text-center mb-2">
        What kind of character would you like to create?
      </div>

      <div className="flex flex-col items-center">
        <a className="bg-orange-500 p-2 rounded-md mb-2" href={CREATE_CHARACTER_5E}>5E</a>
        <a className="bg-blue-500 p-2 rounded-md" href={CREATE_CHARACTER_CUSTOM}>Custom</a>
      </div>
    </div>
  );
};

export default CreateCharacterPage;
