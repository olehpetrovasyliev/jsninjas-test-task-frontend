import { useDispatch } from "react-redux";
import { useFieldArray, useForm } from "react-hook-form";
import { addCharacterThunk } from "../helpers/redux/characters/charactersOperations";
import { CharacterAddReqData } from "../helpers/types";
import { AppDispatch } from "../helpers/redux/store";
import { addCharacter } from "../helpers/api";
const AddCharacterPage = () => {
  const dispatch: AppDispatch = useDispatch();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<CharacterAddReqData>();

  const { fields, append, remove } = useFieldArray<any>({
    control,
    name: "superpowers",
  });

  const onSubmit = (data: CharacterAddReqData) => addCharacter(data);
  // console.log(data);
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label>Nickname</label>
        <input {...register("nickname")} />
      </div>

      <div>
        <label>Real Name</label>
        <input {...register("real_name")} />
      </div>

      <div>
        <label>Origin Description</label>
        <textarea {...register("origin_description")} />
      </div>

      <div>
        <label>Superpowers</label>
        {fields.map((field, index) => (
          <div key={field.id}>
            <input
              {...register(`superpowers.${index}` as const)}
              placeholder={`Superpower #${index + 1}`}
            />
            <button type="button" onClick={() => remove(index)}>
              Remove
            </button>
          </div>
        ))}
        <button type="button" onClick={() => append("")}>
          Add Superpower
        </button>
      </div>

      <div>
        <label>Catchphrase</label>
        <input {...register("catch_phrase")} />
      </div>

      <div>
        <label>Images</label>
        <input type="file" multiple {...register("images")} />
      </div>

      <button type="submit">Add Character</button>
    </form>
  );
};

export default AddCharacterPage;
