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

      <div className="flex flex-row justify-center items-center">
        <a className="mr-2 bg-orange-500 p-2 rounded-md" href={CREATE_CHARACTER_5E}>D&D 5E</a>
        <a className="ml-2 bg-blue-500 p-2 rounded-md" href={CREATE_CHARACTER_CUSTOM}>Custom</a>
      </div>
    </div>
  );
};

export default CreateCharacterPage;
