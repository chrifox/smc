import {
  CREATE_CHARACTER_5E,
  CREATE_CHARACTER_CUSTOM,
} from "@/app/constants/routes";

const CreateCharacterPage = () => {
  return (
    <div>
      <div className="mb-2">
        What kind of character would you like to create?
      </div>

      <div className="flex">
        <a href={CREATE_CHARACTER_5E}>5E</a>
        <a href={CREATE_CHARACTER_CUSTOM}>Custom</a>
      </div>
    </div>
  );
};

export default CreateCharacterPage;
