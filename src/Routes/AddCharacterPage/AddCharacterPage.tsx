import { useDispatch } from "react-redux";
import { useFieldArray, useForm } from "react-hook-form";
import { addCharacterThunk } from "../../helpers/redux/characters/charactersOperations";
import { CharacterAddReqData } from "../../helpers/types";
import { AppDispatch } from "../../helpers/redux/store";
import { useNavigate } from "react-router-dom";
import styles from "./AddCharacter.module.scss";
import { useState } from "react";

const AddCharacterPage = () => {
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();

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

  const [fileCount, setFileCount] = useState<number>(0);

  const onSubmit = (data: CharacterAddReqData) => {
    dispatch(addCharacterThunk(data));

    navigate("/characters");
  };

  return (
    <section className={styles.addCharacterPage}>
      <h1 className={styles.addCharacterPage__title}>Add new character</h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className={styles.addCharacterForm}
      >
        <div className={styles.addCharacterForm__field}>
          <label htmlFor="nickname" className={styles.addCharacterForm__info}>
            Nickname
          </label>
          <input
            {...register("nickname", { required: "Nickname is required" })}
            id="nickname"
            className={styles.addCharacterForm__input}
          />
          {errors.nickname && (
            <span className={styles.addCharacterForm__error}>
              {errors.nickname.message}
            </span>
          )}
        </div>

        <div className={styles.addCharacterForm__field}>
          <label className={styles.addCharacterForm__info} htmlFor="real_name">
            Real Name
          </label>
          <input
            {...register("real_name", { required: "Real name is required" })}
            id="real_name"
            className={styles.addCharacterForm__input}
          />
          {errors.real_name && (
            <span className={styles.addCharacterForm__error}>
              {errors.real_name.message}
            </span>
          )}
        </div>

        <label className={styles.addCharacterForm__field}>
          <label
            className={styles.addCharacterForm__info}
            htmlFor="origin_description"
          >
            Origin Description
          </label>
          <textarea
            {...register("origin_description", {
              required: "Origin description is required",
            })}
            id="origin_description"
            className={`${styles.addCharacterForm__input} ${styles.addCharacterForm__textarea}`}
          />
          {errors.origin_description && (
            <span className={styles.addCharacterForm__error}>
              {errors.origin_description.message}
            </span>
          )}
        </label>

        <div className={styles.addCharacterForm__field}>
          <label className={styles.addCharacterForm__info}>Superpowers</label>
          {fields.map((field, index) => (
            <div
              key={field.id}
              className={styles.addCharacterForm__superpowerFieldWrapper}
            >
              <input
                {...register(`superpowers.${index}`)}
                placeholder={`Superpower #${index + 1}`}
                className={styles.addCharacterForm__input}
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

        <label className={styles.addCharacterForm__field}>
          <label className={styles.addCharacterForm__info}>Catchphrase</label>
          <input
            {...register("catch_phrase", {
              required: "Catch phrase is required",
            })}
            className={styles.addCharacterForm__input}
          />
          {errors.catch_phrase && (
            <span className={styles.addCharacterForm__error}>
              {errors.catch_phrase.message}
            </span>
          )}
        </label>

        <div className={styles.addCharacterForm__field}>
          <label
            htmlFor="images"
            className={styles.addCharacterForm__customFileInput}
          >
            <span className={styles.addCharacterForm__customFileInput__info}>
              Images
            </span>
            {fileCount > 0 ? `${fileCount} File(s) Selected` : "Choose Files"}{" "}
          </label>
          <input
            id="images"
            type="file"
            multiple
            {...register("images", {
              required: "Images are required",
              onChange: (e) => {
                const selectedFiles = e.target.files;
                setFileCount(selectedFiles ? selectedFiles.length : 0);
              },
            })}
            className={styles.addCharacterForm__fileInput}
          />
          {errors.images && (
            <span className={styles.addCharacterForm__error}>
              {errors.images.message}
            </span>
          )}
        </div>

        <button type="submit">Add Character</button>
      </form>
    </section>
  );
};

export default AddCharacterPage;
