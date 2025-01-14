import style from "../assets/style/components/search.module.scss";
import search_dark from "../assets/svg/search_dark.svg";
import search_light from "../assets/svg/search_light.svg";
import clear_dark from "../assets/svg/clear_dark.svg";
import clear_light from "../assets/svg/clear_light.svg";
import { useState } from "react";
import { searchSlice } from "../redux/slice/searchSlice";
import { useAppDispatch, useAppSelector } from "../hooks/redux";

interface IProps {
  theme: string;
}

const Search = ({ theme }: IProps) => {
  const { field } = useAppSelector((state) => state.searchReducer);
  const { setField, clearField } = searchSlice.actions;
  const dispatch = useAppDispatch();
  const [focus, setFocus] = useState<boolean>(false);

  const focusHandler = () => {
    if (focus) {
      return style.search + " " + style.active;
    } else {
      return style.search;
    }
  };

  const searchTheme = () => {
    return theme === "dark" ? search_dark : search_light;
  };

  const clearTheme = () => {
    return theme === "dark" ? clear_dark : clear_light;
  };

  return (
    <>
      <div className={focusHandler()}>
        <img className={style.search_icn} src={searchTheme()} alt="" />
        <input
          onChange={(e) => dispatch(setField(e.target.value))}
          value={field}
          onFocus={() => setFocus(true)}
          onBlur={() => setFocus(false)}
          placeholder="Painting title"
          type="text"
          className={style.search_input}
        />
        {field && (
          <img
            onClick={() => dispatch(clearField())}
            className={style.search_icn}
            src={clearTheme()}
            alt=""
          />
        )}
      </div>
    </>
  );
};
// debounce сделать для fetchШmages
export default Search;
