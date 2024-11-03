import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useFieldArray, useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import {
  getCharacterByIdThunk,
  updateCharacterThunk,
} from "../../helpers/redux/characters/charactersOperations";
import { selectCurrentCharacter } from "../../helpers/redux/characters/charactersSelectors";
import { AppDispatch } from "../../helpers/redux/store";
import { CharacterAddReqData } from "../../helpers/types";
import styles from "./EditCharacter.module.scss";

const EditCharacterPage = () => {
  const { id } = useParams();
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();
  const character = useSelector(selectCurrentCharacter);

  const { register, handleSubmit, control } = useForm<CharacterAddReqData>();

  const { fields, append, remove } = useFieldArray<any>({
    control,
    name: "superpowers",
  });

  const [fileCount, setFileCount] = useState<number>(
    character?.images?.length || 0
  );

  useEffect(() => {
    if (id) {
      dispatch(getCharacterByIdThunk(id));
    }
  }, [dispatch, id]);

  const onSubmit = (data: CharacterAddReqData) => {
    if (id) {
      dispatch(updateCharacterThunk({ id, newCharacter: { ...data } }));
      navigate("/characters");
    }
  };

  return (
    <section className={styles.editCharacterPage}>
      <h1 className={styles.editCharacterPage__title}>
        Edit {character?.nickname}
      </h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className={styles.editCharacterForm}
      >
        <div className={styles.editCharacterForm__field}>
          <label htmlFor="nickname" className={styles.editCharacterForm__info}>
            Nickname
          </label>
          <input
            {...register("nickname")}
            id="nickname"
            className={styles.editCharacterForm__input}
          />
        </div>

        <div className={styles.editCharacterForm__field}>
          <label className={styles.editCharacterForm__info} htmlFor="real_name">
            Real Name
          </label>
          <input
            {...register("real_name")}
            id="real_name"
            className={styles.editCharacterForm__input}
          />
        </div>

        <div className={styles.editCharacterForm__field}>
          <label
            className={styles.editCharacterForm__info}
            htmlFor="origin_description"
          >
            Origin Description
          </label>
          <textarea
            {...register("origin_description")}
            id="origin_description"
            className={`${styles.editCharacterForm__input} ${styles.editCharacterForm__textarea}`}
          />
        </div>

        <div className={styles.editCharacterForm__field}>
          <label className={styles.editCharacterForm__info}>Superpowers</label>
          {fields.map((field, index) => (
            <div
              key={field.id}
              className={styles.editCharacterForm__superpowerFieldWrapper}
            >
              <input
                {...register(`superpowers.${index}`)}
                placeholder={`Superpower #${index + 1}`}
                className={styles.editCharacterForm__input}
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

        <div className={styles.editCharacterForm__field}>
          <label className={styles.editCharacterForm__info}>Catchphrase</label>
          <input
            {...register("catch_phrase")}
            className={styles.editCharacterForm__input}
          />
        </div>

        <div className={styles.editCharacterForm__field}>
          <label
            htmlFor="images"
            className={styles.editCharacterForm__customFileInput}
          >
            <span className={styles.editCharacterForm__customFileInput__info}>
              Images
            </span>
            {fileCount > 0 ? `${fileCount} File(s) Selected` : "Choose Files"}{" "}
          </label>
          <input
            id="images"
            type="file"
            multiple
            {...register("images", {
              onChange: (e) => {
                const selectedFiles = e.target.files;
                setFileCount(selectedFiles ? selectedFiles.length : 0);
              },
            })}
            className={styles.editCharacterForm__fileInput}
          />
        </div>

        <button type="submit">Update Character</button>
      </form>
    </section>
  );
};

export default EditCharacterPage;
